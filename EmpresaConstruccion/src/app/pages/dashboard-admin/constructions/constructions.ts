import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { SiteCard } from './site-card/site-card';
import { IConstruction } from '../../../interfaces/iconstruction';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ConstructionService } from '../../../core/services/constructions-service';

@Component({
  selector: 'app-constructions',
  standalone: true,
  imports: [SiteCard, ReactiveFormsModule],
  templateUrl: './constructions.html',
  styleUrl: './constructions.css',
})
export class Constructions implements OnInit {
  private router = inject(Router);
  private constructionService = inject(ConstructionService);
  private cdr = inject(ChangeDetectorRef); // Refuerzo para la detección de cambios

  // --- OPTIMIZACIÓN: ArrayConstructions ahora es un Signal ---
  arrayConstructions = signal<IConstruction[]>([]);

  registerFrom: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    latitude: new FormControl(null, [Validators.required]),
    longitude: new FormControl(null, [Validators.required]),
    status: new FormControl('active')
  });

  async ngOnInit() {
    await this.loadConstructions();
  }

  async loadConstructions() {
    try {
      const response = await this.constructionService.getAll();
      console.log('Datos cargados:', response);
      
      // Actualizamos el signal con .set()
      this.arrayConstructions.set(response);
      
      // Forzamos el repintado inmediato tras la promesa
      this.cdr.detectChanges(); 
    } catch (error) {
      console.error('Error cargando construcciones:', error);
    }
  }

  async onSubmit() {
    if (this.registerFrom.invalid) {
      Swal.fire('Atención', 'Por favor completa todos los campos obligatorios', 'info');
      return;
    }

    try {
      await this.constructionService.create(this.registerFrom.value);
      
      await Swal.fire({
        title: 'Construction registered!',
        text: 'Construction registered successfully',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      this.registerFrom.reset({ status: 'active' });
      
      // Refrescamos la lista y el signal se encargará de actualizar el DOM
      await this.loadConstructions();

    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'There was a problem creating the project',
        icon: 'error',
      });
    }
  }
}