import ProjectForm from "@/components/dashboard/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[24px] font-semibold tracking-tight text-white/90">Nouveau projet</h1>
        <p className="text-[13px] text-white/35">Ajoutez un nouveau projet à votre portfolio.</p>
      </div>

      <ProjectForm mode="create" />
    </div>
  );
}
