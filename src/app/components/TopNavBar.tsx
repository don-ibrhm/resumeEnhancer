"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "public/logo.png";
import { cx } from "lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-12 md:h-24 items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-center">
        <Link href="/">
          <span className="sr-only">OpenResume</span>
          <Image
            src={logoSrc}
            alt="DivergeResEnhance Logo"
            className="h-9 w-36 md:h-12 md:w-48"
            priority
          />
        </Link>
      </div>
    </header>
  );
};
