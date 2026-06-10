import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MessageDetailModalProps {
  message: any;
  onClose: () => void;
}

export default function MessageDetailModal({ message, onClose }: MessageDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-background">
          <h2 className="text-xl font-bold text-foreground">Detalhes da Mensagem</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Nome
              </label>
              <p className="text-foreground">{message.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <a
                href={`mailto:${message.email}`}
                className="text-primary hover:underline"
              >
                {message.email}
              </a>
            </div>
          </div>

          {message.phone && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Telefone
              </label>
              <a
                href={`tel:${message.phone}`}
                className="text-primary hover:underline"
              >
                {message.phone}
              </a>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Assunto
            </label>
            <p className="text-foreground font-medium">{message.subject}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Data
            </label>
            <p className="text-foreground">
              {new Date(message.createdAt).toLocaleDateString("pt-BR")} às{" "}
              {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Mensagem
            </label>
            <div className="bg-muted p-4 rounded-lg border border-border">
              <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button
              onClick={() => {
                window.location.href = `mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`;
              }}
              className="bg-primary text-primary-foreground"
            >
              Responder por Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
