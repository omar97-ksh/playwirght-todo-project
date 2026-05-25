// Note : each page should be contain : 1. Constructor 2. Elements 3. Methods or Steps 
import test, { APIRequestContext, BrowserContext, Expect, Page } from "@playwright/test";
import User from "../models/user";
import config from '../playwright.config';
import UserApi from "../apis/userApi";
// define Elemnts private get element_Nameinput (){return 'locater';}

export default class RegisterPage{
//Constructor 
private page:Page;
private context?:BrowserContext;
private request?:APIRequestContext;
constructor(page:Page,request?:APIRequestContext,context?:BrowserContext){
    this.page=page;
    this.request=request;
    this.context=context;
    
}


// Elements 
private get firstNameInput(){return '[data-testid="first-name"]';}
private get lastNameInput(){return '[data-testid="last-name"]';}
private get emailInput(){return '[data-testid="email"]';}
private get passwordInput(){return '[data-testid="password"]';}
private get confirmPasswordInput(){return '[data-testid="confirm-password"]';}
private get submitButton(){return 'button:has-text("SIGNUP")';}


//Methods 

async  load(){
      await this.page.goto("/signup");
      return this;
}

async register( user:User,password:string){
   await this.page.locator(this.firstNameInput).fill(user.getfirstName());  
   await this.page.locator(this.lastNameInput).fill(user.getlastName());
   await this.page.locator(this.emailInput).fill(user.getemail());
   await this.page.locator(this.passwordInput).fill(password);
   await this.page.locator(this.confirmPasswordInput).fill(password);
   await this.page.locator(this.submitButton).click();
}
async registerUsingTheAPI(user:User){
         // Register Uisng API
         const apiRegister=  await new UserApi(this.request!).register(user);
        const responseBody =await apiRegister.json();
        const accessToken=responseBody.access_token;
        const userID= responseBody.userID;
        const firstNmae=responseBody. firstName;

        user.setAccessToken(accessToken);
// SET COOKIE  
     await this.context!.addCookies([
        {
         name:'access_token',
         value:accessToken,
         url:config.use?.baseURL,
         
        },
        {
         name:'userID',
         value:userID,
         url:config.use?.baseURL,
        
        },
        {
         name:'firstName',
         value:firstNmae,
         url:config.use?.baseURL,
        },
    ]);
        
} 
}
