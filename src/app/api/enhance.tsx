import { ResumeWorkExperience, ResumeProject, Resume } from "../lib/redux/types";

const API_URL = "http://localhost:8000/"

export const enhanceObjective = async (resume: Resume) : Promise<string> => {
    try {
        const toSend = JSON.stringify(resume)
        const response = await fetch(API_URL + 'enhance-objective/',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: toSend,
        })
        if (!response.ok) {
            return ""
        }
        const data = await response.json()
        return data.response
        } catch (error) {
            return ""
        }
}

export const enhanceWorkExperience = async (resume: Resume) : Promise<ResumeWorkExperience[]> => {
    try {
        const toSend = JSON.stringify(resume)
        const response = await fetch(API_URL + 'enhance-experience/',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: toSend,
        })
        const data = await response.json()
        console.log("Work enhance data", data)
        const workExperiences: ResumeWorkExperience[] = data.response
        return workExperiences
        } catch (error) {
            const emptyResumeWorkExperience: ResumeWorkExperience = {
                company: "",
                jobTitle: "",
                date: "",
                descriptions: []
            }
            return []
        }
}

export const enhanceProjects = async (resume: Resume) : Promise<ResumeProject[]> => {
    try {
        const toSend = JSON.stringify(resume)
        const response = await fetch(API_URL + 'enhance-projects/',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: toSend,
        })
        const data = await response.json()
        console.log(data)
        const projects: ResumeProject[] = data.response
        return projects
    } catch (error) {
        const emptyResumeProject: ResumeProject = {
            project: "",
            date: "",
            descriptions: []
        }
        return []
    }
}

export const enhanceSkills = async (resume: Resume) : Promise<string[]> => {
    try {
        const toSend = JSON.stringify(resume)
        const response = await fetch(API_URL + 'enhance-skills/',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: toSend,
            })
        if (!response.ok) {
            return []
        }
        const data = await response.json()
        console.log("Data", data)
        return data.response
    } catch (error) {
        return []
    }
}
