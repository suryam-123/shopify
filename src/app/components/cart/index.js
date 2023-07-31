import { cookies } from "next/headers";
import CartModal from "./modal";
import { getCookie } from "cookies-next";
export default async function Cart() {
  const cart = getCookie("cart")?.value;
  // let cart;

  // if (cartId) {
  //   cart = await getCart(cartId);
  // }

  return <CartModal cart={cart} />;
}
