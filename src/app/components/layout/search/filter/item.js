"use client";

import clsx from "clsx";
import { createUrl } from "../../../../utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PathFilterItem({ item }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(pathname === item.path);
  const newParams = searchParams
    ? new URLSearchParams(searchParams.toString())
    : null;
  const DynamicTag = active ? "p" : Link;

  if (newParams) {
    newParams.delete("q");
  }
  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item]);

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          "w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100",
          {
            "underline underline-offset-4": active,
          }
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(searchParams.get("sort") === item.slug);
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    })
  );
  const DynamicTag = active ? "p" : Link;

  useEffect(() => {
    setActive(searchParams.get("sort") === item.slug);
  }, [searchParams, item.slug]);

  return (
    <li
      className="mt-2 flex text-sm text-black dark:text-white"
      key={item.title}
    >
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx("w-full", {
          "underline underline-offset-4": active,
        })}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({ item }) {
  return "path" in item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={item} />
  );
  // return <PathFilterItem item={item} />;
}
