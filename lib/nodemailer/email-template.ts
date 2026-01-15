import { APP_NAME } from "../utils";

interface EmailTemplateOptions {
  title: string;
  greeting: string;
  body: string;
  buttonText: string;
  buttonUrl: string;
  footerText?: string;
}

export const getEmailTemplate = ({
  title,
  greeting,
  body,
  buttonText,
  buttonUrl,
  footerText = `If you didn't request this email, you can safely ignore it.`,
}: EmailTemplateOptions) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>${title}</title>
    <style>
        :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            background-color: #f4f4f7;
            color: #51545e;
        }
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f4f4f7;
            padding-bottom: 40px;
        }
        .main {
            background-color: #f7f7f7;
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-collapse: collapse;
        }
        .header {
            padding: 25px 0;
            text-align: center;
            background-color: #f7f7f7;
        }
        .header a {
            font-size: 19px;
            font-weight: bold;
            color: #333333;
            text-decoration: none;
        }
        .content {
            padding: 40px;
            text-align: left;
            line-height: 1.6;
        }
        .content h1 {
            color: #333333;
            font-size: 24px;
            font-weight: bold;
            margin-top: 0;
            text-align: left;
        }
        .content p {
            font-size: 16px;
            color: #51545e;
            margin: 0 0 20px;
        }
        .button-container {
            padding: 20px 0;
            text-align: center;
        }
        .button {
            background-color: #6e59a5;
            border-radius: 6px;
            color: #ffffff !important;
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            padding: 12px 30px;
            text-decoration: none;
            -webkit-text-size-adjust: none;
        }
        .footer {
            padding: 25px 0;
            text-align: center;
            font-size: 12px;
            color: #999999;
        }
        
        /* Dark Mode Styles */
        @media (prefers-color-scheme: dark) {
            body, .wrapper {
                background-color: #1a1a1a !important;
                color: #e0e0e0 !important;
            }
            .main, .header {
                background-color: #2d2d2d !important;
            }
            .header a, .content h1 {
                color: #ffffff !important;
            }
            .content p {
                color: #cccccc !important;
            }
            .button {
                background-color: #6e59a5 !important;
            }
        }

        /* Outlook Specific Styles */
        [data-ogsc] body, [data-ogsc] .wrapper {
            background-color: #1a1a1a !important;
            color: #e0e0e0 !important;
        }
        [data-ogsc] .main, [data-ogsc] .header {
            background-color: #2d2d2d !important;
        }
        [data-ogsc] .header a, [data-ogsc] .content h1 {
            color: #ffffff !important;
        }
        [data-ogsc] .content p {
            color: #cccccc !important;
        }
        [data-ogsc] .button {
            background-color: #6e59a5 !important;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <table class="main" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td class="header">
                    <a href="#">${APP_NAME}</a>
                </td>
            </tr>
            <tr>
                <td class="content">
                    <h1>${title}</h1>
                    <p>Hi ${greeting},</p>
                    <p>${body}</p>
                    <div class="button-container">
                        <a href="${buttonUrl}" class="button">${buttonText}</a>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="footer">
                    <p>${footerText}</p>
                    <p>&copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
  `;
};
