import type {
    GirClassElement,
    GirRecordElement,
    GirUnionElement,
    GirInterfaceElement,
    GirCallbackElement,
    GirCallableParamElement,
    Environment,
    GirFunctionElement,
} from '../types/index.js'
import { Logger } from '../logger.js'

import {
    classesAll,
    classesGjs,
    classesNode,
    callbacksAll,
    callbacksGjs,
    callbacksNode,
    functionsAll,
    functionsGjs,
    functionsNode,
} from './index.js'
import { GirFactory } from '../gir-factory.js'

/**
 * Inject additional methods, properties, etc
 */
export class Injector {
    girFactory = new GirFactory()
    log: Logger

    constructor(private readonly environment: Environment) {
        this.log = new Logger(environment, true, 'ConflictResolver')
    }

    /** Inject additional generics, methods, properties, etc to a existing class */
    toClass(girClass: GirClassElement | GirUnionElement | GirInterfaceElement | GirRecordElement) {
        if (!girClass._tsData) {
            return
        }

        const classes = [...classesAll, ...(this.environment === 'gjs' ? classesGjs : classesNode)]

        const toClass = classes.find((cls) => {
            return (
                girClass._tsData &&
                cls.qualifiedName === girClass._tsData.qualifiedName &&
                cls.versions.includes(girClass._tsData.version)
            )
        })

        if (toClass) {
            if (toClass.staticFunctions) {
                girClass._tsData.staticFunctions.push(
                    ...this.girFactory.newGirFunctions(toClass.staticFunctions, girClass._tsData, { isInjected: true }),
                )
            }
            if (toClass.properties) {
                girClass._tsData.properties.push(
                    ...this.girFactory.newGirProperties(toClass.properties, { isInjected: true }),
                )
            }
            if (toClass.constructors) {
                girClass._tsData.constructors.push(
                    ...this.girFactory.newGirFunctions(toClass.constructors, girClass._tsData, { isInjected: true }),
                )
            }
            if (toClass.methods) {
                girClass._tsData.methods.push(
                    ...this.girFactory.newGirFunctions(toClass.methods, girClass._tsData, { isInjected: true }),
                )
            }
            if (toClass.virtualMethods) {
                girClass._tsData.virtualMethods.push(
                    ...this.girFactory.newGirFunctions(toClass.virtualMethods, girClass._tsData, { isInjected: true }),
                )
            }
            if (toClass.propertySignalMethods) {
                for (const propertySignalMethod of toClass.propertySignalMethods) {
                    propertySignalMethod.isInjected = true
                    girClass._tsData.propertySignalMethods.push(propertySignalMethod)
                }
            }

            if (toClass.generics) {
                girClass._tsData.generics.push(...this.girFactory.newGenerics(toClass.generics))
            }
        }

        return girClass
    }

    toFunction(girFunction: GirFunctionElement) {
        const functions = [...functionsAll, ...(this.environment === 'gjs' ? functionsGjs : functionsNode)]

        const { _module } = girFunction
        if (!_module) return

        const toFunction = functions.find((injectFunction) => {
            return (
                injectFunction.name === girFunction.$.name &&
                _module.namespace === injectFunction.namespace &&
                injectFunction.versions.includes(_module.version)
            )
        })

        if (toFunction)
            return this.girFactory.newGirFunction({ ...toFunction, isGlobal: true, isInjected: true }, null)._tsData
    }

    /** Inject additional generics to existing callback interfaces */
    toCallback(girCallback: GirCallbackElement) {
        const callbacks = [...callbacksAll, ...(this.environment === 'gjs' ? callbacksGjs : callbacksNode)]

        const { _module, _tsData } = girCallback
        if (!(_module && _tsData)) return girCallback

        const toCallback = callbacks.find((injectCallback) => {
            return (
                injectCallback.name === _tsData.name &&
                _module.namespace === injectCallback.namespace &&
                injectCallback.versions.includes(_module.version)
            )
        })

        // if (toCallback?.generics) {
        //     girCallback._tsData.generics.push(...this.girFactory.newGenerics(toCallback.generics))
        // }

        // NOTICE: We merge the in parameters here
        // TODO: Unify injections, merges and overrides
        if (toCallback?.inParams) {
            for (let i = 0; i < _tsData.inParams.length; i++) {
                const newInParam = toCallback.inParams[i]
                const oldInParam = _tsData.inParams[i]
                if (newInParam && oldInParam && oldInParam._tsData?.name === newInParam.name) {
                    oldInParam._tsData.type = this.girFactory.newTsTypes(newInParam.type)
                }
            }
        }

        if (toCallback?.tsCallbackInterface) {
            if (toCallback?.tsCallbackInterface.generics) {
                _tsData.tsCallbackInterface?.generics.push(
                    ...this.girFactory.newGenerics(toCallback.tsCallbackInterface.generics),
                )
            }
        }

        return girCallback
    }

    toParameterType(girParam: GirCallableParamElement) {
        const tsTypes = girParam._tsData?.type

        const callbacks = [...callbacksAll, ...(this.environment === 'gjs' ? callbacksGjs : callbacksNode)]

        if (!girParam._module || !girParam._tsData) {
            return girParam
        }

        // Use the the callback generic injections also for the type of the callback parameters
        if (tsTypes) {
            for (const tsType of tsTypes) {
                const toCallback = callbacks.find((injectCallback) => {
                    return (
                        girParam._module &&
                        girParam._tsData &&
                        // TODO: compare versions
                        `${injectCallback.namespace}.${injectCallback.name}` === tsType.type
                    )
                })

                if (toCallback?.generics) {
                    const tsFunc = girParam._tsData.parent
                    const tsClass = tsFunc.parent
                    for (const generic of toCallback.generics) {
                        // Currently only used for `Gio.AsyncReadyCallback`
                        if (generic.value === 'this') {
                            if (tsFunc.isStatic && tsClass) {
                                tsType.generics.push({
                                    ...generic,
                                    value: `${tsClass.namespace}.${tsClass.name}`,
                                })
                            } else if (tsFunc.isGlobal) {
                                // Add generic parameter to global function
                                tsFunc.generics.push({
                                    name: 'Z',
                                    value: 'unknown',
                                })
                                tsType.generics.push({
                                    value: 'Z',
                                })
                            } else {
                                tsType.generics.push(generic)
                            }
                        } else {
                            tsType.generics.push(generic)
                        }
                    }
                }
            }
        }

        return girParam
    }
}
