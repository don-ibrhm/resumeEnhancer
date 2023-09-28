import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea, Button } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile, selectResume } from "lib/redux/resumeSlice";
import { ResumeProfile, Resume } from "lib/redux/types";
import { postResume } from "api/postResume"
import { enhanceObjective } from "api/enhance"

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const resume = useAppSelector(selectResume);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    // console.log(field, typeof field)
    // console.log(value, typeof value)
    dispatch(changeProfile({ field, value }));
  };

  const enhance = async (field: keyof ResumeProfile) => {
    await postResume(resume)
    // console.log("Resume posted.")
    const value = await enhanceObjective()
    // console.log("Value:", value)
    dispatch(changeProfile({ field, value }));
    
  }

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        <Button value="summary" onClick={enhance}>
          Enhance
        </Button>
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/khanacademy"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
