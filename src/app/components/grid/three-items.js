import { getCollectionProducts } from "@/app/library";
import { GridTileImage } from "./tile";
import Link from "next/link";

function ThreeItemGridItem({ item, size }) {
  return (
    <div
      className={
        size === "full"
          ? "lg:col-span-4 lg:row-span-2"
          : "lg:col-span-2 lg:row-span-1"
      }
    >
      <Link className="block h-full" href={`/product/${item.id}`}>
        <GridTileImage
          src={item.thumbnail}
          width={size === "full" ? 1080 : 540}
          height={size === "full" ? 1080 : 540}
          priority={true}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title,
            amount: item.price,
            currencyCode: "USD",
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const homepageItems = await getCollectionProducts({
    collection: "mens-shirts",
  });
  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 lg:grid-cols-6 lg:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} />
      <ThreeItemGridItem size="half" item={secondProduct} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
