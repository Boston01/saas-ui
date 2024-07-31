import { getServices } from "@/app/lib/serivces-data";
import { GetSpecs } from "@/app/ui/users/buttons";
import {
  GlobeAltIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Services
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the service in your account including theirs Specs,
              App.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link href="/dashboard/services/create">
              <button
                type="button"
                className="block rounded-md bg-green-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add service
              </button>
            </Link>
          </div>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          { services.length > 0 && services.map((service: any) => (
            <li
              key={service.ID}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white  shadow-2xl"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      <p> Orga: {service.client_name}</p>
                    </h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      <p>Project: {service.project_name}</p>
                    </span>
                  </div>
                  <p className="mt-4 truncate text-sm text-gray-500">
                    Env name: {service.env_name}
                  </p>
                  
                  <span className="truncate text-sm text-gray-500">
                      <p className="mt-4">Create Date: {service.timestamp}</p>
                  </span>
                </div>
                <div className="h-4 w-4 flex-shrink-0 rounded-full bg-green-500"></div>
                <div>
                  <EllipsisVerticalIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <GetSpecs specs={service.json_spec}/>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`https://${service.client_name}-${service.project_name}-${service.env_name}.opensee.net/webui`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <GlobeAltIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                      Webui
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <Link href="/dashboard/services/app">
                      <GlobeAltIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                      Opensee App
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {/* { services.length === 0  &&  <p>There is no services</p>} */}
        </ul>
      </div>
    </main>
  );
}
