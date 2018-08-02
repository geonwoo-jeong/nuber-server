import Mailgun from "mailgun-js";

const mailgunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox00cf3d0903ee4466ace0c797450b5e5e.mailgun.org"
});

const sendEmail = (subject:string, html:string) => {
  const emailData = {
    from: "wyrdism@gmail.com",
    to: "wyrdism@gmail.com",
    subject,
    html
  }
  return mailgunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`
  return sendEmail(emailSubject, emailBody)
}