import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuItem } from "primeng/api";
import {
  newAccounts,
  productBasicInfo,
  responseBackend,
  url,
} from "src/app/models/general.interfaces";
import { AuthenticationService } from "src/app/services/authentication.service";
import { ProfileService } from "../services/profile.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  newUserForm!: FormGroup;
  currentUser: any;
  visible: boolean = false;
  userItems: any = [];
  userBoughtItems: any;
  test: boolean = false;
  data: any = undefined;
  modify: boolean = true;
  newUser: newAccounts | any = {
    password: "",
    name: "",
    surname: "",
    direction: "",
    cp: "",
    city: "",
    province: "",
    country: "",
    email: "",
  };
  constructor(
    private routerActivated: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.initForm();
    await this.updateUserItems();
    await this.updateOrders();
    this.newUser = this.data;
  }

  testingData() {
    this.test = true;
    this.authenticationService.setcurrentUserValue({
      account: {
        name: "Testing",
        surname: "",
        direction: "",
        cp: "",
        city: "",
        province: "",
        country: "",
        email: "",
        password: "test",
        username: "",
      },
    });
  }

  initForm(): void {
    if (!this.test) {
      this.data = this.authenticationService.currentUserValue.account;
    } else {
      this.data = this.authenticationService.currentUserValue["account"];
    }
    this.newUserForm = this.fb.group({
      name: [this.data.name, Validators.required],
      surname: [this.data.surname, Validators.required],
      direction: [this.data.direction, Validators.required],
      cp: [this.data.cp, Validators.required],
      city: [this.data.city, Validators.required],
      province: [this.data.province, Validators.required],
      country: [this.data.country, Validators.required],
      email: [this.data.email!.concat("@gmail.com"), Validators.required],
      password: ["", Validators.required],
      username: [this.data.username, Validators.required],
      passwordRepeat: ["", Validators.required],
      passwordNew: ["", Validators.required],
    });
  }
  editProfileToggle(): void {
    this.modify = !this.modify;
    this.initForm();
  }

  editProfile() {
    this.visible = false;
    if (this.checkPassword() == false) {
      this.snackBar.open("La contraseña es incorrecta", "Ok");
    } else {
      this.getFilterValues();
      if (!this.test) {
        this.profileService
          .getAccounts(this.data.username, this.newUser)
          .subscribe((res) => console.log(res));
        this.authenticationService.login(this.newUser);
      }
      this.redirectTo("/profile");
    }
  }

  getFilterValues(): void {
    //TODO Hay que añadir comprobacion de contraseña
    Object.keys(this.newUser).forEach((item: string) => {
      if (item === "email") {
        this.newUser[item] = this.newUserForm
          .get(item)
          ?.value.split("@gmail.com")[0];
      } else if (item === "password") {
        if (
          !!this.newUserForm.get(item + "New")?.value.replace(/\s/g, "").length
        ) {
          //comprueba que haya valores
          this.newUser[item] = this.newUserForm.get(item + "New")?.value;
        } else {
          this.newUser[item] = this.data["password"];
        }
      } else this.newUser[item] = this.newUserForm.get(item)?.value;
    });
  }
  //modify es FALSE SI SE QUIERE MODIFICAR

  async updateUserItems() {
    const items = await this.profileService
      .getUserItems(
        this.authenticationService.currentUserValue.account.username
      )
      .toPromise();
    this.userItems = items.account.products;
  }
  async updateOrders() {
    const item = await this.profileService
      .getBoughtItems(this.data.username)
      .toPromise();
    await this.profileService.getItems(item.orders).then((temp) => {
      this.userBoughtItems = [];
      temp.forEach((r) => {
        this.userBoughtItems.push(r.product);
      });
    });
  }

  async getItemProduct(number: number) {
    return await this.profileService.getItem(number).toPromise();
  }
  async deleteProduct(product: any) {
    const message = await this.profileService.deleteItems(product).toPromise();
    this.snackBar.open(message.message, "Ok");
    await this.updateUserItems();
  }
  getItemAmount() {
    return this.userItems.length;
  }

  biggerThanZero(item: number) {
    return item > 0;
  }

  productInformationShow(value?: any) {
    this.redirectTo("/product-info", value.id);
  }

  redirectTo(uri: string, additionalInfo?: any) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() =>
        this.router.navigate([uri], { queryParams: { title: additionalInfo } })
      );
  }

  addNewItem() {
    this.redirectTo("/upload");
  }
  getImage(item: any) {
    if (item.image != "") {
      return item.image;
    } else {
      return "default.jpg";
    }
  }

  changeVisible() {
    this.visible = !this.visible;
  }

  checkPassword() {
    if (
      this.newUserForm.get("password")?.value ==
        this.newUserForm.get("passwordRepeat")?.value &&
      this.newUserForm.get("passwordRepeat")?.value == this.data["password"]
    ) {
      return true;
    }
    return false;
  }
}
