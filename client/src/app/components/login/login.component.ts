import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateform';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup; 
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router){ }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })

  }
  hideShowPass(){
    this.isText =!this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onSubmit(){
    if (this.loginForm.valid) {
      // Send the form data to the server
      this.http.post('http://localhost:5000/api/login', this.loginForm.value)
        .subscribe(
          response => {
          console.log(response); 
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          const errorMessage = error.error.message; // Assuming the error response has a "message" property
          alert(errorMessage); // Show the error message in an alert
        }
        );
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your Form is invalid");
    }
  }
}  
