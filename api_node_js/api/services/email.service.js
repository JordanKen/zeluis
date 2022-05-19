const transport = require('../../config/transport.Email.config');
const mailGen = require('../../config/mailGen.config');


const send = async (name, linkVerification, email) => {
    try {
        //email conent generate
        const emailTemplate = mailGen.mailGenerator.generate(mailGen.email(name, linkVerification))
        require('fs').writeFileSync('preview.html', emailTemplate, 'utf8')


        //send mail
        const message = {
            from: 'douanlacompanie@gmail.com', // Sender address
            to: email,         // recipients
            subject: 'Welcome to Bidding Car', // Subject line
            html: emailTemplate

        };
        await transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                return {
                    status: 200,
                    response: 'mail has sent'
                }
            }
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
};


const sendPasswordForget = async (name, linkVerification, email) => {
    try {
        //email conent generate
        const emailTemplate = mailGen.mailGenerator.generate(mailGen.passwordreset(name, linkVerification))
        require('fs').writeFileSync('preview.html', emailTemplate, 'utf8')


//send mail
        const message = {
            from: 'douanlacompanie@gmail.com', // Sender address
            to: email,         // recipients
            subject: 'Choose a new password for Bidding Car', // Subject line
            html: emailTemplate

        };
        await transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                return {
                    status: 200,
                    response: 'mail has sent'
                }
            }
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
};


const requestWithdrawls = async (name, email, amount) => {
    try {
        //email conent generate
        const emailTemplate = mailGen.mailGenerator.generate(mailGen.requestwithdrawls(name, amount))
        require('fs').writeFileSync('requestwithdrawls.html', emailTemplate, 'utf8')


//send mail
        const message = {
            from: 'douanlacompanie@gmail.col', // Sender address
            to: email,         // recipients
            subject: `Withdraw to your account`, // Subject line
            html: emailTemplate

        };
        await transport.sendMail(message, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                return {
                    status: 200,
                    response: 'mail has sent'
                }
            }
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({error: error})
    }
};


module.exports = {send, sendPasswordForget, requestWithdrawls};
