import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import BlogFormModal from "./BlogFormModal";

export default function AdminBlog() {
  const { data: posts, isLoading, refetch } = trpc.blog.listAll.useQuery({ limit: 100 });
  const deleteMutation = trpc.blog.delete.useMutation();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja deletar este artigo?")) {
      await deleteMutation.mutateAsync(id);
      refetch();
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPost(null);
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-foreground">Gerenciar Artigos</h2>
        <Button
          onClick={() => {
            setEditingPost(null);
            setIsFormOpen(true);
          }}
          className="bg-primary text-primary-foreground"
        >
          + Novo Artigo
        </Button>
      </div>

      {isFormOpen && (
        <BlogFormModal
          post={editingPost}
          onClose={handleCloseForm}
          onSuccess={handleCloseForm}
        />
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-primary" />
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-foreground">{post.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      post.published === 1
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {post.published === 1 ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Categoria: {post.category}</span>
                    <span>Autor: {post.author}</span>
                    <span>Criado: {new Date(post.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(post)}
                    className="gap-1"
                  >
                    <Edit2 size={16} />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
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
          <p className="text-muted-foreground">Nenhum artigo encontrado</p>
        </Card>
      )}
    </div>
  );
}
