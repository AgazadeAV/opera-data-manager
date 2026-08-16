import { ERROR_MESSAGES, INFO_MESSAGES, CONFIG } from "../../utils/constants.js";
import { executeAdfAction } from "../../content/opera-adf-client.js";

export class OperaDriver {

    NEW_BUTTON_LABEL = "New";
    SAVE_BUTTON_LABEL = "Save";
    CANCEL_BUTTON_LABEL = "Cancel";

    async setFieldValue(labelText, value) {

        for (
            let attempt = 1;
            attempt <= CONFIG.MAX_RETRIES;
            attempt++
        ) {

            console.log(INFO_MESSAGES.SETTING_VALUE(labelText, attempt, CONFIG.MAX_RETRIES));

            try {

                const result = await executeAdfAction("setValue", { labelText, value });

                console.log(INFO_MESSAGES.VALUE_SET(labelText, result));

                const adfMatches = String(result.adfValue ?? "") === String(value);
                const domMatches = String(result.domValue ?? "") === String(value);

                if (!adfMatches || !domMatches) {
                    throw new Error(
                        ERROR_MESSAGES.FIELD_VERIFICATION_FAILED(
                            labelText,
                            value,
                            result.adfValue,
                            result.domValue)
                    );
                }

                console.log(
                    INFO_MESSAGES.ADF_AND_DOM_VERIFIED(labelText)
                );

                return result;

            } catch (error) {

                console.warn(
                    ERROR_MESSAGES.SETTING_VALUE_FAILED(
                        labelText,
                        attempt,
                        CONFIG.MAX_RETRIES,
                        error.message)
                );

                if (attempt === CONFIG.MAX_RETRIES) {
                    throw new Error(
                        ERROR_MESSAGES.FIELD_SET_FAILED(
                            labelText,
                            attempt,
                            CONFIG.MAX_RETRIES)
                    );
                }

                await this.sleep(CONFIG.RETRY_DELAY);
            }
        }
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

        for (
            let attempt = 1;
            attempt <= CONFIG.MAX_RETRIES;
            attempt++
        ) {

            console.log(
                INFO_MESSAGES.SETTING_VALUE(
                    labelText,
                    attempt,
                    CONFIG.MAX_RETRIES
                )
            );

            try {

                const checkbox = await this.waitForVisible(
                    () => this.getCheckboxByLabel(labelText),
                    CONFIG.DEFAULT_TIMEOUT,
                    ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(labelText)
                );

                const currentState = checkbox.checked;

                console.log(
                    INFO_MESSAGES.VALUE_INFO(
                        labelText,
                        currentState,
                        targetState
                    )
                );

                if (currentState === targetState) {
                    console.log(
                        INFO_MESSAGES.CHECKBOX_SET_SKIP(
                            labelText,
                            targetState
                        )
                    );

                    return true;
                }

                checkbox.click();

                await this.waitForVisible(
                    () => {
                        const checkbox = this.getCheckboxByLabel(labelText);

                        return checkbox?.checked === targetState
                            ? checkbox
                            : null;
                    },
                    CONFIG.DEFAULT_TIMEOUT,
                    ERROR_MESSAGES.CHECKBOX_STATE_FAILED(
                        labelText,
                        targetState
                    )
                );

                console.log(
                    INFO_MESSAGES.VALUE_SET(
                        labelText,
                        targetState
                    )
                );

                return true;

            } catch (error) {

                console.warn(
                    ERROR_MESSAGES.SETTING_VALUE_FAILED(
                        labelText,
                        attempt,
                        CONFIG.MAX_RETRIES,
                        error.message
                    )
                );

                if (attempt === CONFIG.MAX_RETRIES) {
                    throw new Error(
                        ERROR_MESSAGES.FIELD_SET_FAILED(
                            labelText,
                            attempt,
                            CONFIG.MAX_RETRIES
                        )
                    );
                }

                await this.sleep(CONFIG.RETRY_DELAY);
            }
        }
    }

    async clickButton(labelText) {

        const button = await this.waitForButton(labelText);

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

                    const style = window.getComputedStyle(element);

                    const hasLayout =
                        element.offsetWidth > 0 ||
                        element.offsetHeight > 0 ||
                        element.getClientRects().length > 0;

                    const isHidden =
                        style.display === "none" ||
                        style.visibility === "hidden";

                    const isDisabled =
                        element.hasAttribute("disabled") ||
                        element.getAttribute("aria-disabled") === "true";

                    if (hasLayout && !isHidden && !isDisabled) {
                        return element;
                    }
                }

            } catch (error) {

                lastError = error;

                console.warn(
                    ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(error)
                );
            }

            await this.sleep(CONFIG.POLL_INTERVAL);
        }

        if (lastError) {
            throw new Error(
                ERROR_MESSAGES.LAST_ERROR_MESSAGE(
                    errorMessage,
                    lastError.message
                )
            );
        }

        throw new Error(errorMessage);
    }

    async waitForFieldValue(labelText) {

        const startTime = Date.now();

        while (Date.now() - startTime < CONFIG.DEFAULT_TIMEOUT) {

            const label = this.getLabelByText(labelText);

            if (label?.htmlFor) {

                const element = document.getElementById(label.htmlFor);

                if (element?.textContent.trim()) {
                    return true;
                }
            }

            await this.sleep(CONFIG.POLL_INTERVAL);
        }

        return false;
    }

    async waitForButton(labelText) {

        return await this.waitForVisible(
            () => [...document.querySelectorAll("a")]
                .find(
                    element =>
                        element.textContent.trim() === labelText
                ),

            CONFIG.DEFAULT_TIMEOUT,

            ERROR_MESSAGES.ELEMENT_VISIBILITY_FAILED(labelText)
        );
    }

    getLabelByText(labelText) {

        const label = [...document.querySelectorAll("label")]
            .find(
                element =>
                    element.textContent.trim() === labelText
            );

        console.log(INFO_MESSAGES.FIELD_FOUND(labelText, label));

        return label;
    }

    getCheckboxByLabel(labelText) {

        const label = this.getLabelByText(labelText);

        return label?.htmlFor
            ? document.getElementById(label.htmlFor)
            : null;
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
