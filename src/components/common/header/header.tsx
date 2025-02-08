import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { serverUrl } from "@/helpers/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export default function Header({ children }: { children: ReactNode }) {
  const { auth } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  return (
    <header className="w-full mt-2 p-2 border-b">
      <nav className="flex items-center justify-between">
        <div>
          {children}
          <div></div>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 cursor-pointer border-l pl-4 w-[210px]"
        >
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={`${serverUrl}/uploads/${auth?.photo}`}
              alt={auth?.name}
            />
            <AvatarFallback className="uppercase">
              {auth?.username?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold">{auth?.username}</p>
            <p className="text-sm">{auth?.chatId}</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
