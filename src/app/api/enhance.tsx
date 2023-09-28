import { ResumeWorkExperience, ResumeProject } from "../lib/redux/types";

export const enhanceObjective = async () : Promise<string> => {
    try {
        const response = await fetch('http://localhost:8000/enhance-objective/',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
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

export const enhanceWorkExperience = async () : Promise<ResumeWorkExperience[]> => {
    try {
        const response = await fetch('http://localhost:8000/enhance-experience/',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
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

export const enhanceProjects = async () : Promise<ResumeProject[]> => {
    try {
        const response = await fetch('http://localhost:8000/enhance-projects/',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
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

export const enhanceSkills = async () : Promise<string[]> => {
    try {
        const response = await fetch('http://localhost:8000/enhance-skills/',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
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