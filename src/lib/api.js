
const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchApi(endpoint) {
  let lastError;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to fetch API data");
}

// Extract array from API response
function extractArray(response, key) {
  const result =
    response?.data?.[key] ??
    response?.data ??
    response?.[key] ??
    response;

  return Array.isArray(result) ? result : [];
}

// Get all products
export async function getProducts() {
  const response = await fetchApi("/products");
  return extractArray(response, "products");
}

// Get all categories
export async function getCategories() {
  const response = await fetchApi("/categories");
  return extractArray(response, "categories");
}

// Get single product
export async function getProductById(id) {
  const response = await fetchApi(`/products/${id}`);

  return response?.data?.product ??
    response?.data ??
    response?.product ??
    response;
}

// Get single category
export async function getCategoryBySlug(slug) {
  const response = await fetchApi(`/categories/${slug}`);

  return response?.data?.category ??
    response?.data ??
    response?.category ??
    response;
}
