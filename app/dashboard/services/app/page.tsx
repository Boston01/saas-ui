'use client'
import Breadcrumbs from "@/app/ui/users/breadcrumbs";
export default function App() {
  return (
    <main className="mx-4 my-4">
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
            href: '/dashboard/services/app',
            active: true,
          },
        ]}
      />
      
    </main>
  )
}