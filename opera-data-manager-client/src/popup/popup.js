import { ERROR_MESSAGES } from "../utils/constants.js";
import { loadPages } from "./shared/js/page-loader.js";
import { initializeNavigation } from "./shared/js/navigation.js";
import { initializeManualTransactionCode } from "./pages/transaction-code/manual/manual.js";
import { initializeFileImport, initializeFailedFileDownload } from "./pages/transaction-code/file/file.js";

async function initializePopup() {

    await loadPages();
    
    initializeNavigation();
    initializeManualTransactionCode();
    initializeFileImport();
    initializeFailedFileDownload();
}

initializePopup().catch(
    error => {
        console.error(
            ERROR_MESSAGES.POPUP_INITIALIZATION_FAILED(error)
        );
    }
);
