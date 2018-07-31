import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendSMS = (to: string, body: string) => {
  return twilioClient.messages.create({
    body, 
    to,
    from: process.env.TWILIO_PHONE
  })
}

const sendVerificationSMS = (to: string, key: string) => 
  sendSMS(to, `あなたの認証番号は${key}です。`);

  export default sendVerificationSMS;