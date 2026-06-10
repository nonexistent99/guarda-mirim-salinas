import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import {
  Download,
  Check,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Inscricao() {
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [inscriptionNumber, setInscriptionNumber] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    cpf: "",
    address: "",
    city: "",
    state: "MG",
    zipCode: "",
    schoolName: "",
    schoolGrade: "",
    parentName: "",
    parentPhone: "",
  });

  const isOpenQuery = trpc.inscriptions.isOpen.useQuery(undefined as any, {
    initialData: false,
  });
  const createMutation = trpc.inscriptions.create.useMutation();
  const validateCPFQuery = trpc.inscriptions.validateCPF.useQuery(
    formData.cpf,
    {
      enabled: formData.cpf.length > 0,
    }
  );
  const validateEmailQuery = trpc.inscriptions.validateEmail.useQuery(
    formData.email,
    {
      enabled: formData.email.length > 0,
    }
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));

      // Limpar erro deste campo
      if (validationErrors[name]) {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [validationErrors]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    const errors: Record<string, string> = {};

    if (!formData.fullName) errors.fullName = "Nome completo é obrigatório";
    if (!formData.email) errors.email = "Email é obrigatório";
    if (!formData.cpf) errors.cpf = "CPF é obrigatório";
    if (!formData.phone) errors.phone = "Telefone é obrigatório";
    if (!formData.birthDate)
      errors.birthDate = "Data de nascimento é obrigatória";
    if (!formData.address) errors.address = "Endereço é obrigatório";
    if (!formData.city) errors.city = "Cidade é obrigatória";
    if (!formData.zipCode) errors.zipCode = "CEP é obrigatório";
    if (!formData.schoolName) errors.schoolName = "Escola é obrigatória";
    if (!formData.schoolGrade) errors.schoolGrade = "Série é obrigatória";
    if (!formData.parentName)
      errors.parentName = "Nome do responsável é obrigatório";
    if (!formData.parentPhone)
      errors.parentPhone = "Telefone do responsável é obrigatório";

    // Validar CPF
    if (validateCPFQuery.data && !validateCPFQuery.data.isValid) {
      errors.cpf = "CPF inválido";
    }
    if (validateCPFQuery.data && validateCPFQuery.data.exists) {
      errors.cpf = "CPF já cadastrado";
    }

    // Validar Email
    if (validateEmailQuery.data && validateEmailQuery.data.exists) {
      errors.email = "Email já cadastrado";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    try {
      const result = await createMutation.mutateAsync(formData);
      setInscriptionNumber(result.inscriptionNumber);
      setStep("confirmation");
      toast.success("Inscrição realizada com sucesso!");
    } catch (error: any) {
      const errorMessage = error?.message || "Erro ao realizar inscrição";
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const generatePDF = async () => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;

    // Header
    pdf.setFillColor(25, 73, 139);
    pdf.rect(0, 0, pageWidth, 40, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text("GUARDA MIRIM DE SALINAS", margin, 20);
    pdf.setFontSize(10);
    pdf.text("Comprovante de Inscrição", margin, 30);

    // Reset text color
    pdf.setTextColor(0, 0, 0);

    // Inscription Number
    pdf.setFontSize(12);
    pdf.setFont(undefined as any, "bold");
    pdf.text("Número de Inscrição:", margin, 60);
    pdf.setFont(undefined as any, "normal");
    pdf.setFontSize(14);
    pdf.setTextColor(25, 73, 139);
    pdf.text(inscriptionNumber, margin, 70);

    // Reset color
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);

    // Data
    const yStart = 90;
    const lineHeight = 8;
    let yPosition = yStart;

    const data = [
      { label: "Nome Completo:", value: formData.fullName },
      { label: "Email:", value: formData.email },
      { label: "Telefone:", value: formData.phone },
      { label: "Data de Nascimento:", value: formData.birthDate },
      { label: "Endereço:", value: formData.address },
      { label: "Cidade:", value: formData.city },
      { label: "Estado:", value: formData.state },
      { label: "CEP:", value: formData.zipCode },
      { label: "Escola:", value: formData.schoolName },
      { label: "Série:", value: formData.schoolGrade },
      { label: "Responsável:", value: formData.parentName },
      { label: "Telefone do Responsável:", value: formData.parentPhone },
    ];

    data.forEach(item => {
      pdf.setFont(undefined as any, "bold");
      pdf.text(item.label, margin, yPosition);
      pdf.setFont(undefined as any, "normal");
      pdf.text(item.value, margin + 60, yPosition);
      yPosition += lineHeight;
    });

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    const footerY = pageHeight - 20;
    pdf.text(
      "Documento gerado automaticamente pelo sistema da Guarda Mirim de Salinas",
      margin,
      footerY
    );
    pdf.text(
      `Data: ${new Date().toLocaleDateString("pt-BR")}`,
      margin,
      footerY + 5
    );

    pdf.save(`comprovante-inscricao-${inscriptionNumber}.pdf`);
  };

  if (isOpenQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isOpenQuery.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 rounded-2xl bg-card border border-border"
          >
            <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Inscrições Fechadas
            </h2>
            <p className="text-muted-foreground mb-6">
              As inscrições para o programa Guarda Mirim de Salinas não estão
              abertas no momento.
            </p>
            <p className="text-sm text-muted-foreground">
              Acompanhe nossas redes sociais para saber quando as inscrições
              serão reabertas.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {step === "form" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border p-8 shadow-lg"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Inscrição - Guarda Mirim
              </h1>
              <p className="text-muted-foreground">
                Preencha o formulário abaixo para se inscrever no programa
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Dados Pessoais
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="fullName"
                      placeholder="Nome Completo *"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={
                        validationErrors.fullName ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      className={validationErrors.email ? "border-red-500" : ""}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.email}
                      </p>
                    )}
                    {formData.email && validateEmailQuery.data && (
                      <div className="flex items-center gap-1 mt-1 text-sm">
                        {validateEmailQuery.data.exists ? (
                          <>
                            <XCircle size={16} className="text-red-500" />
                            <span className="text-red-500">
                              Email já cadastrado
                            </span>
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-green-500">
                              Email disponível
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <Input
                      name="phone"
                      placeholder="Telefone *"
                      value={formData.phone}
                      onChange={handleChange}
                      className={validationErrors.phone ? "border-red-500" : ""}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      name="birthDate"
                      type="date"
                      placeholder="Data de Nascimento *"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={
                        validationErrors.birthDate ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.birthDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.birthDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      name="cpf"
                      placeholder="CPF (000.000.000-00) *"
                      value={formData.cpf}
                      onChange={handleChange}
                      className={validationErrors.cpf ? "border-red-500" : ""}
                    />
                    {validationErrors.cpf && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.cpf}
                      </p>
                    )}
                    {formData.cpf && validateCPFQuery.data && (
                      <div className="flex items-center gap-1 mt-1 text-sm">
                        {validateCPFQuery.data.exists ? (
                          <>
                            <XCircle size={16} className="text-red-500" />
                            <span className="text-red-500">
                              CPF já cadastrado
                            </span>
                          </>
                        ) : validateCPFQuery.data.isValid ? (
                          <>
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-green-500">CPF válido</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={16} className="text-red-500" />
                            <span className="text-red-500">CPF inválido</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Endereço
                </h2>
                <div className="space-y-4">
                  <div>
                    <Input
                      name="address"
                      placeholder="Endereço Completo *"
                      value={formData.address}
                      onChange={handleChange}
                      className={
                        validationErrors.address ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.address}
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Input
                        name="city"
                        placeholder="Cidade *"
                        value={formData.city}
                        onChange={handleChange}
                        className={
                          validationErrors.city ? "border-red-500" : ""
                        }
                      />
                      {validationErrors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.city}
                        </p>
                      )}
                    </div>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="MG">MG</option>
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="BA">BA</option>
                      <option value="SC">SC</option>
                      <option value="RS">RS</option>
                      <option value="PR">PR</option>
                      <option value="ES">ES</option>
                      <option value="PE">PE</option>
                      <option value="CE">CE</option>
                    </select>
                    <div>
                      <Input
                        name="zipCode"
                        placeholder="CEP *"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={
                          validationErrors.zipCode ? "border-red-500" : ""
                        }
                      />
                      {validationErrors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações Escolares */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Informações Escolares
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="schoolName"
                      placeholder="Nome da Escola *"
                      value={formData.schoolName}
                      onChange={handleChange}
                      className={
                        validationErrors.schoolName ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.schoolName && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.schoolName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      name="schoolGrade"
                      placeholder="Série/Ano *"
                      value={formData.schoolGrade}
                      onChange={handleChange}
                      className={
                        validationErrors.schoolGrade ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.schoolGrade && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.schoolGrade}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Informações do Responsável */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Responsável Legal
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="parentName"
                      placeholder="Nome do Responsável *"
                      value={formData.parentName}
                      onChange={handleChange}
                      className={
                        validationErrors.parentName ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.parentName && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.parentName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      name="parentPhone"
                      placeholder="Telefone do Responsável *"
                      value={formData.parentPhone}
                      onChange={handleChange}
                      className={
                        validationErrors.parentPhone ? "border-red-500" : ""
                      }
                    />
                    {validationErrors.parentPhone && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.parentPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full bg-gradient-gold hover:opacity-90 text-secondary-foreground font-semibold py-6 text-lg"
              >
                {createMutation.isPending
                  ? "Processando..."
                  : "Confirmar Inscrição"}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-card rounded-2xl border border-border p-12 shadow-lg max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-3xl font-bold text-foreground mb-2">
                Inscrição Confirmada!
              </h2>
              <p className="text-muted-foreground mb-6">
                Sua inscrição foi realizada com sucesso. Guarde seu número de
                inscrição.
              </p>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">
                  Número de Inscrição
                </p>
                <p className="text-3xl font-bold text-primary">
                  {inscriptionNumber}
                </p>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Um email de confirmação foi enviado para o endereço informado.
                Verifique sua caixa de entrada e pasta de spam.
              </p>

              <Button
                onClick={generatePDF}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 mb-3 flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Baixar Comprovante
              </Button>

              <Button
                onClick={() => {
                  setStep("form");
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    birthDate: "",
                    cpf: "",
                    address: "",
                    city: "",
                    state: "MG",
                    zipCode: "",
                    schoolName: "",
                    schoolGrade: "",
                    parentName: "",
                    parentPhone: "",
                  });
                  setValidationErrors({});
                }}
                variant="outline"
                className="w-full"
              >
                Nova Inscrição
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
