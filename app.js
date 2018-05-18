const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;


// Plan for improvements:
// What about having a recipe section so that when you input the ingredients to a recipe it will add all the items to your list then you can plan ahead and get enough items to make multiple things using similar ingredients.




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
	// Quit app when closed
	mainWindow.on('closed', function() {
		app.quit();
	});

	// Handle create add window
	function createAddWindow() {
		addWindow = new BrowserWindow({
			//specify height, width and title of the newly created window
			width: 300,
			height: 200,
			title: 'Add Shopping List Item'
		});
		//load html into window
		addWindow.loadURL(url.format({
			//specify the html file you want to open
			pathname: path.join(__dirname, 'addWindow.html'),
			protocol: 'file',
			slashes: true
		}));
		// Garbage collection handle
		addWindow.on('close', function() {
			addWindow = null;
		});
	}
	//Create menu template
	const mainMenuTemplate = [

		{
			label: 'File',
			submenu: [
			  {
				  label: 'Add Item',
				  click() {
					  createAddWindow();
				  }
				},
				{
					label: 'Clear Items'
				},
				{
					label: 'Quit',
					accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
					click(){
						app.quit();
					}
				}
			]
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
		  },
		  {
			label: 'View',
			submenu: [
			  {role: 'reload'},
			  {role: 'forcereload'},
			  {role: 'toggledevtools'},
			  {type: 'separator'},
			  {role: 'resetzoom'},
			  {role: 'zoomin'},
			  {role: 'zoomout'},
			  {type: 'separator'},
			  {role: 'togglefullscreen'}
			]
		  },
		  {
			role: 'window',
			submenu: [
			  {role: 'minimize'},
			  {role: 'close'}
			]
		  },
		  {
			role: 'help',
			submenu: [
			  {
				label: 'Learn More',
				click () { require('electron').shell.openExternal('https://electronjs.org') }
			  }
			]
		}
	];
	// If on mac platform, add an empty object to menu list
	if(process.platform == 'darwin') {
		mainMenuTemplate.unshift({});
	}

	//add developer tools item if not in production
if (process.env.NODE_ENV !== 'production') {
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle Dev Tools',
				accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'
			}
		]
	})
}

	//Build Menu From Template
	const menu = Menu.buildFromTemplate(mainMenuTemplate)
	  Menu.setApplicationMenu(menu)
	  
});

