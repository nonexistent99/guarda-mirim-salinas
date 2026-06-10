import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArchiveRestore, Check, Clock, FilePlus2, X } from "lucide-react";

const memoryFields = [
  "nome",
  "relação com a Guarda",
  "ano/turma aproximada",
  "foto",
  "relato",
  "autorização de uso",
  "contato",
  "status",
  "converter em item da timeline",
];

const workflow = [
  {
    icon: Clock,
    title: "Aguardando aprovação",
    text: "Relato recebido pelo formulário entra como material pendente.",
  },
  {
    icon: Check,
    title: "Aprovado",
    text: "Memória validada pode virar card da timeline ou item do acervo.",
  },
  {
    icon: X,
    title: "Recusado",
    text: "Relatos sem autorização ou contexto mínimo permanecem fora do site.",
  },
];

export default function AdminMemorias() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Memórias enviadas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Módulo preparado para revisar fotos, relatos e autorizações antes da
            publicação.
          </p>
        </div>
        <Button className="gap-2" disabled>
          <FilePlus2 size={18} />
          Cadastrar memória
        </Button>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <ArchiveRestore className="text-primary" size={20} />
          <h3 className="font-bold">Campos previstos</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {memoryFields.map(field => (
            <div
              key={field}
              className="rounded-md border border-border bg-muted/35 px-3 py-2 text-sm font-medium"
            >
              {field}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {workflow.map(step => (
          <Card key={step.title} className="p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <step.icon size={22} />
            </div>
            <h3 className="font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {step.text}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

