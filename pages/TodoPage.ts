// Note : each page should be contain : 1. Constructor 2. Elements 3. Methods or Steps 

import { APIRequestContext, Page } from "@playwright/test";
import TodoApi from "../apis/todoApi";
import User from "../models/user";

export default class TodoPage{
private page:Page;

// Constructor 
constructor(page:Page){
    this.page=page;
}
//Elements 
private get addTodo(){return '[data-testid="new-todo"]';}
private get submitNewTodo(){return '[data-testid="submit-newTask"]';}
private get completeTask(){return '[data-testid="complete-task"]';}
private get welcomeMessage(){return '[data-testid="welcome"]';}
private get deleteIcon(){return '[data-testid="delete"]';}
private get noTodo(){return '[data-testid="no-todos"]';}
private get todoItemText(){return '[data-testid="todo-item"]';}
//Methods
async load(){
    await this.page.goto("/todo");
    
}
getWelcomeMessage(){
    return this.page.locator('[data-testid="welcome"]');
}
async deleteTodoByIndex(index:number){
     await this.page.locator(this.deleteIcon).nth(index).click();
    
}
getNoTodoMessage(){
    return this.page.locator(this.noTodo);
}
async getTodoItemByText(index:number){
    return await this.page
  .locator(this.todoItemText)
  .nth(index)
  .innerText();
}

}
