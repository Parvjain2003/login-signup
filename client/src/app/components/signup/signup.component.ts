import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router)
    { }

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstName : ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      userName: ['',Validators.required],
      password: ['',Validators.required]
    })

  }
  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if (this.signUpForm.valid) {
      // Send the form data to the server
      this.http.post('http://localhost:5000/api/register', this.signUpForm.value)
        .subscribe(
          response => {
          console.log(response); 
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
          const errorMessage = error.error.message; // Assuming the error response has a "message" property
          alert(errorMessage); // Show the error message in an alert
        }
        );
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your Form is invalid");
    }
  }
}
