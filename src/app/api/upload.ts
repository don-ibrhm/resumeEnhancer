import { Resume } from "../lib/redux/types";

export const uploadText = async (text: string) => {
    const toSend = JSON.stringify({'text': text})
    await fetch('http://localhost:8000/upload-text/',
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