export function isValidImagePath(p: string) {
  const validExtensions = /\.(jpg|jpeg|png|webp|gif|svg)$/i;
  return validExtensions.test(p) && !p.includes("..");
}
