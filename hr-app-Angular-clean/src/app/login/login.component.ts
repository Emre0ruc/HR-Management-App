import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from "@angular/forms";

import { User } from "../models/user.model";
import { UserService } from "../user.service";
import { WarningBoxComponent } from "../shared/warning-box/warning-box.component";

@Component({
    selector: "app-login",
    templateUrl : "login.component.html",
    styleUrl: "login.component.css",
    imports: [FormsModule, ReactiveFormsModule, WarningBoxComponent]
})

export class LoginComponent implements OnInit{
    loginForm !: FormGroup;
    loginFailed = false;
    messageLoginFailed = "";
    explanationLoginFailed = "Email or password is not correct"

    constructor(private router: Router, private userService : UserService, private formBuilder : FormBuilder) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email : ['', [Validators.email, Validators.required] ],
            password : ['', [Validators.required]]
        });
    }

    get email(){return this.loginForm.get("email")!};
    get password(){return this.loginForm.get("password")!};

    user !: User;

    onLogin() {
        this.user = { ...this.loginForm.value };

        this.userService.checkUser(this.user).subscribe({
            next: (response) => {
                if (response.foundUser) {
                    localStorage.setItem('token', 'loggedIn');
                    this.router.navigate(['/dashboard']);

                } else {
                this.loginFailed = true;
                }
            },
            error: (err) => {
                console.error('Login check failed', err);
                this.loginFailed = true;
            }
        });
    }

    onRegister(){
        this.router.navigate(['/register']);
    }

    onOkay(){
        this.loginFailed = false;
    }
}

