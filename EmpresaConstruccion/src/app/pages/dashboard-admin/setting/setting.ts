import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class SettingAdmin {
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    mail: new FormControl(),
    password_hash: new FormControl(),
  });
}
