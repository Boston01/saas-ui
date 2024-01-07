export default function BillingPage() {
  return (
    <main>
      <div className="bg-slate-200 rounded-xl  h-44 w-full flex flex-1 flex-col gap-4">
        <div className="mt-4 px-5 font-bold">Payment method</div>
        <div className="px-5">
          {" "}
          Add a credit card to continue using Opensee once your free trial
          ends.
        </div>
        <div className="px-5">
          {" "}
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div className="flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <p>Credit card</p>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
