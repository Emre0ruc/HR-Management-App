import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-confirmation",
    standalone: true,
    templateUrl: "confirmation.html",
    styleUrl: "confirmation.css",
    imports: []
})

export class ConfirmationComponent{
    @Output() cancelConfirmation = new EventEmitter<void>();
    @Output() confirmConfirmation = new EventEmitter<void>();

    onCancelConfirmation(){this.cancelConfirmation.emit();}
    onConfirmConfirmation(){this.confirmConfirmation.emit();}
}