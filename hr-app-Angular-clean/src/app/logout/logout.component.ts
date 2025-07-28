import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-logout",
    templateUrl: "logout.component.html",
    styleUrl: "logout.component.css",
    standalone: true,
})

export class LogoutComponent{
    constructor(private router : Router){};
    
    onLogout(){
        localStorage.removeItem("token");
        this.router.navigate(["/login"]);
    }
}