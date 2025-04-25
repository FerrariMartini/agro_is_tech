export function removeNonDigits(value: string): string {
  return value.replace(/\D/g, '');
}
