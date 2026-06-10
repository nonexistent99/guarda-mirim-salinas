import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { selectionStatus } from "@/data/guardTimeline";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSelectionContent() {
  const [formData, setFormData] = useState({
    status: selectionStatus.statusLabel,
    title: selectionStatus.title,
    description: selectionStatus.description,
    nextStep: selectionStatus.nextStep,
    editalUrl: selectionStatus.editalUrl,
    registrationUrl: selectionStatus.registrationUrl,
    resultUrl: selectionStatus.resultUrl,
    showOnHero: "sim",
    showOnHome: "sim",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.info("Estrutura preparada. Persistência no banco ainda não ligada.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Conteúdo do processo seletivo
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Campos editoriais para controlar o bloco público de inscrições sem
          depender de texto fixo na home.
        </p>
      </div>

      <Card className="p-5">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>
            <Input
              value={formData.status}
              onChange={event =>
                setFormData({ ...formData, status: event.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Título</label>
            <Input
              value={formData.title}
              onChange={event =>
                setFormData({ ...formData, title: event.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">Descrição</label>
            <Textarea
              rows={4}
              value={formData.description}
              onChange={event =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Próxima etapa
            </label>
            <Input
              value={formData.nextStep}
              onChange={event =>
                setFormData({ ...formData, nextStep: event.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Link do edital
            </label>
            <Input
              value={formData.editalUrl}
              onChange={event =>
                setFormData({ ...formData, editalUrl: event.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Link de inscrição
            </label>
            <Input
              value={formData.registrationUrl}
              onChange={event =>
                setFormData({
                  ...formData,
                  registrationUrl: event.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Link de resultado
            </label>
            <Input
              value={formData.resultUrl}
              onChange={event =>
                setFormData({ ...formData, resultUrl: event.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Mostrar no hero
              </label>
              <Input
                value={formData.showOnHero}
                onChange={event =>
                  setFormData({ ...formData, showOnHero: event.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Mostrar na home
              </label>
              <Input
                value={formData.showOnHome}
                onChange={event =>
                  setFormData({ ...formData, showOnHome: event.target.value })
                }
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Button className="gap-2" type="submit">
              <Save size={18} />
              Salvar rascunho
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
