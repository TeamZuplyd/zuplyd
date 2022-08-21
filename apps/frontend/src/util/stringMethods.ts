export const toTitleCase = (str:string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatColumnHeader = (str: string) => {
  const s = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return s.replace(/_/g, ' ');
};