/**
 * Vgpg-1
 */

/// <reference types="node" />
/// <reference path="Vda-1.d.ts" />
/// <reference path="GCalc-1.d.ts" />
/// <reference path="GObject-2.0.d.ts" />
/// <reference path="GLib-2.0.d.ts" />
/// <reference path="Gio-2.0.d.ts" />
/// <reference path="Gee-0.8.d.ts" />
/// <reference path="Vgda-1.d.ts" />

declare namespace Vgpg {

export interface Connection_ConstructProps extends Vgda.GProvider_ConstructProps {
}
export class Connection {
    /* Fields of Vgpg.Connection */
    parentInstance: Vgda.GProvider
    priv: ConnectionPrivate
    /* Fields of Vgda.GProvider */
    provider: string
    cncString: string
    /* Fields of GObject.Object */
    gTypeInstance: GObject.TypeInstance
    /* Methods of Vgpg.Connection */
    currentUser(): Vda.Role | null
    /* Methods of GObject.Object */
    bindProperty(sourceProperty: string, target: GObject.Object, targetProperty: string, flags: GObject.BindingFlags): GObject.Binding
    bindPropertyFull(sourceProperty: string, target: GObject.Object, targetProperty: string, flags: GObject.BindingFlags, transformTo: GObject.Closure, transformFrom: GObject.Closure): GObject.Binding
    forceFloating(): void
    freezeNotify(): void
    getData(key: string): object | null
    getProperty(propertyName: string, value: GObject.Value): void
    getQdata(quark: GLib.Quark): object | null
    getv(names: string[], values: GObject.Value[]): void
    isFloating(): boolean
    notify(propertyName: string): void
    notifyByPspec(pspec: GObject.ParamSpec): void
    ref(): GObject.Object
    refSink(): GObject.Object
    runDispose(): void
    setData(key: string, data?: object | null): void
    setProperty(propertyName: string, value: GObject.Value): void
    stealData(key: string): object | null
    stealQdata(quark: GLib.Quark): object | null
    thawNotify(): void
    unref(): void
    watchClosure(closure: GObject.Closure): void
    /* Virtual methods of Vgda.GProvider */
    vfuncClose(callback?: Gio.AsyncReadyCallback | null): void
    vfuncCloseFinish(res: Gio.AsyncResult): void
    vfuncOpen(callback?: Gio.AsyncReadyCallback | null): void
    vfuncOpenFinish(res: Gio.AsyncResult): Vda.ConnectionStatus
    vfuncOpenFromString(cncString: string, callback?: Gio.AsyncReadyCallback | null): void
    vfuncOpenFromStringFinish(res: Gio.AsyncResult): Vda.ConnectionStatus
    vfuncAddSavepoint(name?: string | null): boolean
    vfuncDeleteSavepoint(name?: string | null): boolean
    vfuncRollbackSavepoint(name?: string | null): boolean
    vfuncBeginTransaction(name?: string | null): boolean
    vfuncCommitTransaction(name?: string | null): boolean
    vfuncRollbackTransaction(name?: string | null): boolean
    vfuncParseString(sql: string): Vda.Query
    vfuncParseStringPrepared(name: string | null, sql: string): Vda.PreparedQuery | null
    vfuncGetPreparedQuery(name: string): Vda.PreparedQuery | null
    vfuncQueryFromCommand(cmd: Vda.SqlCommand, name?: string | null): Vda.PreparedQuery | null
    vfuncValueToQuotedString(v: Vda.SqlValue): string
    vfuncCurrentUser(): Vda.Role | null
    vfuncLocale(category: string): string
    vfuncGetStatus(): Vda.ConnectionStatus
    vfuncGetParameters(): Vda.ConnectionParameters
    vfuncSetParameters(value: Vda.ConnectionParameters): void
    vfuncGetIsOpened(): boolean
    vfuncGetConnectionString(): string
    /* Virtual methods of GObject.Object */
    vfuncConstructed(): void
    vfuncDispatchPropertiesChanged(nPspecs: number, pspecs: GObject.ParamSpec): void
    vfuncDispose(): void
    vfuncFinalize(): void
    vfuncGetProperty(propertyId: number, value: GObject.Value, pspec: GObject.ParamSpec): void
    vfuncNotify(pspec: GObject.ParamSpec): void
    vfuncSetProperty(propertyId: number, value: GObject.Value, pspec: GObject.ParamSpec): void
    /* Signals of GObject.Object */
    connect(sigName: "notify", callback: (($obj: Connection, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify", callback: (($obj: Connection, pspec: GObject.ParamSpec) => void)): number
    emit(sigName: "notify", pspec: GObject.ParamSpec): void
    on(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: string, callback: any): number
    connect_after(sigName: string, callback: any): number
    emit(sigName: string, ...args: any[]): void
    disconnect(id: number): void
    on(sigName: string, callback: any): NodeJS.EventEmitter
    once(sigName: string, callback: any): NodeJS.EventEmitter
    off(sigName: string, callback: any): NodeJS.EventEmitter
    static name: string
    constructor (config?: Connection_ConstructProps)
    _init (config?: Connection_ConstructProps): void
    /* Static methods and pseudo-constructors */
    static new(): Connection
    static $gtype: GObject.Type
}
export abstract class ConnectionClass {
    /* Fields of Vgpg.ConnectionClass */
    parentClass: Vgda.GProviderClass
    static name: string
}
export class ConnectionPrivate {
    static name: string
}
}