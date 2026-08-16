import { MESSAGE_TYPES } from "../utils/constants.js";

export function executeAdfAction(action, params = {}) {

    return new Promise((resolve, reject) => {

        const requestId = createRequestId();

        const handler = createResponseHandler(
            requestId,
            resolve,
            reject
        );

        window.addEventListener("message", handler);

        sendAdfRequest(requestId, action, params);
    });
}

function createRequestId() {
    return `opera-adf-${Date.now()}-${Math.random()}`;
}

function createResponseHandler(requestId, resolve, reject) {

    return function handler(event) {

        if (!isValidResponse(event, requestId)) {
            return;
        }

        window.removeEventListener("message", handler);

        if (event.data.error) {
            reject(new Error(event.data.error));
            return;
        }

        resolve(event.data.result);
    };
}

function isValidResponse(event, requestId) {

    return event.source === window &&
        event.data?.type === MESSAGE_TYPES.OPERA_ADF_RESPONSE &&
        event.data?.requestId === requestId;
}

function sendAdfRequest(requestId, action, params) {

    window.postMessage({
        type: MESSAGE_TYPES.OPERA_ADF_REQUEST,
        requestId,
        action,
        params
    }, "*");
}
