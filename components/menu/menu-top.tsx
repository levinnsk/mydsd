import Link from "next/link"
export default function MenuTop() {
    return (
        <menu className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
                href={"/main/upd"}
              >
                УПД
              </Link>
            </li>
            <li className="flex">
              <Link
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
                href={"/main/devices"}
              >
                Счетчики
              </Link>
            </li>
            <li className="flex">
              <Link
                className="flex items-center px-4 -mb-1 border-b-2 dark:border-"
                href={"/main/object"}
              >
                Объекты
              </Link>
            </li>
          </menu>
    )
}