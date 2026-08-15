import { INFO_MESSAGES } from "../../../utils/constants.js";

export function showStatus(message, type) {
    const status = document.getElementById("status");
    status.hidden = false;
    status.textContent = message;
    status.className = INFO_MESSAGES.CLASS_NAME(type);
}
