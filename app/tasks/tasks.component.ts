import { Component } from "@angular/core";

@Component({
  selector: "tasks",
  moduleId: module.id,
  templateUrl: "tasks.component.html"
})

export class TasksComponent{
  public tasks: Array<any> = [];
  public icons: Map<string, string> = new Map<string, string>();

  public constructor(){
    this.tasks = [
      { id: 1, title: "Comprar Notebook Novo", done: false },
      { id: 2, title: "Lavar o carro", done: false },
      { id: 3, title: "Assitir série XYZ", done: false },
      { id: 4, title: "Estudar NativeScript", done: true },
      { id: 6, title: "Comprar Notebook Novo", done: false },
      { id: 7, title: "Lavar o carro", done: false },
      { id: 8, title: "Assitir série XYZ", done: false },
      { id: 9, title: "Estudar NativeScript", done: true },
      { id: 10, title: "Comprar Notebook Novo", done: false },
      { id: 11, title: "Lavar o carro", done: false },
      { id: 12, title: "Assitir série XYZ", done: false },
      { id: 13, title: "Estudar NativeScript", done: false },
      { id: 14, title: "Comprar Notebook Novo", done: false }
    ]

    this.setIcons();
  }

  public checkboxIcon(task){
    if(task.done)
      return this.icons.get('checked');
    else
      return this.icons.get('unchecked');
  }


  private setIcons(){
    this.icons.set('trash', String.fromCharCode(0xf014));
    this.icons.set('add', String.fromCharCode(0xf055));
    this.icons.set('checked', String.fromCharCode(0xf14a));
    this.icons.set('unchecked', String.fromCharCode(0xf096));
  }
}