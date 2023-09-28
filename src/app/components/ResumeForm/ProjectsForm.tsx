import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectProjects, changeProjects, selectResume } from "lib/redux/resumeSlice";
import type { ResumeProject } from "lib/redux/types";

import {
  enhanceProjects
} from "api/enhance";
import { Button } from "components/ResumeForm/Form/InputGroup";
import { postResume } from "api/postResume";

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const resume = useAppSelector(selectResume)
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;

  return (
    <Form form="projects" addButtonText="Add Project">
      {projects.map(({ project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete project"}
          >
            <Input
              name="project"
              label="Project Name"
              placeholder="OpenResume"
              value={project}
              onChange={handleProjectChange}
              labelClassName="col-span-4"
            />
            <Input
              name="date"
              label="Date"
              placeholder="Winter 2022"
              value={date}
              onChange={handleProjectChange}
              labelClassName="col-span-2"
            />
            <BulletListTextarea
              name="descriptions"
              label="Description"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            <Button value="" onClick={() => {
              console.log("Producing projects...")
              postResume(resume).then(() => 
              {
                console.log("Enhancing projects...")
                return enhanceProjects()
              }).then((newProjects) => {
                console.log("New Projects", newProjects)
                const field: keyof ResumeProject = "descriptions"
                const value = newProjects[idx][field as keyof ResumeProject]
                dispatch(changeProjects({ idx, field, value } as any));
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
