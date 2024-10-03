interface DeleteConfirmationModalProps {
  onClose: (confirmation: boolean) => void;
}

export default function DeleteConfirmationModal({
  onClose,
}: DeleteConfirmationModalProps) {
  return (
    <>
      <div className="modal-backdrop" onClick={() => onClose(false)}>
        <div className="modal-content bg-white">
          <div className="p-2">
            <span>Do you want to delete this task ?</span>
          </div>

          <div className="flex justify-end">
            <div className="flex gap-2">
              <button
                onClick={() => onClose(false)}
                className="px-3 py-1 bg-amber-600 text-white rounded-md"
              >
                No
              </button>
              <button
                onClick={() => onClose(true)}
                className="px-3 py-1 bg-amber-600 text-white rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
