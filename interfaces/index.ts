export interface IUser {
  id?: string;
  name?: string;
  age?: number;
  hobbies?: string[];
}
export interface IRequest {
  url: string;
}
export interface IResponse {
  statusCode: number;
  write: (message: string) => void;
  end: () => void;
}
