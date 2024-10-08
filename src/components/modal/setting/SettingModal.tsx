import { login, logout } from "../../../api/auth.service";
import { auth } from "../../../firebase/firebase";
import PaletteIcon from "@mui/icons-material/Palette";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

interface SettingModalProps {
  onClose: () => void;
  openColorPaletteModal: () => void;
}

export default function SettingModal({
  onClose,
  openColorPaletteModal,
}: SettingModalProps) {
  const user = auth.currentUser;

  const handleCloseClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onClose();
  };
  const onClickLogin = () => {
    login().then(() => {
      onClose();
    });
  };

  const onClickLogout = () => {
    logout().then(() => {
      onClose();
    });
  };
  const openPaletteModal = () => {
    onClose();
    openColorPaletteModal();
  };
  return (
    <div className="modal-backdrop" onClick={handleCloseClick}>
      <div className="modal right-[70px]" onClick={(e) => e.stopPropagation()}>
        <div className="relative shadow w-36 bg-white rounded-lg">
          <ul className="text-gray place-content-center">
            <li
              className={
                "p-3 rounded-t-lg " + (user ? "" : "hover:bg-gray-100")
              }
            >
              {user ? (
                <span>Hi, {user.displayName}!</span>
              ) : (
                <button className="w-full flex" onClick={onClickLogin}>
                  <LoginIcon></LoginIcon>
                  Login
                </button>
              )}
            </li>
            {user && (
              <li className="p-3 hover:bg-gray-100">
                <button className="w-full flex" onClick={onClickLogout}>
                  <LogoutIcon></LogoutIcon>
                  Logout
                </button>
              </li>
            )}
            <li className="p-3 rounded-b-lg hover:bg-gray-100">
              <button className="w-full flex" onClick={openPaletteModal}>
                <PaletteIcon></PaletteIcon>
                Color Theme
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
