import { Injectable, TemplateRef } from '@angular/core';
import { Toast } from '../interfaces/Toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];
  constructor() { }

  show(toastNew: Toast){
    this.toasts.push(toastNew);
  }

  remove(toast: any): Toast[]{
    // console.log('Before Arreglo ', this.toasts);
    return this.toasts = this.toasts.filter((t)=>t!==toast);
  }

  succes(text: string, delay: number = 3000, icon: string = 'fa-solid fa-bell'){
    const toast: Toast = {
      text: text,
      classname: 'bg-success text-light',
      delay: delay,
      icon: icon,
    }

    this.toasts.push({...toast});
  }

  clear(){
    this.toasts.splice(0, this.toasts.length);
  }

}
