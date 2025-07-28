import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Personnel } from "../models/personnel.mode";


@Component({
    selector: "personnel-app",
    standalone: true,
    templateUrl: "./personnel.component.html",
    styleUrl: "./personnel.component.css"
})

export class PersonnelComponent{
    @Input({required: true}) test_personnel !: Personnel;
    @Output() select = new EventEmitter<Personnel>();
    
    onSelectPersonnel(){
        this.select.emit(this.test_personnel);
    }
}