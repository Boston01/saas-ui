"use client";
import { useFormState } from "react-dom";
import { createService } from "../../lib/actions";


export default function Form() {
 
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createService, initialState);
  
  return (
    <form
      action={dispatch}
      className="grid grid-cols-3 gap-4 place-items-stretch h-56"
    >
      <div></div>
      <div></div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4">
        
        <div className="col-span-full">
          <label htmlFor="region" className="block text-sm font-medium leading-6">
            Region
          </label>
          <div className="mt-2">
            <select
              id="region"
              name="region"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>eu-west-2</option>
              <option>eu-west-3</option>
            </select>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.region &&
              state?.errors.region.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="cloudProvider" className="block text-sm font-medium leading-6">
            Cloud Provider
          </label>
          <div className="mt-2">
            <select
              id="cloudProvider"
              name="cloudProvider"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>Aws</option>
              <option disabled={true}>Gcp</option>
              <option disabled={true}>Azure</option>
             
            </select>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.cloudProvider &&
              state?.errors.cloudProvider.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="col-span-full">
          <label
            htmlFor="projects"
            className="block text-sm font-medium leading-6"
          >
            Project Name
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
            {state?.errors.projects &&
              state.errors.projects.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="envName"
            className="block text-sm font-medium leading-6"
          >
            Env Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="envName"
              id="envName"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.envName &&
              state?.errors.envName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="overrideDns"
            className="block text-sm font-medium leading-6"
          >
            Override DNS
          </label>
          <div className="mt-2">
            <input
              id="overrideDns"
              name="overrideDns"
              type="overrideDns"
              autoComplete="overrideDns"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.overrideDns &&
              state?.errors.overrideDns.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        <div className="col-span-full">
          <label htmlFor="reconcile" className="block text-sm font-medium leading-6">
            Reconcile
          </label>
          <div className="mt-2">
            <select
              id="reconcile"
              name="reconcile"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>true</option>
              <option>false</option>
              
            </select>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.reconcile &&
              state?.errors.reconcile.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="clusterSize" className="block text-sm font-medium leading-6">
            Cluser Size
          </label>
          <div className="mt-2">
            <select
              id="clusterSize"
              name="clusterSize"
              className="block w-full rounded-md border-0 bg-gray-200 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>XLarge</option>
              <option>Custom</option>
            </select>
          </div>

          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.clusterSize &&
              state?.errors.clusterSize.map((error: string) => (
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
