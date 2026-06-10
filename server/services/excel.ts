import * as XLSX from "xlsx";
import { getDb } from "../db";
import { inscriptions } from "../../drizzle/schema";
import { desc } from "drizzle-orm";

export async function exportInscriptionsToExcel(): Promise<Buffer> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const data = await db
    .select()
    .from(inscriptions)
    .orderBy(desc(inscriptions.createdAt));

  // Preparar dados para Excel (remover dados sensíveis conforme LGPD)
  const exportData = data.map((item) => ({
    "Número de Inscrição": item.inscriptionNumber,
    "Nome Completo": item.fullName,
    "Email": item.email,
    "Telefone": item.phone,
    "Data de Nascimento": item.birthDate,
    // CPF não será exportado por questões de LGPD
    "Endereço": item.address,
    "Cidade": item.city,
    "Estado": item.state,
    "CEP": item.zipCode,
    "Escola": item.schoolName,
    "Série": item.schoolGrade,
    "Responsável": item.parentName,
    "Telefone do Responsável": item.parentPhone,
    "Status": item.status,
    "Data de Inscrição": new Date(item.createdAt).toLocaleDateString("pt-BR"),
  }));

  // Criar workbook
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Ajustar largura das colunas
  const columnWidths = [
    { wch: 18 }, // Número de Inscrição
    { wch: 25 }, // Nome Completo
    { wch: 25 }, // Email
    { wch: 15 }, // Telefone
    { wch: 15 }, // Data de Nascimento
    { wch: 30 }, // Endereço
    { wch: 15 }, // Cidade
    { wch: 8 },  // Estado
    { wch: 12 }, // CEP
    { wch: 25 }, // Escola
    { wch: 10 }, // Série
    { wch: 25 }, // Responsável
    { wch: 18 }, // Telefone do Responsável
    { wch: 12 }, // Status
    { wch: 15 }, // Data de Inscrição
  ];

  worksheet["!cols"] = columnWidths;

  // Estilizar header
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "1949 8B" } },
    alignment: { horizontal: "center", vertical: "center" },
  };

  // Aplicar estilo ao header
  for (let i = 0; i < exportData.length + 1; i++) {
    const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: i })];
    if (cell) {
      cell.s = headerStyle;
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inscrições");

  // Converter para buffer
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return buffer;
}
