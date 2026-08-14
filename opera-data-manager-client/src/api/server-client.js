import { CONFIG, HTTP_METHODS, ERROR_MESSAGES_WITH_VALUES } from "../utils/constants.js";

export class ServerClient {

    async createTransactionCode(transactionCode) {

        const response = await fetch(
            CONFIG.CREATE_TRANSACTION_CODE_ENDPOINT, {
            method: HTTP_METHODS.POST,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionCode)
        }
        );

        if (!response.ok) {
            throw new Error(
                ERROR_MESSAGES_WITH_VALUES.CREATE_TRANSACTION_CODE_HTTP_FAILED(
                    response.status
                )
            );
        }

        return await response.json();
    }
}
