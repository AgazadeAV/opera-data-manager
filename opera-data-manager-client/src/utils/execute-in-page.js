import { MESSAGE_TYPES } from "./constants.js";

export function executeInPage(action, params = {}) {

    return new Promise((resolve, reject) => {
        const requestId = `opera-adf-${Date.now()}-${Math.random()}`;
        const handler = (event) => {
            const isSameWindow = event.source === window;
            const isAdfResponse = event.data?.type === MESSAGE_TYPES.OPERA_ADF_RESPONSE;
            const isSameRequest = event.data?.requestId === requestId;

            if (!isSameWindow || !isAdfResponse || !isSameRequest) return;

            window.removeEventListener("message", handler);

            if (event.data.error) {
                reject(new Error(event.data.error));
            } else {
                resolve(event.data.result);
            }
        };

        window.addEventListener("message", handler);
        window.postMessage({ type: MESSAGE_TYPES.OPERA_ADF_REQUEST, requestId, action, params }, "*");
    });
}
