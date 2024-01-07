import { getServices } from "@/app/lib/data"

const services1 = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    // More items...
  ]
  
  export default async function ServicesPage() {

    const services = await getServices();
    
    if (services1.length === 0) {
        return (
            <div>
                There is no services
            </div>
        )
    }
    return (
      <ul role="list" className="space-y-3 ">
        {services.map((serivce: any) => (
          <li key={serivce.id} className="overflow-hidden  bg-slate-300 rounded-md px-6 py-4 shadow">
            {/* Your content */}
          </li>
        ))}
      </ul>
    )
  }