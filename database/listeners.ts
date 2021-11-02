import { useEffect } from "react";
import { loadData } from "../redux/auth/authThunk";
import { useAppSelector } from "../redux/reduxHooks";
import { useAppDispatch } from "../redux/reduxStore";

export const Listener = () => {
  const user = useAppSelector(u => u.userList);
  const members = useAppSelector(m => m.memberList);
  const dispatch = useAppDispatch();
  // checks when a user is approved in members-section
  useEffect(() => {
    dispatch(loadData(user.activeUser));
  }, [members.isCreatedSuccess == true]);
  // checks when a user has made a request to join.
  useEffect(() => {
    dispatch(loadData(user.activeUser));
  }, [members.loading == false]);
  return null;
};
