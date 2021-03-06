# gui.__init__.py
# Rushy Panchal and George Georges
# Cellular Automata Project
# Contains the graphical interface modules

### Imports

import tk.ttkExtra as tk
import thread

from lib.constants import *
from screens import *
from styles import *
from grid import *
from wm import *

### Main classes

class App(tk.BaseCustomWindow):
	'''Main application'''
	def __init__(self, master):
		self.master = master
		self.master.cleanup = self.cleanup
		self.master.title(NAME)
		self.master.protocol("WM_DELETE_WINDOW", self.master.close)
		if SETTINGS.fullscreen:
			self.master.fullscreen(False)
		else:
			self.master.geometry("{w}x{h}".format(w = int(tk.SCREENDIM['w'] * 0.8), h = int(tk.SCREENDIM['h'] * 0.8)))
		self.WM = WindowManager(self.master,
			place_options = {'anchor': tk.CENTER, 'relx': 0.5, 'rely': 0.5})
		self.createScreens()
		self.WM.open(START)
		self.copyrightLabel = tk.Label(self.master, text = DATA.copyright.text)
		self.copyrightLabel.place(anchor = tk.S, relx = 0.5, rely = 1)

	def cleanup(self):
		'''Cleans up the program before closing'''
		DATABASE.close()

	def createScreens(self):
		'''Creates all of the screens'''
		self.drawScreen = DrawScreen(self.master, self.WM)

		self.WM.set({ # Set the Window Manager's screens
			START: StartScreen,
			MAIN_PROGRAM: CAScreen,
			ABOUT: AboutScreen,
			CREDITS: CreditsScreen,
			HISTORY: HistoryScreen,
			SETTINGS_EDIT: SettingsScreen,
			OPTIONS_SPACE: Options_CellspaceScreen,
			OPTIONS_INTEREST: Options_InterestScreen,
			OPTIONS_RULES: Options_RuleScreen,
			DRAW: self.drawScreen,
			})
