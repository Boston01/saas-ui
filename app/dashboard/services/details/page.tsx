import Breadcrumbs from "@/app/ui/users/breadcrumbs";
import { useParams, useSearchParams } from "next/navigation";

export default function Detail({specs}: {specs: any}) {
  // const parameters = useSearchParams();
  // console.log("The parameters are =========>", specs)
  return (
    <main className="mx-4 my-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Services', href: '/dashboard/services' },
          {
            label: 'Specs Envs',
            href: '/dashboard/services/details',
            active: true,
          },
          {
            label: 'Opensee Application',
            href: '/dashboard/services/app',
            active: false,
          },
        ]}
      />
      {/* <Specs/> */}
      {/* <div>{specs}</div> */}
    </main>
  )
}