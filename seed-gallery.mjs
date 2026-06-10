import { drizzle } from "drizzle-orm/mysql2";
import { galleryPhotos } from "./drizzle/schema.ts";

const photos = [
  {
    title: "Jovens aprendizes em grupo",
    description: "Registro institucional dos jovens da Guarda Mirim.",
    imageUrl: "/jovem-aprendiz-group.jpg",
    category: "atividade",
  },
  {
    title: "Treinamento profissional",
    description: "Momento de formacao e preparacao para o mercado de trabalho.",
    imageUrl: "/training-group.png",
    category: "treinamento",
  },
  {
    title: "Vista de Salinas",
    description: "A cidade que inspira o trabalho da Guarda Mirim.",
    imageUrl: "/salinas-city-view.jpg",
    category: "outro",
  },
  {
    title: "Salinas vista do alto",
    description: "Panorama da comunidade atendida pela instituicao.",
    imageUrl: "/salinas-aerial.jpg",
    category: "evento",
  },
];

async function seedGallery() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed gallery photos");
  }

  const db = drizzle(process.env.DATABASE_URL);

  for (const photo of photos) {
    await db.insert(galleryPhotos).values({
      ...photo,
      photographer: "Guarda Mirim",
      featured: 1,
      published: 1,
      date: "2025-01-01",
    });
    console.log(`Seeded: ${photo.title}`);
  }

  console.log("Gallery seed complete");
  process.exit(0);
}

seedGallery().catch(error => {
  console.error(error);
  process.exit(1);
});
