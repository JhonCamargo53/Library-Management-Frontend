export interface IBook{
    id?:string,
    title:string,
    owner:string,
    description:string,
    availability?:boolean,
    releaseYear: string,
    imgUrl:string
}

export interface IUser{
    id?:string,
    role?:number,
    firstName:string,
    lastName:string,
    email:string,
    password?:string,
}