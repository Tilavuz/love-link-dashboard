import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Send } from "lucide-react";

interface IProps {
  handleSubmit: ({
    photos,
    caption,
  }: {
    photos: FileList;
    caption?: string;
  }) => Promise<void>;
}

export default function SendPhotosMessage({ handleSubmit }: IProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!files || files.length === 0) return;
      await handleSubmit({ photos: files, caption });
      setFiles(null);
      setCaption("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Send Photos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photos">Choose Photos</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(e.target.files)}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("photos")?.click()}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                Select Photos
              </Button>
              <span className="text-sm text-muted-foreground">
                {files
                  ? `${files.length} file(s) selected`
                  : "No files selected"}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption (optional)</Label>
            <Textarea
              id="caption"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!files || loading}>
            {loading ? (
              "Sending..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Photos
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
