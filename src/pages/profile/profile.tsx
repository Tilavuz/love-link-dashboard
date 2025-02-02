import type { RootState } from "@/app/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serverUrl } from "@/helpers/shared";
import { CalendarDays, Globe, MapPin, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { auth } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState(auth?.name || "");
  const [age, setAge] = useState(auth?.age?.toString() || "");
  const [location, setLocation] = useState(auth?.location || "");
  const [gender, setGender] = useState(auth?.gender || "");
  const [goal, setGoal] = useState(auth?.goal || "");
  const [bio, setBio] = useState(auth?.bio || "");

  useEffect(() => {
    if (auth) {
      setName(auth.name || "");
      setAge(auth.age?.toString() || "");
      setLocation(auth.location || "");
      setGender(auth.gender || "");
      setGoal(auth.goal || "");
      setBio(auth.bio || "");
    }
  }, [auth]);

  if (!auth) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={`${serverUrl}/uploads/${auth?.photo}`}
                  alt={auth?.name}
                />
                <AvatarFallback>{auth?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{auth?.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Chat ID: {auth?.chatId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  name="gender"
                  value={gender}
                  onValueChange={setGender}
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Goal</Label>
                <Select
                  name="goal"
                  value={goal}
                  onValueChange={setGoal}
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="love">Love</SelectItem>
                    <SelectItem value="friendship">Friendship</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="dating">Dating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled
                className="min-h-[100px]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <User className="w-4 h-4 mr-1" />
                {auth?.gender}
              </Badge>
              <Badge variant="secondary">
                <CalendarDays className="w-4 h-4 mr-1" />
                {auth?.age} years old
              </Badge>
              <Badge variant="secondary">
                <MapPin className="w-4 h-4 mr-1" />
                {auth?.location}
              </Badge>
              <Badge variant="secondary">
                <Globe className="w-4 h-4 mr-1" />
                {auth?.language_code?.toUpperCase()}
              </Badge>
            </div>

            {auth?.last_active && (
              <p className="text-sm text-muted-foreground">
                Last active: {new Date(auth?.last_active).toLocaleString()}
              </p>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="opacity-60 text-sm text-center">You can change your information in the frensdating application!</p>
      </CardFooter>
    </Card>
  );
}
