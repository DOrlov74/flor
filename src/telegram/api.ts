import { AppMessageContext } from "../models/AppMessage";

export const makePostRequest = (url: string, details: any, appMessageCtx: AppMessageContext | null) => {
    fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        })
        .then((response) => {
            if (response.ok) {
                appMessageCtx?.setMessage({severity: 'success', message: `message succesfully sent`});
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .catch((error) => {
            console.log(error)
            appMessageCtx?.setMessage({severity: 'error', message: `error sending message, ${error}`});
        });
};

const telegramBotKey = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const chat_id = process.env.REACT_APP_TELEGRAM_USER_ID;

export const sendNotification = async (text:string, appMessageCtx: AppMessageContext | null, parse_mode?: string) => {
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
    await makePostRequest(endpoint,
        {
            text,
            parse_mode,
            chat_id
        }, appMessageCtx);
};