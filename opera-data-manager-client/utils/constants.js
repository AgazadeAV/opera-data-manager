export const CONFIG = {
    OPERA_CLOUD_URL_PART: "oraclecloud.com",
    API_BASE_URL: "http://localhost:8080/api/v1",
    CREATE_TRANSACTION_CODE_ENDPOINT: `${API_BASE_URL}/transaction-codes/create-transaction-code`,
    DEFAULT_TIMEOUT: 10000,
    POLL_INTERVAL: 100,
    MAX_RETRIES: 3,
    RETRY_DELAY: 500
};

export const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const MESSAGE_TYPES = {
    OPERA_ADF_REQUEST: "OPERA_ADF_REQUEST",
    OPERA_ADF_RESPONSE: "OPERA_ADF_RESPONSE",
    CREATE_TRANSACTION_CODE: "CREATE_TRANSACTION_CODE"
};

export const TRANSACTION_CODE_PAGE_LABELS = {
    CODE_LABEL: "Code",
    DESCRIPTION_LABEL: "Description",
    SUBGROUP_LABEL: "Subgroup",
    TRANSACTION_TYPE_LABEL: "Transaction Type",
    REVENUE_GROUP_LABEL: "Revenue Group",
    MANUAL_POSTING_LABEL: "Manual Posting"
};

export const OPERA_CLOUD_BUTTON_LABELS = {
    NEW: "New",
    SAVE: "Save"
};

export const DOM_ELEMENTS = {
    LABEL: "label",
    SPAN: "span",
    ANCHOR: "a",
    INPUT: "input",
};

export const DOM_EVENTS = {
    CLICK: "click",
    SUBMIT: "submit",
    CHANGE: "change",
    MESSAGE: "message"
};

export const FIELD_ACTIONS = {
    SET_VALUE: "setValue",
    GET_VALUE: "getValue",
    GET_TYPE: "getType",
    GET_INFO: "getInfo",
    GET_METHODS: "getMethods",
    GET_DEBUG: "getDebug"
};

export const UI_EVENTS = {
    CLICK: "click",
    SUBMIT: "submit",
    CHANGE: "change"
};

export const UI_STATUS_TYPES = {
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error"
};

export const UI_TEXT = {
    UPLOADING_TRANSACTION_CODES: "Uploading...",
    CREATING_TRANSACTION_CODE: "Creating...",
    CREATE_TRANSACTION_CODE: "Create Transaction Code",
    IMPORT_TRANSACTION_CODES: "Import Transaction Codes",
    REQUIRED_FIELDS_ERROR: "Please fill in all required fields.",
    TRANSACTION_CODE_CREATED: "Transaction code created successfully.",
    FILE_SELECTED: "File selected successfully.",
    FILE_SELECTED_PREFIX: "Selected file:",
    FILE_IMPORT_FAILED: "Failed to import file:",
    CREATE_TRANSACTION_CODE_FAILED: "Failed to create transaction code:"
};

export const DOM_IDS = {
    CODE: "code",
    DESCRIPTION: "description",
    SUBGROUP: "subgroup",
    TRANSACTION_TYPE: "transactionType",
    REVENUE_GROUP: "revenueGroup",
    MANUAL_POSTING: "manualPosting"
};

export const IMPORT_TYPES = {
    TRANSACTION_CODE: "transaction-code"
};

export const DOM_SELECTORS = {
    IMPORT_TYPE: "[data-import-type]"
};

export const CHROME_ERROR_MESSAGES = {
    SERVICE_WORKER_ERROR: "Service worker error:",
    UNKNOWN_MESSAGE_TYPE: "Unknown message type:",
    OPERA_CLOUD_TAB_NOT_FOUND: "Opera Cloud tab not found",
    OPERA_CLOUD_TAB_ID_NOT_FOUND: "Opera Cloud tab ID not found"
};
