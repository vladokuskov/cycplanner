import styled from 'styled-components';
import { Input } from '../Input';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { Button } from '../Button';

const FormSectionWrapper = styled.section`
  width: 100%;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const FormWrapper = styled.form`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.7rem;
  max-width: 40rem;
  margin: 0 auto;
`;

const FormSection = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSending(true);

    // Imitating API
    const newTimer = setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setIsSending(false);
    }, 500);

    return () => {
      if (newTimer) {
        clearTimeout(newTimer);
      }
    };
  };

  return (
    <FormSectionWrapper>
      <Title>Contact us</Title>
      <FormWrapper onSubmit={handleSubmit}>
        <Input
          fieldType="text"
          name="name"
          variant="outlined-icon"
          icon={faUser}
          placeholder="Your name"
          value={contactForm.name}
          onChange={handleFormChange}
          required
          full
        />
        <Input
          fieldType="email"
          name="email"
          variant="outlined-icon"
          icon={faEnvelope}
          placeholder="Your email"
          value={contactForm.email}
          onChange={handleFormChange}
          required
          full
        />
        <Input
          name="message"
          variant="textarea"
          icon={faUser}
          placeholder="Your messasge"
          value={contactForm.message}
          onChange={handleFormChange}
          required
          full
        />
        <Button
          buttonType="submit"
          text={isSending ? 'Sending' : 'Send'}
          disabled={isSending}
        />
      </FormWrapper>
    </FormSectionWrapper>
  );
};

export { FormSection };
