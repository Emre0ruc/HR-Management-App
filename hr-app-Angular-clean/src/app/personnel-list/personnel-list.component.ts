import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { PersonnelComponent } from "../personnel/personnel.component";
import { Personnel } from "../models/personnel.mode";
import { PersonnelService } from "../personnel.service";

@Component({
    selector:"app-personnel-list",
    standalone: true,
    templateUrl:"./personnel-list.component.html",
    styleUrl: "./personnel-list.component.css",
    imports: [CommonModule, FormsModule, PersonnelComponent]
})

export class PersonnelListComponent implements OnInit{
    personnels: Personnel[] = [];    
    @Output() select2 = new EventEmitter<Personnel>();
    searchText = "";

    constructor(private personnelService: PersonnelService) {}

    ngOnInit() {
        this.personnelService.getPersonnels().subscribe(data => {
            this.personnels = data;
        });
    }

    filteredPersonnel(){
        return this.personnels.filter((personnel) => (personnel.name.toLowerCase() +  " " + personnel.surname.toLowerCase())
        .includes(this.searchText.toLowerCase()));
    }

    onSelectPersonnel(personnel : Personnel){
        this.select2.emit(personnel);
    }
}