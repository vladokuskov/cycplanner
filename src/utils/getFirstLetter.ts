export const getFirstLetter = (name: string): string => {
  let index = 0;
  while (index < name.length) {
    const letter = name.charAt(index);
    if (letter.match(/[a-zA-Z0-9]/)) {
      return letter.toUpperCase();
    }
    index++;
  }
  return 'G';
};
