import { GirInfoAttrs, GirInfoElements, GirType, PartOfClass } from '.'

export interface GirAliasElement extends PartOfClass, GirInfoElements {
    /** Type's name substitution, representing a typedef in C */
    $: GirInfoAttrs & {
        /** the new name or typedef'd name */
        name: string
        /** the corresponding C type's name */
        'c:type'?: string
    }
    /** Other elements an alias can contain */
    type?: GirType[]
}
