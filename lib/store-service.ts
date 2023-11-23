const BASE_URL = 'https://fakestoreapi.com'

export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}
