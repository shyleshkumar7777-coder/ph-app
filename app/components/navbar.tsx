"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  LayoutDashboard,
  LogOutIcon,
  UserPlus,
} from "lucide-react";

export default function Navbar() {

  const pathname = usePathname();

  const { data: session } =
    useSession();

  const location =
    (session?.user as any)
      ?.location || "";

  const navItems = [
    {
      name: "Register",
      href: `/register/${location}`,
      icon: <UserPlus size={18} />,
    },
    {
      name: "Dashboard",
      href: `/dashboard?location=${location}`,
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Logout",
      href: "/",
      icon: <LogOutIcon size={18} />,
    }
  ];

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      bg-white/80
      backdrop-blur-xl
      border
      border-slate-200
      rounded-3xl
      shadow-xl
      px-6
      py-4
      mb-8
    "
    >
      <div
        className="
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-4
      "
      >
        {/* Logo */}

        <div>
          <h1
            className="
            text-3xl
            font-bold
            bg-gradient-to-r
            from-indigo-600
            to-purple-600
            bg-clip-text
            text-transparent
          "
          >
            WPH Portal
          </h1>

          {location && (
            <p
              className="
              text-sm
              text-slate-500
              mt-1
              capitalize
            "
            >
              📍 {location}
            </p>
          )}
        </div>

        {/* Navigation */}

        <div
          className="
          flex
          flex-wrap
          justify-center
          gap-3
        "
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-2xl
                transition-all
                duration-300

                ${
                  pathname.includes(
                    item.name
                      .toLowerCase()
                  )
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-slate-100 hover:bg-slate-200"
                }
              `}
            >
              {item.icon}

              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}