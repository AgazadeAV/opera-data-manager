import { ERROR_MESSAGES, INFO_MESSAGES, MESSAGE_TYPES } from "../../../../utils/constants.js";
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

            const buffer = await file.arrayBuffer();

            const bytes = new Uint8Array(buffer);

            let binary = "";

            for (let i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            const fileContent = btoa(binary);

            const response = await chrome.runtime.sendMessage({
                type: MESSAGE_TYPES.IMPORT_TRANSACTION_CODES,
                data: {
                    fileName: file.name,
                    fileType: file.type,
                    fileContent
                }
            });

            if (!response?.success) {
                throw new Error(
                    response?.error || ERROR_MESSAGES.FILE_IMPORT_FAILED()
                );
            }

            console.log("Import response:", response);
            console.log("Import result:", response.result);
            console.log("Import result type:", typeof response.result);

            showStatus("Transaction codes imported successfully.", "success");

        } catch (error) {

            console.error(ERROR_MESSAGES.FILE_IMPORT_FAILED(error));
            showStatus(error.message, "error");

        } finally {

            importFileButton.disabled = false;
            importFileButton.textContent = "Import Transaction Codes";
        }
    });
}
