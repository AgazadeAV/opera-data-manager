import { ERROR_MESSAGES, MESSAGE_TYPES } from "../utils/constants.js";

window.addEventListener("message", (event) => {
    const isSameWindow = event.source === window;
    const isAdfRequest = data?.type === MESSAGE_TYPES.OPERA_ADF_REQUEST;

    if (!isSameWindow || !isAdfRequest) return;

    const { requestId, action, params } = event.data;

    try {
        const { key, value } = params || {};
        const label = [...document.querySelectorAll("label")]
            .find(element => element.textContent.trim() === key);
        const field = document.getElementById(label.htmlFor);

        if (!field) {
            throw new Error(ERROR_MESSAGES.ELEMENT_NOT_FOUND(key));
        }

        const component = AdfPage.PAGE.findComponentByAbsoluteId(
            field.id.replace("::content", "")
        );

        if (!component) {
            throw new Error(ERROR_MESSAGES.ELEMENT_NOT_FOUND(key));
        }

        let result;

        switch (action) {

            case "setValue": {
                component.setValue(value);

                if (field) field.value = value;

                result = {
                    adfValue: component.getValue?.() ?? null,
                    domValue: field?.value ?? null
                };

                break;
            }

            case "getValue": {
                const peer = component.getPeer?.();
                const domNode = peer?._domNode;
                const input = domNode?.querySelector("input");

                result = {
                    adfValue: component.getValue?.() ?? null,
                    domValue: input?.value ?? null
                };

                break;
            }

            case "input": {
                result = component.getType?.();

                break;
            }

            case "getInfo": {
                result = {
                    type: component.getType?.(),
                    value: component.getValue?.(),
                    clientId: component.getClientId?.(),
                    componentType: component._componentType,
                    peer: !!component.getPeer?.()
                };

                break;
            }

            case "getMethods": {
                result = {
                    component: Object.getOwnPropertyNames(
                        Object.getPrototypeOf(component)
                    ),
                    peer: component.getPeer ?
                        Object.getOwnPropertyNames(
                            Object.getPrototypeOf(component.getPeer())
                        ) : []
                };

                break;
            }

            case "getDebug": {
                const peer = component.getPeer?.();
                const domNode = peer?._domNode;

                result = JSON.stringify({
                    componentType: String(component._componentType ?? ""),
                    clientId: String(component.getClientId?.() ?? ""),
                    value: String(component.getValue?.() ?? ""),

                    peerExists: !!peer,
                    peerType: String(peer?._componentType ?? ""),

                    domNodeExists: !!domNode,
                    domNodeTag: domNode?.tagName ?? "",
                    domNodeType: domNode?.type ?? "",
                    domNodeValue: domNode?.value ?? "",
                    domNodeOuterHTML: domNode?.outerHTML ?? "",

                    componentKeys: Object.keys(component),
                    peerKeys: peer ? Object.keys(peer) : [],

                    componentMethods: Object.getOwnPropertyNames(
                        Object.getPrototypeOf(component)
                    ),

                    peerMethods: peer
                        ? Object.getOwnPropertyNames(
                            Object.getPrototypeOf(peer)
                        ) : []
                });

                break;
            }

            default: {
                throw new Error(ERROR_MESSAGES.UNKNOWN_ADF_ACTION(action));
            }
        }

        window.postMessage({ type: MESSAGE_TYPES.OPERA_ADF_RESPONSE, requestId, result }, "*");

    } catch (e) {

        window.postMessage({ type: MESSAGE_TYPES.OPERA_ADF_RESPONSE, requestId, error: e.message }, "*");
    }
});
