import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this.authService.logOut().subscribe({
      next: (res)=>{
        this.router.navigate(['/auth']);
      },
      error: (error)=>{
        console.log('Error al cerrar la sesión ', error);
      }
    })
  }

}
