import { User } from "./user.model"

export interface VerificationCode{
    code:string;
    user:User;
    isGiftFound:boolean;
    userPoint:number;
    accessToken:string;
}
