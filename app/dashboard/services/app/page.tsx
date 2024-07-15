import Breadcrumbs from "@/app/ui/users/breadcrumbs";


export default function App() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Services', href: '/dashboard/services' },
          {
            label: 'Specs Envs',
            href: '/dashboard/services/details',
            active: false,
          },
          {
            label: 'Opensee Application',
            href: '/dashboard/services/details',
            active: true,
          },
        ]}
      />
      
    </main>
  )
}