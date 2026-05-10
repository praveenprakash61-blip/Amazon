
export class LoginPage{

constructor (page){

    this.page = page;
    this.usernameinput = page.locator('#user-name');
    this.Passwordinput = page.locator('#password');
    this.loginbutton =page.locator('#login-button'); 

}

async goto(){

    await this.page.goto('https://www.saucedemo.com/');
}


async login(user, pass){
    await this.usernameinput.fill(user);
    await this.Passwordinput.fill(pass);
    await this.loginbutton.click();

}
}




