import { jwtDecode } from "jwt-decode";

export function getTokenExpiry(token: string): string | null {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp) {
      const date = new Date(decoded.exp * 1000);
      return date.toLocaleDateString();
    }
    return null;
  } catch {
    return null;
  }
}
