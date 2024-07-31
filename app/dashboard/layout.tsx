"use client";
import openseeLogo from "../../public/opensee-logo.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Cog6ToothIcon,
  Squares2X2Icon,
  HomeIcon,
  UsersIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {

  Menu
} from "@headlessui/react";

import Link from "next/link";

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

  // Handle logout
  const handleLogout = () => {
    keyckloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
    
  };
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
        
        <div className="ml-auto lg:flex lg:items-center">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative mt-3 mr-2 flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://pbs.twimg.com/profile_images/1422928729983098882/HwCU4MsC_400x400.jpg"
                  className="h-8 w-8 rounded-full"
                />
              </Menu.Button>
            </div>
            <Menu.Items 
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <Menu.Item>
                <Link
                  href={`/dashboard/users/a9bb1734-b695-456c-96e5-6214a9d9f0d6/details`}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Your Profile
                </Link>
              </Menu.Item>
              <Menu.Item>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Settings
                </a>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                >
                  Sign out
                </button>
              </Menu.Item>
            </Menu.Items>
          </Menu>
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

        <main className="flex min-h-full flex-1 flex-col">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
