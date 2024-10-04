import { login, logout } from "@/api/auth.service";
import { auth } from "@/firebase/firebase";
import { loadCurrentUserReducer } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface SettingModalProps {
  onClose: () => void;
}

export default function SettingModal({ onClose }: SettingModalProps) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(auth.currentUser);

  const handleCloseClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onClose();
  };
  const onClickLogin = () => {
    login().then(() => {
      setUser(auth.currentUser);
      dispatch(loadCurrentUserReducer(auth.currentUser));
      onClose();
    });
  };

  const onClickLogout = () => {
    logout().then(() => {
      setUser(null);
      dispatch(loadCurrentUserReducer(null));
      onClose();
    });
  };

  return (
    <div className="modal-backdrop" onClick={handleCloseClick}>
      <div className="modal right-[70px]" onClick={(e) => e.stopPropagation()}>
        <div className="relative shadow w-36 bg-white rounded-lg">
          <ul className="text-gray-600 place-content-center">
            <li className="p-3 rounded-t-lg hover:bg-gray-100">
              {user ? (
                <span>Hi, {user.displayName}</span>
              ) : (
                <button className="w-full flex" onClick={onClickLogin}>
                  Login
                </button>
              )}
            </li>
            {user && (
              <li className="p-3 hover:bg-gray-100">
                <button className="w-full flex" onClick={onClickLogout}>
                  Logout
                </button>
              </li>
            )}
            <li className="p-3 rounded-b-lg hover:bg-gray-100">
              <button className="w-full flex">Color Theme</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
