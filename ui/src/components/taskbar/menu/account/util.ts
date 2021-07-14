const USERNAME_LOCAL_STORAGE_KEY = 'username' as const;

export function getUsernameFromLocalStorage(): string {
  const username: string | null = localStorage.getItem(USERNAME_LOCAL_STORAGE_KEY);
  if (username === null) return "";
  return username;
}

export function checkIfUsernameExistsInLocalStorage(): boolean {
  const username = getUsernameFromLocalStorage();
  if (username === "") return false;
  return true;
}

export function setUsernameInLocalStorage(username: string) {
  localStorage.setItem(USERNAME_LOCAL_STORAGE_KEY, username);
}

export function deleteUsernameFromLocalStorage() {
  localStorage.removeItem(USERNAME_LOCAL_STORAGE_KEY);
}
