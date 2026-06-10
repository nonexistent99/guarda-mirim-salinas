import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Download, Loader2, Power, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const statusLabels = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

export default function AdminInscricoes() {
  const {
    data: inscriptions,
    isLoading,
    refetch,
  } = trpc.inscriptions.list.useQuery({ limit: 100 });
  const isOpenQuery = trpc.inscriptions.isOpen.useQuery();
  const exportQuery = trpc.inscriptions.exportToExcel.useQuery(undefined, {
    enabled: false,
  });
  const deleteMutation = trpc.inscriptions.delete.useMutation();
  const statusMutation = trpc.inscriptions.updateStatus.useMutation();
  const toggleMutation = trpc.settings.toggleInscriptions.useMutation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof isOpenQuery.data === "boolean") {
      setIsOpen(isOpenQuery.data);
    }
  }, [isOpenQuery.data]);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar esta inscricao?")) return;

    try {
      await deleteMutation.mutateAsync(id);
      await refetch();
      toast.success("Inscricao deletada");
    } catch (error) {
      toast.error("Erro ao deletar inscricao");
      console.error(error);
    }
  };

  const handleStatusChange = async (
    id: number,
    status: "pending" | "approved" | "rejected"
  ) => {
    try {
      await statusMutation.mutateAsync({ id, status });
      await refetch();
      toast.success("Status atualizado");
    } catch (error) {
      toast.error("Erro ao atualizar status");
      console.error(error);
    }
  };

  const handleToggleInscriptions = async () => {
    const nextState = !isOpen;

    try {
      await toggleMutation.mutateAsync(nextState);
      setIsOpen(nextState);
      await isOpenQuery.refetch();
      toast.success(
        nextState ? "Inscricoes habilitadas" : "Inscricoes desabilitadas"
      );
    } catch (error) {
      toast.error("Erro ao alterar inscricoes");
      console.error(error);
    }
  };

  const handleExportExcel = async () => {
    try {
      const { data: result } = await exportQuery.refetch();
      if (!result) {
        toast.error("Nenhum dado para exportar");
        return;
      }

      const binaryString = atob(result.buffer);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `inscricoes-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Arquivo exportado com sucesso");
    } catch (error) {
      toast.error("Erro ao exportar arquivo");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Gerenciar inscricoes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Total: {inscriptions?.length || 0} inscricoes
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleExportExcel}
            disabled={
              exportQuery.isFetching ||
              !inscriptions ||
              inscriptions.length === 0
            }
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <Download size={18} />
            {exportQuery.isFetching ? "Exportando..." : "Exportar Excel"}
          </Button>
          <Button
            onClick={handleToggleInscriptions}
            disabled={toggleMutation.isPending || isOpenQuery.isLoading}
            className={`gap-2 ${
              isOpen
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <Power size={18} />
            {isOpen ? "Abertas" : "Fechadas"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary" />
        </div>
      ) : inscriptions && inscriptions.length > 0 ? (
        <div className="grid gap-4">
          {inscriptions.map(inscription => (
            <Card key={inscription.id} className="p-4">
              <div className="mb-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Numero de inscricao
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {inscription.inscriptionNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nome</p>
                  <p className="font-semibold text-foreground">
                    {inscription.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {inscription.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="text-sm text-muted-foreground">
                    {inscription.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Escola</p>
                  <p className="text-sm text-muted-foreground">
                    {inscription.schoolName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Data de inscricao
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(inscription.createdAt).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusColors[
                      inscription.status as keyof typeof statusColors
                    ]
                  }`}
                >
                  {
                    statusLabels[
                      inscription.status as keyof typeof statusLabels
                    ]
                  }
                </span>

                <div className="ml-auto flex flex-wrap gap-2">
                  {inscription.status !== "approved" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStatusChange(inscription.id, "approved")
                      }
                      disabled={statusMutation.isPending}
                      className="gap-1 border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Check size={16} />
                      Aprovar
                    </Button>
                  )}

                  {inscription.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStatusChange(inscription.id, "rejected")
                      }
                      disabled={statusMutation.isPending}
                      className="gap-1 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <X size={16} />
                      Rejeitar
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(inscription.id)}
                    disabled={deleteMutation.isPending}
                    className="gap-1"
                  >
                    <Trash2 size={16} />
                    Deletar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Nenhuma inscricao encontrada</p>
        </Card>
      )}
    </div>
  );
}
