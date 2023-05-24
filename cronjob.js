import cron from "node-cron";
import axios from "axios";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c067386ed1f7f1",
    pass: "0aa336116f458f",
  },
});

cron.schedule("0 8 * * *", async () => {
  try {
    const response = await axios.get("https://tu-endpoint.com/correo");
    const { emails, message, subject } = response.data;

    for (const email of emails) {
      await transporter.sendMail({
        from: userSender.user,
        to: email,
        subject: subject,
        text: message,
      });
    }

    console.log("Correos enviados exitosamente.");
  } catch (error) {
    console.error("Error al enviar los correos:", error);
  }
});
