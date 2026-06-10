import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import {
  Archive,
  FileText,
  History,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import { timelineItems } from "@/data/guardTimeline";

export default function AdminDashboard() {
  const { data: messages, isLoading: messagesLoading } =
    trpc.messages.list.useQuery({ limit: 1000 });
  const { data: posts } = trpc.blog.listAll.useQuery({ limit: 1000 });

  const unreadMessages =
    messages?.filter(message => message.read === 0).length || 0;
  const publishedPosts = posts?.filter(post => post.published === 1).length || 0;
  const totalMessages = messages?.length || 0;
  const needsConfirmation = timelineItems.filter(
    item => item.sourceStatus === "needs_confirmation"
  ).length;

  const stats = [
    {
      label: "Marcos na timeline",
      value: timelineItems.length,
      icon: History,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "A confirmar",
      value: needsConfirmation,
      icon: Archive,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Artigos publicados",
      value: publishedPosts,
      icon: FileText,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Mensagens não lidas",
      value: unreadMessages,
      icon: MessageSquare,
      color: "bg-red-50 text-red-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-md ${stat.color}`}
              >
                <stat.icon size={22} />
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Mail size={20} />
          Mensagens recentes
        </h2>
        {messagesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="max-h-96 space-y-3 overflow-y-auto">
            {messages.slice(0, 5).map(message => (
              <div
                key={message.id}
                className={`rounded-md border p-3 ${
                  message.read === 0
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {message.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {message.email}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      {message.subject}
                    </p>
                  </div>
                  {message.read === 0 && (
                    <span className="h-fit rounded-md bg-blue-600 px-2 py-1 text-xs text-white">
                      Novo
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            Nenhuma mensagem
          </p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          Total de mensagens: {totalMessages}
        </p>
      </Card>
    </div>
  );
}

