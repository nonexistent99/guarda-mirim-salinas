import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ExternalLink,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { trpc } from "@/lib/trpc";

const officialContacts = [
  {
    icon: Phone,
    title: "Telefone oficial",
    value: "(38) 3841-6512",
    link: "tel:+553838416512",
  },
  {
    icon: Mail,
    title: "E-mail oficial",
    value: "guardamirim@salinas.mg.gov.br",
    link: "mailto:guardamirim@salinas.mg.gov.br",
  },
  {
    icon: MapPin,
    title: "Endereço",
    value: "R. Ver. Corinto Pereira de Castro, 163 - Bairro Alvorada",
    link: "https://www.google.com/maps/search/?api=1&query=R.%20Ver.%20Corinto%20Pereira%20de%20Castro%20163%20Bairro%20Alvorada%20Salinas%20MG",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@guardamirimsalinas",
    link: "https://www.instagram.com/guardamirimsalinas/",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    relation: "",
    approxYear: "",
    message: "",
    authorized: false,
  });

  const createMessageMutation = trpc.messages.create.useMutation();
  const isSubmitting = createMessageMutation.isPending;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Preencha nome, e-mail e relato.");
      return;
    }

    if (!formData.authorized) {
      toast.error("Confirme a autorização antes de enviar a memória.");
      return;
    }

    const message = [
      `Relação com a Guarda: ${formData.relation || "não informado"}`,
      `Ano/turma aproximada: ${formData.approxYear || "não informado"}`,
      `Autorização de uso de imagem/relato: sim`,
      "",
      formData.message,
    ].join("\n");

    try {
      await createMessageMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: "Memória para a linha do tempo",
        message,
      });

      toast.success("Memória enviada para revisão. Obrigado por ajudar.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        relation: "",
        approxYear: "",
        message: "",
        authorized: false,
      });
    } catch (error) {
      toast.error("Erro ao enviar. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <section id="contato" className="bg-white py-20 text-[#10264d] md:py-28">
      <div className="container">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#caa24a]/45 bg-[#fff7df] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#8a6a1e]">
              <Send size={16} />
              Contato e envio de memória
            </div>
            <h2 className="text-4xl font-black leading-[0.95] md:text-6xl">
              Uma foto antiga pode abrir uma nova página.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-700 md:text-lg">
              Envie relatos, informações de turma ou interesse de parceria. O
              conteúdo recebido deve ser revisado antes de aparecer no site.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <AnimatedSection direction="right">
            <div className="grid gap-4">
              {officialContacts.map(contact => (
                <a
                  key={contact.title}
                  href={contact.link}
                  target={contact.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    contact.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-start gap-4 border border-slate-200 bg-[#fbfaf4] p-5 transition-colors hover:border-[#caa24a]/70"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#10264d]/15 bg-white text-[#10264d]">
                    <contact.icon size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                      {contact.title}
                    </span>
                    <span className="mt-1 flex items-center gap-2 break-words text-base font-bold text-[#10264d]">
                      {contact.value}
                      {contact.link.startsWith("http") && (
                        <ExternalLink
                          size={15}
                          className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                        />
                      )}
                    </span>
                  </span>
                </a>
              ))}
              <div className="border border-dashed border-[#caa24a]/70 bg-[#f6f3ea] p-5 text-sm leading-7 text-slate-700">
                Fonte dos contatos: página oficial da Guarda Mirim no portal da
                Prefeitura de Salinas.
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12} direction="left">
            <form
              onSubmit={handleSubmit}
              className="border border-[#d8cda8] bg-[#f6f3ea] p-5 md:p-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="memory-name"
                    className="mb-2 block text-sm font-bold"
                  >
                    Nome *
                  </label>
                  <Input
                    id="memory-name"
                    value={formData.name}
                    onChange={event =>
                      setFormData({ ...formData, name: event.target.value })
                    }
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="memory-email"
                    className="mb-2 block text-sm font-bold"
                  >
                    E-mail *
                  </label>
                  <Input
                    id="memory-email"
                    type="email"
                    value={formData.email}
                    onChange={event =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="memory-phone"
                    className="mb-2 block text-sm font-bold"
                  >
                    Telefone
                  </label>
                  <Input
                    id="memory-phone"
                    value={formData.phone}
                    onChange={event =>
                      setFormData({ ...formData, phone: event.target.value })
                    }
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="memory-relation"
                    className="mb-2 block text-sm font-bold"
                  >
                    Relação com a Guarda
                  </label>
                  <Input
                    id="memory-relation"
                    placeholder="ex-mirim, familiar, instrutor, parceiro"
                    value={formData.relation}
                    onChange={event =>
                      setFormData({
                        ...formData,
                        relation: event.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="memory-year"
                    className="mb-2 block text-sm font-bold"
                  >
                    Ano ou turma aproximada
                  </label>
                  <Input
                    id="memory-year"
                    placeholder="ex.: turma 2024, desfile de 7 de setembro"
                    value={formData.approxYear}
                    onChange={event =>
                      setFormData({
                        ...formData,
                        approxYear: event.target.value,
                      })
                    }
                    disabled={isSubmitting}
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="memory-message"
                    className="mb-2 block text-sm font-bold"
                  >
                    Relato *
                  </label>
                  <Textarea
                    id="memory-message"
                    rows={6}
                    placeholder="Conte a lembrança, indique fonte, pessoa, turma ou contexto da foto."
                    value={formData.message}
                    onChange={event =>
                      setFormData({
                        ...formData,
                        message: event.target.value,
                      })
                    }
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <label className="mt-5 flex gap-3 text-sm leading-6 text-slate-700">
                <input
                  type="checkbox"
                  checked={formData.authorized}
                  onChange={event =>
                    setFormData({
                      ...formData,
                      authorized: event.target.checked,
                    })
                  }
                  className="mt-1 h-4 w-4 accent-[#10264d]"
                  disabled={isSubmitting}
                />
                Autorizo o contato da equipe e o uso do relato/imagem enviada
                após revisão e aprovação.
              </label>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 h-12 w-full rounded-md bg-[#10264d] font-black text-white hover:bg-[#173869]"
              >
                {isSubmitting ? "Enviando..." : "Enviar para revisão"}
                <Send size={18} />
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

