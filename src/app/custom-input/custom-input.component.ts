import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {
  result :number = 0;
  num1 : number = 0;
  num2 : number = 0;
  insert(num:any,event:any){ 
    if(num == 'num1'){
      this.num1 = +event.target.value;
    }else{
      this.num2 = +event.target.value;
    }
  }
  add(){
     this.result = this.num1 + this.num2;
  }
  minus(){
     this.result = this.num1 - this.num2;
  }
  multiply(){
     this.result = this.num1 * this.num2;
  }
  devide(){
     this.result = this.num1 / this.num2;
  }
}
