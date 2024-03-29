import { deleteUser } from 'firebase/auth';
import styled from 'styled-components';

import { Button } from '@/components/Button/Button';
import { useAuth } from '@/context/AuthContext';

const StyledProfileDeleteSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileDeleteSection = () => {
  const { user, logoutUser } = useAuth();

  const handleAccountDelete = async () => {
    try {
      const result = window.confirm(
        'Are you sure you want to delete your account?'
      );
      if (result) {
        user && (await deleteUser(user));
        logoutUser();
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledProfileDeleteSectionWrapper>
      <Button
        text="Delete account"
        variant="danger"
        bold
        size="sm2"
        onClick={handleAccountDelete}
      />
    </StyledProfileDeleteSectionWrapper>
  );
};

export { ProfileDeleteSection };
