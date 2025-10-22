import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "thanhhien1732@gmail.com",
        pass: "ukfgjgicxwttyrbf",
    },
});

export const sendMail = async (mailTo) => {
    const info = await transporter.sendMail({
        from: 'thanhhien1732@gmail.com',
        to: mailTo,
        subject: "Cảnh báo bảo mật",
        text: "Tài khoản có lượt đăng nhập mới",
        html: "<b>Tài khoản có lượt đăng nhập mới</b>",
    });

    console.log("Message sent:", info.messageId);
}