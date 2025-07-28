import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PersonnelService } from '../personnel.service';
import { UpdatePersonnelComponent } from "../update-personnel/update-personnel.component";
import { WarningBoxComponent } from "../shared/warning-box/warning-box.component";
import { HeaderComponent } from '../header/header.component';
import { PersonnelListComponent } from "../personnel-list/personnel-list.component";
import { PersonnelDetailsComponent } from "../personnel-details/personnel-details.component";
import { Personnel } from '../models/personnel.mode';
import { NewPersonnelComponent } from "../new-personnel/new-personnel.component";
import { RemovePersonnelComponent } from '../remove-personnel/remove-personnel.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, FormsModule, PersonnelListComponent, 
    PersonnelDetailsComponent, NewPersonnelComponent, RemovePersonnelComponent, 
    WarningBoxComponent, UpdatePersonnelComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit{
  personnels: Personnel[] = []; 
  personnelDetailsapp !: Personnel;
  
  constructor(private personnelService: PersonnelService) {}

  ngOnInit() {
    this.personnelService.fetchPersonnels(); 
    this.personnelService.getPersonnels().subscribe(data => {
    this.personnels = data; 
    });
  }

  protected title = 'hr-demo-app';

  keepShowingPersonnelDetails = true;
  isAddingPersonnel = false;
  isConfirmingAdding = true;
  isRemovingPersonnel = false;

  isShowPersonnelDetails = true;
  isShowWarningBoxOnRemove = true;
  isShowWarningBoxAfterAdd = false;
  isShowWarningBoxAfterRemove = false;
  isUpdatingPersonnel = false;
  isShowWarningBoxOnUpdating = false;
  isShowWarningAfterUpdate = false;

  onSelectPersonnel2(personnel : Personnel){
    this.personnelDetailsapp = personnel;
    this.keepShowingPersonnelDetails = true;
  }

  onSubmitPersonnel(personnel : Personnel){
    if(personnel.name !== undefined){
      this.personnelService.addPersonnel(personnel).subscribe({
      next: (newPersonnel) => {
        this.isAddingPersonnel = false;
        this.isShowWarningBoxAfterAdd = true;
      },
      error: (err) => {
        console.error('Error adding personnel to backend:', err);
        alert('Backend error occurred while adding!');
      }
    });
    }
  }

  /*onCancel... are used for the first close-button.*/
  onCancelAdding(){
    if(this.isAddingPersonnel === true){
      this.isAddingPersonnel = false;
    }
  }  
  onCancelRemoving(){
    this.isRemovingPersonnel = false;
  }

  /*It is used for  add-button. */
  onAddPersonnel(){
    if(this.isAddingPersonnel === false){
      this.isAddingPersonnel = true;
    }  
  }

  /*It is used for remove-button */
  onRemovePersonnel(){
    this.isRemovingPersonnel = true;
  }

  /*Used after the confirmation of removing. */
  onConfirmRemoveConfirmation(personnelId : string){
    if(this.personnels.find((personnel) => personnel.id === personnelId) != undefined){
      this.personnelService.deletePersonnel(personnelId).subscribe({
        next: () => {
        // BehaviorSubject updates personnels, local this.personnels will update via subscription
          this.isRemovingPersonnel = false;
          this.isShowWarningBoxAfterRemove = true;
        },
        error: err => {
          console.error('Error deleting personnel from backend:', err);
          alert('Backend error occurred while deleting!');
        }
      });
      this.keepShowingPersonnelDetails = false;
      this.isShowWarningBoxOnRemove = false;
    }
    else{
      this.isShowWarningBoxOnRemove = true;
    }
  }

  /*Checks if there is a selected personnel. */
  onUpdatePersonnel(){
    if(this.personnelDetailsapp !== undefined){
      this.isUpdatingPersonnel = true;      
    } else{
      this.isShowWarningBoxOnUpdating = true;
    }
  }

  /*Cancel button */
  onCancelUpdating(){
    this.isUpdatingPersonnel = false;
  }

  /*It does the update for personnel.*/
  onFinalUpdatePersonnel(personnel : Personnel){
    this.personnelService.updatePersonnel(personnel).subscribe({
    next: () => {
      this.isUpdatingPersonnel = false;
      this.isShowWarningAfterUpdate = true;
    },
    error: (err) => {
      console.error('Error updating personnel:', err);
      alert('Backend error occurred while updating!');
    }
    });
  }

  onLogout(){}

  successfulMessage = "Successful!";
  /*Used for the message after personnel has been added.*/
  explanationWarningBoxAfterAdd = "Personnel has been added!";
  /*Used for the message after personnel has been removed. */
  explanationWarningBoxAfterRemove = "Personnel has been removed!";
  /*Used when personnelDetailsapp is undefined*/
  messageWarningBoxOnUpdating = "Warning!";
  explanationWarningBoxOnUpdating = "Please select a user from search bar!";
  /*Used when personnel has been updated */
  explanationWarningBoxAfterUpdate = "Personnel has been updated!";
  onOkayWarning(){/*Closes warning-message boxes. */
    this.isShowWarningBoxAfterAdd = false;
    this.isShowWarningBoxAfterRemove = false;
    this.isShowWarningBoxOnUpdating = false;
    this.isShowWarningAfterUpdate = false;
  }
  
}
