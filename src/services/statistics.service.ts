import { privateInstance } from "@/api/client-api";

class StatisticsService {
  async getStatistics() {
    try {
      const res = await privateInstance.get("/statistics");
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const statisticsService = new StatisticsService();
