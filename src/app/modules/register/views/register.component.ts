import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { newAccounts } from 'src/app/models/general.interfaces';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUserForm!: FormGroup;
  disabledConfig: boolean = true;
  newUser: newAccounts|any = {
    password: "",
    name: "",
    surname: "",
    direction: "",
    cp: "",
    city: "",
    province: "",
    country: "",
    email: ""
  }
  constructor(   
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private registerService: RegisterService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initFilterForm();
  }
  initFilterForm(): void {
    this.newUserForm = this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      direction: ["", Validators.required],
      cp: ["", Validators.required],
      city: ["", Validators.required],
      province: ["", Validators.required],
      country: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.minLength(8)],
      passwordRepeat: ["", Validators.minLength(8) ]
    });
  }
  registerButton(): void {
    if(this.newUserForm.valid) this.addNewUser();
    else this.showMsgError();
  }
  addNewUser(): void{
    this.getFilterValues();
    if(this.checkIfCorrectData()) {
      this.registerService.getAccounts(this.newUserForm.get("username")?.value, this.newUser).subscribe(
        res =>  {
          //console.log(res)
          this.snackBar.open("Cuenta creada con exito", 'Ok').afterDismissed().subscribe(res => {
            this.goToLogin()
          })
        },
        (error) => this.snackBar.open(error.error.message, 'Ok')
        )
    }
    else{
    this.snackBar.open('La contraseña no es correcta', 'Ok')
    }
  }
  checkIfCorrectData(): boolean {
    return (this.newUserForm.get("password")?.value === this.newUserForm.get("passwordRepeat")?.value)
  }
  getFilterValues(): void {
    Object.keys(this.newUser).forEach((item:string)=> {
      if(item === "email") {
        this.newUser[item] = this.newUserForm.get(item)?.value.split("@");
      }
      else this.newUser[item] = this.newUserForm.get(item)?.value;
    })
    //console.log(this.newUser)
  }
  showMsgError(): void {
    this.snackBar.open("Los campos no son correctos", 'Ok');
  }
  redirectTo(uri:string, additionalInfo?: string, username?: string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri], { queryParams: { password: additionalInfo, username: username}}));
 }
  goToLogin(): void {
    this.redirectTo("/login")
  }
}
