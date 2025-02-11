import { useEffect, useRef } from "react";
import { updateTheme } from "../../../../api/user.service";
import styles from "./ColorPaletteModal.module.css";

interface ColorPaletteModalProps {
  onClose: (isModalOpen: boolean) => void;
}

export default function ColorPaletteModal({ onClose }: ColorPaletteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      onClose(false);
    }
  };

  const onColorChange = (color: string) => {
    const root = document.getElementById("theme-root");
    if (root) {
      root.className = "";
      root.classList.add(`${color}-mode`);
    }
    updateTheme(color);
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={() => onClose(false)}
    >
      <div
        className="modal rounded-lg bg-white sm:right-[100px] p-8 shadow"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="sr-only">
          Select a Color
        </h2>

        <button
          className="absolute flex top-0 right-1 p-2 text-gray-600 hover:text-black"
          onClick={() => onClose(false)}
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Color Options */}
        <div className="w-60 grid grid-cols-4 gap-4 justify-items-center">
          {[
            { color: "red", bg: "bg-rose-400" },
            { color: "amber", bg: "bg-amber-400" },
            { color: "lime", bg: "bg-lime-400" },
            { color: "teal", bg: "bg-teal-400" },
            { color: "sky", bg: "bg-sky-400" },
            { color: "violet", bg: "bg-violet-400" },
            { color: "pink", bg: "bg-pink-400" },
            { color: "gray", bg: "bg-gray-400" },
          ].map(({ color, bg }) => (
            <button
              key={color}
              className={`${bg} ${styles.dot} text-white p-4`}
              onClick={() => onColorChange(color)}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
