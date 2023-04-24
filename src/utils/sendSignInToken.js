import nodemailer from "nodemailer";

export default async function sendSignInToken(to, token) {
  //   const { host } = new URL(process.env.HOST);
  const host = process.env.HOST;
  const from = process.env.EMAIL_FROM;
  const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });
  const result = await transport.sendMail({
    from: from,
    to: to,
    subject: `Sign in to ${host}`,
    text: text({ token, host }),
    html: html({ token, host }),
  });

  console.log("Message sent: %s", result);
}

function html({ token, host }) {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = "#EF4444";
  const color = {
    background: "#1E293B",
    text: "#fff",
    mainBackground: "#090D13",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#0F172A",
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><p
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">${token}</p></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        This sign in code will expired after 5 minutes.
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

function text({ token, host }) {
  return `Sign in to ${host}\n${token}\n\n`;
}