const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getCategories() {
  const response = await fetch(BASE_URL + "/categories");
  const categories = await response.json();
  return categories;
}

export async function getProducts(category) {
  let url = BASE_URL + "/products";
  if (category) {
    url = url + "?category=" + category;
  }
  const response = await fetch(url);
  const products = await response.json();
  return products;
}

export async function getProductBySlug(slug) {
  const url = BASE_URL + "/products?slug=" + slug;
  const response = await fetch(url);
  const products = await response.json();
  const product = products[0];
  return product;
}
