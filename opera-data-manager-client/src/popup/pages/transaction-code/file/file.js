import { ERROR_MESSAGES, INFO_MESSAGES } from "../../../../utils/constants.js";
import { showStatus } from "../../../shared/js/status.js";

export function initializeFileImport() {

    const fileInput = document.getElementById("transaction-code-file");
    const importFileButton = document.getElementById("import-file-button");

    fileInput.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        importFileButton.disabled = !file;
    });

    importFileButton.addEventListener("click", async () => {
        const file = fileInput.files?.[0];
        if (!file) return;
        importFileButton.disabled = true;
        importFileButton.textContent = "Uploading...";
        showStatus(`Selected file: ${file.name}!`, "loading");

        try {
            console.log(INFO_MESSAGES.FILE_SELECTED(file.name));
            showStatus("File selected successfully.", "success");

        } catch (error) {

            console.error(ERROR_MESSAGES.FILE_IMPORT_FAILED(error));
            showStatus(error.message, "error");

        } finally {

            importFileButton.disabled = false;
            importFileButton.textContent = "Import Transaction Codes";
        }
    });
}
