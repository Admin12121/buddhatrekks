import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ComesInGoesOutUnderline from "@/components/animation/side-to-side";

export default function Header() {
  return (
    <header className="absolute text-white top-0 z-100 h-14.25 shrink-0 flex min-w-0 sm:border-t-0 outer-section-node-offset w-full">
      <div className="mx-auto flex h-14 items-center justify-between gap-2 sm:gap-4 container w-full px-0!">
        <Link href="/" className="ml-4 flex gap-2 text-2xl">
          BuddhaTrekks
        </Link>

        <ul className="flex items-center w-max shrink-0">
          <li className={cn("relative h-full")}>
            <Link
              href={"#"}
              className={cn("w-full h-full block py-4 px-5")}
              prefetch={false}
            >
              <ComesInGoesOutUnderline direction="left">
                Destinations
              </ComesInGoesOutUnderline>
            </Link>
          </li>
          <li className={cn("relative h-full")}>
            <Link
              href={"#"}
              className={cn("w-full h-full block py-4 px-5")}
              prefetch={false}
            >
              <ComesInGoesOutUnderline direction="left">
                Activities
              </ComesInGoesOutUnderline>
            </Link>
          </li>
          <li className={cn("relative h-full")}>
            <Link
              href={"#"}
              className={cn("w-full h-full block py-4 px-5")}
              prefetch={false}
            >
              <ComesInGoesOutUnderline direction="left">
                About
              </ComesInGoesOutUnderline>
            </Link>
          </li>
          <li className={cn("relative h-full")}>
            <Link
              href={"/blog"}
              className={cn("w-full h-full block py-4 px-5")}
              prefetch={false}
            >
              <ComesInGoesOutUnderline direction="left">
                Blog
              </ComesInGoesOutUnderline>
            </Link>
          </li>
        </ul>
        <Button>Booking</Button>
      </div>
    </header>
  );
}
