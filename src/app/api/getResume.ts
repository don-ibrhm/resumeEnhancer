import { 
    Resume, 
    ResumeProfile,
    ResumeWorkExperience,
    ResumeEducation,
    ResumeProject,
    ResumeSkills, 
    ResumeCustom,
    nullResume 
} from "../lib/redux/types";

export const getResume = async (): Promise<Resume> => {
    try {
        const response = await fetch('http://localhost:8000/get-resume/',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
            }
        )
        const data = await response.json()
        console.log(data)
        const dataResponse = data.response
        console.log("raw data json", dataResponse)
        const parsed_data = {
            profile: data.profile as ResumeProfile,
            workExperiences: data.workExperiences as ResumeWorkExperience[],
            educations: data.educations as ResumeEducation[],
            projects: data.projects as ResumeProject[],
            skills: data.skills as ResumeSkills,
            custom: {descriptions: [""]} as ResumeCustom
        }
        console.log("Parsed", parsed_data)
        const resume: Resume = parsed_data
        return resume
    } catch (error) {
        console.log(error)
        return nullResume
    }
}