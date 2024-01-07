"use client"
export default function DetailsPage() {
  return (
    <main>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8">
        <div className="col-span-full">
          <label
            htmlFor="orgaName"
            className="block text-sm font-medium leading-6"
          >
            Organization Name
          </label>
          <div className="mt-2 flex flex-row space-x-5">
            <input
              type="text"
              name="orgaName"
              id="orgaName"
              autoComplete="given-name"
              defaultValue="Opensee"
              className="block  rounded-md border-0 bg-gray-100 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </button>
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="orgaName"
            className="block text-sm font-medium leading-6"
          >
            Organization ID
          </label>
          <div className="mt-2 flex flex-row space-x-5">
            <input
              type="text"
              name="orgaId"
              id="orgaId"
              autoComplete="given-name"
              defaultValue="d613fd28-5de8-4a33-b678-7ddfd88b2e41"
              className="block w-auto rounded-md border-0 bg-gray-100 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="col-span-full">
          <div className="mt-2">
            <select
              id="role"
              name="role"
              defaultValue="Action"
              className="block w-auto rounded-md border-0 bg-gray-100 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>Actions</option>
              <option onSelect={() =>console.log("TEst ok")}>Leave Organisation</option>
            </select>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
