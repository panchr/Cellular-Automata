Cellular-Automata
=================

Nonlinear Dynamics Cellular Automata Project 2014

Notes on Commits:

 - Create a new commit for any change (so we have a running record of changes)
 - Add a decent comment for each commit (so we know what is being changed)
 - Don't commit to a file that someone is still working on (might override some changes)

 
For any window to work with the main interface, it should be in this format:
	
	class WindowName(tk.BaseCustomWindow):
		def __init__(self, master):
			self.master
			
	WindowName is your window name, and tk is my library (see https://github.com/panchr/Python-Tkinter-Extensions)