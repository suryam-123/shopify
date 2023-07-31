import Grid from "../../components/grid";
import { GridTileImage } from "../../components/grid/tile";
import Link from "next/link";

export default function ProductGridItems({ products }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="inline-block h-full w-full"
            href={`/product/${product.id}`}
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
        </Grid.Item>
      ))}
    </>
  );
}
