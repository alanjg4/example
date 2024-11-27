import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  //List of tasks
  tasks: string[] = [];
  
  title = "example";

  //Function to add tasks to List
  addTask(newTask: string){
    
    if (newTask.trim() != ""){
      this.tasks.push(newTask.trim())
    }
  }
}
