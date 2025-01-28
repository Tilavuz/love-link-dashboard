import { AppDispatch } from "@/app/store";
import { getAuth } from "@/features/auth-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useConnect() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);
}
