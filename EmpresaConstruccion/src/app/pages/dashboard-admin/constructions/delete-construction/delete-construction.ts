import { IConstruction } from '../../../../interfaces/iconstruction';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstructionService } from '../../../../core/services/constructions-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-construction',
  imports: [ReactiveFormsModule],
  templateUrl: './delete-construction.html',
  styleUrl: './delete-construction.css',
})
export class Deleteconstruction {
  router = inject(Router);
  //route = inject(ActivatedRoute);
  constructionService = inject(ConstructionService);

  // lista usuarios
  ArrayConstructions = signal<IConstruction[]>([]);
  // usuario seleccionado
  selectedConstruction = signal<IConstruction | null>(null);


  form: FormGroup = new FormGroup({
    selectedConstruction: new FormControl()
  });


  async ngOnInit() {

    try {

      const constructions = await this.constructionService.getAll();

      this.ArrayConstructions.set(constructions);

    } catch (error) {

      Swal.fire({
        title: 'Mistake!',
        text: 'Could not load constructions',
        icon: 'error',
        confirmButtonText: 'Ok',
      });

    }

  }


  async onconstructionSelect(event: any) {

    const id = Number(event.target.value);

    const construction = this.ArrayConstructions().find(
      construction => construction.id_constructions === id
    );

    if (construction) {
      this.selectedConstruction.set(construction);
    }

  }

  async onSubmit() {

    if (!this.selectedConstruction()) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to deactivate this construction!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deactivate it!',
    });

    if (result.isConfirmed) {

      try {

        await this.constructionService.delete(this.selectedConstruction()!.id_constructions?.toString()!);

        await Swal.fire({
          title: 'Deactivated!',
          text: 'construction deactivated successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });

        this.router.navigate(['/dashboard_admin']);

      } catch (error) {

        Swal.fire({
          title: 'Mistake!',
          text: 'There was a problem deactivating the construction',
          icon: 'error',
          confirmButtonText: 'Ok',
        });

      }

    }

  }

}