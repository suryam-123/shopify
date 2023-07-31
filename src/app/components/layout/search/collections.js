import clsx from "clsx";
import { Suspense } from "react";

// import { getCollections } from "../../../lib/shopify"
import FilterList from "./filter";

async function CollectionList() {
  const response = await await fetch(
    `https://dummyjson.com/products/categories`
  );
  const collections = await response.json();
  let collectionJson = collections.map((item) => {
    return {
      title: item.charAt(0).toUpperCase() + item.slice(1),
      path: `/search/${item}`,
    };
  });
  collectionJson.unshift({
    title: "All",
    path: `/search`,
  });
  return <FilterList list={collectionJson} title="Collections" />;
}

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
