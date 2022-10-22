import type { TsMethod, InjectionParameter, InjectionInstanceParameter, InjectionType } from './index.js'

export interface InjectionMethod
    extends Pick<TsMethod, 'name' | 'girTypeName'>,
        Partial<
            Pick<
                TsMethod,
                | 'isArrowType'
                | 'isStatic'
                | 'isGlobal'
                | 'isVirtual'
                | 'isInjected'
                | 'overloads'
                | 'generics'
                | 'doc'
                | 'parent'
            >
        > {
    returnTypes?: InjectionType[]
    inParams?: InjectionParameter[]
    outParams?: InjectionParameter[]
    instanceParameters?: InjectionInstanceParameter[]
}
