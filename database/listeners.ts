import { useEffect } from "react";
import { loadBackgroundData, loadData } from "../redux/auth/authThunk";
import { useAppDispatch, useAppSelector } from "../redux/reduxHooks";

export const Listener = () => {
  const user = useAppSelector(u => u.userList);
  const members = useAppSelector(m => m.memberList);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(loadData(user.activeUser));
  }, [members.loading == false]);
  return null;
};
