import { updateTheme } from "@/api/user.service";
import styles from "./ColorPaletteModal.module.css";

interface ColorPaletteModalProps {
  onClose: (isModalOpen: boolean) => void;
}

export default function ColorPaletteModal({ onClose }: ColorPaletteModalProps) {
  const onColorChange = (color: string) => {
    const root = document.getElementById("theme-root");
    if (root) {
      root.className = "";
      root.classList.add(`${color}-mode`);
    }
    updateTheme(color);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={() => onClose(false)}>
        <div className="modal rounded-lg bg-white sm:right-[100px]">
          <div className="w-60 grid grid-cols-4 gap-4 p-6">
            <div
              className={styles.dot + " bg-rose-400  text-white p-4"}
              onClick={() => onColorChange("red")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-amber-400  text-white p-4"}
              onClick={() => onColorChange("amber")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-lime-400  text-white p-4"}
              onClick={() => onColorChange("lime")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-teal-400  text-white p-4"}
              onClick={() => onColorChange("teal")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-sky-400  text-white p-4"}
              onClick={() => onColorChange("sky")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-violet-400  text-white p-4"}
              onClick={() => onColorChange("violet")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-pink-400  text-white p-4"}
              onClick={() => onColorChange("pink")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-gray-400  text-white p-4"}
              onClick={() => onColorChange("gray")}
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
