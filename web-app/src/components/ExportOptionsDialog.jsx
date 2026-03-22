import { Download } from "lucide-react";
import styles from "../styles/ExportOptionsDialog.module.css";

// Lets the user choose which export pipeline to run from the dashboard.
export default function ExportOptionsDialog({
  open,
  title = "Export Candidates",
  message = "Choose the format for your candidate dashboard export.",
  loading = false,
  onExportPdf,
  onExportExcel,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className={styles.layer} role="presentation">
      <div className={styles.card} role="dialog" aria-modal="true">
        <div className={styles.iconWrap}>
          <Download size={20} />
        </div>

        <div className={styles.content}>
          <h3>{title}</h3>
          <p>{message}</p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnGhost}`}
            onClick={onExportExcel}
            disabled={loading}
          >
            Excel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onExportPdf}
            disabled={loading}
          >
            {loading ? "Exporting..." : "PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}
