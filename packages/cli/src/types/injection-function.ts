import type { TsFunction, InjectionParameter, InjectionType } from './index.js'

export interface InjectionFunction
    extends Pick<TsFunction, 'name'>,
        Partial<Pick<TsFunction, 'isArrowType' | 'isInjected' | 'overloads' | 'generics' | 'doc'>> {
    /** The versions on which the injections are to be applied. E.g. `["3.0", "2.0"]` */
    versions: string[]
    /** The namespace on which the injections are to be applied. E.g. `"Gtk"`*/
    namespace: string

    inParams?: InjectionParameter[]
    outParams?: InjectionParameter[]
    returnTypes?: InjectionType[]
}
