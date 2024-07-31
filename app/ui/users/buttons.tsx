
import { deleteUser } from "@/app/lib/users-actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  ServerStackIcon
} from "@heroicons/react/20/solid";

export async function GetUsers() {
  return (
    <Link
      href="/dashboard/users"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">List Users</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export async function CreateUser() {
  return (
    <Link
      href="/dashboard/users/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create User</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export async function UpdateUser({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/users/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export async function DeleteUser({ id }: { id: string }) {
  const deleteUserWithId = deleteUser.bind(null, id);

  return (
    <form action={deleteUserWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export async function GetSpecs({ specs }: { specs: any }) {
  return (
    <div className="flex w-0 flex-1">
      <Link
        href={{
          pathname: "/dashboard/services/details",
          query: specs,
        }}
        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
      >
        <ServerStackIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
      </Link>
    </div>
  );
}
