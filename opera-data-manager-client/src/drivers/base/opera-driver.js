import { CONFIG, CSS_VALUES, DOM_ATTRIBUTES, DOM_CLASSES, DOM_ELEMENTS, ERROR_MESSAGES_WITH_VALUES, FIELD_ACTIONS } from "../../utils/constants.js";
import { executeInPage } from "../../utils/execute-in-page.js";

export class OperaDriver {

    async setValue(key, value) {

        for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {

            console.log(`${key}: setting value (attempt ${attempt}/${CONFIG.MAX_RETRIES})`);

            try {
                const result = await executeInPage(
                    FIELD_ACTIONS.SET_VALUE,
                    { key, value }
                );

                console.log(`${key} SET:`, result);

                const adfMatches = String(result.adfValue ?? "") === String(value);

                const domMatches = String(result.domValue ?? "") === String(value);

                if (!adfMatches || !domMatches) {
                    throw new Error(
                        ERROR_MESSAGES_WITH_VALUES.FIELD_VERIFICATION_FAILED(key, value, result.adfValue, result.domValue)
                    );
                }

                console.log(`${key}: ADF and DOM verified`);

                return result;

            } catch (error) {

                console.warn(`${key}: attempt ${attempt}/${CONFIG.MAX_RETRIES} failed:`, error.message);

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
            console.log(`${labelText}: skipped because target state is ${targetState}`);

            return;
        }

        if (typeof targetState !== "boolean") {
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

        console.log(`${labelText}: current=${currentState}, target=${targetState}`);

        if (currentState === targetState) {
            console.log(`${labelText}: already set to ${targetState}`);

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

        console.log(`${labelText} button clicked`);
    }

    async waitForVisible(getter, timeout, errorMessage) {

        return this.waitUntil(() => {

            const element = getter();

            return this.isElementVisible(element) ? element : null;
        },
            timeout,
            errorMessage
        );
    }

    async waitUntil(condition, timeout, errorMessage) {

        const startTime = Date.now();

        let lastError = null;

        while (Date.now() - startTime < timeout) {

            try {

                const result = condition();

                if (result) {
                    return result;
                }

            } catch (error) {

                lastError = error;

                console.warn("Condition check failed:", error);
            }

            await this.sleep(CONFIG.POLL_INTERVAL);
        }

        if (lastError) {
            throw new Error(
                `${errorMessage} Last error: ${lastError.message}`
            );
        }

        throw new Error(errorMessage);
    }

    isElementVisible(element) {

        if (!element) {
            return false;
        }

        const isVisibleByBounds = Boolean(
            element.offsetWidth ||
            element.offsetHeight ||
            element.getClientRects().length
        );

        if (!isVisibleByBounds) {
            return false;
        }

        const style = window.getComputedStyle(element);

        if (
            style.visibility === CSS_VALUES.VISIBILITY_HIDDEN ||
            style.display === CSS_VALUES.DISPLAY_NONE ||
            style.opacity === CSS_VALUES.OPACITY_TRANSPARENT
        ) {
            return false;
        }

        const isDisabled =
            element.hasAttribute(DOM_ATTRIBUTES.DISABLED) ||
            element.getAttribute(DOM_ATTRIBUTES.ARIA_DISABLED) ===
            DOM_ATTRIBUTES.ARIA_DISABLED_TRUE ||
            element.classList.contains(DOM_CLASSES.ORACLE_DISABLED);

        return !isDisabled;
    }

    getFieldByLabelText(labelText) {

        const labelElement = [...document.querySelectorAll(DOM_ELEMENTS.LABEL)]
            .find(element => element.textContent.trim() === labelText);

        console.log(`${labelText} field found:`, labelElement);

        return labelElement;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
