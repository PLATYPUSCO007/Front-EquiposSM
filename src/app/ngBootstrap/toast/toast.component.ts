import { Component, TemplateRef, OnInit } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../services/toast.service';
import { Toast } from '../interfaces/Toast.interface';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbToastModule, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastComponent implements OnInit{


  constructor(private toastService: ToastService) {
  }

  toasts: Toast[] = this.toastService.toasts;

  ngOnInit(): void {
    console.log(this.toasts);
  }

  isTemplate(toast: any):boolean{
    return toast.text instanceof TemplateRef;
  }

  remove(toast: Toast){
    console.log('Remove --> ', toast);

    this.toasts = this.toastService.remove(toast);
  }

}
