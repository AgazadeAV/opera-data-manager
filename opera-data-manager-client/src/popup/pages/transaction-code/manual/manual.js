import { ERROR_MESSAGES, ERROR_MESSAGES, MESSAGE_TYPES } from "../../../../utils/constants.js";
import { showStatus } from "../../../shared/js/status.js";

export function initializeManualTransactionCode() {

    const form = document.getElementById("transaction-code-form");
    const createButton = document.getElementById("create-button");

    form.addEventListener("submit", async event => {
        event.preventDefault();
        const data = {
            code: document.getElementById("code").value.trim(),
            description: document.getElementById("description").value.trim(),
            subgroup: document.getElementById("subgroup").value.trim(),
            transactionType: document.getElementById("transactionType").value.trim(),
            revenueGroup: document.getElementById("revenueGroup").checked,
            manualPosting: document.getElementById("manualPosting").checked
        };

        if (!data.code || !data.description || !data.subgroup) {
            showStatus("Please fill in all required fields!", "error");
            return;
        }

        setLoading(createButton, true);

        try {
            const response = await chrome.runtime.sendMessage({
                type: MESSAGE_TYPES.CREATE_TRANSACTION_CODE, data
            });

            if (!response?.success) {
                throw new Error(response?.error || ERROR_MESSAGES.CREATE_TRANSACTION_CODE_FAILED);
            }

            showStatus("Transaction code created successfully.", "success");
            form.reset();

        } catch (error) {

            console.error(ERROR_MESSAGES.CREATE_TRANSACTION_CODE_FAILED(error));
            showStatus(error.message, "error");

        } finally {

            setLoading(createButton, false);
        }
    });
}

function setLoading(button, loading) {
    button.disabled = loading;
    button.textContent = loading ? "Creating..." : "Create Transaction Code";
}
