'use strict';

import {app, BrowserWindow, Tray, Menu, shell, dialog} from 'electron';
import path from 'path';
import log from 'electron-log';

import appProperties from './../resources/properties';

if (require('electron-squirrel-startup')) {
    app.quit();
}

import installExtension, {REACT_DEVELOPER_TOOLS} from 'electron-devtools-installer';

let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);
const iconPath = path.join(__dirname, '../resources/icon.ico');

if (isDevMode) {
    log.transports.file.level = 'debug';
    log.transports.console.level = 'verbose';
    log.transports.file.appName = 'Electron';
} else {
    log.transports.file.level = 'info';
    log.transports.console.level = 'info';
}

const lockObtained = app.requestSingleInstanceLock();
app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
        mainWindow.show();
    }

    protocolHandler(commandLine);
});

app.on('load-url', (event, url) => {
    protocolHandler(url);
});

function protocolHandler (commandLine) {
    if (process.platform == 'win32') {
        // Keep only command line / deep linked arguments
        commandLine = commandLine.slice(1)
    }
    let deeplink = new URL(commandLine);

    if (deeplink.hostname == 'exit') {
        app.quit();
    }
    
    if (deeplink.hostname == 'auth') {
        let code = deeplink.searchParams.get('code')
        let error = deeplink.searchParams.get('error')

        if (code) {
            mainWindow.webContents.send('code-response', code);
        }

        if (error) {
            console.log(dialog.showMessageBox(null, {
                type: "error",
                title: "Auth Failure",
                message: "Failed to authorize your character, please try again."
            } ));
        }
    }
}

if (!lockObtained) {
    app.quit();
}

app.setAsDefaultProtocolClient(appProperties.protocol_handler);

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        nodeIntegration: true
    });

    if (isDevMode) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.setTitle(`Cerebral ${appProperties.version}`);
    mainWindow.setMenu(null);

    let trayIcon = new Tray(iconPath);
    trayIcon.setToolTip('Cerebral');
    let contextMenu = Menu.buildFromTemplate([
        {label: 'Show', click: () => {mainWindow.show()}},
        {label: 'Quit', click: () => {
            app.isQuiting = true;
            app.quit()
        }}
    ]);
    trayIcon.setContextMenu(contextMenu);
    trayIcon.on('click', () => {
        mainWindow.show();
    });

    mainWindow.on('minimize', (e) => {
        e.preventDefault();
        mainWindow.hide();
    });
    mainWindow.on('close', (e) => {
        if (!app.isQuiting) {
            e.preventDefault();
            mainWindow.hide();
        }

        return false;
    });
    mainWindow.on('show', () => {
        trayIcon.setHighlightMode('always')
    });
    mainWindow.on('page-title-updated', (e) => {
        e.preventDefault();
    });
    mainWindow.webContents.on('new-window', function(event, url){
        event.preventDefault();
        shell.openExternal(url);
    });
};

app.on('ready', createWindow);
app.on('activate', () => {
    if (mainWindow === undefined) {
        createWindow();
    }
});