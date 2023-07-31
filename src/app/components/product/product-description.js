import { AddToCart } from "../../components/cart/add-to-cart";
import Price from "../../components/price";
import Prose from "../../components/prose";

export function ProductDescription({ product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price} currencyCode="USD" />
        </div>
      </div>
      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          text={product.description}
        />
      ) : null}

      <AddToCart productId={product.id} availableForSale={true} />
    </>
  );
}
