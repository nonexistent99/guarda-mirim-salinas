import { Link } from "wouter";
import { Calendar, Clock, Tag } from "lucide-react";
import { BlogPost, categories } from "@/data/blog-posts";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const category = categories.find(c => c.id === post.category);

  return (
    <Link href={`/blog/${post.id}`} className="group h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover-lift hover:border-primary/50">
        <div className="relative h-48 overflow-hidden bg-muted sm:h-56">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute left-4 top-4">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                category?.color === "primary"
                  ? "bg-primary"
                  : category?.color === "secondary"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-accent"
              }`}
            >
              <Tag size={12} />
              {category?.label}
            </span>
          </div>
        </div>

        <div className="flex flex-grow flex-col p-6">
          <h3 className="mb-3 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {post.title}
          </h3>

          <p className="mb-4 line-clamp-2 flex-grow text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readTime} min</span>
            </div>
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">
              Por{" "}
              <span className="font-semibold text-foreground">
                {post.author}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
