import { setCookie } from "cookies-next";
export async function getProducts({ query, reverse, sortKey }) {
  let url = `https://dummyjson.com/products`;
  console.log(`query, reverse, sortKey`, query, reverse, sortKey);
  if (query) {
    url = url + `/search?q=${query}`;
    console.log("url", url);
    const res = await fetch(url);
    const productsData = await res.json();

    return productsData["products"];
  } else {
    let hasMoreProducts = true;
    const limit = 30;
    let skip = 0;
    let allProducts = [];
    while (hasMoreProducts) {
      const response = await fetch(
        `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
      );
      const productData = await response.json();
      allProducts = [...allProducts, ...productData["products"]];
      skip += limit;
      hasMoreProducts = productData["products"].length === limit;
    }
    return allProducts;
  }
}

export async function getCollectionProducts({ collection, reverse, sortKey }) {
  let url = `https://dummyjson.com/products/category/${collection}`;
  const res = await fetch(url);
  const products = await res.json();
  return products["products"];
}

export async function getProduct(productId) {
  let url = `https://dummyjson.com/products/${productId}`;
  const res = await fetch(url);
  const product = await res.json();
  return product;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function createCart() {
  return {
    cartId: getRandomNumber(1, 100),
    products: [],
  };
}

export async function addToCart(cart, { merchandiseId }) {
  // let cartList = cookies().get('cartList')?.value;
  let productInfo = await getProduct(merchandiseId);
  if (cart.length === 0) {
    productInfo["quantity"] = 1;
    cart.push(productInfo);
  } else {
    const itemToUpdate = cart.find((item) => item.id === merchandiseId);
    if (itemToUpdate) {
      itemToUpdate["quantity"] += 1;
    } else {
      cart.push(productInfo);
      productInfo["quantity"] = 1;
    }
  }
  // setCookie("cart", cart);
  return cart;
}
