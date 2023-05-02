import { useState } from 'react';

import {
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import {
  StyledFormSectionWrapper,
  StyledFormWrapper,
  StyledTitle,
} from './FormSection.styles';

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

    // Imitating API, replace later with EmailJS or similar
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
    <StyledFormSectionWrapper>
      <StyledTitle>Contact us</StyledTitle>
      <StyledFormWrapper onSubmit={handleSubmit}>
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
          placeholder="Your message"
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
      </StyledFormWrapper>
    </StyledFormSectionWrapper>
  );
};

export { FormSection };
