import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { User, UserLog } from '../../interfaces/user.interface';
import { ToastService } from 'src/app/ngBootstrap/services/toast.service';
import { Toast } from 'src/app/ngBootstrap/interfaces/Toast.interface';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userlog!: UserLog;
  userAuth!: User;
  messageError?: string;
  showDanger: boolean = false;
  showLoad: boolean = false;
  isFocusError: boolean = false;
  toast: Toast = {
    text: 'mensaje editable',
    classname: '',
    delay: 3000,
    icon: 'fa-solid fa-bell'
  }

  formLogin: FormGroup = this.formBuilder.group({
    user: [, [Validators.required]],
    pass: [, [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastService: ToastService) {
    // authService.isLoguinUser()
    //   .subscribe(result=>{
    //     if (result) {
    //       this.showToast({text: 'Validado con exito', classname: 'bg-success text-light', delay: this.toast.delay, icon: this.toast.icon})
    //       setTimeout(() => {
    //         router.navigate(['/control-equipos']);
    //       }, 1000);
    //     }
    //   })

  }

  ngOnInit(): void {
    this.formLogin.reset();
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }

  showToast(toastShow: Toast):void{
    this.toast = toastShow;
    this.toastService.show(this.toast);
  }

  get isFormValid(): boolean{
    return this.formLogin.invalid
  }

  isFieldValid(name: string){
    // this.messageError = `El campo ${campo} es requerido`;
    // var name: string = e.target.name;
    return (this.formLogin.get(name)?.touched && !this.formLogin.get(name)?.value);
  }

  login(){
    this.userlog = this.formLogin.value;

    if (!this.userlog) {
      this.showToast({text: 'Error al iniciar sesion.', classname: 'bg-danger text-light', delay: this.toast.delay, icon: 'fa-solid fa-triangle-exclamation'});
      return;
    }

    this.showLoad = true;
    // this.showDanger = false;

    this.authService.logIn(this.userlog).subscribe(
      {
        next: (res)=>{
          // this.showToast({text: 'Validado con exito', classname: 'bg-success text-light', delay: this.toast.delay, icon: this.toast.icon});
          this.toastService.succes('Validado con exito');
          this.userAuth = res;
          // this.router.navigateByUrl('/control-equipos');
          this.showLoad = false;
        },
        error: (error)=>{
          this.showToast({text: 'Error al iniciar sesion.', classname: 'bg-danger text-light', delay: this.toast.delay, icon: 'fa-solid fa-triangle-exclamation'});
          console.log(JSON.stringify(error));
          // this.showDanger = true;
          this.showLoad = false;
        },
      }
    )


  }
}
