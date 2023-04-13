export interface searchProduct {
  name: string;
  user: "";
}
export interface productBasicInfo {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
  image_data?: string;
  selection?: number;
}
export interface newAccounts {
  password: string;
  name: string;
  surname: string;
  direction: string;
  cp: string;
  city: string;
  province: string;
  country: string;
  email: string;
}
export interface responseBackend {
  products?: Array<productBasicInfo>;
}
export interface GenericResponse<T> {
  products?: T;
  data?: T;
}
export interface carouselItems {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}
export interface order {
  id_product: number | any;
  quantity: number | any;
}
export const url = "https://ubay-2021-es.herokuapp.com/";
