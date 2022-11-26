import { NotificationType } from "../enums/notification-type";

export interface INotification{
    title:string,
    message: string,
    type: NotificationType,
    duration?:number
}