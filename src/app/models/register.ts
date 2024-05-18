export class RegisterModel{
    private username!:String;
    private password!:String;
    private fullName!:String;
    private role!:String;

    public setUsername(username:String){
        this.username = username;
    }

    public setPassword(password:String){
        this.password = password;
    }

    public setFullName(fullName:String){
        this.fullName = fullName;
    }

    public setRole(role:String){
        this.role = role;
    }
}