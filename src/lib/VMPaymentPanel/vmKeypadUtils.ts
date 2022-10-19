export const CLEAR_KEY = "✖";
export const CONFIRM_KEY = "✔";
export const KEYS = [
  "A",
  "1",
  "2",
  "B",
  "3",
  "4",
  "C",
  "5",
  "6",
  "D",
  "7",
  "8",
  "E",
  "9",
  "0",
  CLEAR_KEY,
  null,
  CONFIRM_KEY,
];

export function validate(keyStr: string) {
  const re = new RegExp("[A-E]+[0-4]");
  return re.test(keyStr);
}
