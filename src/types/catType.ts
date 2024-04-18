export interface Cat {
  id: string;
  url: string;
}
export interface CatRequest {
  list: Cat[];
  index: number
}
export interface SwitchRequest {
  index: number;
  isListEnd: boolean
}