import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/features/auth-slice";
import { authService } from "@/services/auth.service";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function AuthForm() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.auth);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const changeData = {
        username: usernameRef?.current?.value,
        password: passwordRef?.current?.value,
      };
      const data = await authService.changeAuth(changeData);
      dispatch(login(data.auth));
    } catch (error) {
      console.error(error);
      alert("Change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Change auth data</CardTitle>
        <CardDescription>Change your personal login password</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                defaultValue={auth?.username}
                ref={usernameRef}
                id="username"
                placeholder="username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                ref={passwordRef}
                type="password"
                id="password"
                placeholder="********"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSubmit}>{loading ? "loading..." : "Change"}</Button>
      </CardFooter>
    </Card>
  );
}
