export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const capitalizeFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
