import { faker, th } from "@faker-js/faker";

export default class User {
private firstName:string;
private lastNmae:string;
private email:string;
private password:string;
private access_token: string='';
private userID: string='';

constructor(){
this.firstName=faker.person.firstName(),
this.lastNmae=faker.person.lastName(),
this.email=faker.internet.email(),
this.password=faker.internet.password()
}
// we define get to accsess the private elements 

getfirstName(){
    return this.firstName;
}
getlastName(){
    return this.lastNmae;
}
getemail(){
    return this.email;
}
getpassword(){
    return this.password;
}
getAccessToken(){
    return this.access_token;
}
setAccessToken(access_token:string){
    this.access_token=access_token;
}
}