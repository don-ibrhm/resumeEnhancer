export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeCustom {
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
}

export type ResumeKey = keyof Resume;

export const nullResume: Resume = {
  profile: {
    name: "",
    email: "",
    phone: "",
    url: "",
    summary: "",
    location: "",
  },
  workExperiences: [
    {
      company: "",
      jobTitle: "",
      date: "",
      descriptions: [""],
    },
  ],
  educations: [
    {
      school: "",
      degree: "",
      date: "",
      gpa: "",
      descriptions: [""],
    },
  ],
  projects: [
    {
      project: "",
      date: "",
      descriptions: [""],
    },
  ],
  skills: {
    featuredSkills: [
      {
        skill: "",
        rating: 0,
      },
    ],
    descriptions: [""],
  },
  custom: {
    descriptions: [""],
  },
};

