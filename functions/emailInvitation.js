import nodemailer from 'nodemailer';

const sendInvitationEmail = async ({ from, to, subject, text, html,context  }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mallalokesh23@gmail.com',
            pass: 'wltz lwwn obqq doni'
        }
    });

    const mailOptions = {
        from,
        to,
        subject,
        text,
        html: html.replace(/{{company}}/g, context.company)
                  .replace(/{{name}}/g, context.name)
                  .replace(/{{email}}/g, context.email)
                   .replace(/{{password}}/g, context.password)
                    .replace(/{{invitationLink}}/g, context.invitationLink)
};
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        throw new Error('Error sending invitation email');
    }
};

export default sendInvitationEmail;
