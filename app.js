const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// Listen for app to be ready

app.on('ready', function() {
	//Create new window
	mainWindow = new BrowserWindow({});
	//load html into window
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'mainWindow.html'),
		protocol: 'file',
		slashes: true
	}));

	//Create menu template
	const mainMenuTemplate = [
		{
			label: 'Quit', click: function() {app.quit();}
		},

		{
			label: 'Edit',
			submenu: [
				{role: 'undo'},
				{role: 'redo'},
				{type: 'separator'},
				{role: 'cut'},
				{role: 'copy'},
				{role: 'paste'},
				{role: 'pasteandmatchstyle'},
				{role: 'delete'},
				{role: 'selectall'}
			]
		}
	]

	//Build Menu From Template
	const menu = Menu.buildFromTemplate(mainMenuTemplate)
  	Menu.setApplicationMenu(menu)
});
