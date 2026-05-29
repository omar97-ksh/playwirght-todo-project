import {test,expect} from "@playwright/test";
import { faker } from "@faker-js/faker";
import User from "../models/user";
import UserApi from "../apis/userApi";
import TodoApi from "../apis/todoApi";
import TodoPage from "../pages/TodoPage";
import RegisterPage from "../pages/RegisterPage";
import NewTodoPage from "../pages/NewTodoPage";
test.describe("add new todo ",()=>{

test("should be able to add new todo ",async({page,request,context})=>{
// CREATE USER 
    
    const user = new User() ;   
//Register using API
  const register=new RegisterPage(page,request,context);
  await  register.registerUsingTheAPI(user);
  const newTodopage = new NewTodoPage(page);
  (await
     newTodopage
    .load())
    .addNewTask("playwright");
    const todopage= new TodoPage(page);
    todopage.getTodoItemByText(0);
    const todoText= await todopage.getTodoItemByText(0);
  expect(todoText).toEqual("playwright");
})
//// DELETE SECTION 
test("Should be able to delete a todo ",async({page,request,context})=>{
    //create user 
        const user = new User();   
// signup using api 
const register=new RegisterPage(page,request,context);
  await  register.registerUsingTheAPI(user);

    // Add totdo Using Api 
     const newTodoPage = new NewTodoPage(page,request)
      await newTodoPage.addTdodUsingAPI(user);
     const todoPage =new  TodoPage(page); 
     await todoPage.load();
    
    // delete todo 
   await todoPage.deleteTodoByIndex(0);
   const noTodoMessgae = todoPage.getNoTodoMessage();
    await expect(noTodoMessgae).toBeVisible();

})

})