import { useState } from 'react';

const useCopyEventURL = (eventId: string | null, slug?: string | null) => {
  const [isCopied, setIsCopied] = useState(false);
  const baseURL = window.location.href;

  const copyToClipboard = async () => {
    if (baseURL && eventId) {
      const url = slug
        ? `${baseURL}${slug}/${eventId}`
        : `${baseURL}${eventId}`;
      await navigator.clipboard.writeText(url);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return { copyToClipboard, isCopied };
};

export { useCopyEventURL };
