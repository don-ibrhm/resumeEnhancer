import { Resume, nullResume } from "../lib/redux/types";

const API_URL = "https://resenhapi.onrender.com/"

export const uploadText = async (text: string) : Promise<Resume> => {
    try {
        const toSend = JSON.stringify({'text': text})
        const response = await fetch(API_URL + 'upload-text/',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: toSend,
        })
        console.log(response)
        const resume: Resume = await response.json()
        return resume
    } catch (error) {
        console.log(error)
        return nullResume
    }
}