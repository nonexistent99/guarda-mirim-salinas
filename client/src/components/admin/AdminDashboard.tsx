import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { data: messages, isLoading: messagesLoading } = trpc.messages.list.useQuery({ limit: 1000 });
  const { data: posts, isLoading: postsLoading } = trpc.blog.listAll.useQuery({ limit: 1000 });

  const unreadMessages = messages?.filter((m) => m.read === 0).length || 0;
  const publishedPosts = posts?.filter((p) => p.published === 1).length || 0;
  const totalMessages = messages?.length || 0;

  const stats = [
    {
      label: "Artigos Publicados",
      value: publishedPosts,
      icon: "📝",
      color: "bg-blue-50",
    },
    {
      label: "Total de Artigos",
      value: posts?.length || 0,
      icon: "📚",
      color: "bg-purple-50",
    },
    {
      label: "Mensagens Não Lidas",
      value: unreadMessages,
      icon: "💬",
      color: "bg-red-50",
    },
    {
      label: "Total de Mensagens",
      value: totalMessages,
      icon: "📧",
      color: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className={`p-6 ${stat.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <span className="text-3xl">{stat.icon}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Messages */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Mensagens Recentes</h2>
        {messagesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {messages.slice(0, 5).map((msg) => (
              <div
                key={msg.id}
                className={`p-3 rounded-lg border ${
                  msg.read === 0
                    ? "bg-blue-50 border-blue-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{msg.name}</p>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                    <p className="text-sm text-foreground mt-1">{msg.subject}</p>
                  </div>
                  {msg.read === 0 && (
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">
                      Novo
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Nenhuma mensagem</p>
        )}
      </Card>
    </div>
  );
}
