export class User{
    
    id: number;
    name: string;
    login:string;
    role: string;
    password:string;
    email: string;
    image: string;

    constructor(user: User){
        this.id = user.id;
        this.name = user.name;
        this.login = user.login;
        this.role = user.role;
        this.password = user.password;
        this.email = user.email;
        this.image = user.image;
    }
}