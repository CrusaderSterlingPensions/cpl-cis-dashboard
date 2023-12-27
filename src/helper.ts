export const capitalizeFirstLetter = (str: string) =>
  str?.toLowerCase()?.charAt(0)?.toUpperCase() + str?.toLowerCase()?.slice(1);

export const formatDate = (inputDate: any) => {
  const dateObject = new Date(inputDate);

  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const year = String(dateObject.getFullYear()).slice(-2);

  const hours = String(dateObject.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  const ampm = dateObject.getHours() >= 12 ? 'pm' : 'am';

  return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
};
