import { Resume } from "../lib/redux/types";

export const postResume = async (resume: Resume) => {
    const toSend = JSON.stringify(resume)
    console.log(toSend)
    fetch('https://resenhapi.onrender.com/update/',
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