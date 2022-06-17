import { GirFactory } from './gir-factory.js'
import { Logger } from './logger.js'
import { NO_TSDATA } from './messages.js'
import { isEqual, merge, clone, typeIsOptional } from './utils.js'
import { SIGNAL_METHOD_NAMES } from './constants.js'
import type {
    Environment,
    GirClassElement,
    GirRecordElement,
    GirUnionElement,
    GirInterfaceElement,
    GirCallableParamElement,
    GirMethodElement,
    GirVirtualMethodElement,
    GirConstructorElement,
    GirFunctionElement,
    GirPropertyElement,
    GirFieldElement,
    TsSignal,
    TsFunction,
    TsProperty,
    TsVar,
    TsType,
    TsClass,
    TsParameter,
    TypeGirFunction,
    TypeProperty,
} from './types/index.js'

interface ChildElement<T = TsFunction | TsProperty | TsVar> {
    /**
     * The depth of the inheritance, starts at 1.
     * 1 means it is a direct inheritance,
     * greater means it is an indirect inheritance
     */
    depth: number
    data: T
}

interface GroupedConflictElement<T = TsFunction | TsProperty | TsVar> {
    baseElements: ChildElement<T>[]
    inheritedElements: ChildElement<T>[]
    baseClass: TsClass
}

interface GroupedConflictElements<T = TsFunction | TsProperty | TsVar> {
    [name: string]: GroupedConflictElement<T>
}

/**
 * Resolve conflicts between types caused by overloads / inheritances and implementations
 * With multiple implementations or a inherit it can happen that the interfaces / parent have the same method and/or property name with incompatible types.
 */
export class ConflictResolver {
    private log: Logger

    private girFactory = new GirFactory()

    constructor(private readonly environment: Environment) {
        this.log = new Logger(environment, true, 'ConflictResolver')
    }

    private girElArrToChildArr<T = TsFunction | TsProperty | TsVar>(
        dataArr: Array<
            | GirMethodElement
            | GirVirtualMethodElement
            | GirConstructorElement
            | GirFunctionElement
            | GirPropertyElement
            | GirFieldElement
        >,
        depth: number,
    ): ChildElement<T>[] {
        return dataArr
            .filter((data) => !!data?._tsData)
            .map((data) => {
                if (!data?._tsData) throw new Error('_tsData not set!')
                return {
                    depth,
                    data: data?._tsData as unknown as T,
                }
            })
    }

    private tsElArrToChildArr<T extends ChildElement>(
        dataArr: Array<TsFunction | TsProperty | TsVar>,
        depth: number,
    ): T[] {
        return dataArr
            .filter((m) => !!m)
            .map((data) => {
                return {
                    depth,
                    data,
                } as T
            })
    }

    private getImplementedInterfaceElements(tsIface: TsClass, addDepth = 0) {
        const signalMethods: ChildElement<TsFunction>[] = []
        const propertySignalMethods: ChildElement<TsFunction>[] = []
        const methods: ChildElement<TsFunction>[] = []
        const virtualMethods: ChildElement<TsFunction>[] = []
        const staticFunctions: ChildElement<TsFunction>[] = []
        const constructors: ChildElement<TsFunction>[] = []

        const properties: ChildElement<TsProperty | TsVar>[] = []
        const fields: ChildElement<TsProperty | TsVar>[] = []
        const constructProps: ChildElement<TsProperty | TsVar>[] = []

        const tsIfaceFullPackageSymName = `${tsIface.namespace}-${tsIface.version}.${tsIface.namespace}.${tsIface.name}`

        for (const ifacePackageFullSymName of Object.keys(tsIface.implements)) {
            if (tsIfaceFullPackageSymName === ifacePackageFullSymName) {
                this.log.warn("[getImplementedInterfaceElements] A interface can't implement itself")
                continue
            }

            const { interface: implementation, depth } = tsIface.implements[ifacePackageFullSymName]

            // Signals
            const _signals = implementation.signals.map((s) => s._tsData).filter((s) => !!s) as TsSignal[]
            for (const tsSignal of _signals) {
                signalMethods.push(...this.tsElArrToChildArr<ChildElement<TsFunction>>(tsSignal.tsMethods, 0))
            }
            // Property signals
            propertySignalMethods.push(
                ...this.tsElArrToChildArr<ChildElement<TsFunction>>(implementation.propertySignalMethods, 0),
            )
            // Methods
            if (implementation.methods.length)
                methods.push(...this.girElArrToChildArr<TsFunction>(implementation.methods, depth + addDepth))
            // Virtual methods
            if (implementation.virtualMethods.length)
                virtualMethods.push(
                    ...this.girElArrToChildArr<TsFunction>(implementation.virtualMethods, depth + addDepth),
                )
            // Static functions
            if (implementation.staticFunctions.length)
                staticFunctions.push(
                    ...this.girElArrToChildArr<TsFunction>(implementation.staticFunctions, depth + addDepth),
                )
            // Constructors
            if (implementation.constructors.length)
                constructors.push(...this.girElArrToChildArr<TsFunction>(implementation.constructors, depth + addDepth))

            // Properties
            if (implementation.properties.length)
                properties.push(
                    ...this.girElArrToChildArr<TsProperty | TsVar>(implementation.properties, depth + addDepth),
                )
            // Fields
            if (implementation.fields.length)
                fields.push(...this.girElArrToChildArr<TsProperty | TsVar>(implementation.fields, depth + addDepth))
            // Constructor properties
            if (implementation.constructProps.length)
                constructProps.push(
                    ...this.girElArrToChildArr<TsProperty | TsVar>(implementation.constructProps, depth + addDepth),
                )

            // Also get inheritances of the implemented class
            const indirectInheritances = this.getInheritedClassElements(implementation, addDepth + 1)
            signalMethods.push(...indirectInheritances.signalMethods)
            propertySignalMethods.push(...indirectInheritances.propertySignalMethods)
            methods.push(...indirectInheritances.methods)
            virtualMethods.push(...indirectInheritances.virtualMethods)
            staticFunctions.push(...indirectInheritances.staticFunctions)
            constructors.push(...indirectInheritances.constructors)
            properties.push(...indirectInheritances.properties)
            fields.push(...indirectInheritances.fields)
            constructProps.push(...indirectInheritances.constructProps)

            // Also get implementations of the implemented class
            const indirectImplementations = this.getImplementedInterfaceElements(implementation, addDepth + 1)
            signalMethods.push(...indirectImplementations.signalMethods)
            propertySignalMethods.push(...indirectImplementations.propertySignalMethods)
            methods.push(...indirectImplementations.methods)
            virtualMethods.push(...indirectImplementations.virtualMethods)
            staticFunctions.push(...indirectImplementations.staticFunctions)
            constructors.push(...indirectImplementations.constructors)
            properties.push(...indirectImplementations.properties)
            fields.push(...indirectImplementations.fields)
            constructProps.push(...indirectImplementations.constructProps)
        }

        return {
            signalMethods,
            propertySignalMethods,
            methods,
            virtualMethods,
            staticFunctions,
            constructors,
            properties,
            fields,
            constructProps,
        }
    }

    private getInheritedClassElements(tsClass: TsClass, addDepth = 0) {
        const signalMethods: ChildElement<TsFunction>[] = []
        const propertySignalMethods: ChildElement<TsFunction>[] = []
        const methods: ChildElement<TsFunction>[] = []
        const virtualMethods: ChildElement<TsFunction>[] = []
        const staticFunctions: ChildElement<TsFunction>[] = []
        const constructors: ChildElement<TsFunction>[] = []

        const properties: ChildElement<TsProperty | TsVar>[] = []
        const fields: ChildElement<TsProperty | TsVar>[] = []
        const constructProps: ChildElement<TsProperty | TsVar>[] = []

        const tsClassFullPackageSymName = `${tsClass.namespace}-${tsClass.version}.${tsClass.namespace}.${tsClass.name}`

        for (const ifaceFullPackageSymName of Object.keys(tsClass.inherit)) {
            if (tsClassFullPackageSymName === ifaceFullPackageSymName) {
                this.log.warn("[getInheritedClassElements] A class can't inherit itself")
                continue
            }

            const { class: inherit, depth } = tsClass.inherit[ifaceFullPackageSymName]

            // Signals
            const _signals = inherit.signals.map((s) => s._tsData).filter((s) => !!s) as TsSignal[]
            for (const tsSignal of _signals) {
                signalMethods.push(...this.tsElArrToChildArr<ChildElement<TsFunction>>(tsSignal.tsMethods, 0))
            }
            // Property signals
            propertySignalMethods.push(
                ...this.tsElArrToChildArr<ChildElement<TsFunction>>(inherit.propertySignalMethods, 0),
            )
            // Methods
            if (inherit.methods.length)
                methods.push(...this.girElArrToChildArr<TsFunction>(inherit.methods, depth + addDepth))
            // Virtual methods
            if (inherit.virtualMethods.length)
                virtualMethods.push(...this.girElArrToChildArr<TsFunction>(inherit.virtualMethods, depth + addDepth))
            // Static functions
            if (inherit.staticFunctions.length)
                staticFunctions.push(...this.girElArrToChildArr<TsFunction>(inherit.staticFunctions, depth + addDepth))
            // Constructors
            if (inherit.constructors.length)
                constructors.push(...this.girElArrToChildArr<TsFunction>(inherit.constructors, depth + addDepth))
            // Properties
            if (inherit.properties.length)
                properties.push(...this.girElArrToChildArr<TsProperty | TsVar>(inherit.properties, depth + addDepth))
            // Fields
            if (inherit.fields.length)
                fields.push(...this.girElArrToChildArr<TsProperty | TsVar>(inherit.fields, depth + addDepth))
            // Constructor properties
            if (inherit.constructProps.length)
                constructProps.push(
                    ...this.girElArrToChildArr<TsProperty | TsVar>(inherit.constructProps, depth + addDepth),
                )

            // Also get implementations of the inherited class
            const indirectImplementations = this.getImplementedInterfaceElements(inherit, addDepth + 1)
            signalMethods.push(...indirectImplementations.signalMethods)
            propertySignalMethods.push(...indirectImplementations.propertySignalMethods)
            methods.push(...indirectImplementations.methods)
            virtualMethods.push(...indirectImplementations.virtualMethods)
            staticFunctions.push(...indirectImplementations.staticFunctions)
            constructors.push(...indirectImplementations.constructors)
            properties.push(...indirectImplementations.properties)
            fields.push(...indirectImplementations.fields)
            constructProps.push(...indirectImplementations.constructProps)

            // Also get inheritances of the inherited class
            const indirectInheritances = this.getInheritedClassElements(inherit, addDepth + 1)
            signalMethods.push(...indirectInheritances.signalMethods)
            propertySignalMethods.push(...indirectInheritances.propertySignalMethods)
            methods.push(...indirectInheritances.methods)
            virtualMethods.push(...indirectInheritances.virtualMethods)
            staticFunctions.push(...indirectInheritances.staticFunctions)
            constructors.push(...indirectInheritances.constructors)
            properties.push(...indirectInheritances.properties)
            fields.push(...indirectInheritances.fields)
            constructProps.push(...indirectInheritances.constructProps)
        }

        return {
            signalMethods,
            propertySignalMethods,
            methods,
            virtualMethods,
            staticFunctions,
            constructors,
            properties,
            fields,
            constructProps,
        }
    }

    private tsElementIsMethod(el: TsFunction | TsVar) {
        return !this.tsElementIsStatic(el) && this.tsElementIsMethodOrFunction(el)
    }

    private tsElementIsStaticFunction(el: TsFunction | TsVar) {
        return this.tsElementIsStatic(el) && this.tsElementIsMethodOrFunction(el)
    }

    private tsElementIsProperty(el: TsFunction | TsVar) {
        return !this.tsElementIsStatic(el) && this.tsElementIsPropertyOrVariable(el)
    }

    private tsElementIsStaticProperty(el: TsFunction | TsVar) {
        return this.tsElementIsStatic(el) && this.tsElementIsPropertyOrVariable(el)
    }

    private tsElementIsSignal(el: TsFunction | TsVar) {
        return el.tsTypeName === 'event-methods'
    }

    private tsElementIsConstructor(el: TsFunction | TsVar) {
        return el.tsTypeName === 'constructor'
    }

    private tsElementIsMethodOrFunction(el: TsFunction | TsVar) {
        return (
            el.tsTypeName === 'function' || el.tsTypeName === 'method' || el.tsTypeName === 'static-function'
            // el.tsTypeName === 'event-methods'
            // el.tsTypeName === 'constructor' ||
        )
    }

    private tsElementIsPropertyOrVariable(el: TsFunction | TsVar | TsProperty) {
        return (
            el.tsTypeName === 'constant' ||
            el.tsTypeName === 'constructor-property' ||
            el.tsTypeName === 'property' ||
            el.tsTypeName === 'static-property'
        )
    }

    private tsElementIsStatic(el: TsFunction | TsVar) {
        return (
            // el.tsTypeName === 'constructor' ||
            el.tsTypeName === 'static-property' || el.tsTypeName === 'static-function'
        )
    }

    private typeIsString(type: TsType) {
        return (
            type.type === 'string' ||
            (type.type.startsWith("'") && type.type.endsWith("'")) ||
            (type.type.startsWith('"') && type.type.endsWith('"'))
        )
    }

    private mergeTypes(...types: Array<TsType | undefined>) {
        const dest: TsType[] = []

        for (const type of types) {
            if (!type) continue
            if (!dest.find((destType) => isEqual(destType, type))) {
                dest.push(type)
            }
        }

        return dest
    }

    private setTypesProperty(types: TsType[], property: 'optional', value: boolean) {
        for (const type of types) {
            type[property] = value
        }
        return types
    }

    /**
     * Merges two parameter name and type of two parameters
     * @param a
     * @param b
     * @returns
     */
    private mergeParam(a: GirCallableParamElement | undefined, b: GirCallableParamElement | undefined) {
        if (!a?._tsData && !b?._tsData) {
            throw new Error('At least one parameter must be defined!')
        }

        let dest: GirCallableParamElement

        if (a?._tsData && b?._tsData) {
            dest = merge({}, clone(a), clone(b))
            if (!dest._tsData) {
                throw new Error('Error on merge parameters!')
            }
            dest._tsData.type = []
            dest._tsData.type = this.mergeTypes(...a._tsData.type, ...b._tsData.type)
            if (a._tsData.name !== b._tsData.name) {
                dest._tsData.name = `${a._tsData.name}_or_${b._tsData.name}`
            }
        } else {
            dest = clone((a || b) as GirCallableParamElement)
            if (!dest._tsData) {
                throw new Error('Error on merge parameters!')
            }
            // If `a` or `b` is undefined make the types optional
            dest._tsData.type = this.setTypesProperty(dest._tsData.type, 'optional', true)
        }

        if (typeIsOptional(dest._tsData.type)) {
            dest._tsData.type = this.setTypesProperty(dest._tsData.type, 'optional', true)
        }

        return dest
    }

    /**
     * Merges parameter names and types of multiple functions
     * @param params
     * @returns
     */
    private mergeParams(...params: GirCallableParamElement[][]) {
        let dest: GirCallableParamElement[] = []

        for (const a of params) {
            for (const b of params) {
                if (a === b) {
                    continue
                }
                if (isEqual(a, b)) {
                    dest = clone(a)
                } else {
                    const length = Math.max(a.length, b.length)
                    dest = new Array<GirCallableParamElement>(length)
                    for (let i = 0; i < length; i++) {
                        const aParam = a[i] as GirCallableParamElement | undefined
                        const bParam = b[i] as GirCallableParamElement | undefined
                        dest[i] = this.mergeParam(aParam, bParam)
                    }
                }
            }
        }

        return dest
    }

    private paramCanBeOptional(
        girParam: GirCallableParamElement,
        girParams: GirCallableParamElement[],
        skip: GirCallableParamElement[] = [],
    ) {
        if (!girParam._tsData) return false
        let canBeOptional = true
        const index = girParams.indexOf(girParam)
        const following = girParams
            .slice(index)
            .filter((p) => !!p._tsData)
            .filter(() => !skip.includes(girParam))
            .filter((p) => p.$.direction !== 'out')
            .map((p) => p._tsData)

        if (following.some((p) => p && !typeIsOptional(p.type))) {
            canBeOptional = false
        }

        return canBeOptional
    }

    /**
     * In Typescript no optional parameters are allowed if the following ones are not optional
     * @param girParams
     * @returns
     */
    private fixOptionalParameters(girParams: GirCallableParamElement[]) {
        for (const girParam of girParams) {
            if (!girParam._tsData) throw new Error(NO_TSDATA('fixOptionalParameters'))
            if (typeIsOptional(girParam._tsData.type) && !this.paramCanBeOptional(girParam, girParams)) {
                this.setTypesProperty(girParam._tsData.type, 'optional', false)
            }
        }
        return girParams
    }

    public mergeFunctions(...funcs: TsFunction[]) {
        const returnTypesMap: TsType[] = []
        for (const func of funcs) {
            returnTypesMap.push(...func.returnTypes)
        }
        const returnTypes = this.mergeTypes(...returnTypesMap)

        const inParamsMap = funcs.map((func) => func.inParams)
        const inParams: GirCallableParamElement[] = []
        if (this.paramsHasConflict(...inParamsMap)) {
            inParams.push(...this.mergeParams(...inParamsMap))
        }

        const outParamsMap = funcs.map((func) => func.outParams)
        const outParams: GirCallableParamElement[] = []
        if (this.paramsHasConflict(...outParamsMap)) {
            outParams.push(...this.mergeParams(...outParamsMap))
        }

        if (!funcs[0]) {
            throw new Error('At least one function must exist!')
        }

        return this.girFactory.newTsFunction({
            name: funcs[0].name,
            returnTypes: returnTypes,
            inParams: inParams.map((inParam) => inParam._tsData).filter((inParam) => !!inParam) as TsParameter[],
            outParams: outParams.map((outParam) => outParam._tsData).filter((outParam) => !!outParam) as TsParameter[],
            girTypeName: funcs[0].girTypeName,
        })
    }

    public mergeProperties(...props: TsProperty[]) {
        // Merge types
        const typesMap: TsType[] = []
        for (const prop of props) {
            typesMap.push(...prop.type)
        }
        const types = this.mergeTypes(...typesMap)

        // Merge readonly
        let readonly = false
        for (const prop of props) {
            readonly = readonly || prop.readonly || false
        }

        if (!props[0] || !props[0].name) {
            throw new Error('At least one property must exist!')
        }

        return this.girFactory.newTsProperty({
            readonly: readonly,
            isStatic: props[0].isStatic || false,
            name: props[0].name,
            type: types,
            girTypeName: props[0].girTypeName,
        })
    }

    /**
     * Check if there is a type conflict between the ts elements a and b
     * @param a
     * @param b
     * @returns
     */
    public hasConflict(a: ChildElement, b: ChildElement) {
        if (a !== b && a.data.name === b.data.name) {
            if (a.data.name === 'constructor' || a.data.name === 'new' || a.data.name === '_init') {
                return false
            }
            if (this.elementHasConflict(a.data, b.data)) {
                return true
            }
        }

        return false
    }

    public newAnyTsProperty(name: string, girTypeName: TypeProperty) {
        return this.girFactory.newTsProperty({
            name,
            girTypeName,
            type: [{ type: 'any' }],
        })
    }

    /**
     * Returns a new any function: `name(...args: any[]): any`
     * @param name The name of the function
     */
    public newAnyTsFunction(name: string, girTypeName: TypeGirFunction) {
        return this.girFactory.newTsFunction({
            name,
            inParams: [
                {
                    name: 'args',
                    isRest: true,
                    type: [this.girFactory.newTsType({ type: 'any', isArray: true })],
                },
            ],
            returnTypes: [{ type: 'any' }],
            girTypeName,
        })
    }

    public getCompatibleTsProperty(elements: TsProperty[], baseProp: TsProperty) {
        return elements.find((prop) => !this.propertyHasConflict(baseProp, prop))
    }

    public getCompatibleTsFunction(elements: TsFunction[], baseFunc: TsFunction) {
        return elements.find((func) => !this.functionHasConflict(baseFunc, func))
    }

    /**
     * Use this instead of `getCompatibleTsProperty` and `getCompatibleTsProperty` if you can, because it's much faster
     * @param elements
     * @param name
     * @returns
     */
    public getTsElementByName(elements: (TsProperty | TsFunction)[], name: string) {
        return elements.find((el) => el.name === name)
    }

    protected canAddConflictProperty(conflictProperties: TsProperty[], prop: TsProperty) {
        const canAdd =
            prop.name &&
            // Only one property can be defined, no overloads
            !this.getTsElementByName(conflictProperties, prop.name) &&
            // Do not set properties with signal method names
            !SIGNAL_METHOD_NAMES(this.environment).includes(prop.name)

        return canAdd
    }

    public groupSignalConflicts(signalsMethods: ChildElement<TsFunction>[], baseClass: TsClass) {
        const groupedConflicts: GroupedConflictElements = {}
        for (const base of signalsMethods) {
            for (const b of signalsMethods) {
                if (base === b) {
                    continue
                }

                if (base.data.name !== 'connect' && base.data.name !== 'connect_after') {
                    continue
                }

                const sigNameParam = base.data.inParams[0]
                const callbackParam = base.data.inParams[1]

                const eventName = sigNameParam?._tsData?.type?.[0]?.type
                // TODO do not render the callback type as a full string, create a TSCallback instead
                const callbackType = callbackParam?._tsData?.type?.[0]?.type
                // console.debug('eventName', eventName, callbackType)

                if (!eventName || eventName === 'string') {
                    continue
                }
                groupedConflicts[eventName] ||= {
                    baseElements: [],
                    inheritedElements: [],
                    baseClass,
                }

                const groupedConflict = groupedConflicts[eventName]
                const isBaseElement = base.depth === 0
                if (isBaseElement) {
                    if (!groupedConflict.baseElements.find((c) => isEqual(c.data, base.data))) {
                        groupedConflict.baseElements.push(base)
                    }
                } else {
                    if (!groupedConflict.inheritedElements.find((c) => isEqual(c.data, base.data))) {
                        groupedConflict.inheritedElements.push(base)
                    }
                }
            }
        }

        return groupedConflicts
    }

    public fixSignalConflicts(groupedElements: GroupedConflictElements) {
        for (const eventName of Object.keys(groupedElements)) {
            const elements = groupedElements[eventName]

            const bases = elements.baseElements

            if (!bases.length) {
                // TODO
                // return this.fixIndirectSignalConflicts(elements.inheritedElements, elements.baseClass)
                return
            }

            for (const base of bases) {
                if (base.data.hasUnresolvedConflict) {
                    continue
                }
                for (const b of elements.inheritedElements) {
                    if (b === base || b.data.hasUnresolvedConflict) {
                        continue
                    }
                    // TODO
                }
            }
        }
    }

    /**
     * Check conflicts between the implementations / inheritances
     * To fix type errors like:
     * ```
     *   Interface 'PopoverMenu' can\'t simultaneously extend types 'Popover' and 'Native'.
     *   Named property 'parent' of types 'Popover' and 'Native' are not identical.
     */
    public fixIndirectConflicts(name: string, elements: ChildElement[], baseClass: TsClass) {
        for (const base of elements) {
            if (base.data.hasUnresolvedConflict) {
                continue
            }
            for (const b of elements) {
                if (b === base || b.data.hasUnresolvedConflict) {
                    continue
                }

                const className = `${baseClass.namespace}-${baseClass.version}.${baseClass.name}`

                // If a element is a function / method
                if (this.tsElementIsMethodOrFunction(base.data)) {
                    const baseFunc = base.data as TsFunction

                    // Function vs. Property
                    if (this.tsElementIsPropertyOrVariable(b.data)) {
                        this.log.debug(`${className}.${name} External Function vs. Property`, baseFunc, b)
                        b.data.hasUnresolvedConflict = true
                        // const bProp = b.data as TsProperty
                        // const anyProp = this.newAnyTsProperty(bProp.name || 'unknown', bProp.girTypeName)
                        // if (this.canAddConflictProperty(baseClass.conflictProperties, anyProp)) {
                        //     baseClass.conflictProperties.push(anyProp)
                        // }
                    }

                    // Function vs. Signal
                    else if (this.tsElementIsSignal(b.data)) {
                        this.log.debug(`${className}.${name} External Function vs. Signal`, baseFunc, b)
                        base.data.hasUnresolvedConflict = true
                    }

                    // Function vs. Function
                    else if (this.tsElementIsMethodOrFunction(b.data)) {
                        const bFunc = b.data as TsFunction
                        this.log.debug(
                            `${className}.${name} External Function vs. Function`,
                            baseFunc.inParams.map((p) => p._tsData?.name).join(', '),
                            bFunc.inParams.map((p) => p._tsData?.name).join(', '),
                        )
                        // const bFunc = b.data as TsFunction
                        // const mergedFunction = (this.mergeFunctions(baseFunc, ...baseFunc.overloads))
                        const anyFunc = this.newAnyTsFunction(name, baseFunc.girTypeName)

                        // Check if any function is not already added
                        if (!this.getTsElementByName(baseClass.conflictMethods, anyFunc.name)) {
                            baseClass.conflictMethods.push(anyFunc)
                        }
                    } else {
                        this.log.debug(`${className}.${name} External Unknown`, baseFunc, b)
                    }
                }

                // If a element is a property / variable
                else if (this.tsElementIsPropertyOrVariable(base.data)) {
                    const baseProp = base.data as TsProperty

                    // Property vs. Function
                    if (this.tsElementIsMethodOrFunction(b.data)) {
                        const bFunc = b.data as TsFunction
                        this.log.debug(
                            `${className}.${name} External Property vs. Function`,
                            baseProp.type[0].type,
                            bFunc,
                        )
                        baseProp.hasUnresolvedConflict = true
                        // const anyProp = this.newAnyTsProperty(baseProp.name || 'unknown', baseProp.girTypeName)
                        // if (this.canAddConflictProperty(baseClass.conflictProperties, anyProp)) {
                        //     baseClass.conflictProperties.push(anyProp)
                        // }
                    }

                    // Property vs. Property
                    else if (this.tsElementIsPropertyOrVariable(b.data)) {
                        const bProp = b.data as TsProperty
                        this.log.debug(
                            `${className}.${name} External Property vs. Property`,
                            baseProp.type[0].type,
                            bProp.type[0].type,
                        )
                        // const bProp = b.data as TsProperty
                        // const mergedProp = this.mergeProperties(baseProp, bProp)
                        // if (this.canAddConflictProperty(baseClass.conflictProperties, mergedProp)) {
                        //     baseClass.conflictProperties.push(mergedProp)
                        // }

                        const anyProp = this.newAnyTsProperty(baseProp.name || 'unknown', baseProp.girTypeName)
                        if (this.canAddConflictProperty(baseClass.conflictProperties, anyProp)) {
                            baseClass.conflictProperties.push(anyProp)
                        }
                    }

                    // Property vs. Signal
                    else if (this.tsElementIsSignal(b.data)) {
                        this.log.debug(`${className}.${name} External Property vs. Signal`, baseProp, b)
                        base.data.hasUnresolvedConflict = true
                    } else {
                        this.log.debug(`${className}.${name} External Unknown`, baseProp, b)
                    }
                }

                // Other
                else {
                    this.log.debug(`${className}.${name} External Unknown`)
                }
            }
        }
    }

    /**
     * Check conflicts within the class itself (ignores implementations / inheritances)
     */
    public fixInternalConflicts(name: string, elements: ChildElement[], baseClass: TsClass) {
        for (const base of elements) {
            if (base.data.hasUnresolvedConflict) {
                continue
            }
            for (const b of elements) {
                if (b === base || b.data.hasUnresolvedConflict) {
                    continue
                }

                const className = `${baseClass.namespace}-${baseClass.version}.${baseClass.name}`

                // If a element is a function / method
                if (this.tsElementIsMethodOrFunction(base.data)) {
                    const baseFunc = base.data as TsFunction

                    // Function vs. Property
                    if (this.tsElementIsPropertyOrVariable(b.data)) {
                        this.log.debug(`${className}.${name} Internal Function vs. Property`, baseFunc, b)
                        b.data.hasUnresolvedConflict = true
                    }

                    // Function vs. Signal
                    else if (this.tsElementIsSignal(b.data)) {
                        this.log.debug(`${className}.${name} Internal Function vs. Signal`, baseFunc, b)
                        base.data.hasUnresolvedConflict = true
                    }

                    // Function vs. Function
                    else if (this.tsElementIsMethodOrFunction(b.data)) {
                        const bFunc = b.data as TsFunction
                        this.log.debug(
                            `${className}.${name} Internal Function vs. Function`,
                            baseFunc.inParams.map((p) => p._tsData?.name).join(', '),
                            bFunc.inParams.map((p) => p._tsData?.name).join(', '),
                        )
                    } else {
                        this.log.debug(`${className}.${name} Internal Unknown`, baseFunc, b)
                    }
                }

                // If a element is a property / variable
                else if (this.tsElementIsPropertyOrVariable(base.data)) {
                    const baseProp = base.data as TsProperty

                    // Property vs. Function
                    if (this.tsElementIsMethodOrFunction(b.data)) {
                        const bFunc = b.data as TsFunction
                        this.log.debug(
                            `${className}.${name} Internal Property vs. Function`,
                            baseProp.type[0].type,
                            bFunc,
                        )
                        baseProp.hasUnresolvedConflict = true
                    }

                    // Property vs. Property
                    else if (this.tsElementIsPropertyOrVariable(b.data)) {
                        const bProp = b.data as TsProperty
                        this.log.debug(
                            `${className}.${name} Internal Property vs. Property`,
                            baseProp.type[0].type,
                            bProp.type[0].type,
                        )

                        base.data = this.mergeProperties(baseProp, bProp)
                    }

                    // Property vs. Signal
                    else if (this.tsElementIsSignal(b.data)) {
                        this.log.debug(`${className}.${name} Internal Property vs. Signal`, baseProp, b)
                        base.data.hasUnresolvedConflict = true
                    } else {
                        this.log.debug(`${className}.${name} Internal Unknown`, baseProp, b)
                    }
                }

                // Other
                else {
                    this.log.debug(`${className}.${name} Internal Unknown`)
                }
            }
        }
    }

    /**
     * Check conflicts of the class properties with the properties  the class itself (ignores implementations / inheritances)
     */
    public fixDirectConflicts(name: string, elements: GroupedConflictElement) {
        const className = `${elements.baseClass.namespace}-${elements.baseClass.version}.${elements.baseClass.name}`

        for (const base of elements.baseElements) {
            if (base.data.hasUnresolvedConflict) {
                continue
            }

            // Each conflicting elements
            for (const b of elements.inheritedElements) {
                if (b === base || b.data.hasUnresolvedConflict) {
                    continue
                }

                // If base element is a function
                if (this.tsElementIsMethodOrFunction(base.data)) {
                    const baseFunc = base.data as TsFunction

                    // Function vs. Function
                    if (this.tsElementIsMethodOrFunction(b.data)) {
                        const bFunc = b.data as TsFunction
                        this.log.debug(
                            `${className}.${name} Function vs. Function`,
                            baseFunc.inParams.map((p) => p._tsData?.name).join(', '),
                            bFunc.inParams.map((p) => p._tsData?.name).join(', '),
                        )

                        // Add a function to overload methods if there is not already a compatible version
                        if (!this.getCompatibleTsFunction(baseFunc.overloads, bFunc)) {
                            baseFunc.overloads.push(bFunc)
                        }
                    }

                    // Function vs. Property
                    else if (this.tsElementIsPropertyOrVariable(b.data)) {
                        this.log.debug(`${className}.${name} Function vs. Property`)
                        b.data.hasUnresolvedConflict = true
                    }

                    // Function vs. Signal
                    else if (this.tsElementIsSignal(b.data)) {
                        this.log.debug(`${className}.${name} Function vs. Signal`)
                        baseFunc.hasUnresolvedConflict = true
                    }
                }

                // If base element is a property / variable
                else if (this.tsElementIsPropertyOrVariable(base.data)) {
                    const baseProp = base.data as TsProperty

                    // Property vs. Property
                    if (this.tsElementIsPropertyOrVariable(b.data)) {
                        const bProp = b.data as TsProperty
                        this.log.debug(
                            `${className}.${name} Property vs. Property`,
                            baseProp.type[0].type,
                            bProp.type[0].type,
                        )
                        base.data = this.mergeProperties(baseProp, bProp)
                    }

                    // Property vs. Function
                    else if (this.tsElementIsMethodOrFunction(b.data)) {
                        this.log.debug(`${className}.${name} Property vs. Function`)
                        baseProp.hasUnresolvedConflict = true
                    }

                    // Property vs. Signal
                    else if (this.tsElementIsSignal(b.data)) {
                        this.log.debug(`${className}.${name} Property vs. Signal`)
                        baseProp.hasUnresolvedConflict = true
                    }
                }

                // If base element is a signal method
                else if (this.tsElementIsSignal(base.data)) {
                    // Signal vs. Property
                    if (this.tsElementIsPropertyOrVariable(b.data)) {
                        this.log.debug(`${className}.${name} Signal vs. Property`)
                        b.data.hasUnresolvedConflict = true
                    }

                    // Signal vs. Function
                    if (this.tsElementIsMethodOrFunction(b.data)) {
                        this.log.debug(`${className}.${name} Signal vs. Function`)
                        b.data.hasUnresolvedConflict = true
                    }
                }
                // Ignore constructors
                else if (this.tsElementIsConstructor(base.data)) {
                    // Do nothing
                } else {
                    this.log.warn(`{className}.${name} Unknown`, base)
                    base.data.hasUnresolvedConflict = true
                }
            }

            // If base element is a function and has overloaded methods
            if (this.tsElementIsMethodOrFunction(base.data)) {
                const baseFunc = base.data as TsFunction
                if (baseFunc.overloads.length > 0) {
                    // Add a function with any types
                    baseFunc.overloads.push(this.newAnyTsFunction(baseFunc.name, baseFunc.girTypeName))

                    // Add a function with merged types and parameters
                    baseFunc.overloads.push(this.mergeFunctions(baseFunc, ...baseFunc.overloads))
                }
            }
        }
    }

    /**
     * Fix the conflicts of a class
     * @param groupedElements
     */
    public fixConflicts(groupedElements: GroupedConflictElements) {
        for (const name of Object.keys(groupedElements)) {
            const elements = groupedElements[name]

            if (elements.baseElements.length === 0) {
                this.fixIndirectConflicts(name, elements.inheritedElements, elements.baseClass)
            }
            this.fixInternalConflicts(name, elements.baseElements, elements.baseClass)

            this.fixDirectConflicts(name, elements)
        }
    }

    /**
     * Group conflicts by name and sort them by depth for simpler handling of conflicts
     */
    public groupConflicts(elements: ChildElement[], tsClass: TsClass) {
        const groupedConflicts: GroupedConflictElements = {}

        const IGNORE_CONFLICT_NAMES = ['$gtype']

        for (const a of elements) {
            for (const b of elements) {
                if (
                    a === b ||
                    !a.data.name ||
                    !b.data.name ||
                    IGNORE_CONFLICT_NAMES.includes(a.data.name) ||
                    IGNORE_CONFLICT_NAMES.includes(b.data.name)
                ) {
                    continue
                }
                if (a && a.data.name && b && b.data.name && a !== b && this.hasConflict(a, b)) {
                    groupedConflicts[a.data.name] ||= {
                        baseElements: [],
                        inheritedElements: [],
                        baseClass: tsClass,
                    }
                    const groupedConflict = groupedConflicts[a.data.name]
                    const isBaseElement = a.depth === 0
                    if (isBaseElement) {
                        if (!groupedConflict.baseElements.find((c) => isEqual(c.data, a.data))) {
                            groupedConflict.baseElements.push(a)
                        }
                    } else {
                        if (
                            !groupedConflict.baseElements.find((c) => isEqual(c.data, a.data)) &&
                            !groupedConflict.inheritedElements.find((c) => isEqual(c.data, a.data))
                        ) {
                            groupedConflict.inheritedElements.push(a)
                        }
                    }
                }
            }
        }

        // Sort by depth
        for (const name of Object.keys(groupedConflicts)) {
            groupedConflicts[name].inheritedElements = groupedConflicts[name].inheritedElements.sort(
                (a, b) => a.depth - b.depth,
            )
        }

        return groupedConflicts
    }

    /**
     * With multiple implementations or a inherit it can happen that the interfaces / parent have the same method and/or property name with incompatible types.
     * We merge these types here to solve this problem.
     * @param girClass
     */
    public repairClass(girClass: GirClassElement | GirUnionElement | GirInterfaceElement | GirRecordElement) {
        if (!girClass._tsData) throw new Error(NO_TSDATA('repairClass'))

        const implementations = this.getImplementedInterfaceElements(girClass._tsData)
        const inheritance = this.getInheritedClassElements(girClass._tsData)

        const constructProps = [
            ...this.girElArrToChildArr(girClass._tsData.constructProps, 0),
            ...implementations.constructProps,
            ...inheritance.constructProps,
        ]

        // SIGNALS
        const _signals = girClass._tsData.signals.map((s) => s._tsData).filter((s) => !!s) as TsSignal[]
        const signalMethods: ChildElement<TsFunction>[] = []
        for (const tsSignal of _signals) {
            signalMethods.push(...this.tsElArrToChildArr<ChildElement<TsFunction>>(tsSignal.tsMethods, 0))
        }
        signalMethods.push(...implementations.signalMethods, ...inheritance.signalMethods)

        const propertySignalMethods = [
            ...this.tsElArrToChildArr<ChildElement<TsFunction>>(girClass._tsData.propertySignalMethods, 0),
            ...implementations.propertySignalMethods,
            ...inheritance.propertySignalMethods,
        ]

        const methods = [
            ...this.girElArrToChildArr(girClass._tsData.methods, 0),
            ...implementations.methods,
            ...inheritance.methods,
        ]

        const virtualMethods = [
            ...this.girElArrToChildArr(girClass._tsData.virtualMethods, 0),
            ...implementations.virtualMethods,
            ...inheritance.virtualMethods,
        ]

        const constructors = [
            ...this.girElArrToChildArr(girClass._tsData.constructors, 0),
            ...implementations.constructors,
            ...inheritance.constructors,
        ]

        const staticFunctions = [
            ...this.girElArrToChildArr(girClass._tsData.staticFunctions, 0),
            ...implementations.staticFunctions,
            ...inheritance.staticFunctions,
        ]

        const properties = [
            ...this.girElArrToChildArr(girClass._tsData.properties, 0),
            ...implementations.properties,
            ...inheritance.properties,
        ]

        const fields = [
            ...this.girElArrToChildArr(girClass._tsData.fields, 0),
            ...implementations.fields,
            ...inheritance.fields,
        ]

        // Do not pass a reference of the array here
        const elements = [
            ...signalMethods,
            ...propertySignalMethods,
            ...methods,
            ...virtualMethods,
            ...staticFunctions,
            ...constructors,
            ...properties,
            ...fields,
        ]

        // TODO:
        // const groupedSignalConflicts = this.groupSignalConflicts(
        //     [...signalMethods, ...propertySignalMethods],
        //     girClass._tsData,
        // )
        // this.fixSignalConflicts(groupedSignalConflicts)

        const groupedElementConflicts = this.groupConflicts(elements, girClass._tsData)
        const groupedConstructPropConflicts = this.groupConflicts(constructProps, girClass._tsData)

        this.fixConflicts(groupedElementConflicts)
        this.fixConflicts(groupedConstructPropConflicts)
    }

    /**
     * Returns true if `p1s` and `p2s` conflicting with each other.
     * The parameters must have the same length and the same type but can have different names
     * @param params
     * @returns
     */
    public paramsHasConflict(...params: GirCallableParamElement[][]) {
        let conflict = false
        for (const p1s of params) {
            for (const p2s of params) {
                if (p1s.length !== p2s.length) {
                    conflict = true
                    return conflict
                }

                for (const [i, p1] of p1s.entries()) {
                    const p2 = p2s[i]
                    if (p2._tsData && p1._tsData) {
                        if (this.typesHasConflict(p2._tsData?.type, p1._tsData?.type)) {
                            conflict = true
                            return conflict
                        }
                    } else {
                        conflict = true
                        return conflict
                    }
                }
            }
        }

        return conflict
    }

    public typesHasConflict(a: TsType[], b: TsType[]) {
        if (a.length !== b.length) {
            return true
        }
        // return !isEqual(a, b)
        for (let i = 0; i < a.length; i++) {
            const aType = a[i]
            const bType = b[i]
            if (
                aType.type !== bType.type ||
                aType.nullable !== bType.nullable ||
                aType.optional !== bType.optional ||
                aType.isFunction !== bType.isFunction ||
                aType.isCallback !== bType.isCallback ||
                aType.isArray !== bType.isArray ||
                aType.callbacks.length !== bType.callbacks.length ||
                aType.generics.length !== bType.generics.length ||
                !isEqual(aType.callbacks, bType.callbacks) ||
                !isEqual(aType.generics, bType.generics) ||
                !isEqual(aType, bType) // TODO
            ) {
                return true
            }
        }

        return false
    }

    /**
     * Returns `true` if the function / method types of `a` and `b` are not compatible with each other.
     * The parameters must have the same length and the same type but can have different names
     * @param a
     * @param b
     * @returns
     */
    public functionHasConflict(a: TsFunction, b: TsFunction) {
        if (this.typesHasConflict(a.returnTypes, b.returnTypes)) {
            return true
        }

        if (this.paramsHasConflict(a.inParams, b.inParams)) {
            return true
        }

        if (this.paramsHasConflict(a.outParams, b.outParams)) {
            return true
        }

        return false
    }

    /**
     * Returns `true` if the property types of `a` and `b` are not compatible with each other.
     * @param a
     * @param b
     * @returns
     */
    public propertyHasConflict(a: TsVar & TsProperty, b: TsVar & TsProperty) {
        if (!!a.isStatic !== !!b.isStatic) return false
        if (a.name !== b.name) return false

        if (!!a.readonly !== !!b.readonly || this.typesHasConflict(a.type, b.type)) return true

        return false
    }

    public signalHasConflict(a: TsSignal, b: TsSignal) {
        if (!!a.isStatic !== !!b.isStatic) return false
        if (a.name !== b.name) return false

        // TODO
        return false
        // switch (a.name) {
        //     case 'connect':
        //     case 'connect_after':
        //     case 'emit':
        //         break

        //     default:
        //         break
        // }
    }

    /**
     * Returns true if the elements (properties or methods) of `a` and `b` are not compatible with each other (has no conflict).
     * @param a
     * @param b
     * @returns
     */
    public elementHasConflict(
        a: TsFunction | TsVar | TsProperty | TsSignal,
        b: TsFunction | TsVar | TsProperty | TsSignal,
    ) {
        if (a.name !== b.name) {
            return false
        } else if (this.tsElementIsStatic(a) !== this.tsElementIsStatic(b)) {
            return false
        } else if (this.tsElementIsMethodOrFunction(a) && this.tsElementIsMethodOrFunction(b)) {
            return this.functionHasConflict(a as TsFunction, b as TsFunction)
        } else if (this.tsElementIsPropertyOrVariable(a) && this.tsElementIsPropertyOrVariable(b)) {
            return this.propertyHasConflict(a as TsVar & TsProperty, b as TsVar & TsProperty)
        } else if (this.tsElementIsConstructor(a) && this.tsElementIsConstructor(b)) {
            return this.functionHasConflict(a as TsFunction, b as TsFunction)
        } else if (this.tsElementIsSignal(a) && this.tsElementIsSignal(b)) {
            // TODO
            return this.signalHasConflict(a as TsSignal, b as TsSignal)
        } else if (a.tsTypeName !== b.tsTypeName) {
            return true
        } else {
            return true
        }
    }
}
