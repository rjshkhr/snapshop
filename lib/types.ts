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

export type Cart = {
  [productId: number]: number
}

export type Store = {
  allProducts: Product[]
  cart: Cart
}

export type StoreAction =
  | { type: 'fetched_products'; value: Store['allProducts'] }
  | { type: 'added_to_cart'; value: number, items: number }
  | { type: 'removed_from_cart'; value: number }
