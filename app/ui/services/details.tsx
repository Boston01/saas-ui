import Breadcrumbs from "@/app/ui/users/breadcrumbs";
export default function Details({specs}: {specs: any}) {
 
    console.log("The parameters are =========>", specs)
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
        <div>{specs}</div>
      </main>
    )
  }