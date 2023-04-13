import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/login-inerfaces';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { sha256 } from 'js-sha256';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import {url} from "../../../models/general.interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<boolean>();
  returnUrl: string = "/";
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}
  loginForm!: FormGroup;
  user: User|any = {
    username: "",
    password: ""
  }
  ngOnInit(): void {
    this.initFilterForm();
  }
  initFilterForm(): void {
    this.loginForm = this.fb.group({
      username: "",
      password: ""
    });
  }
  registerUser(){
    this.redirectTo('/register');
  }
  redirectTo(uri:string, additionalInfo?: string, username?: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
  clickButton() {
    Object.keys(this.user).forEach( item => {
      this.user[item] = this.loginForm.get(item)?.value;
    })
    this.authenticationService.login(this.user)
    .pipe(first())
    .subscribe(
        data => {
          if(data) {
            if(data.account.password === this.user.password) {
              console.log("COINCIDEN")
              this.redirectTo('/home-page');
              window.location.href = url
            }
            else {
              this.snackBar.open("Contraseña incorrecta", "Ok")
            }
            
          }
        },
        error => {
          this.snackBar.open("No existe cuenta registrada con ese usuario", "Ok")
            this.alertService.error(error);
            this.loading = false;
        });
  }
}
