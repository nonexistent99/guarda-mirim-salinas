import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import MessageDetailModal from "./MessageDetailModal";

export default function AdminMessages() {
  const { data: messages, isLoading, refetch } = trpc.messages.list.useQuery({ limit: 100 });
  const deleteMutation = trpc.messages.delete.useMutation();
  const readMutation = trpc.messages.markAsRead.useMutation();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar esta mensagem?")) {
      await deleteMutation.mutateAsync(id);
      refetch();
    }
  };

  const handleMarkAsRead = async (id: number, isRead: boolean) => {
    if (!isRead) {
      await readMutation.mutateAsync(id);
      refetch();
    }
  };

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setIsDetailOpen(true);
    if (message.read === 0) {
      handleMarkAsRead(message.id, false);
    }
  };

  const unreadCount = messages?.filter((m) => m.read === 0).length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-foreground">Mensagens de Contato</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-red-600 mt-1">
              {unreadCount} mensagem{unreadCount !== 1 ? "s" : ""} não lida{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {isDetailOpen && selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedMessage(null);
          }}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary" />
        </div>
      ) : messages && messages.length > 0 ? (
        <div className="grid gap-3">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 cursor-pointer transition-colors hover:bg-muted ${
                message.read === 0 ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0" onClick={() => handleViewMessage(message)}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground truncate">{message.name}</h3>
                    {message.read === 0 && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap">
                        Novo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                  {message.phone && (
                    <p className="text-sm text-muted-foreground truncate">{message.phone}</p>
                  )}
                  <p className="text-sm font-medium text-foreground mt-1 truncate">
                    {message.subject}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {message.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(message.createdAt).toLocaleDateString("pt-BR")} às{" "}
                    {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewMessage(message)}
                    className="gap-1"
                  >
                    <Eye size={16} />
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(message.id)}
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
          <p className="text-muted-foreground">Nenhuma mensagem encontrada</p>
        </Card>
      )}
    </div>
  );
}
