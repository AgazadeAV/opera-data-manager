const API_BASE_URL = "http://localhost:8080/api/v1";
const OPERA_CLOUD_URL_PART = "oraclecloud.com";

export const CONFIG = {
    API_BASE_URL,
    CREATE_TRANSACTION_CODE_ENDPOINT: `${API_BASE_URL}/transaction-codes/create-transaction-code`,
    DEFAULT_TIMEOUT: 10000,
    MAX_RETRIES: 3,
    OPERA_CLOUD_URL_PART,
    OPERA_CLOUD_TAB_URL_PATTERN: `https://*.${OPERA_CLOUD_URL_PART}/*`,
    POLL_INTERVAL: 100,
    RETRY_DELAY: 500
};

export const CSS_VALUES = {
    DISPLAY_NONE: "none",
    OPACITY_TRANSPARENT: "0",
    VISIBILITY_HIDDEN: "hidden"
};

export const DOM_ATTRIBUTES = {
    ARIA_DISABLED: "aria-disabled",
    ARIA_DISABLED_TRUE: "true",
    DISABLED: "disabled"
};

export const DOM_CLASSES = {
    ORACLE_DISABLED: "oj-disabled"
};

export const DOM_EVENTS = {
    CLICK: "click",
    CHANGE: "change",
    MESSAGE: "message",
    SUBMIT: "submit"
};

export const DOM_ELEMENTS = {
    ANCHOR: "a",
    INPUT: "input",
    LABEL: "label",
    SPAN: "span"
};

export const DOM_IDS = {
    CODE: "code",
    DESCRIPTION: "description",
    MANUAL_POSTING: "manualPosting",
    REVENUE_GROUP: "revenueGroup",
    SUBGROUP: "subgroup",
    TRANSACTION_TYPE: "transactionType"
};

export const DOM_SELECTORS = {
    IMPORT_TYPE: "[data-import-type]"
};

export const ERROR_MESSAGES = {
    OPERA_CLOUD_TAB_NOT_FOUND: "Opera Cloud tab not found!",
    OPERA_CLOUD_TAB_ID_NOT_FOUND: "Opera Cloud tab ID not found!",
    REQUIRED_FIELDS_ERROR: "Please fill in all required fields."
};

export const ERROR_MESSAGES_WITH_VALUES = {
    ADF_COMPONENT_NOT_FOUND: message => `${message} ADF component not found`,
    CREATE_TRANSACTION_CODE_FAILED: message => message ? `Failed to create transaction code: ${message}` : "Failed to create transaction code!",
    CREATE_TRANSACTION_CODE_HTTP_FAILED: message => `Failed to create transaction code. HTTP ${message}!`,
    FIELD_NOT_FOUND: message => `${message} field not found`,
    FIELD_NOT_VISIBLE: message => `${message} field did not appear!`,
    FIELD_SET_FAILED: (message1, message2, message3) => `Failed to set ${message1} to "${message2}" after ${message3} attempts.`,
    FIELD_VERIFICATION_FAILED: (message1, message2, message3, message4) => `${message1} verification failed. Expected="${message2}", ADF="${message3}", DOM="${message4}"`,
    FILE_IMPORT_FAILED: message => `Failed to import file: ${message}!`,
    INVALID_CHECKBOX_STATE: (message1, message2) => `Invalid checkbox state for ${message1}: ${message2}`,
    UNKNOWN_ADF_ACTION: message => `Unknown ADF action: ${message}`,
    UNKNOWN_MESSAGE_TYPE: message => `Unknown message type: ${message}!`,
}

export const FIELD_ACTIONS = {
    GET_DEBUG: "getDebug",
    GET_INFO: "getInfo",
    GET_METHODS: "getMethods",
    GET_TYPE: "getType",
    GET_VALUE: "getValue",
    SET_VALUE: "setValue"
};

export const HTTP_METHODS = {
    POST: "POST"
};

export const IMPORT_TYPES = {
    TRANSACTION_CODE: "transaction-code"
};

export const MESSAGE_TYPES = {
    CREATE_TRANSACTION_CODE: "CREATE_TRANSACTION_CODE",
    FILL_TRANSACTION_CODE: "FILL_TRANSACTION_CODE",
    OPERA_ADF_REQUEST: "OPERA_ADF_REQUEST",
    OPERA_ADF_RESPONSE: "OPERA_ADF_RESPONSE"
};

export const OPERA_CLOUD_BUTTON_LABELS = {
    NEW: "New",
    SAVE: "Save"
};

export const TRANSACTION_CODE_PAGE_LABELS = {
    CODE_LABEL: "Code",
    DESCRIPTION_LABEL: "Description",
    MANUAL_POSTING_LABEL: "Manual Posting",
    REVENUE_GROUP_LABEL: "Revenue Group",
    SUBGROUP_LABEL: "Subgroup",
    TRANSACTION_TYPE_LABEL: "Transaction Type"
};

export const UI_STATUS_TYPES = {
    ERROR: "error",
    LOADING: "loading",
    SUCCESS: "success"
};

export const UI_TEXT = {
    CREATE_TRANSACTION_CODE: "Create Transaction Code",
    CREATING_TRANSACTION_CODE: "Creating...",
    FILE_SELECTED: "File selected successfully.",
    IMPORT_TRANSACTION_CODES: "Import Transaction Codes",
    TRANSACTION_CODE_CREATED: "Transaction code created successfully.",
    UPLOADING_TRANSACTION_CODES: "Uploading..."
};

export const UI_TEXT_WITH_VALUES = {
    FILE_SELECTED_PREFIX: message => `Selected file: ${message}!`
}
