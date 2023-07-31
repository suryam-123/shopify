"use server";

// import {
//   addToCart,
//   createCart,
//   getCart,
//   removeFromCart,
//   updateCart
// } from "../../lib/shopify"
import { createCart, addToCart } from "../../library";
import { getCookie, getCookies, hasCookie, setCookie } from "cookies-next";

export const addItem = async (productId) => {
  // let cartId = cookies().get("cartId")?.value;
  let cart;

  // if (cartId) {
  //   cart = await getCart(cartId);
  // }

  if (!hasCookie("cart")) {
    cart = [];
    setCookie("cart", "true");
    console.log(`hasCookie("cart")`, hasCookie("cart"));
  }

  if (!productId) {
    return new Error("Missing productId");
  }
  try {
    let cartList = await addToCart(cart, { merchandiseId: productId });
    // console.log(cartList);
    // setCookie("cart", JSON.stringify(cartList));
    const myArray = ["value1", "value2", "value3"];
    setCookie("myArray", "ArrayList");
    console.log(`getCookie("cart")`, getCookies());
  } catch (e) {
    return new Error("Error adding item", { cause: e });
  }
};

export const removeItem = async (lineId) => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return new Error("Missing cartId");
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return new Error("Error removing item", { cause: e });
  }
};

export const updateItemQuantity = async ({ lineId, variantId, quantity }) => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return new Error("Missing cartId");
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);
  } catch (e) {
    return new Error("Error updating item quantity", { cause: e });
  }
};
