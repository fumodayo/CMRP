export const extractUsername = (name: string | undefined) => {
  if (name && name.includes("@gmail")) {
    const atIndex: number = name.indexOf("@");
    return name.substring(0, atIndex);
  }
  return name || " ";
};
