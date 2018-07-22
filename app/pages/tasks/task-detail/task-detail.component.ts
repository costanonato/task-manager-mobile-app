import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

import { switchMap } from "rxjs/operators";

import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";

import { DateTimePickerModalComponent } from "../../datetime-picker-modal/datetime-picker-modal.component"

import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  moduleId: module.id,
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
  public form: FormGroup;
  public task: Task;


  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ){
    this.form = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null],
      done: [null],
      description: [null]
    })
  }


  public ngOnInit(){
    this.task = new Task(null, null);
    
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.taskService.getById(+params.get('id')))
    )
    .subscribe(
      task => this.setTask(task),
      error => alert("Ocorreu um no servidor, tente mais tarde.")
    )
  }


  public setTask(task: Task): void {
    this.task = task;
    this.form.patchValue(task);
  }


  public updateTask(){
    this.task.title = this.form.get('title').value;
    this.task.deadline = this.form.get('deadline').value;
    this.task.done = this.form.get('done').value;
    this.task.description = this.form.get('description').value;

    this.taskService.update(this.task)
      .subscribe(
        () => alert("Tarefa atualizada com sucesso!"),
        () => alert("Ocorreu um no servidor, tente mais tarde.")
      )
  }


  public showDatetimePickerModal(){
    let modalOptions: ModalDialogOptions = {
      fullscreen: false,
      viewContainerRef: this.vcRef,
      context: {
        preSelectedDatetime: this.getFormDeadLineToDate(),
      }
    };

    this.modalService.showModal(DateTimePickerModalComponent, modalOptions)
      .then(newDeadLine => this.setNewDeadline(newDeadLine));
  }

  
  public getFormDeadLineToDate(){
    let deadline = this.form.get("deadline").value;

    if(deadline){
      let [date, time] = deadline.split(" ");
      let [day, month, year] = date.split("/");
      let [hours, minutes] = time.split(":");

      return new Date(year, month - 1, day, hours, minutes);
    }
  }

  public setNewDeadline(newDeadline: Date){
    if(newDeadline){
      let formatedDeadline = `${newDeadline.getDate()}/${newDeadline.getMonth() + 1}/${newDeadline.getFullYear()}`;
      formatedDeadline += ` ${newDeadline.getHours()}:${newDeadline.getMinutes()}`;
  
      this.form.patchValue({deadline: formatedDeadline});
    }
  }
}
