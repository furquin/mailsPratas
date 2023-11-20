import { transporter } from "../../utils/mail/nodeMailer.utils";

export const newRegisterMailUseCase = async (data: {
  to: string;
  template: string;
}): Promise<string> => {
  await transporter.sendMail({
    from: "noreply@pratas.com",
    to: data.to,
    subject: "Confirmação de cadastro",
    html: `<h1>Olá, ${data.to}</h1><br><p>Seja bem vindo ao Pratas, clique no link abaixo para confirmar seu cadastro</p><br><a href="http://localhost:3000/confirm-register">Confirmar cadastro</a>`,
  });

  return "Email enviado com sucesso";
};
