import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  sourceStatusLabels,
  timelineItems,
  typeLabels,
} from "@/data/guardTimeline";
import { ExternalLink, History, Plus } from "lucide-react";

const timelineFields = [
  "ano",
  "data",
  "título",
  "subtítulo",
  "tipo",
  "turma",
  "número do exame",
  "geração",
  "descrição factual",
  "texto emocional",
  "imagem principal",
  "galeria",
  "link do Instagram",
  "link da fonte",
  "status da fonte",
  "tags",
  "mostrar na home",
  "destaque",
  "ordem",
  "status editorial",
];

export default function AdminTimeline() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Linha do tempo / Turmas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Estrutura preparada para cadastrar marcos, exames, formações,
            formaturas e memórias com fonte.
          </p>
        </div>
        <Button className="gap-2" disabled>
          <Plus size={18} />
          Novo marco
        </Button>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <History className="text-primary" size={20} />
          <h3 className="font-bold">Campos editoriais previstos</h3>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {timelineFields.map(field => (
            <div
              key={field}
              className="rounded-md border border-border bg-muted/35 px-3 py-2 text-sm font-medium"
            >
              {field}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-4">
        {timelineItems.map(item => (
          <Card key={item.id} className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
                    {item.year}
                  </span>
                  <span className="rounded-md bg-secondary/15 px-2 py-1 text-xs font-bold text-secondary-foreground">
                    {typeLabels[item.type]}
                  </span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                    {sourceStatusLabels[item.sourceStatus]}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className="flex gap-2">
                {item.sourceUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Fonte
                      <ExternalLink size={15} />
                    </a>
                  </Button>
                )}
                {item.instagramUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                      <ExternalLink size={15} />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

