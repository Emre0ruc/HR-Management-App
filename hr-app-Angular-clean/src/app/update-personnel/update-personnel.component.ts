import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FormControl,FormGroup, ReactiveFormsModule } from "@angular/forms";

import { Personnel } from "../models/personnel.mode";
import { ConfirmationComponent } from "../shared/confirmation/confirmation";


@Component({
    selector: "app-update-personnel",
    templateUrl: "update-personnel.component.html",
    styleUrl: "update-personnel.component.css",
    standalone: true,
    imports: [FormsModule, ConfirmationComponent, ReactiveFormsModule]
})

export class UpdatePersonnelComponent implements OnInit{
    @Output() cancel = new EventEmitter<void>();
    @Output() update = new EventEmitter<Personnel>();
    @Input({required : true}) personnel !: Personnel;

    form = new FormGroup({
        name :  new FormControl(''),
        surname : new FormControl(''),
        id: new FormControl(''),
        salary: new FormControl(0)
    });

    ngOnInit() {
        this.form.patchValue({
            name: this.personnel.name,
            surname: this.personnel.surname,
            id: this.personnel.id,
            salary: this.personnel.salary
        });
    }
    isShowConfirmation = false;

    onCancelUpdating(){
        this.cancel.emit();
    }

    onShowConfirmation(){
        this.isShowConfirmation = true;
    }

    onCancelConfirmation(){
        this.isShowConfirmation = false;
    }
    
    onConfirmConfirmation(){
        this.isShowConfirmation = false;   
        this.update.emit(this.form.value as Personnel);
    }

}