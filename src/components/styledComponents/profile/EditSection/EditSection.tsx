import styled from 'styled-components';
import { EditPasswordForm } from './EditPasswordForm';
import { EditProfileForm } from './EditProfileForm';

const EditSectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
`;

const EditSection = () => {
  return (
    <EditSectionWrapper>
      <EditProfileForm />
      <EditPasswordForm />
    </EditSectionWrapper>
  );
};

export { EditSection };
