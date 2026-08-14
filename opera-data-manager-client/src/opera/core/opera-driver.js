import { executeInPage } from "../../../utils/execute-in-page.js";
import { CONFIG, DOM_ELEMENTS, DOM_EVENTS, FIELD_ACTIONS } from "../../../utils/constants.js";

export class OperaDriver {

    constructor(actions) {
        this.actions = actions;
    }

    async clickButton(label) {

        const button = [...document.querySelectorAll(DOM_ELEMENTS.SPAN)]
            .find(el => el.textContent.trim() === label)
            ?.querySelector(DOM_ELEMENTS.ANCHOR);

        console.log(button);
        button?.focus();
        button?.click();

        console.log(`${label} button clicked`);
    }

    async fill(key, value) {

        for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {

            console.log(
                `${key}: setting value (attempt ${attempt}/${CONFIG.MAX_RETRIES})`
            );

            try {
                const result = await executeInPage(FIELD_ACTIONS.SET_VALUE, {
                    key,
                    value
                });

                console.log(`${key} SET:`, result);

                const adfMatches =
                    String(result.adfValue ?? "") === String(value);

                const domMatches =
                    String(result.domValue ?? "") === String(value);

                if (!adfMatches || !domMatches) {
                    throw new Error(
                        `${key} verification failed. ` +
                        `Expected="${value}", ` +
                        `ADF="${result.adfValue}", ` +
                        `DOM="${result.domValue}"`
                    );
                }

                console.log(`${key}: ADF and DOM verified`);

                return result;

            } catch (error) {

                console.warn(
                    `${key}: attempt ${attempt}/${CONFIG.MAX_RETRIES} failed:`,
                    error.message
                );

                if (attempt === CONFIG.MAX_RETRIES) {
                    throw new Error(
                        `Failed to set ${key} to "${value}" ` +
                        `after ${CONFIG.MAX_RETRIES} attempts.`
                    );
                }

                await this.actions.sleep(500);
            }
        }
    }

    async checkFieldVisible(label) {
        await this.actions.waitForVisible(() =>
            this.getFieldByLabelText(label),
            CONFIG.DEFAULT_TIMEOUT,
            `${label} field did not appear`
        );
    }

    async setCheckbox(labelText, targetState) {
        const labelElement = this.getFieldByLabelText(labelText);

        return this.toggleCheckbox(
            () => labelElement ? document.getElementById(labelElement.htmlFor) : null,
            targetState,
            labelText,
            labelElement
        );
    }

    async toggleCheckbox(checkboxLocator, targetState, labelText, labelElement) {

        for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
            console.log(
                `${labelText}: setting to ${targetState} ` +
                `(attempt ${attempt}/${CONFIG.MAX_RETRIES})`
            );

            try {
                const checkbox = await this.actions.waitForVisible(checkboxLocator);

                if (checkbox.checked !== targetState) labelElement.click();

                checkbox.dispatchEvent(
                    new Event(DOM_EVENTS.CHANGE, {
                        bubbles: true
                    })
                );

                await this.actions.waitUntil(() =>
                    checkbox.checked === targetState,
                    CONFIG.DEFAULT_TIMEOUT,
                    `${labelText} was not set to ${targetState}`
                );

                console.log(
                    `${labelText} set to ${targetState}`
                );

                return true;

            } catch (error) {

                console.warn(
                    `${labelText} attempt ${attempt}/${CONFIG.MAX_RETRIES} failed:`,
                    error.message
                );

                if (attempt === CONFIG.MAX_RETRIES) {
                    throw new Error(
                        `Failed to set ${labelText} to ${targetState} ` +
                        `after ${CONFIG.MAX_RETRIES} attempts. ` +
                        `Last error: ${error.message}`
                    );
                }

                console.log(
                    `Retrying ${labelText} (${attempt + 1}/${CONFIG.MAX_RETRIES})...`
                );

                await this.actions.sleep(CONFIG.RETRY_DELAY);
            }
        }
    }

    getFieldByLabelText(labelText) {

        const labelElement = [...document.querySelectorAll(DOM_ELEMENTS.LABEL)]
            .find(element => element.textContent.trim() === labelText);

        console.log(`${labelText} field found:`, labelElement);

        return labelElement;
    }
}
