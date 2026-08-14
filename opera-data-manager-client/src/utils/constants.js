const API_BASE_URL = "http://localhost:8080/api/v1";
const OPERA_CLOUD_URL_PART = "oraclecloud.com";

export const ADF_ID = {
    ADF_ID_PART_CONTENT: "::content"
}

export const BOOLEAN_VALUES = {
    BOOLEAN: "bolean"
}

export const BUILD_FORMAT = {
    ESM: "esm",
    IIFE: "iife"
}

export const BUILD_MESSAGES = {
    BUILD_COMPLETED_SUCCESSFULY: "Build completed successfully.",
    BUILDING_JAVASCRIPT: "Building JavaScript...",
    CLEANING_DIST: "Cleaning dist...",
    COPYING_STATIC_FILES: "Copying static files...",
    CREATING_DIRECTORIES: "Creating directories..."
}

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
    BACK_FROM_FILE: "back-from-file",
    BACK_TO_IMPORT_TYPES: "back-to-import-types",
    BACK_TO_METHODS: "back-to-methods",
    CREATE_BUTTON: "create-button",
    CODE: "code",
    DESCRIPTION: "description",
    FILE_INPUT: "transaction-code-file",
    FILE_OPTION: "file-option",
    FILE_PAGE: "file-page",
    IMPORT_FILE_BUTTON: "import-file-button",
    IMPORT_TYPE_PAGE: "import-type-page",
    MANUAL_OPTION: "manual-option",
    MANUAL_PAGE: "manual-page",
    MANUAL_POSTING: "manualPosting",
    METHOD_PAGE: "method-page",
    REVENUE_GROUP: "revenueGroup",
    STATUS: "status",
    SUBGROUP: "subgroup",
    TRANSACTION_CODE_FORM: "transaction-code-form",
    TRANSACTION_TYPE: "transactionType"
};

export const DOM_SELECTORS = {
    IMPORT_TYPE: "[data-import-type]"
};

export const ERROR_MESSAGES = {
    OPERA_CLOUD_TAB_NOT_FOUND: "Opera Cloud tab not found!",
    OPERA_CLOUD_TAB_ID_NOT_FOUND: "Opera Cloud tab ID not found!",
    REQUIRED_FIELDS_ERROR: "Please fill in all required fields!"
};

export const ERROR_MESSAGES_WITH_VALUES = {
    ADF_COMPONENT_NOT_FOUND: (message) => `${message} ADF component not found!`,
    BUILD_ERROR: (mesage) => `Build failed: ${message}!`,
    CREATE_TRANSACTION_CODE_FAILED: (message) => message ? `Failed to create transaction code: ${message}` : "Failed to create transaction code!",
    CREATE_TRANSACTION_CODE_HTTP_FAILED: (message) => `Failed to create transaction code. HTTP ${message}!`,
    ELEMENT_VISIBILITY_CHECK_FAILED: (message) => `Element visibility check failed: ${message}!`,
    FIELD_NOT_FOUND: (message) => `${message} field not found!`,
    FIELD_NOT_VISIBLE: (message) => `${message} field did not appear!`,
    FIELD_SET_FAILED: (message1, message2, message3) => `Failed to set ${message1} to "${message2}" after ${message3} attempts!`,
    FIELD_VERIFICATION_FAILED: (message1, message2, message3, message4) => `${message1} verification failed. Expected="${message2}", ADF="${message3}", DOM="${message4}"!`,
    FILE_IMPORT_FAILED: (message) => `Failed to import file: ${message}!`,
    INVALID_CHECKBOX_STATE: (message1, message2) => `Invalid checkbox state for ${message1}: ${message2}!`,
    LAST_ERROR_MESSAGE: (message1, message2) => `${message1} Last error: ${message2}!`,
    SETTING_VALUE_ATTEMPTS_ERROR: (message1, message2, message3, message4) => `${message1}: attempt ${message2}/${message3} failed: ${message4}`,
    UNKNOWN_ADF_ACTION: (message) => `Unknown ADF action: ${message}!`,
    UNKNOWN_MESSAGE_TYPE: (message) => `Unknown message type: ${message}!`
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

export const INFO_MESSAGES_WITH_VALUES = {
    ADF_AND_DOM_VERIFIED: (message) => `${message}: ADF and DOM verified`,
    BUTTON_CLICKED: (message) => `${message} button clicked`,
    CHECKBOX_SET_SKIP: (message1, message2) => `${message1}: skipped because target state is ${message2}`,
    CLASS_NAME: (message) => `status ${message}`,
    FIELD_FOUND: (message1, message2) => `${message1} field found: ${message2}`,
    RECEIVED_VALUE_INFO: (message1, message2, message3) => `${message1}: current=${message2}, target=${message3}`,
    SETTING_VALUE_ATTEMPTS: (message1, message2, message3) => `${message1}: setting value (attempt ${message2}/${message3})`,
    VALUE_SET_INFO: (message1, message2) => `${message1} SET: ${message2}`
}

export const MESSAGE_TYPES = {
    CREATE_TRANSACTION_CODE: "CREATE_TRANSACTION_CODE",
    FILL_TRANSACTION_CODE: "FILL_TRANSACTION_CODE",
    OPERA_ADF_REQUEST: "OPERA_ADF_REQUEST",
    OPERA_ADF_RESPONSE: "OPERA_ADF_RESPONSE",
    POST_MESSAGE_TARGET_ORIGIN: "*"
};

export const OPERA_CLOUD_BUTTON_LABELS = {
    NEW: "New",
    SAVE: "Save"
};

export const PATHS = {
    BACKGROUND_DIR: "background",
    CONTENT_DIR: "content",
    DIST_DIR: "dist",
    MANIFEST_JSON: "manifest.json",
    OPERA_CONTENT_JS: "content/opera-content.js",
    OPERA_MAIN_JS: "content/opera-main.js",
    POPUP_CSS: "popup/popup.css",
    POPUP_DIR: "popup",
    POPUP_JS: "popup/popup.js",
    POPUP_HTML: "popup/popup.html",
    SERVICE_WORKER_JS: "background/service-worker.js",
    SLASH: "/",
    SRC_DIR: "src"
}

export const STRING_VALUES = {
    EMPTY_STRING: ""
}

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
    FILE_SELECTED_PREFIX: (message) => `Selected file: ${message}!`
}
