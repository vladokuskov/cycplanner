import {
  faCircleNotch,
  faLessThanEqual,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../Button';
import { Input } from '../../Input';

const SubTitle = styled.h3`
  width: 100%;
  color: #2c2c2c50;
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
  margin-bottom: 1rem;
`;

const EditSectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
`;

const EditProfileForm = styled.form`
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.2rem;
  max-width: 25rem;
  button {
    align-self: flex-end;
  }
`;

const EditSection = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <EditSectionWrapper>
      <SubTitle>Edit profile</SubTitle>
      <EditProfileForm onSubmit={handleSave}>
        <Input
          fieldType="text"
          name="name"
          variant="outlined"
          label="Name"
          placeholder="Edit name"
          required
          full
        />
        <Input
          fieldType="email"
          name="name"
          variant="outlined"
          label="Email"
          placeholder="Edit email"
          required
          full
        />
        <Input
          fieldType="text"
          name="name"
          variant="outlined"
          label="Confirm password"
          placeholder="Confirm password"
          required
          full
        />
        <Input
          fieldType="text"
          name="name"
          variant="outlined"
          label="Repeat password"
          placeholder="Repeat password"
          required
          full
        />
        <Button
          buttonType="submit"
          text={isSaving ? undefined : 'Save Changes'}
          icon={isSaving ? faCircleNotch : null}
          rotate={isSaving}
          disabled={isSaving}
          size="sm2"
        />
      </EditProfileForm>
    </EditSectionWrapper>
  );
};

export { EditSection };
