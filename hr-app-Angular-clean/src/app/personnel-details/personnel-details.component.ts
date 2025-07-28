import { Component, Input } from "@angular/core";
import { Personnel } from "../models/personnel.mode";

@Component({
    selector: "app-personnel-details",
    standalone: true,
    templateUrl: "personnel-details.component.html",
    styleUrl: "personnel-details.component.css"
})

export class PersonnelDetailsComponent{
    @Input({required: true}) personnelDetails !: Personnel;
    @Input({required : true}) keepShowingPeronnelDetails !: boolean;
}