// Utility for formatting numbers for display (removes trailing zeros and dot)
export function formatNumberDisplay(value: number | string, decimals = 6): string {
  if (value === "" || value === null || value === undefined) return "";
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "";
  return num
    .toFixed(decimals)
    .replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/, "")
    .replace(/\.$/, "");
}
