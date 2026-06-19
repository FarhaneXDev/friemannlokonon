import { notFound } from "next/navigation";
import { fetchWithAuth } from "@/lib/auth";
import ServiceForm from "@/components/dashboard/ServiceForm";

async function getService(id) {
  try {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/services/admin/${id}/`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function EditServicePage({ params }) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[24px] font-semibold tracking-tight text-white/90">
          Modifier — {service.name}
        </h1>
        <p className="text-[13px] text-white/35">Mettez à jour les informations de ce service.</p>
      </div>
      <ServiceForm mode="edit" initialData={service} />
    </div>
  );
}
