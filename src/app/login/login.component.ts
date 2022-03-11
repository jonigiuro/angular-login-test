import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService
  ) { }
  
  loginForm = new FormGroup({
    email: new FormControl('', {
        validators: Validators.compose([ Validators.required, Validators.email]),
        updateOn: 'submit'
      },
    ),
    password: new FormControl('', {
      validators: Validators.required,
      updateOn: 'submit'
    })
  })

  orphan_errors: string[] = []

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loginForm.markAllAsTouched()
    if(this.loginForm.valid) {
      const user = this.userService.checkCredentials({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })

      if(user) {
        this.orphan_errors = []
        this.showMessage(`Welcome, ${user.email}`);
      } else {
        this.orphan_errors = ['Please enter a valid email and password']
      }
    }
  }

  showMessage(message: string) : void {
    alert(message)
  }
}
