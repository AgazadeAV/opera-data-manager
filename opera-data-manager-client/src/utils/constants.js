export const ERROR_MESSAGES = {
    OPERA_CLOUD_TAB_NOT_FOUND: "Opera Cloud tab not found!",
    OPERA_CLOUD_TAB_ID_NOT_FOUND: "Opera Cloud tab ID not found!",
    REQUIRED_FIELDS_ERROR: "Please fill in all required fields!",
    ELEMENT_NOT_FOUND: (element) => `${element} not found!`,
    ELEMENT_VISIBILITY_FAILED: (element) => `Element visibility check failed: ${element}!`,
    FIELD_SET_FAILED: (field, value, attempts) => `Failed to set ${field} to "${value}" after ${attempts} attempts!`,
    FIELD_VERIFICATION_FAILED: (field, expected, adfValue, domValue) => `${field} verification failed. Expected="${expected}", ADF="${adfValue}", DOM="${domValue}"!`,
    SETTING_VALUE_FAILED: (field, attempt, maxAttempts, error) => `${field}: attempt ${attempt}/${maxAttempts} failed: ${error}`,
    CREATE_TRANSACTION_CODE_FAILED: (message) => message ? `Failed to create transaction code: ${message}` : "Failed to create transaction code!",
    CREATE_TRANSACTION_CODE_HTTP_FAILED: (status) => `Failed to create transaction code. HTTP ${status}!`,
    BUILD_ERROR: (message) => `Build failed: ${message}!`,
    FILE_IMPORT_FAILED: (message) => `Failed to import file: ${message}!`,
    INVALID_CHECKBOX_STATE: (checkbox, state) => `Invalid checkbox state for ${checkbox}: ${state}!`,
    LAST_ERROR_MESSAGE: (context, error) => `${context} Last error: ${error}!`,
    UNKNOWN_ADF_ACTION: (action) => `Unknown ADF action: ${action}!`,
    UNKNOWN_MESSAGE_TYPE: (type) => `Unknown message type: ${type}!`,
    PAGE_LOAD_FAILED: (path) => `Failed to load page: ${path}!`,
    POPUP_INITIALIZATION_FAILED: (error) => `Failed to initialize popup: ${error.message}!`,
    IMPORT_TRANSACTION_CODES_HTTP_FAILED: (status) => `Failed to import transaction codes. HTTP ${status}!`,
};

export const INFO_MESSAGES = {
    ADF_AND_DOM_VERIFIED: (element) => `${element}: ADF and DOM verified`,
    BUTTON_CLICKED: (button) => `${button} button clicked`,
    CHECKBOX_SET_SKIP: (checkbox, targetState) => `${checkbox}: skipped because target state is ${targetState}`,
    CLASS_NAME: (status) => `status ${status}`,
    FIELD_FOUND: (field, element) => `${field} field found: ${element}`,
    VALUE_INFO: (field, currentValue, targetValue) => `${field}: current=${currentValue}, target=${targetValue}`,
    SETTING_VALUE: (field, attempt, maxAttempts) => `${field}: setting value (attempt ${attempt}/${maxAttempts})`,
    VALUE_SET: (field, value) => `${field} SET: ${value}`,
    FILE_SELECTED: (fileName) => `Selected file: ${fileName}`
};

export const MESSAGE_TYPES = {
    OPERA_ADF_REQUEST: "OPERA_ADF_REQUEST",
    OPERA_ADF_RESPONSE: "OPERA_ADF_RESPONSE",
    CREATE_TRANSACTION_CODE: "CREATE_TRANSACTION_CODE",
    FILL_TRANSACTION_CODE: "FILL_TRANSACTION_CODE",
    IMPORT_TRANSACTION_CODES: "IMPORT_TRANSACTION_CODES"
};
