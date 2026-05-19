export const formatDate = (date: Date | string) => {
  return Intl.DateTimeFormat('en-us', { timeStyle: "short" }).format(new Date(date));
}