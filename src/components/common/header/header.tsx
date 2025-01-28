import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { serverUrl } from "@/helpers/shared";

export default function Header({ children }: { children: ReactNode }) {
  const { auth } = useSelector((state: RootState) => state.auth);
  return (
    <header className="w-full mt-2 p-2 border-b">
      <nav className="flex items-center justify-between">
        <div>
          {children}
          <div></div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer border-l pl-4 w-[210px]">
          <div className="w-14 h-14 rounded-full overflow-hidden border">
            <img
              className="w-full h-full object-cover"
              src={`${serverUrl}/uploads/${auth?.photo}`}
              alt="profile image"
            />
          </div>
          <div>
            <p className="font-bold">{auth?.username}</p>
            <p className="text-sm">{auth?.chatId}</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
