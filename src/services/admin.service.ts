import { privateInstance } from "@/api/client-api";

class AdminService {
  async getAdmins() {
    try {
      const res = await privateInstance.get("/admins");
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async createAdmin({
    username,
    password,
    chatId,
  }: {
    username: string;
    password: string;
    chatId: string;
  }) {
    try {
      const res = await privateInstance.post("/admins/create", {
        username,
        password,
        chatId,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteAdmin(id: string) {
    try {
      const res = await privateInstance.delete(`/admins/delete/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const adminService = new AdminService();
