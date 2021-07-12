import { User } from "./user.model"

export interface VerificationSignInCode{
    code:string;
    user:User;
    isGiftFound:boolean;
    userPoint:number;
    accessToken:string;
}
