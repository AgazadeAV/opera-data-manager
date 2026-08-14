import { ADF_ID, DOM_ELEMENTS, DOM_EVENTS, ERROR_MESSAGES_WITH_VALUES, FIELD_ACTIONS, MESSAGE_TYPES, STRING_VALUES } from "../utils/constants.js";

window.addEventListener(DOM_EVENTS.MESSAGE, (event) => {

    if (event.source !== window ||
        event.data?.type !== MESSAGE_TYPES.OPERA_ADF_REQUEST
    ) {
        return;
    }

    const { requestId, action, params } = event.data;

    try {
        const { key, value } = params || {};

        const label = [...document.querySelectorAll(DOM_ELEMENTS.LABEL)]
            .find(element => element.textContent.trim() === key);

        const field = document.getElementById(label.htmlFor);

        if (!field) {
            throw new Error(
                ERROR_MESSAGES_WITH_VALUES.FIELD_NOT_FOUND(key)
            );
        }

        const component = AdfPage.PAGE.findComponentByAbsoluteId(
            field.id.replace(ADF_ID.ADF_ID_PART_CONTENT, STRING_VALUES.EMPTY_STRING)
        );

        if (!component) {
            throw new Error(
                ERROR_MESSAGES_WITH_VALUES.ADF_COMPONENT_NOT_FOUND(key)
            );
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

            case FIELD_ACTIONS.GET_TYPE: {
                result = component.getType?.();

                break;
            }

            case FIELD_ACTIONS.GET_INFO: {
                result = {
                    type: component.getType?.(),
                    value: component.getValue?.(),
                    clientId: component.getClientId?.(),
                    componentType: component._componentType,
                    peer: !!component.getPeer?.()
                };

                break;
            }

            case FIELD_ACTIONS.GET_METHODS: {
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

            case FIELD_ACTIONS.GET_DEBUG: {
                const peer = component.getPeer?.();

                const domNode = peer?._domNode;

                result = JSON.stringify({
                    componentType: String(component._componentType ?? STRING_VALUES.EMPTY_STRING),
                    clientId: String(component.getClientId?.() ?? STRING_VALUES.EMPTY_STRING),
                    value: String(component.getValue?.() ?? STRING_VALUES.EMPTY_STRING),

                    peerExists: !!peer,
                    peerType: String(peer?._componentType ?? STRING_VALUES.EMPTY_STRING),

                    domNodeExists: !!domNode,
                    domNodeTag: domNode?.tagName ?? STRING_VALUES.EMPTY_STRING,
                    domNodeType: domNode?.type ?? STRING_VALUES.EMPTY_STRING,
                    domNodeValue: domNode?.value ?? STRING_VALUES.EMPTY_STRING,
                    domNodeOuterHTML: domNode?.outerHTML ?? STRING_VALUES.EMPTY_STRING,

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
                throw new Error(
                    ERROR_MESSAGES_WITH_VALUES.UNKNOWN_ADF_ACTION(action)
                );
            }
        }

        window.postMessage({
            type: MESSAGE_TYPES.OPERA_ADF_RESPONSE,
            requestId,
            result
        },
            MESSAGE_TYPES.POST_MESSAGE_TARGET_ORIGIN
        );

    } catch (e) {

        window.postMessage({
            type: MESSAGE_TYPES.OPERA_ADF_RESPONSE,
            requestId,
            error: e.message
        },
            MESSAGE_TYPES.POST_MESSAGE_TARGET_ORIGIN
        );
    }
});
