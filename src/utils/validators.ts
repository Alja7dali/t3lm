export function validateArabicName(input: string): boolean {
  const arabicRegex = /^[\u0600-\u06FF]{2,}$/;
  return arabicRegex.test(input);
}

export function validateEnglishName(input: string): boolean {
  const englishRegex = /^[a-zA-Z]{2,}$/;
  return englishRegex.test(input);
}

export function validateEmail(input: string): boolean {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
  return emailRegex.test(input);
}

export function validateMobile(input: string): boolean {
  const numberRegex = /^05\d{8}$/;
  return numberRegex.test(input);
}

