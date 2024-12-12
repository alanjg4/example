import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimeDisplayComponent } from './time-display/time-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TimeDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  //List of tasks and tasks completed count
  tasks: string[] = [];
  tasksCompletedNow: number = 0;
  tasksCompletedEver: number = 0;

  timeLeft: number = 1500; 
  interval: any;
  timerRunning: boolean = false;

  ngOnInit() {
    // Gets tasks stored locally
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

  //Prompt user to input their task
  promptUser(){
    const input = window.prompt('Please enter your task: \nEx: Hw 2');
    if (input !== null) {
      this.addTask(input);
    }
  }

  //Function called when user clicks the complete button which updates the number of tasks completed approriately
  completeTask(i: number){
    this.tasks.splice(i, 1);
    this.tasksCompletedNow += 1;
    this.tasksCompletedEver += 1;
    this.saveTasks();
    this.saveCount();
  }

  //Function called when user wants to delete the spedified task
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
//Function to start the timer until countdown finished, then alert user timer is finished and reset the timer
  startTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.timerRunning = true;
    this.interval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      if (this.timeLeft === 0) {
        clearInterval(this.interval);
        alert("Time's up!");
        this.resetTimer();
      }
    }, 1000);
  }
//Stop the timer at its current time
  stopTimer() {
    clearInterval(this.interval);
    this.timerRunning = false;
  }

  resetTimer() {
    clearInterval(this.interval);
    this.timeLeft = 1500;
    this.updateTimerDisplay();
    this.timerRunning = false;
  }
//Update the current time that is displayed
  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const timerElement = document.getElementById('pomo');
    if (timerElement) {
      timerElement.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }
  }
}
