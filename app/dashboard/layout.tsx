"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import openseeLogo from "../../public/opensee-logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  Squares2X2Icon,
  HomeIcon,
  UsersIcon,

  PowerIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: false },
  {
    name: "Services",
    href: "/dashboard/services",
    icon: Squares2X2Icon,
    current: false,
  },
  { name: "Users", href: "/dashboard/users", icon: UsersIcon, current: false },
  {
    name: "Admin",
    href: "/dashboard/admin/details",
    icon: Cog6ToothIcon,
    current: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

async function keyckloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className=" flex divide-x divide-gray-200 h-14 flex-row bg-blue-400">
        <div>
          <Image
            className="h-12 ml-6 mt-1  w-auto"
            src={openseeLogo}
            alt="Opensee"
          />
        </div>
        <div className="ml-auto">
          <button
            onClick={() => {
              keyckloakSessionLogOut().then(() =>
                signOut({ callbackUrl: "/" })
              );
            }}
            className="h-4 w-4 rounded-full pl-4 mt-3 mr-10"
          >
            <PowerIcon className="w-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-row">
        {/* Static sidebar for desktop */}
        <div className="hidden  lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name} className="pt-3">
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold shadow-2xl"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-600",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <div className="flex-1 text-sm font-semibold leading-6 text-gray-900"></div>
          </div>
        </div>

        <main className="py-4">
          <div className="px-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
