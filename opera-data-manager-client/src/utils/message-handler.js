export function registerMessageHandler(messageType, handler) {

    chrome.runtime.onMessage.addListener(

        (message, sender, sendResponse) => {

            if (message.type !== messageType) {
                return false;
            }

            Promise.resolve(handler(message.data))

                .then(result => {
                    sendResponse({
                        success: true,
                        result
                    });
                })

                .catch(error => {
                    console.error(error);
                    sendResponse({
                        success: false,
                        error: error.message
                    });
                });

            return true;
        }
    );
}
