import { useState } from 'react';

import styled from 'styled-components';

import { useAuth } from '@/context/AuthContext';
import { updateProfileName } from '@/firebase/profile';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { convertFirebaseError } from '@/utils/convertFirebaseError';

const StyledForm = styled.form`
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
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    errorText: '',
  });
  const { user } = useAuth();

  const [editProfileForm, setEditProfileForm] = useState<EditProfileForm>({
    name: user?.displayName ? user.displayName : '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name } = editProfileForm;

    setIsSaving(true);

    if (name.length === 0) {
      setErrorStatus({
        isError: true,
        errorText: 'Enter name to update',
      });
    }

    try {
      await updateProfileName(name);

      if (errorStatus.isError) {
        setErrorStatus({
          isError: false,
          errorText: '',
        });
      }
    } catch (err: any) {
      setErrorStatus({
        isError: true,
        errorText: convertFirebaseError(err.code),
      });
    }

    setIsSaving(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'name' && value.length > 35) {
      return null;
    } else {
      setEditProfileForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <StyledForm onSubmit={handleSave}>
      <Input
        fieldType="text"
        value={editProfileForm.name}
        onChange={handleFormChange}
        name="name"
        variant="outlined"
        label="Name"
        placeholder="Edit name"
        full
        danger={errorStatus.isError}
      />
      {errorStatus.isError && (
        <ErrorMessage variant="basic" errorText={errorStatus.errorText} />
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
    </StyledForm>
  );
};

export { EditProfileForm };
