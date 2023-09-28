import { ResumeWorkExperience } from "lib/redux/types";
import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  selectResume,
  changeWorkExperiences,
  selectWorkExperiences,
} from "lib/redux/resumeSlice";
import { ResumeProject } from "lib/redux/types";
import {
  changeProjects,
  addSectionInForm,
} from "lib/redux/resumeSlice";
import {
  enhanceWorkExperience,
  enhanceProjects
} from "api/enhance";
import { Button } from "components/ResumeForm/Form/InputGroup";
import { postResume } from "api/postResume";

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences);
  const resume = useAppSelector(selectResume)
  const dispatch = useAppDispatch();

  const showDelete = workExperiences.length > 1;

  return (
    <Form form="workExperiences" addButtonText="Add Job">
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const handleWorkExperienceChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeWorkExperience>
        ) => {
          // console.log(field, value, typeof field, typeof value)
          // TS doesn't support passing union type to single call signature
          // https://github.com/microsoft/TypeScript/issues/54027
          // any is used here as a workaround
          dispatch(changeWorkExperiences({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== workExperiences.length - 1;

        return (
          <FormSection
            key={idx}
            form="workExperiences"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete job"
          >
            <Input
              label="Company"
              labelClassName="col-span-full"
              name="company"
              placeholder="Khan Academy"
              value={company}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Job Title"
              labelClassName="col-span-4"
              name="jobTitle"
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jun 2022 - Present"
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <BulletListTextarea
              label="Description"
              labelClassName="col-span-full"
              name="descriptions"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleWorkExperienceChange}
            />
            <Button value="" onClick={() => {
              console.log("Producing work experience...")
              postResume(resume).then(() => 
              {
                  console.log("Enhancing work experience...")
                  return enhanceWorkExperience()
                }).then((newWorkExperiences) => {
                  console.log("New Work Experiences", newWorkExperiences)
                  const field: keyof ResumeWorkExperience = "descriptions"
                  const value = newWorkExperiences[idx][field]
                  console.log(idx, value)
                  dispatch(changeWorkExperiences({ idx, field, value } as any));
              })
            }}>
              Enhance with AI
            </Button>
          </FormSection>
        );
      })}
    </Form>
  );
};
