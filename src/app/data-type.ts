export interface log_in{
  name:string,
  email:string,
  password:string,
  address:string,
  City:string,
  state:string,
  id:number,
  zip:number,
  contact:number
} 

export interface sign_Up{
  name:string,
  email:string,
  password:string,
  address:string,
  address2:string,
  City:string,
  state:string,
  zip:number,
  id:number,
  contact:number

}

export interface product{
  name:string,
  price:number,
  image:string,
  id:string,
  description:string,
  quantity:undefined|number,
  productId:undefined|number
}

export interface cart{
  name:string,
  price:number,
  image:string,
  id:string | undefined,
  description:string,
  quantity:undefined|number,
  userId:number,
  productId:number
}

export interface priceSummary{
  price:number,
  tax:number,
  shippingPrice:number,
  total:number

}

export interface order{
  email:string,
  address:string,
  total:number,
  name:string,
  contact:number,
  userId:number,
  id:number|undefined
}