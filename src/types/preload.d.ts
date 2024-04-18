import { CatRequest } from "./catType";

export { };

declare global {
  interface Window {
    electron: {
      send: (channel: string, data?: SwitchRequest | CatRequest) => void;
      on: (channel: string, func: (args: CatRequest | number) => void) => void;
      removeListener: (channel: string, func: (args: CatRequest | number) => void) => void
    };
  }
}
