import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //List of tasks
  tasks: string[] = [];
  tasksCompletedNow: number = 0;
  tasksCompletedEver: number = 0;

  ngOnInit() {
    // Gets
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
    this.tasks = JSON.parse(savedTasks);
    }
    const savedTasksComp = localStorage.getItem('tasksComp');
    if (savedTasksComp) {
    this.tasksCompletedEver = JSON.parse(savedTasksComp);
    }
  }
  title = "example";

  //Function to add tasks to List
  addTask(newTask: string){
    if (newTask.trim() != ""){
      this.tasks.push(newTask.trim());
    }
    this.saveTasks();
  }

  promptUser(){
    const input = window.prompt('Please enter your task: \nEx: Hw 2');
    if (input !== null) {
      this.addTask(input);
    }
  }

  completeTask(i: number){
    this.tasks.splice(i, 1);
    this.tasksCompletedNow += 1;
    this.tasksCompletedEver += 1;
    this.saveTasks();
    this.saveCount();
  }

  deleteTask(i: number){
    this.tasks.splice(i, 1);
    this.saveTasks();
    this.saveCount();
  }

  //Function to save tasks locally
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  private saveCount(){
    localStorage.setItem('tasksComp', JSON.stringify(this.tasksCompletedEver));
  }
}
