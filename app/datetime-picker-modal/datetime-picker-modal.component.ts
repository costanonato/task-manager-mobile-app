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
    if(this.modalParams.context && this.modalParams.context.preSelectedDatetime){
      this.preSelectedDatetime = this.modalParams.context.preSelectedDatetime;
    }else{
      this.preSelectedDatetime = new Date();
    }
  }


  public ngOnInit(){
    this.setDatePicker();
    this.setTimePicker();
  }


  public setDatePicker(){
    this.datePicker = <DatePicker>this.page.getViewById<DatePicker>('datePicker');

    this.datePicker.height = 170;
    this.datePicker.year = this.preSelectedDatetime.getFullYear();
    this.datePicker.month = this.preSelectedDatetime.getMonth() + 1;
    this.datePicker.day = this.preSelectedDatetime.getDate();
  }


  public setTimePicker(){
    this.timePicker = <TimePicker>this.page.getViewById<TimePicker>('timePicker');

    this.timePicker.height = 170;
    this.timePicker.hour = this.preSelectedDatetime.getHours();
    this.timePicker.minute = this.preSelectedDatetime.getMinutes();
  }


  public sendNewDateTime(){
    let newDateTime: Date = new Date(
      this.datePicker.year,
      this.datePicker.month -1,
      this.datePicker.day,
      this.timePicker.hour,
      this.timePicker.minute
    )

    this.modalParams.closeCallback(newDateTime);
  }
}