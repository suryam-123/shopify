"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const FooterMenuItem = ({ item }) => {
  const pathname = usePathname()
  const [active, setActive] = useState(pathname === item.path)

  useEffect(() => {
    setActive(pathname === item.path)
  }, [pathname, item.path])

  return (
    <li className="mt-2 first:mt-1">
      <Link
        href={item.path}
        className={clsx(
          "underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300",
          {
            "text-black dark:text-neutral-300": active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  )
}

export default function FooterMenu({ menu }) {
  if (!menu.length) return null

  return (
    <nav>
      <ul>
        {menu.map(item => {
          return <FooterMenuItem key={item.title} item={item} />
        })}
      </ul>
    </nav>
  )
}
