import { ERROR_MESSAGES, INFO_MESSAGES } from "../../utils/constants.js";
import { executeInPage } from "../../utils/execute-in-page.js";

export class OperaDriver {

    MAX_RETRIES = 3;
    RETRY_DELAY = 500;
    DEFAULT_TIMEOUT = 10000;
    POLL_INTERVAL = 100;

    NEW_BUTTON_LABEL = "New";
    SAVE_BUTTON_LABEL = "Save";

    async setValue(key, value) {

        for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {

            console.log(INFO_MESSAGES.SETTING_VALUE(key, attempt, this.MAX_RETRIES));

            try {
                const result = await executeInPage("setValue", { key, value });

                console.log(INFO_MESSAGES.VALUE_SET(key, result));

                const adfMatches = String(result.adfValue ?? "") === String(value);
                const domMatches = String(result.domValue ?? "") === String(value);

                if (!adfMatches || !domMatches) {
                    throw new Error(ERROR_MESSAGES.FIELD_VERIFICATION_FAILED(key, value, result.adfValue, result.domValue));
                }

                console.log(INFO_MESSAGES.ADF_AND_DOM_VERIFIED(key));

                return result;

            } catch (error) {

                console.warn(ERROR_MESSAGES.SETTING_VALUE_FAILED(key, attempt, this.MAX_RETRIES, error.message));

                if (attempt === this.MAX_RETRIES) {
                    throw new Error(ERROR_MESSAGES.FIELD_SET_FAILED(key, attempt, this.MAX_RETRIES));
                }

                await this.sleep(this.RETRY_DELAY);
            }
        }
    }

    async setFieldValue(labelText, fieldValue) {
        return await this.setValue(labelText, fieldValue);
    }

    async clickCheckbox(labelText, targetState) {

        if (targetState == null) {
            console.log(
                INFO_MESSAGES.CHECKBOX_SET_SKIP(labelText, targetState)
            );

            return;
        }

        if (typeof targetState !== "boolean") {
            throw new Error(
                ERROR_MESSAGES.INVALID_CHECKBOX_STATE(labelText, targetState)
            );
        }

        const label = await this.waitForVisible(
            () => this.getFieldByLabelText(labelText),
            this.DEFAULT_TIMEOUT,
            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(labelText)
        );

        const checkbox = document.getElementById(label.htmlFor);

        if (!checkbox) {
            throw new Error(
                ERROR_MESSAGES.ELEMENT_NOT_FOUND(labelText)
            );
        }

        const currentState = checkbox.checked;

        console.log(
            INFO_MESSAGES.VALUE_INFO(labelText, currentState, targetState)
        );

        if (currentState === targetState) {
            console.log(
                INFO_MESSAGES.CHECKBOX_SET_SKIP(labelText, targetState)
            );

            return true;
        }

        checkbox.click();

        return true;
    }

    async clickButton(labelText) {

        const button = [...document.querySelectorAll("a")]
            .find(element => element.textContent.trim() === labelText);

        if (!button) {
            throw new Error(
                ERROR_MESSAGES.ELEMENT_NOT_FOUND(labelText)
            );
        }

        button.focus();
        button.click();

        console.log(INFO_MESSAGES.BUTTON_CLICKED(labelText));

        return true;
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
                        const isHidden = style.visibility === "hidden" ||
                            style.display === "none" ||
                            style.opacity === "0";

                        const isDisabled = element.hasAttribute("disabled") ||
                            element.getAttribute("aria-disabled") === "true" ||
                            element.classList.contains("oj-disabled");

                        if (!isHidden && !isDisabled) return element;
                    }
                }

            } catch (error) {

                lastError = error;

                console.warn(ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(error));
            }

            await this.sleep(this.POLL_INTERVAL);
        }

        if (lastError) {
            throw new Error(ERROR_MESSAGES.LAST_ERROR_MESSAGE(errorMessage, lastError.message));
        }

        throw new Error(errorMessage);
    }

    async waitForFieldValue(labelText) {

        const startTime = Date.now();

        while (Date.now() - startTime < this.DEFAULT_TIMEOUT) {

            const label = this.getFieldByLabelText(labelText);

            if (label?.htmlFor) {

                const field = document.getElementById(label.htmlFor);

                if (field?.textContent.trim()) {
                    return field.textContent.trim();
                }
            }

            await this.sleep(this.POLL_INTERVAL);
        }

        throw new Error(
            ERROR_MESSAGES.ELEMENT_VALUE_FAILED(labelText)
        );
    }

    async waitForButton(labelText) {
        return await this.waitForVisible(
            () => [...document.querySelectorAll("a")]
                .find(element => element.textContent.trim() === labelText),

            this.DEFAULT_TIMEOUT,

            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(labelText)
        );
    }

    getFieldByLabelText(labelText) {

        const labelElement = [...document.querySelectorAll("label")]
            .find(element => element.textContent.trim() === labelText);

        console.log(INFO_MESSAGES.FIELD_FOUND(labelText, labelElement));

        return labelElement;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
