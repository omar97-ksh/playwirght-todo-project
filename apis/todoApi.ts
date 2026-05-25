import { APIRequestContext } from "@playwright/test";
import User from "../models/user";

export default class TodoApi{
private requset:APIRequestContext;
constructor(requset:APIRequestContext){
    this.requset=requset;
}

     async addTodo(user:User){
    return await this.requset.post('/api/v1/tasks',{
    data:{
       isCompleted:false,
       item:"playwright",
    },
 headers: {
   Authorization: `Bearer ${user.getAccessToken()}`,
},
    
   });
    }
}
