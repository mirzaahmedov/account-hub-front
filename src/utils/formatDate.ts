export function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  const formatted = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatted;
}
