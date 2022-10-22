import type { InjectionFunction } from '../../../types/index.js'

export const functionsGObject20Gjs: InjectionFunction[] = [
    {
        versions: ['2.0'],
        namespace: 'GObject',
        name: 'type_from_name',
        doc: {
            text: 'Look up the type ID from a given type name, returning 0 if no type has been registered under this name (this is the preferred method to find out by name whether a specific type has been registered yet).',
            tags: [],
        },
        inParams: [
            {
                doc: {
                    text: 'type name to look up',
                },
                name: 'name',
                type: [{ type: 'string' }],
            },
        ],
        returnTypes: [{ type: 'null | GType' }],
    },
]
