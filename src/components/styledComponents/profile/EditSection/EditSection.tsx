import { useAuth } from '@/context/AuthContext';
import { updateProfileNameEmail } from '@/firebase/profile';
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
  input,
  label {
    margin-top: 2.2rem;
  }
  max-width: 25rem;
  button {
    align-self: flex-end;
    margin-top: 1rem;
  }
`;

const FailedText = styled.p`
  color: #df3737;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 13px;
  margin: 0;
  align-self: flex-start;
  padding: 1rem 0;
`;

// move this later
type EditProfileForm = {
  name: string;
  email: string;
};

const EditSection = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationResponse, setValidationResponse] = useState<string>('');
  const { user } = useAuth();

  const [editProfileForm, setEditProfileForm] = useState<EditProfileForm>({
    name: user?.displayName ? user.displayName : '',
    email: '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email } = editProfileForm;

    setIsSaving(true);

    if (name.length === 0 && email.length === 0) {
      setValidationResponse('Enter name or email to update');
    }

    try {
      await updateProfileNameEmail(name, email);
    } catch (err) {
      console.log(err);
    }

    setIsSaving(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <EditSectionWrapper>
      <SubTitle>Edit profile</SubTitle>
      <EditProfileForm onSubmit={handleSave}>
        <Input
          fieldType="text"
          value={editProfileForm.name}
          onChange={handleFormChange}
          name="name"
          variant="outlined"
          label="Name"
          placeholder="Edit name"
          full
        />
        <Input
          fieldType="email"
          value={editProfileForm.email}
          onChange={handleFormChange}
          name="email"
          variant="outlined"
          label="New email"
          placeholder="New email"
          full
        />
        {validationResponse.length > 0 && (
          <FailedText>{validationResponse}</FailedText>
        )}
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
