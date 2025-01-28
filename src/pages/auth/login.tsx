"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { authErrorLogin, login, startLogin } from "@/features/auth-slice";
import { RootState } from "@/app/store";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { authError, loading } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(startLogin());
      if (!username || !password) {
        dispatch(authErrorLogin("Please enter both username and password."));
        return;
      }
      const data = await authService.login({ username, password });
      dispatch(login(data.auth));
    } catch (error) {
      console.error(error);
      dispatch(authErrorLogin("Login failed"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Frensdating
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {authError && <p className="text-sm text-red-500">{authError}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {loading ? "Loading..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
