export const NEW_USER_CUTOFF = "2099-01-01T00:00:00.000Z";

export function isBlockedNewUser(createdAt: string | null | undefined) {
  if (!createdAt) return false;
  return new Date(createdAt) >= new Date(NEW_USER_CUTOFF);
}
