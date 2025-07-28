import { Component, Output, EventEmitter } from "@angular/core";
import { LogoutComponent } from "../logout/logout.component";

@Component({
    selector: "header-app",
    standalone: true,
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.css",
    imports: [LogoutComponent]
})

export class HeaderComponent{
    
}