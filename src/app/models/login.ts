export class LoginModel{
    private username!:String;
    private password!:String;

    public setUserName(username:String){
        this.username = username;
    }

    public setPassword(password:String){
        this.password = password;
    }
}