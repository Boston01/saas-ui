"use client"
import { useFormState } from "react-dom";
import { createUser } from "../../lib/users-actions";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);
  
  return (
    <form action={dispatch} className="px-56">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="col-span-full">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium leading-6"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue=""
              autoComplete="given-name"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.firstName &&
              state.errors.firstName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium leading-6"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.lastName &&
              state.errors.lastName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="role" className="block text-sm font-medium leading-6">
            Role
          </label>
          <div className="mt-2">
            <select
              id="role"
              name="role"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>admin</option>
              <option>super-admin</option>
              <option>viewer</option>
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="projects"
            className="block text-sm font-medium leading-6"
          >
            Projects
          </label>
          <div className="mt-2">
            <select
              id="projects"
              name="projects"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>internal-envs</option>
              <option>taula</option>
              <option>training</option>
            </select>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.projects &&
              state.errors.projects.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mt-8 flex">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3 py-2  text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
      <div></div>
    </form>
  );
}
