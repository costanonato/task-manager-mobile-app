import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
import { TimePicker } from "ui/time-picker";

@Component({
  moduleId: module.id,
  templateUrl: "./datetime-picker-modal.component.html"
})

export class DateTimePickerModalComponent implements OnInit{

  public preSelectedDatetime: Date;
  public datePicker: DatePicker;
  public timePicker: TimePicker;

  public constructor(private modalParams: ModalDialogParams, private page: Page){
    
  }

  public ngOnInit(){

  }

}