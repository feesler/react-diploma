const topSalesURL = process.env.REACT_APP_TOP_SALES_URL;
const categoriesURL = process.env.REACT_APP_CATEGORIES_URL;
const itemsURL = process.env.REACT_APP_ITEMS_URL;
const orderURL = process.env.REACT_APP_ORDER_URL;

export async function requestTopSales() {
  const response = await fetch(topSalesURL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function requestCategories() {
  const response = await fetch(categoriesURL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function requestItems(options = {}) {
  const url = new URL(itemsURL);
  Object.keys(options).forEach((key) => url.searchParams.set(key, options[key]));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function requestItemDetails(id) {
  const response = await fetch(`${itemsURL}/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function submitOrder(data) {
  const response = await fetch(orderURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return true;
}
