import { Component, Output, EventEmitter, Input} from "@angular/core";
import { FormsModule } from "@angular/forms";

import { ConfirmationComponent } from "../shared/confirmation/confirmation";
import { Personnel } from "../models/personnel.mode";
import { WarningBoxComponent } from "../shared/warning-box/warning-box.component";

@Component({
    selector : "app-remove-personnel",
    standalone: true,
    templateUrl: "remove-personnel.component.html",
    styleUrl: "remove-personnel.component.css",
    imports: [FormsModule, ConfirmationComponent, WarningBoxComponent]
})

export class RemovePersonnelComponent{
    @Output() cancelRemoving = new EventEmitter<void>();
    @Output() confirmRemoving = new EventEmitter<string>();
    @Input({required : true}) isShowWarningBoxOnRemove !: boolean; 

    isShowConfirmation = false;
    isShowWarning = false;
    personnel !: Personnel;
    enteredId = "";

    messageWarningBox = "Warning!";
    explanationWarningBox = "There is no such personnel ID!";

    onCancelRemoving(){
        this.cancelRemoving.emit();
    }

    onCancelRemoveConfirmation(){
        this.isShowConfirmation = false;
    }

    onConfirmRemoveConfirmation(){
        this.confirmRemoving.emit(this.enteredId);
        this.isShowConfirmation = false;
        if(this.isShowWarningBoxOnRemove){
            this.isShowWarning = true;
        }
    }

    onShowConfirmationBox(){
        this.isShowConfirmation = true;
    }

    onOkayWarning(){
        this.isShowWarning = false; 
        this.isShowConfirmation = false;
    }
}