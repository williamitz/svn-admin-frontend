const cartData = [
  { id: 1, img: 'assets/images/products/img-1.png', product: "Branded T-Shirts", quantity: 10, price: 32 },
  { id: 2, img: 'assets/images/products/img-2.png', product: "Bentwood Chair", quantity: 5, price: 18 },
  { id: 3, img: 'assets/images/products/img-3.png', product: "Borosil Paper Cup", quantity: 3, price: 250 },
  { id: 4, img: 'assets/images/products/img-6.png', product: "Gray Styled T-Shirt", quantity: 1, price: 1250 },
  { id: 5, img: 'assets/images/products/img-5.png', product: "Stillbird Helmet", quantity: 2, price: 495 },
];
export { cartData };



export const passwordPatt = new RegExp(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);

export const fullTextPatt = new RegExp(/^[a-zA-Záéíóúüñ\.\,\s]{0,200}$/i);
// export const fullTextPatt = new RegExp(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\.\,\s]{0,200}$/);
export const fullTextWithoutSpacePatt = new RegExp(/^[a-zA-Záéíóúüñ]{0,200}$/i);
// export const fullTextWithoutSpacePatt = new RegExp(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{0,200}$/);
export const urlMenuPatt = new RegExp(/^[a-zA-Z0-9\/\-]{0,200}$/);
export const fullTextNumberPatt = new RegExp(/^[a-zA-Záéíóúüñ\#\-\d\.\,\s]{0,200}$/i);
// export const fullTextNumberPatt = new RegExp(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\#\-\d\.\,\s]{0,200}$/);
export const numberPatt = new RegExp(/^[\d]{0,200}$/);
export const decimalPatt = new RegExp(/^\d+(?:\.\d{1,2})?$/);
export const materialIconPatt = new RegExp(/^[a-zA-Z\_]{0,200}$/);
export const riIconPatt = new RegExp(/^[a-z\d\-]{0,100}$/i);

export const translatePatt = new RegExp(/^[A-Z\.]{0,200}$/);

export const timeZonePatt = new RegExp(/^[a-zA-Z\/\_]{0,50}$/);

export const isoThreePatt = new RegExp(/^[a-zA-Z]{2,3}$/);

export const codePatt = new RegExp(/^[a-z\_]{0,10}$/i);

export const symbolPatt = new RegExp(/^[a-zA-Z\.\$\/]{2,5}$/);

export const prefixPhonePatt = new RegExp(/^[\+\d]{2,6}$/);

export const phonePatt = new RegExp(/^[\+\d\s]{6,16}$/);

export const emailPatt = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
