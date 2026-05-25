import { APIRequestContext, Page } from "@playwright/test";
import TodoApi from "../apis/todoApi";
import User from "../models/user";
// Note : each page should be contain : 1. Constructor 2. Elements 3. Methods or Steps 
export default class{
private page:Page;
private request?:APIRequestContext;
// Constructor 
constructor(page:Page,request?:APIRequestContext){
    this.page=page;
    this.request= request;
}
//Elements 
private get newTodoInput(){return '[data-testid="new-todo"]';}
private get newTodoSubmit(){return '[data-testid="submit-newTask"]';}

//methods 
async load (){
     await this.page.goto("/todo/new")
     return this;
}

async addNewTask(todo :string){
  await this.page.locator(this.newTodoInput).fill(todo);
  await this.page.locator(this.newTodoSubmit).click(); 
}
async addTdodUsingAPI(user:User){
     new TodoApi(this.request!).addTodo(user);

}
}