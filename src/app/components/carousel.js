import Link from "next/link";
import { GridTileImage } from "./grid/tile";
import { getCollectionProducts } from "../library";
export async function Carousel() {
  const homepageItems = await getCollectionProducts({
    collection: "womens-dresses",
  });

  if (!homepageItems?.length) return null;

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <div className="flex animate-carousel  gap-4">
        {[...homepageItems, ...homepageItems].map((product, i) => (
          <Link
            key={i}
            href={`/product/${product.id}`}
            className="h-[30vh] w-2/3 flex-none md:w-1/3"
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.price,
                currencyCode: "USD",
              }}
              src={product.thumbnail}
              width={600}
              height={600}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
