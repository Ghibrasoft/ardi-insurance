export const formatDate = (dateString?: string | null) => {
  const date = new Date(dateString ?? "");

  if (!dateString || isNaN(date.getTime())) return "N/A";

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(date.getDate()).padStart(2, "0")}`;
};
