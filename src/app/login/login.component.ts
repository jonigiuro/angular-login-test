import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
        marginBottom: 30
      })),
      state('closed', style({
        height: 0,
        opacity: 0,
        marginBotton: 0
      })),
      transition('open => closed', [
        animate('.15s')
      ]),
      transition('closed => open', [
        animate('.15s')
      ]),
    ]),
    trigger('swipeIn', [
      state('shown', style({
        transform: 'translateX(0px)',
        opacity: 1,
      })),
      state('hidden', style({
        transform: 'translateX(-10px)',
        opacity: 0,
      })),
      transition('shown => hidden', [
        animate('.15s')
      ]),
      transition('hidden => shown', [
        animate('.15s')
      ]),
    ]),
  ],
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
    this.orphan_errors = []
    if(this.loginForm.valid) {
      const user = this.userService.checkCredentials({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })

      if(user) {
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
