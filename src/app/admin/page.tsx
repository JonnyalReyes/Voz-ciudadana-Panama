import { redirect } from "next/navigation";
import { auth } from "../../auth";
import AdminDashboard from "@/src/components/admin-dashboard";

export default async function AdminPage() {
  // 1. Obtenemos la sesión en el servidor
  const session = await auth();

  console.log("SESIÓN EN /admin:", session);

  // 2. Verificamos si el usuario es administrador
  if (!session || session.user?.role !== 'admin') {
    redirect('/');
  }

  // 3. Si es un admin, renderizamos el panel de control.
  return <AdminDashboard adminName={session.user.name} />;
}