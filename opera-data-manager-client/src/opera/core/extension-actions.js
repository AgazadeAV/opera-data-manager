import { CONFIG } from "../../../utils/constants.js";

export class ExtensionActions {

    async click(getter, timeout = CONFIG.DEFAULT_TIMEOUT) {

        const element = await this.waitForVisible(
            getter,
            timeout
        );

        element.scrollIntoView({
            block: "nearest",
            inline: "nearest"
        });

        element.focus?.();
        element.click();
    }

    isElementVisible(element) {

        if (!element) return false;

        const isVisibleByBounds = Boolean(
            element.offsetWidth ||
            element.offsetHeight ||
            element.getClientRects().length
        );

        if (!isVisibleByBounds) return false;

        const style = window.getComputedStyle(element);

        if (
            style.visibility === "hidden" ||
            style.display === "none" ||
            style.opacity === "0"
        ) {
            return false;
        }

        const isDisabled = element.hasAttribute("disabled") ||
            element.getAttribute("aria-disabled") === "true" ||
            element.classList.contains("oj-disabled");

        return !isDisabled;
    }

    async waitForVisible(getter, timeout = CONFIG.DEFAULT_TIMEOUT, errorMessage = "Element is not visible") {

        return this.waitUntil(
            () => {
                const element = getter();

                return this.isElementVisible(element) ? element : null;
            },
            timeout,
            errorMessage
        );
    }

    async waitUntil(condition, timeout = CONFIG.DEFAULT_TIMEOUT, errorMessage = "Condition timeout") {

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {

            try {
                const result = condition();
                if (result) return result;
            } catch (e) {
            }
            
            await this.sleep(CONFIG.POLL_INTERVAL);
        }

        throw new Error(errorMessage);
    }

    sleep(milliseconds) {

        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
