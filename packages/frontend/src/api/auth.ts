import { get, post } from ".";
import { CurrentUser } from "../store/user";

export const authenticateUser = async (username: string, password: string): Promise<CurrentUser> => {
  const user = await post<{
    username: string,
    password: string
  }, CurrentUser>("/api/auth/login", {
    username,
    password
  });

  return user;
};

export const registerUser = async (username: string, password: string): Promise<number> => {
  const data = await post<{
    username: string,
    password: string
  }, {
    user_id: number
  }>("/api/auth/register", {
    username,
    password
  });

  return data.user_id;
};

export const checkCurrentAuth = async (): Promise<CurrentUser | null> => {
  try {
    const data = await get<CurrentUser>("/api/auth/check");
    return data;
  }
  catch {
    return null;
  }
};

export const logOut = async (): Promise<void> => {
  await get("/api/auth/logout");
};
