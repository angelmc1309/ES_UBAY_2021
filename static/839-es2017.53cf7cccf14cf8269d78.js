"use strict";(self.webpackChunkubay=self.webpackChunkubay||[]).push([[839],{3839:function(e,t,r){r.r(t),r.d(t,{RegisterStatusModule:function(){return f}});var n=r(8583),o=r(1841),s=r(4207),i=r(7384),a=r(665),u=r(3928),c=r(1558),l=r(3018),p=r(8903),m=r(9304);let g=(()=>{class e{constructor(e){this.http=e}getAccounts(e,t){return this.http.post(m.H+"account/"+e,t)}}return e.\u0275fac=function(t){return new(t||e)(l.LFG(o.eN))},e.\u0275prov=l.Yz7({token:e,factory:e.\u0275fac}),e})();const d=[{path:"",component:(()=>{class e{constructor(e,t,r,n){this.fb=e,this.snackBar=t,this.registerService=r,this.router=n,this.disabledConfig=!0,this.newUser={password:"",name:"",surname:"",direction:"",cp:"",city:"",province:"",country:"",email:""}}ngOnInit(){this.initFilterForm()}initFilterForm(){this.newUserForm=this.fb.group({name:["",a.kI.required],surname:["",a.kI.required],direction:["",a.kI.required],cp:["",a.kI.required],city:["",a.kI.required],province:["",a.kI.required],country:["",a.kI.required],username:["",a.kI.required],email:["",a.kI.required],password:["",a.kI.minLength(8)],passwordRepeat:["",a.kI.minLength(8)]})}registerButton(){this.newUserForm.valid?this.addNewUser():this.showMsgError()}addNewUser(){var e;this.getFilterValues(),this.checkIfCorrectData()?this.registerService.getAccounts(null===(e=this.newUserForm.get("username"))||void 0===e?void 0:e.value,this.newUser).subscribe(e=>{console.log(e),this.snackBar.open("Cuenta creada con exito","Ok").afterDismissed().subscribe(e=>{this.goToLogin()})},e=>this.snackBar.open(e.error.message,"Ok")):this.snackBar.open("La contrase\xf1a no es correcta","Ok")}checkIfCorrectData(){var e,t;return(null===(e=this.newUserForm.get("password"))||void 0===e?void 0:e.value)===(null===(t=this.newUserForm.get("passwordRepeat"))||void 0===t?void 0:t.value)}getFilterValues(){Object.keys(this.newUser).forEach(e=>{var t,r;this.newUser[e]="email"===e?null===(t=this.newUserForm.get(e))||void 0===t?void 0:t.value.split("@gmail.com"):null===(r=this.newUserForm.get(e))||void 0===r?void 0:r.value}),console.log(this.newUser)}showMsgError(){this.snackBar.open("Los campos no son correctos","Ok")}redirectTo(e,t,r){this.router.navigateByUrl("/",{skipLocationChange:!0}).then(()=>this.router.navigate([e],{queryParams:{password:t,username:r}}))}goToLogin(){this.redirectTo("/login")}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(a.qu),l.Y36(p.ux),l.Y36(g),l.Y36(c.F0))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-register"]],decls:40,vars:1,consts:[[1,"container"],[1,"form"],[3,"formGroup"],["pInputText","","formControlName","name"],["pInputText","","formControlName","surname"],["pInputText","","formControlName","direction"],["pInputText","","formControlName","cp"],["pInputText","","formControlName","city"],["pInputText","","formControlName","province"],["pInputText","","formControlName","country"],["pInputText","","formControlName","username"],["pInputText","","formControlName","email","type","email"],["pInputText","","formControlName","password","type","password"],["pInputText","","formControlName","passwordRepeat","type","password"],["pButton","",3,"click"]],template:function(e,t){1&e&&(l.TgZ(0,"div",0),l.TgZ(1,"h2"),l._uU(2,"Reg\xedstrate"),l.qZA(),l.TgZ(3,"div",1),l.TgZ(4,"form",2),l.TgZ(5,"label"),l._uU(6,"Nombre"),l.qZA(),l._UZ(7,"input",3),l.TgZ(8,"label"),l._uU(9,"Apellidos"),l.qZA(),l._UZ(10,"input",4),l.TgZ(11,"label"),l._uU(12,"Direccion"),l.qZA(),l._UZ(13,"input",5),l.TgZ(14,"label"),l._uU(15,"C\xf3digo Postal"),l.qZA(),l._UZ(16,"input",6),l.TgZ(17,"label"),l._uU(18,"Poblaci\xf3n"),l.qZA(),l._UZ(19,"input",7),l.TgZ(20,"label"),l._uU(21,"Municipio"),l.qZA(),l._UZ(22,"input",8),l.TgZ(23,"label"),l._uU(24,"Pa\xeds"),l.qZA(),l._UZ(25,"input",9),l.TgZ(26,"label"),l._uU(27,"Username"),l.qZA(),l._UZ(28,"input",10),l.TgZ(29,"label"),l._uU(30,"Correo electr\xf3nico"),l.qZA(),l._UZ(31,"input",11),l.TgZ(32,"label"),l._uU(33,"Contrase\xf1a"),l.qZA(),l._UZ(34,"input",12),l.TgZ(35,"label"),l._uU(36,"Repite la contrase\xf1a"),l.qZA(),l._UZ(37,"input",13),l.qZA(),l.qZA(),l.TgZ(38,"button",14),l.NdJ("click",function(){return t.registerButton()}),l._uU(39,"Registrate"),l.qZA(),l.qZA()),2&e&&(l.xp6(4),l.Q6J("formGroup",t.newUserForm))},directives:[a._Y,a.JL,a.sg,a.Fj,u.o,a.JJ,a.u,s.Hq],styles:['@import"https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap";*[_ngcontent-%COMP%]{font-family:"Montserrat",sans-serif}.container[_ngcontent-%COMP%]{padding:5em;text-align:center;align-items:center;justify-content:center}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{text-align:left;width:100%;margin-bottom:3em}.container[_ngcontent-%COMP%]   .flex[_ngcontent-%COMP%]{justify-content:center}']}),e})()}];let h=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[c.Bz.forChild(d)],c.Bz]}),e})(),f=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({providers:[g],imports:[[n.ez,o.JF,h,s.hJ,i.FI,u.j,a.UX,a.u5,p.ZX,s.hJ]]}),e})()}}]);