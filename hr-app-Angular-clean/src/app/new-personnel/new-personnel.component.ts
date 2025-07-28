import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { Personnel } from "../models/personnel.mode";
import { ConfirmationComponent } from "../shared/confirmation/confirmation";

@Component({
    selector: "app-new-personnel",
    standalone: true,
    templateUrl: "new-personnel.component.html",
    styleUrl: "new-personnel.component.css",
    imports: [FormsModule, ConfirmationComponent]
})

export class NewPersonnelComponent{
    @Output() cancel = new EventEmitter<void>();
    @Output() submit = new EventEmitter<Personnel>();

    isShowConfirmation = false;

    enteredPersonnel : Personnel = {
        id : "",
        name : "",
        surname : "",
        salary : 0
    };

    onCancelAdding(){
        this.cancel.emit();
    }

    onShowConfirmation(){
        this.isShowConfirmation = true;
    }

    onCancelConfirmation(){
        this.isShowConfirmation = false;
    }

    onConfirmConfirmation(){
        this.submit.emit({...this.enteredPersonnel});
        this.isShowConfirmation = false;
    }
}