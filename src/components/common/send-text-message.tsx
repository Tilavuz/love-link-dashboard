import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";

interface IProps {
  handleSubmit: ({ text }: { text: string }) => Promise<void>;
}

export default function SendTextMessage({ handleSubmit }: IProps) {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      await handleSubmit({ text });
      setText("");
      alert("Message sent!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded-xl">
      <div className="">
        <p className="font-bold text-xl">Send Message</p>
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-2">
        <Textarea
          value={text}
          placeholder="Write something"
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" disabled={!text}>
          {loading ? (
            "loading..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
