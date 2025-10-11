import { ParseError } from "./errors";

export async function safeJson<T = unknown>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return undefined as unknown as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ParseError("Failed to parse JSON response");
  }
}

/** Encapsula validação opcional (útil para Zod custom). */
export function validateWith<T>(value: T, validator?: (v: T) => void): T {
  if (validator) validator(value);
  return value;
}
