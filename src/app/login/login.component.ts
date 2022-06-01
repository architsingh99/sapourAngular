import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AppService} from './../app.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  formData: FormGroup;

	constructor(public appService: AppService, public router: Router, public cd: ChangeDetectorRef) {
		this.formData = new FormGroup({
			email: new FormControl("", [Validators.required]),
			password: new FormControl("", [Validators.required])
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
			let status = await this.appService.login({
				email: this.formData.value.email,
				password: this.formData.value.password,
			}).toPromise().then((res: any) => {
				console.log("res :: ", res)
					sessionStorage.setItem('auth', res.token);
					this.cd.detectChanges();
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
          this.router.navigate(['/welcome'])
        }
		}
	}

}
