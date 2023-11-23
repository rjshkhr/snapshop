export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type ProductsInCart = {
  [productId: number]: number
}

export type Store = {
  allProducts: Product[]
  cart: ProductsInCart
}

export type StoreAction =
  | { type: 'fetched_products'; value: Store['allProducts'] }
  | { type: 'added_to_cart'; value: number }
  | { type: 'removed_from_cart'; value: number }
