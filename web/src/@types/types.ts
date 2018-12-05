export type Next = (arg1: any) => void;
export type Dispatch = (arg1: any) => void;

export interface History {
  push: (arg1: string) => void;
  replace: (arg1: string) => void;
}

export interface ConnectProps {
  dispatch?: Dispatch;
  history?: History;
  loading: boolean;
}

export interface Action {
  type: string;
  payload: any;
}
