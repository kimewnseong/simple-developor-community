import { ITokenUser } from "../User";

declare global {
  namespace Express {
    export interface User extends ITokenUser {}
  }
}
