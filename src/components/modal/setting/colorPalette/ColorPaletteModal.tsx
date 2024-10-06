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
  };

  return (
    <>
      <div className="modal-backdrop" onClick={() => onClose(false)}>
        <div className="modal rounded-lg bg-white sm:right-[100px]">
          <div className="w-60 grid grid-cols-4 gap-4 p-6">
            <div
              className={styles.dot + " bg-amber-600  text-white p-4"}
              onClick={() => onColorChange("amber")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-lime-600  text-white p-4"}
              onClick={() => onColorChange("lime")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-teal-600  text-white p-4"}
              onClick={() => onColorChange("teal")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-sky-600  text-white p-4"}
              onClick={() => onColorChange("sky")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-violet-600  text-white p-4"}
              onClick={() => onColorChange("violet")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-pink-600  text-white p-4"}
              onClick={() => onColorChange("pink")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-gray-600  text-white p-4"}
              onClick={() => onColorChange("gray")}
            >
              &nbsp;
            </div>
            <div
              className={styles.dot + " bg-stone-600  text-white p-4"}
              onClick={() => onColorChange("stone")}
            >
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
