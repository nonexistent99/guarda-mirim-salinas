import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getBlogPosts,
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getContactMessages,
  createContactMessage,
  markMessageAsRead,
  deleteContactMessage,
  createInscription,
  getInscriptions,
  getInscriptionByNumber,
  getInscriptionById,
  updateInscriptionStatus,
  deleteInscription,
  getSetting,
  setSetting,
  isInscriptionOpen,
  generateInscriptionNumber,
  getGalleryPhotos,
  getGalleryPhotoById,
  createGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto,
} from "./db";
import {
  checkCPFExists,
  checkEmailExists,
  isValidCPF,
  isValidEmail,
} from "./services/validation";
import {
  sendInscriptionApprovedEmail,
  sendInscriptionRejectedEmail,
  sendInscriptionConfirmationEmail,
} from "./services/email";
import { exportInscriptionsToExcel } from "./services/excel";
import { authenticateAdmin, createAdminUser } from "./services/auth";
import { sdk } from "./_core/sdk";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    login: publicProcedure
      .input(
        z.object({
          username: z.string().min(1),
          password: z.string().min(1),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const result = await authenticateAdmin(input.username, input.password);

        if (!result.success) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: result.message,
          });
        }

        // Criar token JWT
        const token = await sdk.createToken({
          userId: result.user.id,
          role: "admin",
          name: result.user.username,
        });

        // Definir cookie com o token
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(COOKIE_NAME, token, {
          ...cookieOptions,
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
        });

        // Retornar dados do usuário com role de admin
        return {
          success: true,
          user: {
            ...result.user,
            role: "admin",
          },
        };
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    createAdminUser: adminProcedure
      .input(
        z.object({
          username: z.string().min(1),
          email: z.string().email(),
          password: z.string().min(6),
        })
      )
      .mutation(async ({ input }) => {
        const result = await createAdminUser(
          input.username,
          input.email,
          input.password
        );
        return result;
      }),
  }),

  // Blog Router
  blog: router({
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(({ input }) => getBlogPosts(input.limit, input.offset)),

    getById: publicProcedure
      .input(z.number())
      .query(({ input }) => getBlogPostById(input)),

    listAll: adminProcedure
      .input(
        z.object({
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(({ input }) => getAllBlogPosts(input.limit, input.offset)),

    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          slug: z.string().min(1),
          excerpt: z.string().min(1),
          content: z.string().min(1),
          category: z.enum(["noticia", "destaque", "evento", "depoimento"]),
          author: z.string().min(1),
          image: z.string().optional(),
          readTime: z.number().default(5),
          featured: z.number().default(0),
          published: z.number().default(0),
        })
      )
      .mutation(({ input }) => createBlogPost(input)),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          data: z.object({
            title: z.string().optional(),
            slug: z.string().optional(),
            excerpt: z.string().optional(),
            content: z.string().optional(),
            category: z
              .enum(["noticia", "destaque", "evento", "depoimento"])
              .optional(),
            author: z.string().optional(),
            image: z.string().optional(),
            readTime: z.number().optional(),
            featured: z.number().optional(),
            published: z.number().optional(),
          }),
        })
      )
      .mutation(({ input }) => updateBlogPost(input.id, input.data)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => deleteBlogPost(input)),
  }),

  // Inscriptions Router
  inscriptions: router({
    isOpen: publicProcedure.query(async () => {
      return await isInscriptionOpen();
    }),

    create: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(1),
          email: z.string().email(),
          phone: z.string().min(1),
          birthDate: z.string().min(1),
          cpf: z.string().min(1),
          address: z.string().min(1),
          city: z.string().min(1),
          state: z.string().min(1),
          zipCode: z.string().min(1),
          schoolName: z.string().min(1),
          schoolGrade: z.string().min(1),
          parentName: z.string().min(1),
          parentPhone: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        const isOpen = await isInscriptionOpen();
        if (!isOpen) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Inscricoes nao estao abertas",
          });
        }

        if (!isValidCPF(input.cpf)) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "CPF invalido" });
        }

        if (!isValidEmail(input.email)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email invalido",
          });
        }

        const cpfExists = await checkCPFExists(input.cpf);
        if (cpfExists) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "CPF ja cadastrado",
          });
        }

        const emailExists = await checkEmailExists(input.email);
        if (emailExists) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email ja cadastrado",
          });
        }

        const inscriptionNumber = generateInscriptionNumber();
        await createInscription({
          inscriptionNumber,
          ...input,
        });

        try {
          await sendInscriptionConfirmationEmail(
            input.email,
            input.fullName,
            inscriptionNumber
          );
        } catch (error) {
          console.error("Erro ao enviar email de confirmacao:", error);
        }

        return { inscriptionNumber, success: true };
      }),

    getByNumber: publicProcedure
      .input(z.string())
      .query(({ input }) => getInscriptionByNumber(input)),

    list: adminProcedure
      .input(
        z.object({
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(({ input }) => getInscriptions(input.limit, input.offset)),

    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "approved", "rejected"]),
        })
      )
      .mutation(async ({ input }) => {
        await updateInscriptionStatus(input.id, input.status);

        const inscription = await getInscriptionById(input.id);
        if (inscription) {
          try {
            if (input.status === "approved") {
              await sendInscriptionApprovedEmail(
                inscription.email,
                inscription.fullName,
                inscription.inscriptionNumber
              );
            } else if (input.status === "rejected") {
              await sendInscriptionRejectedEmail(
                inscription.email,
                inscription.fullName,
                inscription.inscriptionNumber
              );
            }
          } catch (error) {
            console.error("Erro ao enviar email de status:", error);
          }
        }
      }),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => deleteInscription(input)),

    validateCPF: publicProcedure.input(z.string()).query(async ({ input }) => {
      const exists = await checkCPFExists(input);
      const isValid = isValidCPF(input);
      return { exists, isValid };
    }),

    validateEmail: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const exists = await checkEmailExists(input);
        const isValid = isValidEmail(input);
        return { exists, isValid };
      }),

    exportToExcel: adminProcedure.query(async () => {
      const buffer = await exportInscriptionsToExcel();
      return { success: true, buffer: buffer.toString("base64") };
    }),
  }),

  // Settings Router
  settings: router({
    toggleInscriptions: adminProcedure
      .input(z.boolean())
      .mutation(async ({ input }) => {
        await setSetting("inscriptions_open", input ? "true" : "false");
        return { success: true };
      }),
  }),

  // Contact Messages Router
  messages: router({
    list: adminProcedure
      .input(
        z.object({
          limit: z.number().default(10),
          offset: z.number().default(0),
        })
      )
      .query(({ input }) => getContactMessages(input.limit, input.offset)),

    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          subject: z.string().min(1),
          message: z.string().min(1),
        })
      )
      .mutation(({ input }) => createContactMessage(input)),

    markAsRead: adminProcedure
      .input(z.number())
      .mutation(({ input }) => markMessageAsRead(input)),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => deleteContactMessage(input)),
  }),

  gallery: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(({ input }) => getGalleryPhotos(input?.category)),

    getById: publicProcedure
      .input(z.number())
      .query(({ input }) => getGalleryPhotoById(input)),

    create: adminProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
          imageUrl: z.string().url(),
          category: z.enum([
            "evento",
            "treinamento",
            "atividade",
            "formatura",
            "outro",
          ]),
          date: z.string().optional(),
          photographer: z.string().optional(),
          featured: z.number().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        const data: any = { ...input };
        if (data.date) {
          data.date = new Date(data.date);
        }
        return createGalleryPhoto(data);
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          category: z
            .enum(["evento", "treinamento", "atividade", "formatura", "outro"])
            .optional(),
          date: z.string().optional(),
          photographer: z.string().optional(),
          featured: z.number().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...rest } = input;
        const data: any = { ...rest };
        if (data.date) {
          data.date = new Date(data.date);
        }
        return updateGalleryPhoto(id, data);
      }),

    delete: adminProcedure
      .input(z.number())
      .mutation(({ input }) => deleteGalleryPhoto(input)),
  }),
});

export type AppRouter = typeof appRouter;
