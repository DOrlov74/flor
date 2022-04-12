export const makePostRequest = (url: string, details: any) => {
    return fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        })
        .then((response) => response.json());
};

const telegramBotKey = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
const chat_id = process.env.REACT_APP_TELEGRAM_USER_ID;

export const sendNotification = async (text:string, parse_mode?: string) => {
    const endpoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
    await makePostRequest(endpoint,
        {
            text,
            parse_mode,
            chat_id
        });
};