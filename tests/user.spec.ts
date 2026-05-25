import{test,expect, request }from '@playwright/test';
import{faker} from'@faker-js/faker';
import User from '../models/user';
import RegisterPage from '../pages/RegisterPage';
import TodoPage from '../pages/TodoPage';

test.describe("Register page " ,()=>{

test("Should be able to register to the todo website ",async({page })=>{
// create new user using user model 

   const user = new User();
   const password =user.getpassword();

  const registerPage = new RegisterPage(page);

     (await registerPage
      .load())
     .register(user,password);
     //object from todo page 
     const todopage= new TodoPage(page);
     // Assertion 
    const welcomeMasseage =todopage.getWelcomeMessage();
    await expect(welcomeMasseage).toBeVisible();
})


})