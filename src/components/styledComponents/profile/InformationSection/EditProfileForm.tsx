import styled from 'styled-components';
import { useAuth } from '@/context/AuthContext';
import { updateProfileName } from '@/firebase/profile';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { FailedText } from '../StyledProfile';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 25rem;
  gap: 0.8rem;
  button {
    align-self: flex-end;
  }
  @media (max-width: 525px) {
    max-width: 100%;
  }
`;

type EditProfileForm = {
  name: string;
};

const EditProfileForm = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationResponse, setValidationResponse] = useState<string>('');
  const { user } = useAuth();

  const [editProfileForm, setEditProfileForm] = useState<EditProfileForm>({
    name: user?.displayName ? user.displayName : '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name } = editProfileForm;

    setIsSaving(true);

    if (name.length === 0) {
      setValidationResponse('Enter name to update');
    }

    try {
      await updateProfileName(name);
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
    <Form onSubmit={handleSave}>
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
      {validationResponse.length > 0 && (
        <FailedText>{validationResponse}</FailedText>
      )}
      <Button
        buttonType="submit"
        text={isSaving ? 'Saving' : 'Save Changes'}
        icon={isSaving ? faCircleNotch : null}
        rotate={isSaving}
        disabled={
          isSaving ||
          editProfileForm.name.length === 0 ||
          editProfileForm.name === user?.displayName
        }
        size="sm2"
      />
    </Form>
  );
};

export { EditProfileForm };
