import styled from 'styled-components';
import { useAuth } from '@/context/AuthContext';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { updateUserPassword } from '@/firebase/profile';
import { FailedText, SubTitle } from '../StyledProfile';
import { convertFirebaseError } from '@/utils/convertFirebaseError';

const Form = styled.form`
  margin-top: 1.5rem;
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
`;

type EditPasswordForm = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const EditPasswordForm = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [validationResponse, setValidationResponse] = useState<any>('');
  const { user } = useAuth();

  const [editPasswordForm, setEditPasswordForm] = useState<EditPasswordForm>({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { oldPassword, newPassword, repeatNewPassword } = editPasswordForm;

    setIsSaving(true);

    if (oldPassword.length === 0) {
      setValidationResponse('Please, enter old password');
    } else if (newPassword.length === 0) {
      setValidationResponse('Please, enter new password');
    } else if (newPassword !== repeatNewPassword) {
      setValidationResponse('Passwords do not match');
    } else
      try {
        await updateUserPassword(oldPassword, newPassword);
      } catch (err: any) {
        setValidationResponse(convertFirebaseError(err.code));
      }

    setIsSaving(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSave}>
      <SubTitle>Change password</SubTitle>
      <Input
        fieldType="text"
        value={editPasswordForm.oldPassword}
        onChange={handleFormChange}
        name="oldPassword"
        variant="outlined"
        label="Old password*"
        placeholder="Enter old password"
        required
        full
      />
      <Input
        fieldType="text"
        value={editPasswordForm.newPassword}
        onChange={handleFormChange}
        name="newPassword"
        variant="outlined"
        label="New password*"
        placeholder="Enter new password"
        required
        full
      />
      <Input
        fieldType="text"
        value={editPasswordForm.repeatNewPassword}
        onChange={handleFormChange}
        name="repeatNewPassword"
        variant="outlined"
        label="Repeat new password*"
        placeholder="Repeat new password"
        required
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
        size="sm2"
        disabled={
          isSaving ||
          editPasswordForm.oldPassword.length === 0 ||
          editPasswordForm.newPassword !== editPasswordForm.repeatNewPassword ||
          editPasswordForm.newPassword.length < 8 ||
          editPasswordForm.repeatNewPassword.length < 8
        }
      />
    </Form>
  );
};

export { EditPasswordForm };
