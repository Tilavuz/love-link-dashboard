import { privateInstance, privateInstanceFile } from "@/api/client-api";

class BotMessageService {
  async sendTextMessage({ id, text }: { id: string; text: string }) {
    try {
      const res = await privateInstance.post(`/bot-message/text/${id}`, {
        text,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async sendPhotosMessage({
    id,
    caption,
    photos,
  }: {
    id: string;
    caption?: string;
    photos: FileList;
  }) {
    try {
      const formData = new FormData();

      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }

      if (caption) {
        formData.append("caption", caption);
      }

      const res = await privateInstanceFile.post(
        `/bot-message/photos/${id}`,
        formData
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async sendTextMessageForAll({ text }: { text: string }) {
    try {
      const res = await privateInstance.post(`/bot-message/text/all`, {
        text,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async sendPhotosMessageForAll({
    caption,
    photos,
  }: {
    caption?: string;
    photos: FileList;
  }) {
    try {
      const formData = new FormData();

      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }

      if (caption) {
        formData.append("caption", caption);
      }

      const res = await privateInstanceFile.post(
        `/bot-message/photos/all`,
        formData
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const botMessageService = new BotMessageService();
