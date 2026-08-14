import { BOOLEAN_VALUES, CONFIG, CSS_VALUES, DOM_ATTRIBUTES, DOM_CLASSES, DOM_ELEMENTS, ERROR_MESSAGES_WITH_VALUES, FIELD_ACTIONS, INFO_MESSAGES_WITH_VALUES, STRING_VALUES } from "../../utils/constants.js";
import { executeInPage } from "../../utils/execute-in-page.js";

export class OperaDriver {

    async setValue(key, value) {

        for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {

            console.log(
                INFO_MESSAGES_WITH_VALUES.SETTING_VALUE_ATTEMPTS(key, attempt, CONFIG.MAX_RETRIES)
            );

            try {
                const result = await executeInPage(
                    FIELD_ACTIONS.SET_VALUE,
                    { key, value }
                );

                console.log(
                    INFO_MESSAGES_WITH_VALUES.VALUE_SET_INFO(key, result)
                );

                const adfMatches = String(result.adfValue ?? STRING_VALUES.EMPTY_STRING) === String(value);

                const domMatches = String(result.domValue ?? STRING_VALUES.EMPTY_STRING) === String(value);

                if (!adfMatches || !domMatches) {
                    throw new Error(
                        ERROR_MESSAGES_WITH_VALUES.FIELD_VERIFICATION_FAILED(key, value, result.adfValue, result.domValue)
                    );
                }

                console.log(
                    INFO_MESSAGES_WITH_VALUES.ADF_AND_DOM_VERIFIED(key)
                );

                return result;

            } catch (error) {

                console.warn(
                    ERROR_MESSAGES_WITH_VALUES.SETTING_VALUE_ATTEMPTS_ERROR(key, attempt, CONFIG.MAX_RETRIES, error.message)
                );

                if (attempt === CONFIG.MAX_RETRIES) {
                    throw new Error(
                        ERROR_MESSAGES_WITH_VALUES.FIELD_SET_FAILED(key, attempt, CONFIG.MAX_RETRIES)
                    );
                }

                await this.sleep(CONFIG.RETRY_DELAY);
            }
        }
    }

    async setFieldValue(labelText, fieldValue) {
        return await this.setValue(labelText, fieldValue);
    }

    async setCheckboxState(labelText, targetState) {

        if (targetState == null) {
            console.log(
                INFO_MESSAGES_WITH_VALUES.CHECKBOX_SET_SKIP(labelText, targetState)
            );

            return;
        }

        if (typeof targetState !== BOOLEAN_VALUES.BOOLEAN) {
            throw new Error(
                ERROR_MESSAGES_WITH_VALUES.INVALID_CHECKBOX_STATE(labelText, targetState)
            );
        }

        const label = await this.waitForVisible(() =>
            this.getFieldByLabelText(labelText),
            CONFIG.DEFAULT_TIMEOUT,
            ERROR_MESSAGES_WITH_VALUES.FIELD_NOT_VISIBLE(labelText)
        );

        const checkbox = document.getElementById(label.htmlFor);

        if (!checkbox) {
            throw new Error(
                ERROR_MESSAGES_WITH_VALUES.FIELD_NOT_FOUND(labelText)
            );
        }

        const currentState = checkbox.checked;

        console.log(
            INFO_MESSAGES_WITH_VALUES.RECEIVED_VALUE_INFO(labelText, currentState, targetState)
        );

        if (currentState === targetState) {
            console.log(
                INFO_MESSAGES_WITH_VALUES.CHECKBOX_SET_SKIP(labelText, targetState)
            );

            return true;
        }

        return await this.setValue(labelText, targetState);
    }

    async clickButton(labelText) {

        const button = [...document.querySelectorAll(DOM_ELEMENTS.SPAN)]
            .find(element => element.textContent.trim() === labelText)
            ?.querySelector(DOM_ELEMENTS.ANCHOR);

        console.log(button);
        button?.focus();
        button?.click();

        console.log(
            INFO_MESSAGES_WITH_VALUES.BUTTON_CLICKED(labelText)
        );
    }

    async waitForVisible(getter, timeout, errorMessage) {

        const startTime = Date.now();
        let lastError = null;

        while (Date.now() - startTime < timeout) {

            try {

                const element = getter();

                if (element) {

                    const isVisibleByBounds = Boolean(
                        element.offsetWidth ||
                        element.offsetHeight ||
                        element.getClientRects().length
                    );

                    if (isVisibleByBounds) {

                        const style = window.getComputedStyle(element);

                        const isHidden =
                            style.visibility === CSS_VALUES.VISIBILITY_HIDDEN ||
                            style.display === CSS_VALUES.DISPLAY_NONE ||
                            style.opacity === CSS_VALUES.OPACITY_TRANSPARENT;

                        const isDisabled =
                            element.hasAttribute(DOM_ATTRIBUTES.DISABLED) ||
                            element.getAttribute(DOM_ATTRIBUTES.ARIA_DISABLED) ===
                            DOM_ATTRIBUTES.ARIA_DISABLED_TRUE ||
                            element.classList.contains(DOM_CLASSES.ORACLE_DISABLED);

                        if (!isHidden && !isDisabled) {
                            return element;
                        }
                    }
                }

            } catch (error) {

                lastError = error;

                console.warn(
                    ERROR_MESSAGES_WITH_VALUES.ELEMENT_VISIBILITY_CHECK_FAILED(error)
                );
            }

            await this.sleep(CONFIG.POLL_INTERVAL);
        }

        if (lastError) {
            throw new Error(
                ERROR_MESSAGES_WITH_VALUES.LAST_ERROR_MESSAGE(errorMessage, lastError.message)
            );
        }

        throw new Error(errorMessage);
    }

    getFieldByLabelText(labelText) {

        const labelElement = [...document.querySelectorAll(DOM_ELEMENTS.LABEL)]
            .find(element => element.textContent.trim() === labelText);

        console.log(INFO_MESSAGES_WITH_VALUES.FIELD_FOUND(labelText, labelElement));

        return labelElement;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
