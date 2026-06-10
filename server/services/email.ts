import { Resend } from "resend";

let resend: Resend | null = null;

function getResend(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY não configurada");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export async function sendInscriptionApprovedEmail(
  email: string,
  fullName: string,
  inscriptionNumber: string
) {
  try {
    const response = await getResend().emails.send({
      from: "Guarda Mirim <noreply@guardamirimsalinas.com.br>",
      to: email,
      subject: "Sua inscrição foi aprovada! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1949 8B 0%, #4A90E2 100%); padding: 40px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Parabéns!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Sua inscrição foi aprovada</p>
          </div>
          
          <div style="padding: 40px; background: #f9f9f9; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Olá <strong>${fullName}</strong>,
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Temos o prazer de informar que sua inscrição no programa Guarda Mirim de Salinas foi <strong>APROVADA</strong>!
            </p>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #4A90E2; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 12px;">NÚMERO DE INSCRIÇÃO</p>
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1949 8B;">${inscriptionNumber}</p>
            </div>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Guarde este número com cuidado, pois ele será necessário para as próximas etapas do processo.
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Em breve, você receberá mais informações sobre datas, horários e procedimentos para o início do programa.
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 30px;">
              Se tiver dúvidas, entre em contato conosco através do email contato@guardamirimsalinas.org.br ou telefone (38) 9 9999-9999.
            </p>
            
            <p style="font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
              Atenciosamente,<br>
              <strong>Guarda Mirim de Salinas</strong><br>
              Transformando Jovens em Profissionais
            </p>
          </div>
        </div>
      `,
    });

    console.log("[Email] Aprovação enviada para:", email, "Response:", response);
    return response;
  } catch (error) {
    console.error("[Email] Erro ao enviar email de aprovação:", error);
    throw error;
  }
}

export async function sendInscriptionRejectedEmail(
  email: string,
  fullName: string,
  inscriptionNumber: string
) {
  try {
    const response = await getResend().emails.send({
      from: "Guarda Mirim <noreply@guardamirimsalinas.com.br>",
      to: email,
      subject: "Informações sobre sua inscrição",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%); padding: 40px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Informação Importante</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Sobre sua inscrição</p>
          </div>
          
          <div style="padding: 40px; background: #f9f9f9; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Olá <strong>${fullName}</strong>,
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Agradecemos seu interesse no programa Guarda Mirim de Salinas. Após análise cuidadosa de sua inscrição (número: <strong>${inscriptionNumber}</strong>), informamos que, neste momento, não foi possível aprová-la.
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Isso não significa que você não tenha potencial. Recomendamos que você tente novamente quando novas inscrições forem abertas. Você pode também entrar em contato conosco para receber orientações sobre como melhorar sua candidatura.
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Para mais informações, entre em contato conosco através do email contato@guardamirimsalinas.org.br ou telefone (38) 9 9999-9999.
            </p>
            
            <p style="font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
              Atenciosamente,<br>
              <strong>Guarda Mirim de Salinas</strong><br>
              Transformando Jovens em Profissionais
            </p>
          </div>
        </div>
      `,
    });

    console.log("[Email] Rejeição enviada para:", email, "Response:", response);
    return response;
  } catch (error) {
    console.error("[Email] Erro ao enviar email de rejeição:", error);
    throw error;
  }
}

export async function sendInscriptionConfirmationEmail(
  email: string,
  fullName: string,
  inscriptionNumber: string
) {
  try {
    const response = await getResend().emails.send({
      from: "Guarda Mirim <noreply@guardamirimsalinas.com.br>",
      to: email,
      subject: "Inscrição recebida com sucesso! 📋",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Inscrição Recebida!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Sua candidatura está em análise</p>
          </div>
          
          <div style="padding: 40px; background: #f9f9f9; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Olá <strong>${fullName}</strong>,
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Obrigado por se inscrever no programa Guarda Mirim de Salinas! Recebemos sua inscrição com sucesso.
            </p>
            
            <div style="background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 12px;">NÚMERO DE INSCRIÇÃO</p>
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: #667eea;">${inscriptionNumber}</p>
            </div>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Sua candidatura está sendo analisada por nossa equipe. Você receberá um email com a resposta em breve.
            </p>
            
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 20px;">
              Guarde seu número de inscrição com cuidado. Você pode usá-lo para acompanhar o status de sua candidatura.
            </p>
            
            <p style="font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
              Atenciosamente,<br>
              <strong>Guarda Mirim de Salinas</strong><br>
              Transformando Jovens em Profissionais
            </p>
          </div>
        </div>
      `,
    });

    console.log("[Email] Confirmação enviada para:", email, "Response:", response);
    return response;
  } catch (error) {
    console.error("[Email] Erro ao enviar email de confirmação:", error);
    throw error;
  }
}
