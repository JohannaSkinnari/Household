import { useEffect } from "react";
import { loadBackgroundData, loadData } from "../redux/auth/authThunk";
import { useAppSelector } from "../redux/reduxHooks";
import { useAppDispatch } from "../redux/reduxStore";

export const Listener = () => {
  const user = useAppSelector(u => u.userList);
  const members = useAppSelector(m => m.memberList);
  const dispatch = useAppDispatch();
  // checks when a user is approved in members-section
  useEffect(() => {
    const interaval = setInterval(() => {
      dispatch(loadData(user.activeUser));
    }, 1000 * 30);

    return () => clearInterval(interaval);
  }, []);

  useEffect(() => {
    const interaval = setInterval(() => {
      dispatch(loadBackgroundData(user.activeUser));
    }, 1000 * 30);

    return () => clearInterval(interaval);
  }, []);
  // checks when a user has made a request to join.
  useEffect(() => {
    dispatch(loadData(user.activeUser));
  }, [members.loading == false]);
  return null;
};
