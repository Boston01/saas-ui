import Form from "@/app/ui/services/create-service-form";
import Breadcrumbs from "@/app/ui/users/breadcrumbs";


export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Services', href: '/dashboard/services' },
          {
            label: 'Add service',
            href: '/dashboard/services/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  )
}