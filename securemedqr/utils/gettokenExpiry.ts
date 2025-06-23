export default function calculateExpiryDate(verifiedAt: string): string {
  const date = new Date(verifiedAt);
  date.setDate(date.getDate() + 90);
  return date.toLocaleDateString();
}
