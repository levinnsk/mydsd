import Link from "next/link";
import { signOut } from "@/auth";
import MenuTop from "../../../components/menu/menu-top";
export default function MainHeader() {
  return (
    <header className="p-4 dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex">
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            LOGO
          </a>
          <MenuTop />
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <Link
            className="flex items-center px-4 -mb-1 dark:border-"
            href={"/main/profile"}
          >
            Профиль
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
              type="submit"
            >
              Выйти
            </button>
          </form>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
