import { notFound } from "next/navigation";
import { fetchWithAuth } from "@/lib/auth";
import ProjectForm from "@/components/dashboard/ProjectForm";

async function getProject(id) {
  try {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/projects/admin/${id}/`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[24px] font-semibold tracking-tight text-white/90">
          Modifier — {project.title}
        </h1>
        <p className="text-[13px] text-white/35">Mettez à jour les informations de ce projet.</p>
      </div>

      <ProjectForm mode="edit" initialData={project} />
    </div>
  );
}
