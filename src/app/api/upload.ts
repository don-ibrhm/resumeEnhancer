import { Resume } from "../lib/redux/types";

export const uploadText = async (text: string) => {
    const toSend = JSON.stringify({'text': text})
    await fetch('https://resenhapi.onrender.com/upload-text/',
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: toSend,
    }).then((data) => {
        console.log(data)
    }).catch((e) => {
        console.error(e);
    })
}