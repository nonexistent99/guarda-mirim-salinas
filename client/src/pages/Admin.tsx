import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminInscricoes from "@/components/admin/AdminInscricoes";
import AdminTimeline from "@/components/admin/AdminTimeline";
import AdminMemorias from "@/components/admin/AdminMemorias";
import AdminSelectionContent from "@/components/admin/AdminSelectionContent";
import {
  FileText,
  History,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  ScrollText,
} from "lucide-react";

type ActiveTab =
  | "dashboard"
  | "timeline"
  | "memorias"
  | "processo"
  | "blog"
  | "messages"
  | "inscricoes";

const navItems: Array<{
  id: ActiveTab;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "timeline", label: "Linha do tempo", icon: History },
  { id: "memorias", label: "Memórias", icon: Inbox },
  { id: "processo", label: "Processo seletivo", icon: ScrollText },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "inscricoes", label: "Inscrições", icon: FileText },
  { id: "messages", label: "Mensagens", icon: MessageSquare },
];

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, loading, user, setLocation]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
          <p className="text-muted-foreground">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold text-foreground">
            Painel Administrativo
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gerencie conteúdo, inscrições, memórias e a linha do tempo.
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-border">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`inline-flex shrink-0 items-center gap-2 px-4 py-2 font-medium transition-colors ${
                activeTab === item.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "timeline" && <AdminTimeline />}
          {activeTab === "memorias" && <AdminMemorias />}
          {activeTab === "processo" && <AdminSelectionContent />}
          {activeTab === "blog" && <AdminBlog />}
          {activeTab === "inscricoes" && <AdminInscricoes />}
          {activeTab === "messages" && <AdminMessages />}
        </div>
      </div>
    </DashboardLayout>
  );
}

