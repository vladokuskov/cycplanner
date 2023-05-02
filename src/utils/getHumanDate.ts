const getHumanDate = (e?: number) => {
  if (e) {
    const date = new Date(e).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return date;
  }
};

export { getHumanDate };
