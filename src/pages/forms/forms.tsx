import SendTextMessage from "@/components/common/send-text-message";
import { AuthForm } from "./_components/auth-form";
import SendPhotosMessage from "@/components/common/send-photos-message";
import { botMessageService } from "@/services/bot.message.service";

export default function Forms() {
  const sendTextMessage = async ({ text }: { text: string }) => {
    try {
      const data = await botMessageService.sendTextMessageForAll({ text });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendPhotosMessage = async ({
    caption,
    photos,
  }: {
    caption?: string;
    photos: FileList;
  }) => {
    try {
      const data = await botMessageService.sendPhotosMessageForAll({
        caption,
        photos,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-start gap-4 flex-wrap">
      <AuthForm />
      <div className="flex-1 max-w-[400px]">
        <SendTextMessage handleSubmit={sendTextMessage} />
      </div>
      <div className="flex-1">
        <SendPhotosMessage handleSubmit={sendPhotosMessage} />
      </div>
    </div>
  );
}
