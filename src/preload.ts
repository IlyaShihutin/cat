import { IpcRendererEvent } from "electron";
import { CatRequest, SwitchRequest } from "./types/catType";

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data?: SwitchRequest | CatRequest) => {
    ipcRenderer.send(channel, data);
  },
  on: (channel: string, func: (args: CatRequest | number) => void) => {
    ipcRenderer.on(channel, (event: IpcRendererEvent, args: CatRequest | number) => func(args));
  },
  removeListener: (channel: string, func: (args: CatRequest | number) => void) => {
    ipcRenderer.removeListener(channel, (event: IpcRendererEvent, args: CatRequest | number) => func(args));
  }
});