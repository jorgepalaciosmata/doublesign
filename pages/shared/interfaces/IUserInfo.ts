
export interface IUserInfo {
    id: string,
    name: string, 
    firstLastName: string,
    profilePicture: string,
    type?: IUserType | string,
    folderId?: string,
}

export enum IUserType {
    Patient,
    Doctor,
    Onboarder
}