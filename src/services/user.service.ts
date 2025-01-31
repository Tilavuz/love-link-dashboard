import { privateInstance } from "@/api/client-api";

class UserService {
  async usersSearch({
    gender,
    ages,
    goal,
    location,
    page,
  }: {
    gender?: number;
    ages?: string;
    location?: string;
    goal?: string;
    page: number;
  }) {
    try {
      const res = await privateInstance.get("/users/search/admin", {
        params: {
          gender,
          ages,
          location,
          goal,
          page,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const userService = new UserService();
