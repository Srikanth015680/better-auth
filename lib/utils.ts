export { cn } from "cn"

export const VALID_DOMAINS = () => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];

  if (process.env.NODE_ENV === "development") {
    domains.push("example.com");
  }

  return domains;
};

export const VALID_PASSWORD = (password: string) => {
  return (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
};

export const VALID_NAME = (name: string) => {
  return (
    name.trim().length >= 2 &&
    /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(name.trim())
  );
};