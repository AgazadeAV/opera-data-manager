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
            throw new Error(
                ERROR_MESSAGES.IMPORT_TRANSACTION_CODES_HTTP_FAILED(
                    response.status
                )
            );
        }

        const result = await response.json();

        console.log("SERVER RAW IMPORT RESULT:", result);
        console.log("SERVER IMPORT RESULT TYPE:", typeof result);
        console.log("SERVER IMPORT RESULT LENGTH:", result?.length);

        return result;
    }

    async importTransactionCodes(file) {

        console.log("IMPORT FILE:", file);
        console.log("IMPORT FILE NAME:", file.name);
        console.log("IMPORT FILE TYPE:", file.type);
        console.log("IMPORT FILE SIZE:", file.size);

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
            this.IMPORT_TRANSACTION_CODES_URL,
            {
                method: this.HTTP_METHOD_POST,
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error(
                ERROR_MESSAGES.IMPORT_TRANSACTION_CODES_HTTP_FAILED(
                    response.status
                )
            );
        }

        return await response.json();
    }
}
