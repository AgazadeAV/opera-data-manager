import { MESSAGE_TYPES, DOM_ELEMENTS, DOM_EVENTS, FIELD_ACTIONS } from "../utils/constants.js";

window.addEventListener(DOM_EVENTS.MESSAGE, (event) => {
    if (
        event.source !== window ||
        event.data?.type !== MESSAGE_TYPES.OPERA_ADF_REQUEST
    ) return;

    const { requestId, action, params } = event.data;

    try {
        const { key, value } = params || {};

        const label = [...document.querySelectorAll(DOM_ELEMENTS.LABEL)]
            .find(element => element.textContent.trim() === key);

        const field = document.getElementById(label.htmlFor);

        if (!field) {
            throw new Error(`${key} field not found`);
        }

        const component = AdfPage.PAGE.findComponentByAbsoluteId(
            field.id.replace("::content", "")
        );

        if (!component) {
            throw new Error(`${key} ADF component not found`);
        }

        let result;

        switch (action) {

            case FIELD_ACTIONS.SET_VALUE: {
                component.setValue(value);

                if (field) {
                    field.value = value;
                }

                result = {
                    adfValue: component.getValue?.() ?? null,
                    domValue: field?.value ?? null
                };

                break;
            }

            case FIELD_ACTIONS.GET_VALUE: {
                const peer = component.getPeer?.();
                const domNode = peer?._domNode;
                const input = domNode?.querySelector(DOM_ELEMENTS.INPUT);

                result = {
                    adfValue: component.getValue?.() ?? null,
                    domValue: input?.value ?? null
                };

                break;
            }

            case FIELD_ACTIONS.GET_TYPE:
                result = component.getType?.();
                break;

            case FIELD_ACTIONS.GET_INFO:
                result = {
                    type: component.getType?.(),
                    value: component.getValue?.(),
                    clientId: component.getClientId?.(),
                    componentType: component._componentType,
                    peer: !!component.getPeer?.()
                };
                break;

            case FIELD_ACTIONS.GET_METHODS:
                result = {
                    component: Object.getOwnPropertyNames(
                        Object.getPrototypeOf(component)
                    ),
                    peer: component.getPeer
                        ? Object.getOwnPropertyNames(
                            Object.getPrototypeOf(component.getPeer())
                        )
                        : []
                };
                break;

            case FIELD_ACTIONS.GET_DEBUG: {
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
                        )
                        : []
                });

                break;
            }

            default:
                throw new Error(`Unknown ADF action: ${action}`);
        }

        window.postMessage({
            type: MESSAGE_TYPES.OPERA_ADF_RESPONSE,
            requestId,
            result
        }, "*");

    } catch (e) {

        window.postMessage({
            type: MESSAGE_TYPES.OPERA_ADF_RESPONSE,
            requestId,
            error: e.message
        }, "*");
    }
});
