import { privateInstance } from "../api/client-api";

class AuthService {
  async login({ username, password }: { username: string; password: string }) {
    try {
      const res = await privateInstance.post("/auths/auth/login", {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async changeAuth({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const res = await privateInstance.put("/auths/auth/change", { username, password });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getAuth() {
    try {
      const res = await privateInstance.get("/auths/auth");
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const authService = new AuthService();
