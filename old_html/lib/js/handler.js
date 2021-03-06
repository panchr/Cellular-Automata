/*
Rushy Panchal
handler.js --- handles various event calls
*/

// Constants

window.options = {
	interest: [2],
	dimension: 1,
	height: 1,
	width: 10,
	rules: [],
	}

var ICONS = {
	loading: "iconfont-20 ionicons ion-loading-c",
	down: "iconfont-40 ionicons ion-ios7-arrow-down",
	up: "iconfont-40 ionicons ion-ios7-arrow-up"
	}
	
var BASE_RULE = '<button class = "ca-opt-rule-small btn-custom btn" id = "ca-rule-1-small" onclick = "slideDiv(' + "'ca-rule-1-large'" + '");">\
			Rule {number} <canvas class = "ca-rule-canvas" id = "ca-rule-{number}-canvas"></canvas> <span class = "ca-rule-edit-label">Edit</span>\
		</button>\
		<div class = "center ca-opt-rule-large" id = "ca-rule-{number}-large" style = "display: none;">\
			<script type = "text/javascript">\
				var ca_grid_rule_{number} = new CAGrid(3, 3, "ca-cell-button"); // has to be 3, 1 for 1 dimensional CA\
				// Also, need to prevent user from editing the cell of interest\
				ca_grid_rule_{number}.draw();\
			</script>\
			<button class = "btn btn-custom" onclick = "saveRule(ca_grid_rule_{number}, ' + "'ca-rule-1-canvas'" + '");">Save</button>\
		</div>';

// Classes

function Slides(ids, next, prev) {
	// Creates a new Slides object
	var slides = {
		active: 0,
		slides: ids,
		next: next,
		prev: prev,
		add: function(ids) {
			// Adds an id to the list
			return (typeof ids == "string") ? this.slides.push(ids): this.slides.extend(ids);
			},
		move: function(delta) {
			// Moves the slides by "delta" amount
			var current = this.active;
			var new_slide = (current + delta);
			var length = this.slides.length;
			getElem(this.prev).disabled = (new_slide == 0);
			getElem(this.next).disabled = (new_slide == length - 1);
			var new_id = this.slides.get(new_slide % length);
			jQuery(getElem(this.slides.get(current).elem)).slideUp(250, function() {
				jQuery(getElem(new_id.elem)).slideDown(250);
				});
			new_id.initialize();
			this.active = new_slide;
			return new_slide;
			},
		};
	getElem(prev).disabled = true;
	return slides;
	}

function CAGrid(width, height, css_class) {
	// Creates a CAGrid object
	var grid = {
		hash: Date.now().toString(36).match(/[a-z]+/ig).join(""),
		width: width,
		height: height,
		css_class: css_class,
		base_id: ["button", "grid", "object", css_class].join("-"),
		elements: new Array(),
		draw: function(id, start) {
			// Draws the elements to the document (or id's innerHTML)
			var elem = getElem(id);
			var writeText = (exists(id) && exists(elem)) ? function(text) {elem.innerHTML += text;}: function(text) {document.write(text);}
			for (var h = 0; h < this.height; h ++) {
				for (var w = 1; w <= this.width; w ++) {
					var name = this.hash + "-" + ((h * this.width) + w);
					var buttonID = this.base_id + "-" + name;
					writeText(['<button class = ', this.css_class, ' id = ', buttonID, ' name = ',  name, ' onclick = "ca_button_click(this);" buttonclicked="false"></button>'].join(""));
					this.elements.push(buttonID);
					}
				writeText('<br/>');
				}
			for (var index in start) {
				if (start.hasOwnProperty(index)) {
					var buttonName = start[index];
					document.getElementById(this.base_id + "-" + buttonName).setAttribute('buttonclicked', true);
				}
				}
			},
		clicked: function(raw) {
			// Gets the clicked items
			var elements = new Array();
			for (var index in this.elements) {
				if (this.elements.hasOwnProperty(index)) {
					elements.push(getElem(this.elements[index]));
					}
				}
			var clicked_elems = elements.filter(
				function(elem, index, elem_array) {
					return elem.getAttribute('buttonclicked') == "true";
					});
			var extract = (exists(raw) && raw) ? function(elem) {return elem.name;}: function(elem) {return int(elem.name)};
			return clicked_elems.map(extract);
			},
		};
	return grid;
	}

// Functions

function ca_button_click(elem) {
	// "Clicks" the element
	elem.setAttribute('buttonclicked', elem.getAttribute('buttonclicked') == "false");
	}

function add_elements(page) {
	// Adds the element to the title
	document.title = DATA.title;
	if (page == "index") {
		}
	else if (page == "start") {
		}
	else if (page == "automata") {
		}
	return true;
	}
	
function slideOptions(id) {
	// Slides the options menu
	var menu = getElem(id);
	menu.style.left = (parseInt(menu.style.left) < 0) ? 0: -400;
	return menu.style.left;
	}

function addHint(text) {
	// Adds a hint around an icon
	document.write('<span class = "hint--rounded hint--top" data-hint = "' + text + '">\
		<i class = "iconfont-20 ionicons ion-help-circled"></i></span>');
	}

function addNewRule(id) {
	// Opens the rule interface
	var options = window.options;
	var rule_number = options.rules.length + 1;
	var rule_string = BASE_RULE.replaceAll('{number}', rule_number);
	options.rules.push(rule_number);
	getElem(id).contentWindow.document.write(rule_string);
	}

function setDimensions() {
	// Sets the dimensions of the options
	var options = window.options;
	options.height = getElem("options-cellspace-height").value;
	options.dimension = (options.height == 1) ? 1: 2;
	return options.dimension;
	}

function getOptions() {
	// Gets the user's options
	var options = window.options;
	options.interest = exists(ca_interest_grid) ? ca_interest_grid.clicked(): [];
	var elements = [].slice.call(document.getElementsByClassName('ca-opt'));
	elements.forEach(
		function(element, index, array) {
			options[(element.name != "") ? element.name: element.id] = element.value;
		});
	setDimensions();
	return options;
	}

function drawCA() {
	// Draws the Cellular Automata
	var options = getOptions();
	console.log(options);
	}
	
function getElem(id) {
	// Returns the element by its id
	return document.getElementById(id);
	}

function httpGet(url) {
	// Gets data from a url
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
	}
	
function httpPost(url, parameters) {
	// Posts data to the url
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", url);
	for (var key in parameters) {
		var field = document.createElement("input");
		field.setAttribute("type", "hidden");
		field.setAttribute("name", key);
		field.setAttribute("value", parameters[key]);
		form.appendChild(field);
		}
	document.body.appendChild(form);
	form.submit();
	}
	
function slideDiv(id) {
	// Slides a div up or down
	var divElem = getElem(id);
	if (divElem == null || divElem === "undefined") {
		return null;
		}
	var divElemOn = divElem.style.display != "none";
	divElemOn ? jQuery(divElem).slideUp(): jQuery(divElem).slideDown();
	return !divElemOn;
	}

Array.prototype.get = function(index) {
	// Allows for index wrapping
	var length = this.length;
	var index = index % length;
	return index < 0 ? this[length + index]: this[index];
	}

Array.prototype.append = function(elem) {
	// Mocks Python's list.append
	return this.push(elem);
	}

Array.prototype.extend = function(new_array) {
	// Extends this array with new_array's items
	for (var index in new_array) {
		var elem = new_array[index];
		this.push(elem);
		}
	}
	
String.prototype.repeat = function(n) {
	// Repeats a string "n" times
	return new Array(n + 1).join(this);
	}
	
String.prototype.replaceAll = function(substring, repl) {
	// Replaces "substring" with "repl" for all occurences of substring
	var pattern = new RegExp(substring, "g");
	return this.replace(pattern, repl);
	}

function copy(from, to) {
	// Copies the attributes in "from" and "to"
	for (var key in from) {
		if (from.hasOwnProperty(key) && exists(from[key])) {
			to[key] = from[key];
			}
		}
	return to;
	}
		
function hex(n) {
	// Returns the hex representation of decimal n
	return Number(n).toString(16);
	}

function int(n) {
	// Extracts the integer number from n
	return parseInt(n.match(/\d+/)[0]);
	}

function float(n) {
	// Extracts a floating-pont number from n
	return parseFloat(n.match(/[0-9.]+\.[0-9]+/)[0]);
	}

function is_null(x) {
	// Checks whether or not the variable is null
	return (x == null || x == "undefined");
	}

function exists(x) {
	// Checks whether or not the value exists
	return (x != null && x != "undefined");
	}