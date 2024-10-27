
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const viewDate = (date) => {
  const dateString = formatDate(date);
  const [year, month, day] = dateString.split("-");
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};