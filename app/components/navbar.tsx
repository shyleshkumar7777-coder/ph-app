"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  UserPlus,
  LogOut,
  Menu,
  X,
  MapPin,
} from "lucide-react";

export default function Navbar() {

  const pathname =
    usePathname();

  const { data: session } =
    useSession();

  const [open, setOpen] =
    useState(false);

  const [location, setLocation] =
    useState("");

  const role =
    (session?.user as any)?.role;

  const sessionLocation =
    (session?.user as any)?.location;

  useEffect(() => {

    if (!session)
      return;

    if (role === "superadmin") {

      const selectedLocation =
        localStorage.getItem(
          "selectedLocation"
        );

      setLocation(
        selectedLocation || ""
      );

    }

    else {

      setLocation(
        sessionLocation || ""
      );

    }

  }, [
    session,
    role,
    sessionLocation,
  ]);

  const navItems =
    role === "superadmin"

      ? [

          {
            name: "Select Location",
            href: "/select-location",
            icon: <MapPin size={20} />,
          },

          ...(location
            ? [

                {
                  name: "Register",
                  href: `/register/${location}`,
                  icon: <UserPlus size={20} />,
                },

                {
                  name: "Dashboard",
                  href: `/dashboard?location=${location}`,
                  icon: <LayoutDashboard size={20} />,
                },

              ]
            : []),

        ]

      : [

          {
            name: "Register",
            href: `/register/${location}`,
            icon: <UserPlus size={20} />,
          },

          {
            name: "Dashboard",
            href: `/dashboard?location=${location}`,
            icon: <LayoutDashboard size={20} />,
          },

        ];

  const logout = () => {

    localStorage.removeItem(
      "selectedLocation"
    );

    signOut({
      callbackUrl: "/",
    });

  };

  return (

    <>

      {/* Navbar */}

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
        px-5
        py-4
        mb-8
      "
      >

        <div className="flex items-center justify-between">

          {/* Logo */}

          <div>

            <h1
              className="
              text-2xl
              md:text-3xl
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

              <div className="flex items-center gap-2 mt-1 text-slate-500">

                <MapPin
                  size={15}
                  className="text-red-500"
                />

                <span className="capitalize">

                  {location}

                </span>

              </div>

            )}

          </div>

          {/* Desktop */}

          <div className="hidden md:flex gap-3">

            {navItems.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className={`

                  flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-2xl
                  transition-all

                  ${
                    pathname.includes(
                      item.name
                        .toLowerCase()
                        .replace(" ", "-")
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

            <button
              onClick={logout}
              className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-2xl
              bg-slate-100
              hover:bg-red-500
              hover:text-white
              transition
            "
            >

              <LogOut size={20} />

              Logout

            </button>

          </div>

          {/* Mobile Menu */}

          <button
            onClick={() =>
              setOpen(true)
            }
            className="
            md:hidden
            p-2
            rounded-xl
            bg-slate-100
          "
          >

            <Menu size={28} />

          </button>

        </div>

      </nav>

      {/* Overlay */}

      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }
          className="
          fixed
          inset-0
          bg-black/40
          z-40
        "
        />

      )}

      {/* Drawer */}

      <div
        className={`

        fixed
        top-0
        right-0
        h-full
        w-72
        bg-white
        shadow-2xl
        z-50
        transition-transform
        duration-300

        ${
          open

            ? "translate-x-0"

            : "translate-x-full"

        }

      `}
      >

        <div className="flex justify-between items-center p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold text-indigo-600">

              WPH Portal

            </h2>

            {location && (

              <div className="flex items-center gap-2 mt-2 text-slate-500">

                <MapPin
                  size={16}
                  className="text-red-500"
                />

                <span className="capitalize">

                  {location.toUpperCase()}

                </span>

              </div>

            )}

          </div>

          <button
            onClick={() =>
              setOpen(false)
            }
          >

            <X size={28} />

          </button>

        </div>

        <div className="flex flex-col p-5 gap-4">

          {navItems.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() =>
                setOpen(false)
              }
              className={`
                flex
                items-center
                gap-3
                px-5
                py-4
                rounded-2xl

                ${
                  pathname.includes(
                    item.name
                      .toLowerCase()
                      .replace(" ", "-")
                  )

                    ? "bg-indigo-600 text-white"

                    : "bg-slate-100"

                }
              `}
            >

              {item.icon}

              {item.name}

            </Link>

          ))}

          <button
            onClick={logout}
            className="
            flex
            items-center
            gap-3
            px-5
            py-4
            rounded-2xl
            bg-slate-100
            hover:bg-red-500
            hover:text-white
            transition
          "
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </div>

    </>

  );

}