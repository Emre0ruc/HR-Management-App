import { Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector:"app-warning-box",
    templateUrl: "warning-box.component.html",
    styleUrl: "warning-box.component.css",
    standalone: true,
    imports: []
})

export class WarningBoxComponent{
    @Input({required : true}) message !: string;
    @Input({required: true}) explanation !: string;

    @Output() okayWarning = new EventEmitter<void>();

    onOkayWarning(){
        console.log("Emitted");
        this.okayWarning.emit();
    }
}