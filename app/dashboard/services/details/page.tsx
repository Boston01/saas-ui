import Breadcrumbs from "@/app/ui/users/breadcrumbs";


export default function Details() {
  return (
    <main>
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
      
    </main>
  )
}