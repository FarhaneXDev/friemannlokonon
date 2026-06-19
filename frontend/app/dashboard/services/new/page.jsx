import ServiceForm from "@/components/dashboard/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[24px] font-semibold tracking-tight text-white/90">Nouveau service</h1>
        <p className="text-[13px] text-white/35">Ajoutez une nouvelle offre à votre portfolio.</p>
      </div>
      <ServiceForm mode="create" />
    </div>
  );
}
