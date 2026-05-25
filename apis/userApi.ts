import { faker } from "@faker-js/faker";
import { APIRequestContext } from "@playwright/test";
import User from "../models/user";

export default class UserApi {
private requset:APIRequestContext;
constructor(requset:APIRequestContext){
    this.requset=requset;
}

async register(user:User ){
  return await this.requset.post("/api/v1/users/register",{
        data:{
          email:user.getemail(),
          firstName:user.getfirstName(),
          lastName:user.getlastName(),
          password:user.getpassword(),

        }
     });
}
}