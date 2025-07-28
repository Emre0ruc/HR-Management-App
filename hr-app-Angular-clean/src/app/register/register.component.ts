import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { UserService } from "../user.service";
import { checkEmailNotTaken } from "../validators/email.validator";
import { WarningBoxComponent } from "../shared/warning-box/warning-box.component";

@Component({
    selector : "app-register",
    templateUrl : "./register.component.html",
    styleUrl: "./register.component.css",
    standalone : true,
    imports: [ReactiveFormsModule, WarningBoxComponent]
})

export class RegisterComponent implements OnInit{
    registerForm !: FormGroup;
    isShowRegisteredMessage = false;
    messageRegistered = "Successful!";
    explanationRegistered = "You're registered!";

    constructor(private router : Router, private userService : UserService, private formBuilder : FormBuilder) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email], [checkEmailNotTaken(this.userService)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confirmPassword: ['', Validators.required],
            terms: [false, Validators.requiredTrue]}, 
            {
                validators: this.passwordsMatchValidator 
            });
    }

    passwordsMatchValidator(form : AbstractControl){
        const password = form.get("password")?.value;
        const confirmPassword = form.get("confirmPassword")?.value;
        return password === confirmPassword ? null : {passwordsMismatch : true}
    }

    get email() { return this.registerForm.get('email')!; }
    get password() { return this.registerForm.get('password')!; }
    get confirmPassword() { return this.registerForm.get('confirmPassword')!; }
    get terms() { return this.registerForm.get('terms')!; }

    onRegister() {
        if (this.registerForm.invalid) return;    
        const { email, password } = this.registerForm.value;
        this.userService.registerUser({ email, password }).subscribe(() => {
            this.isShowRegisteredMessage = true;
        });
    }
    goToLogin(){
        this.router.navigate(['/login']);
    }

    onOkay(){
        this.isShowRegisteredMessage = false;
        this.router.navigate(['/login']);
    }
}