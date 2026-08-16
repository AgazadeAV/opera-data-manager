import { ERROR_MESSAGES, MESSAGE_TYPES } from "../utils/constants.js";

window.addEventListener("message", (event) => {

    if (!isValidRequest(event)) {
        return;
    }

    const { requestId, action, params } = event.data;

    try {

        const result = executeAction(action, params);

        sendAdfResponse(requestId, result);

    } catch (error) {

        sendAdfError(requestId, error);
    }
});

function isValidRequest(event) {
    return event.source === window &&
        event.data?.type === MESSAGE_TYPES.OPERA_ADF_REQUEST;
}

function executeAction(action, params) {

    switch (action) {

        case "setValue":
            return setValue(params);

        case "getValue":
            return getValue(params);

        default:
            throw new Error(
                ERROR_MESSAGES.UNKNOWN_ADF_ACTION(action)
            );
    }
}

function setValue({ labelText, value }) {

    const field = findFieldByLabel(labelText);

    const component = findAdfComponent(field);

    component.setValue(value);

    field.value = value;

    return {
        adfValue: component.getValue?.() ?? null,
        domValue: field.value ?? null
    };
}

function getValue({ labelText }) {

    const field = findFieldByLabel(labelText);
    const component = findAdfComponent(field);

    const adfValue = component.getValue?.() ?? null;

    const domValue = field.type === "checkbox"
        ? field.checked
        : field.value ?? null;

    return {
        adfValue,
        domValue
    };
}

function findFieldByLabel(labelText) {

    const label = [...document.querySelectorAll("label")]
        .find(element => element.textContent.trim() === labelText);

    if (!label?.htmlFor) {
        throw new Error(
            ERROR_MESSAGES.ELEMENT_NOT_FOUND(labelText)
        );
    }

    const field = document.getElementById(label.htmlFor);

    if (!field) {
        throw new Error(
            ERROR_MESSAGES.ELEMENT_NOT_FOUND(labelText)
        );
    }

    return field;
}

function findAdfComponent(field) {

    const componentId = field.id.replace("::content", "");

    const component =
        AdfPage.PAGE.findComponentByAbsoluteId(componentId);

    if (!component) {
        throw new Error(
            ERROR_MESSAGES.ELEMENT_NOT_FOUND(field.id)
        );
    }

    return component;
}

function sendAdfResponse(requestId, result) {

    window.postMessage({
        type: MESSAGE_TYPES.OPERA_ADF_RESPONSE,
        requestId,
        result
    }, "*");
}

function sendAdfError(requestId, error) {

    window.postMessage({
        type: MESSAGE_TYPES.OPERA_ADF_RESPONSE,
        requestId,
        error: error.message
    }, "*");
}
