import { Component, OnInit } from '@angular/core';
import { Equipo } from '../interfaces/Equipo';
import { EquiposService } from '../services/equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  equipos: Equipo[] = [];

  constructor(private equipoService: EquiposService) { }

  ngOnInit(): void {
    this.equipoService.getEquipos().subscribe(
      {
        next: (result)=>{
          this.equipos = result;
        },
        error: (error)=>{
          console.error('Error ', error);

        }
      }
    )
  }

}
