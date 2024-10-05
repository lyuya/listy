import { login } from "@/api/auth.service";

interface AskForLoginModalProps {
  onClose: () => void;
}

export default function AskForLoginModal({ onClose }: AskForLoginModalProps) {
  const handleCloseClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onClose();
  };

  const onClickLogin = async () => {
    await login();
  };
  return (
    <>
      <div className="modal-backdrop dark" onClick={handleCloseClick}>
        <div className="modal-content bg-white">
          <div className="px-2 my-10 flex justify-center font-bold w-full">
            <span>Login to create your first task list !</span>
          </div>
          <div className="flex justify-center w-full">
            <button
              onClick={onClickLogin}
              className="px-3 py-1 border rounded-lg flex hover:bg-gray-100"
            >
              <img src="assets/google.svg" alt="Google logo" height="160" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
