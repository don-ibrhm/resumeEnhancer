import { ResumeWorkExperience, ResumeProject } from "lib/redux/types";
import { ExpanderWithHeightTransition } from "components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
  ShowForm,
} from "lib/redux/settingsSlice";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  LightBulbIcon,
  WrenchIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import {
  changeWorkExperiences,
  selectWorkExperiences,
  selectProjects, 
  changeProjects,
  selectResume,
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "lib/redux/resumeSlice";
import {
  enhanceWorkExperience,
  enhanceProjects
} from "api/enhance";
import { Button } from "components/ResumeForm/Form/InputGroup";
import { postResume } from "api/postResume";

/**
 * BaseForm is the bare bone form, i.e. just the outline with no title and no control buttons.
 * ProfileForm uses this to compose its outline.
 */
export const BaseForm = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section
    className={`flex flex-col gap-3 rounded-md bg-white p-6 pt-4 shadow transition-opacity duration-200 ${className}`}
  >
    {children}
  </section>
);

const FORM_TO_ICON: { [section in ShowForm]: typeof BuildingOfficeIcon } = {
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
};

type ParamTypeMap = {
  'projectParam': ResumeProject;
  'workExperienceParam': ResumeWorkExperience;
};

const ParamSelectMap = {
  'projectParam':  selectProjects,
  'workExperienceParam':  selectWorkExperiences,
};

export const Form = ({
  form,
  addButtonText,
  children,
}: {
  form: ShowForm;
  addButtonText?: string;
  children: React.ReactNode;
}) => {
  const resume = useAppSelector(selectResume)
  const showForm = useAppSelector(selectShowByForm(form));
  const heading = useAppSelector(selectHeadingByForm(form));

  const dispatch = useAppDispatch();
  const setShowForm = (showForm: boolean) => {
    dispatch(changeShowForm({ field: form, value: showForm }));
  };
  const setHeading = (heading: string) => {
    dispatch(changeFormHeading({ field: form, value: heading }));
  };

  const isFirstForm = useAppSelector(selectIsFirstForm(form));
  const isLastForm = useAppSelector(selectIsLastForm(form));

  const selectProjectsLength = useAppSelector(selectProjects).length;
  const selectWorkExperiencesLength = useAppSelector(selectWorkExperiences).length;

  const handleMoveClick = (type: "up" | "down") => {
    dispatch(changeFormOrder({ form, type }));
  };

  const Icon = FORM_TO_ICON[form];

  return (
    <BaseForm
      className={`transition-opacity duration-200 ${
        showForm ? "pb-6" : "pb-2 opacity-60"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <Icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          <input
            type="text"
            className="block w-full border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-0.5">
          {!isFirstForm && (
            <MoveIconButton type="up" onClick={handleMoveClick} />
          )}
          {!isLastForm && (
            <MoveIconButton type="down" onClick={handleMoveClick} />
          )}
          <ShowIconButton show={showForm} setShow={setShowForm} />
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        {children}
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && addButtonText != "Add School" && (
        <div className="grid grid-cols-10 gap-5">
          <div className="grid grid-cols-6 col-span-6">
            <Button value="" onClick={() => {
              if (form == "projects") {
                console.log("Updating project...")
                postResume(resume).then(() => 
                {
                  console.log("Enhancing project...")
                  return enhanceProjects()
                }).then((projects) => {
                  console.log("projects", projects)
                  const max = selectProjectsLength - 1
                  let idx = 0
                  projects.forEach((project) => {
                    if (idx >= max) {
                      dispatch(addSectionInForm({ form }))
                    }
                    // internal model of workExperiences doesn't keep track of 'date'
                    const fields = ['project', 'descriptions'] 
                    fields.forEach((field) => {
                      const value = project[field as keyof ResumeProject]
                      dispatch(changeProjects({ idx, field, value } as any));
                    })
                    idx++
                  })
                })
              } else {
                console.log("Producing work experience...")
                postResume(resume).then(() => 
                {
                  console.log("Enhancing work experience...")
                  return enhanceWorkExperience()
                }).then((workExperiences) => {
                  console.log("workExperiences", workExperiences)
                  const max = selectProjectsLength - 1
                  let idx = 0
                  workExperiences.forEach((workExperience) => {
                    if (idx >= max) {
                      dispatch(addSectionInForm({ form }))
                    }
                    const fields = ['company', 'jobTitle', 'date', 'descriptions']
                    fields.forEach((field) => {
                      const value = workExperience[field as keyof ResumeWorkExperience]
                      dispatch(changeProjects({ idx, field, value } as any));
                    })
                    idx++
                  })
                })
              }
            }}>Enhance all with AI</Button>
          </div>
          <div className="col-span-4 mt-0.5">
            <button
              type="button"
              onClick={() => {
                dispatch(addSectionInForm({ form }));
              }}
              className="flex items-center rounded-md bg-white py-2 pl-3 pr-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PlusSmallIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {addButtonText}
            </button>
          </div>
        </div>
      )}
    </BaseForm>
  );
};

export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}: {
  form: ShowForm;
  idx: number;
  showMoveUp: boolean;
  showMoveDown: boolean;
  showDelete: boolean;
  deleteButtonTooltipText: string;
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }));
  };
  const handleMoveClick = (direction: "up" | "down") => {
    dispatch(moveSectionInForm({ form, direction, idx }));
  };

  return (
    <>
      {idx !== 0 && (
        <div className="mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
      )}
      <div className="relative grid grid-cols-6 gap-3">
        {children}
        <div className={`absolute right-0 top-0 flex gap-0.5 `}>
          <div
            className={`transition-all duration-300 ${
              showMoveUp ? "" : "invisible opacity-0"
            } ${showMoveDown ? "" : "-mr-6"}`}
          >
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showMoveDown ? "" : "invisible opacity-0"
            }`}
          >
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showDelete ? "" : "invisible opacity-0"
            }`}
          >
            <DeleteIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
