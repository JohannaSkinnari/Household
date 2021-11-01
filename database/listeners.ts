import { useEffect } from "react";
import { loadData } from "../redux/auth/authThunk";
import { useAppSelector } from "../redux/reduxHooks";
import { useAppDispatch } from "../redux/reduxStore";

export const Listener = () => {
  const user = useAppSelector(u => u.userList);
  const members = useAppSelector(m => m.memberList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadData(user.activeUser));
  }, [members.loading == false]);
  // where sats till som kollar på isAccepted / isActive eller vad den heter.
  // i auth thunken.
  // kanske lägga till något att att titta på istället för loading.
  return null;
};
