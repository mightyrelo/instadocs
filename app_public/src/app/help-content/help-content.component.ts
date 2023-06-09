import { Component, OnInit } from '@angular/core';

import * as html2pdf from 'html2pdf.js';

import { DbTransferService } from '../db-transfer.service';
import { TaskDataService } from '../task-data.service';
import {AuthenticationService} from '../authentication.service'


import { Task } from '../task';

@Component({
  selector: 'app-help-content',
  templateUrl: './help-content.component.html',
  styleUrls: ['./help-content.component.css']
})
export class HelpContentComponent implements OnInit {

  public tasks : Task[];

  public revealActs : boolean = false;

  constructor(
    private dbTransferService: DbTransferService,
    private taskDataService: TaskDataService,
    private authService : AuthenticationService
  ) { }

  public createTasks() : void {
    this.dbTransferService
      .transferTasks()
      .then(rsp => {});
  }

  private getTasks() : void {
    this.taskDataService.getTasks()
      .then(tasks => {
        this.tasks = tasks;
      });
  }

  public deleteTasks() : void {
    for(let i = 0; i < this.tasks.length; i++){
      this.taskDataService.deleteTask(this.tasks[i]._id)
        .then(rsp => {});
    }
  }

  public flagged(taskId: string) : boolean {
    for(let i = 0; i < this.tasks.length; i++){
      if(this.tasks[i]._id == taskId){
        this.tasks[i].flagged = true;
      }
    }
    return false;
  }

  public isFlagged(taskId: string) : boolean {
    for(let i = 0; i < this.tasks.length; i++){
      if(this.tasks[i]._id == taskId){
        if(this.tasks[i].flagged){
          return true;
        } else return false;

      }
    }
  }

  public setFlagOff(taskId: string) : void {
    for(let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i]._id === taskId) {
        this.tasks[i].flagged = false;
      }
    }
  }

  public deleteTask(taskId: string) : void {
    this.taskDataService.deleteTask(taskId)
      .then(response => {if(!response){console.log('deleted');this.getTasks()}});
  }


  public revealActions(taskId: string) : void {
    for(let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i]._id === taskId) {
        this.tasks[i].revealActs = true;
      }
    }
  }

  public hideActions(taskId: string) : void {
    for(let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i]._id === taskId) {
        this.tasks[i].revealActs = false;
      }
    }
  }

  public createPDF() : void {
    const options = {
      filename: `InstaDocs_UserManual.pdf`,
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    };
    const content: Element = document.getElementById('print');
    
    html2pdf()
      .from(content)
      .set(options)
      .save();
  }

  public isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  public getUserName() : string {
    if(this.isLoggedIn())
    {
      const {name} = this.authService.getCurrentUser();
      return name ? name : 'Guest';
    }

    return 'Guest';

  }


  ngOnInit() {
    this.getTasks();
  }

}
