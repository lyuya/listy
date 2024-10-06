interface ColorPaletteModalProps {
    onClose: (confirmation: boolean) => void;
  }
  
  export default function ColorPaletteModal({
    onClose,
  }: ColorPaletteModalProps) {
    return (
      <>
        <div className="modal-backdrop dark" onClick={() => onClose(false)}>
          <div className="modal-content bg-white">
            <div className="p-2">
              <span>Do you want to delete this task ?</span>
            </div>
  
            <div className="flex justify-end">
              <div className="flex gap-2">
                
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  