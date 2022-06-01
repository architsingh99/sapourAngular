import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AppService} from './../app.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  formData: FormGroup;

	constructor(public appService: AppService, public router: Router, public cd: ChangeDetectorRef) {
		this.formData = new FormGroup({
			email: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required])
		})
	 }

	 ngOnInit(): void {
		this.reloadPage();
	  }

	  reloadPage() {
		//window.location.reload();
	 }

	ngAfterViewInit() { 
		
	}

	async onSubmit() {
		if(this.formData.invalid) {
			Swal.fire('Error', "Kindly fill up the required fields.", 'error');
		}
		else {
			let status = await this.appService.register({
				email: this.formData.value.email,
				password: this.formData.value.password,
        name: this.formData.value.name,
        phone: this.formData.value.phone
			}).toPromise().then((res: any) => {
				console.log("res :: ", res)
        Swal.fire('Success', res.status_message, 'success');
					return true;
			},
			err => {
				console.log("err :: ", err)
				Swal.fire('Error', err.error.err, 'error');
				return false;
		  })
      console.log("status : ", status)
		  if(status)
		  	{
          this.router.navigate(['/login'])
        }
		}
	}
}
