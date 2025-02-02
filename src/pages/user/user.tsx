import SendTextMessage from "@/components/common/send-text-message";
import UserInfo from "./_components/user-info";
import { botMessageService } from "@/services/bot.message.service";
import { useParams } from "react-router-dom";
import SendPhotosMessage from "@/components/common/send-photos-message";

export default function UserPage() {
  const { id } = useParams();

  const sendTextMessage = async ({ text }: { text: string }) => {
    try {
      if (!id || !text) return;
      const data = await botMessageService.sendTextMessage({
        text,
        id,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendPhotosMessage = async ({
    photos,
    caption,
  }: {
    photos: FileList;
    caption?: string;
  }) => {
    try {
      if (!id || !photos || photos.length === 0) return;
      const data = await botMessageService.sendPhotosMessage({
        id,
        photos,
        caption,
      });
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <UserInfo />
      <SendTextMessage handleSubmit={sendTextMessage} />
      <SendPhotosMessage handleSubmit={sendPhotosMessage} />
    </div>
  );
}
