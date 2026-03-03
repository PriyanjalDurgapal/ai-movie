export const validateImdbId = (id: string): boolean => {
  return /^tt\d{7,8}$/.test(id);
};