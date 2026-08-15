import { ERROR_MESSAGES } from "../utils/constants.js";

export class ServerClient {

    HTTP_METHOD_POST = "POST";
    API_BASE_URL = "http://localhost:8080/api/v1";
    TRANSACTION_CODE_API_URL = `${this.API_BASE_URL}/transaction-codes`;
    CREATE_TRANSACTION_CODE_URL = `${this.TRANSACTION_CODE_API_URL}/create-transaction-code`;
    IMPORT_TRANSACTION_CODES_URL = `${this.TRANSACTION_CODE_API_URL}/import-transaction-codes`;

    async createTransactionCode(transactionCode) {

        const response = await fetch(
            this.CREATE_TRANSACTION_CODE_URL, {
            method: this.HTTP_METHOD_POST,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transactionCode)
        });

        if (!response.ok) {
            throw new Error(ERROR_MESSAGES.CREATE_TRANSACTION_CODE_HTTP_FAILED(response.status));
        }

        return await response.json();
    }
}
