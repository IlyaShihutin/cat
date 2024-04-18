import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import { Cat } from './types/catType';

declare const CAT_WEBPACK_ENTRY: string;
declare const CAT_PRELOAD_WEBPACK_ENTRY: string;
declare const SWITCH_CAT_WEBPACK_ENTRY: string;
declare const SWITCH_CAT_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow;
let secondWindow: BrowserWindow;

const createMainWindow = (): void => {
  const secondWindowHeight = 200;

  mainWindow = new BrowserWindow({
    height: 500,
    width: 500,
    webPreferences: {
      preload: CAT_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    },
  });

  const [mainWindowWidth, mainWindowHeight] = mainWindow.getPosition();
  mainWindow.setPosition(mainWindowWidth, mainWindowHeight - secondWindowHeight / 2);

  mainWindow.loadURL(CAT_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();

};
const createSecondWindow = (): void => {
  const mainWindowHeight = 500;

  secondWindow = new BrowserWindow({
    height: 200,
    width: 300,
    webPreferences: {
      preload: SWITCH_CAT_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const [width, height] = secondWindow.getPosition();
  secondWindow.setPosition(width, height + mainWindowHeight / 2)

  secondWindow.loadURL(SWITCH_CAT_WEBPACK_ENTRY);

  // secondWindow.webContents.openDevTools();
};

app.on('ready', () => {
  createMainWindow();
  createSecondWindow();
  ipcMain.on('switchCat', async (event: IpcMainEvent, message) => {
    try {
      let catList: Cat[] = [];
      if (message.isListEnd) {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        catList = await response.json();
        event.reply('switchCatReplay', catList.length);
      }
      mainWindow.webContents.send('getCats', { list: catList, index: message.index });
    } catch (error) {
      console.log(error)
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});