export const capitalizeWord = (string) => {
  const words = string.split(" ");

  const capitalizedWords = words.map((word) => {
    if (words.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      return "";
    }
  });

  const capitalizedString = capitalizedWords.join(" ");

  return capitalizedString;
};
