import { ERROR_MESSAGES } from "./constants.js";

export function registerMessageHandler(messageType, handler) {

    chrome.runtime.onMessage.addListener(
        (message, sender, sendResponse) => {
            if (message.type !== messageType) {
                sendResponse({
                    success: false,
                    error: ERROR_MESSAGES.UNKNOWN_MESSAGE_TYPE(message.type)
                });

                return false;
            }

            Promise.resolve(handler(message.data))
                .then(result => {
                    sendResponse({
                        success: true, result
                    });
                })
                .catch(error => {
                    console.error(error);
                    sendResponse({
                        success: false, error: error.message
                    });
                });

            return true;
        }
    );
}
