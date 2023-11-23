import { Cart } from './types'

const BASE_URL = 'https://fakestoreapi.com'

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}

export async function getProductById(productId: number) {
  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch product')
  }

  return res.json()
}

export async function getProductByCategory(category: string) {
  const res = await fetch(`${BASE_URL}/products/category/${category}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch category products')
  }

  return res.json()
}

export async function updateCart(cart: Cart) {
  const products = []

  for (const productId in cart) {
    products.push({ productId, quantiy: cart[productId] })
  }

  const res = await fetch(`${BASE_URL}/carts/1`, {
    method: 'PUT',
    body: JSON.stringify({
      userId: 1,
      date: new Date(),
      products: products
    })
  })

  if (!res.ok) {
    throw new Error('Failed to update cart')
  }

  return res.json()
}
