export async function getProduct(productId) {
  try {
    const accessToken = process.env.GUMROAD_ACCESS_TOKEN
    const request = await fetch(
      `https://api.gumroad.com/v2/products/${productId}?access_token=${accessToken}`
    )
    const response = await request.json()

    if (!response.success) {
      throw 'Error: Product not found'
    }

    return response.product
  } catch (e) {
    return false
  }
}
