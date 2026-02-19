import { ConstructionService } from '../../../../core/services/constructions-service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-construction',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-construction.html',
  styleUrl: './edit-construction.css',
})
export class Editconstruction {

  constructionService = inject(ConstructionService);
  route = inject(ActivatedRoute);
  // inyectamos ActivateRoute para leer el id que viene en la URL
  router = inject(Router);
  // inyectamos Router para poder redirigir después de actualizar

  id_constructions!: string;
  // guardamos id de la construccion

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    latitude: new FormControl(null,),
    longitude: new FormControl(null),
    status: new FormControl('active')
  });

  async ngOnInit() {
    this.id_constructions = this.route.snapshot.paramMap.get('id_constructions')!;
    console.log(this.id_constructions)
    // obtener id desde URL

    try {
      const construction = await this.constructionService.getConstructionByUserId(Number(this.id_constructions));
      this.form.patchValue(construction);
      
    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'Could not load construction data',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }


  }

  async onSubmit() {
    try {
      await this.constructionService.update(this.id_constructions, this.form.value);

      Swal.fire({
        title: 'Updated!',
        text: 'construction updated sucessfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    } catch (error) {
      Swal.fire({
        title: 'Mistake!',
        text: 'There was a problem updating the construction',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }


}
