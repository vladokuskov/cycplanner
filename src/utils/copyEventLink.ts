export const copyEventLink = (id: string): void => {
  const { origin, pathname } = window.location;
  const newUrl = `${origin}${pathname}${id}`;
  navigator.clipboard.writeText(newUrl);
};
