import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import GridBackground from "@/components/GridBackground";

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08080A]">
      <GridBackground />

      <div className="relative z-10 flex">
        <DashboardSidebar user={user} />

        <main className="flex-1 px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
