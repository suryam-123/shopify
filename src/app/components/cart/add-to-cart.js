"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "../../components/cart/actions";
import LoadingDots from "../../components/loading-dots";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function AddToCart({ productId, availableForSale }) {
  // const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   const variant = variants.find((variant) =>
  //     variant.selectedOptions.every(
  //       (option) => option.value === searchParams.get(option.name.toLowerCase())
  //     )
  //   );
  // }, [searchParams, variants]);

  return (
    <button
      aria-label="Add item to cart"
      disabled={isPending}
      onClick={() => {
        if (!availableForSale) return;
        startTransition(async () => {
          const error = await addItem(productId);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
      className={clsx(
        "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90",
        {
          "cursor-not-allowed opacity-60": !availableForSale,
          "cursor-not-allowed": isPending,
        }
      )}
    >
      <div className="absolute left-0 ml-4">
        {!isPending ? (
          <PlusIcon className="h-5" />
        ) : (
          <LoadingDots className="mb-3 bg-white" />
        )}
      </div>
      <span>{availableForSale ? "Add To Cart" : "Out Of Stock"}</span>
    </button>
  );
}
