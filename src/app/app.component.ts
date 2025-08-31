import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomInputComponent } from "./custom-input/custom-input.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'login';
}
