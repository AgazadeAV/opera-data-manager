import { INFO_MESSAGES_WITH_VALUES } from "../../../utils/constants.js";

export function showStatus(message, type) {

    const status =
        document.getElementById("status");

    status.hidden = false;
    status.textContent = message;
    status.className =
        INFO_MESSAGES_WITH_VALUES.CLASS_NAME(type);
}