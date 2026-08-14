import { MESSAGE_TYPES, DOM_EVENTS } from "../utils/constants.js";

export function executeInPage(action, params = {}) {
    
    return new Promise((resolve, reject) => {

        const requestId = `opera-adf-${Date.now()}-${Math.random()}`;

        const handler = (event) => {

            if (
                event.source !== window ||
                event.data?.type !== MESSAGE_TYPES.OPERA_ADF_RESPONSE ||
                event.data.requestId !== requestId
            ) return;

            window.removeEventListener(DOM_EVENTS.MESSAGE, handler);

            if (event.data.error) {
                reject(new Error(event.data.error));
            } else {
                resolve(event.data.result);
            }
        };

        window.addEventListener(DOM_EVENTS.MESSAGE, handler);

        window.postMessage({
            type: MESSAGE_TYPES.OPERA_ADF_REQUEST,
            requestId,
            action,
            params
        }, "*");
    });
}
