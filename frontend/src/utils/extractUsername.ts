export const extractUsername = (name: string | "") => {
  if (name.includes("@gmail")) {
    const atIndex: number = name.indexOf("@");
    return name.substring(0, atIndex);
  }
  return name;
};
