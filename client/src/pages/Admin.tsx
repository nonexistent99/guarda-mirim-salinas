import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminInscricoes from "@/components/admin/AdminInscricoes";

export default function Admin() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"dashboard" | "blog" | "messages" | "inscricoes">("dashboard");

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, loading, user, setLocation]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "blog", label: "Blog", icon: "📝" },
    { id: "inscricoes", label: "Inscrições", icon: "📋" },
    { id: "messages", label: "Mensagens", icon: "💬" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-border pb-4">
          <h1 className="text-3xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="text-muted-foreground mt-1">Gerencie o conteúdo e mensagens da Guarda Mirim</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-border">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === item.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "blog" && <AdminBlog />}
          {activeTab === "inscricoes" && <AdminInscricoes />}
          {activeTab === "messages" && <AdminMessages />}
        </div>
      </div>
    </DashboardLayout>
  );
}
