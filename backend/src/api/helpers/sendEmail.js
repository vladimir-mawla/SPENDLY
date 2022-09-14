const nodemailer = require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")

const sendEmail = async (email, subject, payload, template, attachments) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        })

        // compile template and set the options
        const source = fs.readFileSync(template, "utf8")
        const compiledTemplate = handlebars.compile(source)
        const options = {
            from: process.env.USER,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
            attachments: []
        }

        attachments.forEach(file => {
            options.attachments.push(file)
        });

        // Send email
        await transporter.sendMail(options);

        console.log("email sent sucessfully")
    } catch (err) {
        console.log(err, "email not sent")
    }
}

module.exports = sendEmail