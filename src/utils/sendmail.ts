import nodemailer from 'nodemailer';

const sendEmail = async (user: any, token: string, link: string) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      secure: false,
      service: process.env.SMTP_SERVICES,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_EMAIL_ADDRESS,
        pass: process.env.PASSWORD,
      },
    });

    let mailoption = {
      from: process.env.SMTP_EMAIL_ADDRESSs,
      to: user.email,
      subject: 'Reset password',
      html: `<htm>
<body>
<h1>The reset password link ${link}</h1>
</body>
                </html>`,
    };

    let info = await transporter.sendMail(mailoption);
    return { info };
  } catch (error) {
    return { error };
  }
};

process.on('message', async (msg: any) => {
  let { info, error } = await sendEmail(msg.user, msg.token, msg.link);
  error
    ? process.send?.({ error, statusCode: 400 })
    : process.send?.({ data: info });
});
