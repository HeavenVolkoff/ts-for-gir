/**
 * DbusmenuGtk-0.4
 */

/// <reference types="node" />
/// <reference path="Gtk-2.0.d.ts" />
/// <reference path="Gdk-2.0.d.ts" />
/// <reference path="cairo-1.0.d.ts" />
/// <reference path="Pango-1.0.d.ts" />
/// <reference path="HarfBuzz-0.0.d.ts" />
/// <reference path="GObject-2.0.d.ts" />
/// <reference path="GLib-2.0.d.ts" />
/// <reference path="Gio-2.0.d.ts" />
/// <reference path="GdkPixbuf-2.0.d.ts" />
/// <reference path="GModule-2.0.d.ts" />
/// <reference path="Atk-1.0.d.ts" />
/// <reference path="Dbusmenu-0.4.d.ts" />

declare namespace DbusmenuGtk {

export const GTK_MENUITEM_H__: number
export function gtkParseGetCachedItem(widget: Gtk.Widget): Dbusmenu.Menuitem
export function gtkParseMenuStructure(widget: Gtk.Widget): Dbusmenu.Menuitem
export function menuitemPropertyGetImage(menuitem: Dbusmenu.Menuitem, property: string): GdkPixbuf.Pixbuf
export function menuitemPropertyGetShortcut(menuitem: Dbusmenu.Menuitem): [ /* key */ number, /* modifier */ Gdk.ModifierType ]
export function menuitemPropertySetImage(menuitem: Dbusmenu.Menuitem, property: string, data: GdkPixbuf.Pixbuf): boolean
export function menuitemPropertySetShortcut(menuitem: Dbusmenu.Menuitem, key: number, modifier: Gdk.ModifierType): boolean
export function menuitemPropertySetShortcutMenuitem(menuitem: Dbusmenu.Menuitem, gmi: Gtk.MenuItem): boolean
export function menuitemPropertySetShortcutString(menuitem: Dbusmenu.Menuitem, shortcut: string): boolean
export interface Client_ConstructProps extends Dbusmenu.Client_ConstructProps {
}
export class Client {
    /* Properties of Dbusmenu.Client */
    groupEvents: boolean
    /* Fields of GObject.Object */
    gTypeInstance: GObject.TypeInstance
    /* Methods of DbusmenuGtk.Client */
    getAccelGroup(): Gtk.AccelGroup
    menuitemGet(item: Dbusmenu.Menuitem): Gtk.MenuItem
    menuitemGetSubmenu(item: Dbusmenu.Menuitem): Gtk.Menu
    newitemBase(item: Dbusmenu.Menuitem, gmi: Gtk.MenuItem, parent: Dbusmenu.Menuitem): void
    setAccelGroup(agroup: Gtk.AccelGroup): void
    /* Methods of Dbusmenu.Client */
    addTypeHandler(type: string, newfunc: Dbusmenu.ClientTypeHandler): boolean
    addTypeHandlerFull(type: string, newfunc: Dbusmenu.ClientTypeHandler): boolean
    getIconPaths(): string[]
    getRoot(): Dbusmenu.Menuitem
    getStatus(): Dbusmenu.Status
    getTextDirection(): Dbusmenu.TextDirection
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
    /* Virtual methods of GObject.Object */
    vfuncConstructed(): void
    vfuncDispatchPropertiesChanged(nPspecs: number, pspecs: GObject.ParamSpec): void
    vfuncDispose(): void
    vfuncFinalize(): void
    vfuncGetProperty(propertyId: number, value: GObject.Value, pspec: GObject.ParamSpec): void
    vfuncNotify(pspec: GObject.ParamSpec): void
    vfuncSetProperty(propertyId: number, value: GObject.Value, pspec: GObject.ParamSpec): void
    /* Signals of Dbusmenu.Client */
    connect(sigName: "event-result", callback: (($obj: Client, object: GObject.Object, p0: string, p1: GLib.Variant, p2: number, p3?: object | null) => void)): number
    connect_after(sigName: "event-result", callback: (($obj: Client, object: GObject.Object, p0: string, p1: GLib.Variant, p2: number, p3?: object | null) => void)): number
    emit(sigName: "event-result", object: GObject.Object, p0: string, p1: GLib.Variant, p2: number, p3?: object | null): void
    on(sigName: "event-result", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "event-result", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "event-result", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "icon-theme-dirs-changed", callback: (($obj: Client, arg1?: object | null) => void)): number
    connect_after(sigName: "icon-theme-dirs-changed", callback: (($obj: Client, arg1?: object | null) => void)): number
    emit(sigName: "icon-theme-dirs-changed", arg1?: object | null): void
    on(sigName: "icon-theme-dirs-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "icon-theme-dirs-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "icon-theme-dirs-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "item-activate", callback: (($obj: Client, arg1: GObject.Object, arg2: number) => void)): number
    connect_after(sigName: "item-activate", callback: (($obj: Client, arg1: GObject.Object, arg2: number) => void)): number
    emit(sigName: "item-activate", arg1: GObject.Object, arg2: number): void
    on(sigName: "item-activate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "item-activate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "item-activate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "layout-updated", callback: (($obj: Client) => void)): number
    connect_after(sigName: "layout-updated", callback: (($obj: Client) => void)): number
    emit(sigName: "layout-updated"): void
    on(sigName: "layout-updated", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "layout-updated", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "layout-updated", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "new-menuitem", callback: (($obj: Client, arg1: GObject.Object) => void)): number
    connect_after(sigName: "new-menuitem", callback: (($obj: Client, arg1: GObject.Object) => void)): number
    emit(sigName: "new-menuitem", arg1: GObject.Object): void
    on(sigName: "new-menuitem", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "new-menuitem", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "new-menuitem", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "root-changed", callback: (($obj: Client, arg1: GObject.Object) => void)): number
    connect_after(sigName: "root-changed", callback: (($obj: Client, arg1: GObject.Object) => void)): number
    emit(sigName: "root-changed", arg1: GObject.Object): void
    on(sigName: "root-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "root-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "root-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    /* Signals of GObject.Object */
    connect(sigName: "notify", callback: (($obj: Client, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify", callback: (($obj: Client, pspec: GObject.ParamSpec) => void)): number
    emit(sigName: "notify", pspec: GObject.ParamSpec): void
    on(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::group-events", callback: (($obj: Client, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::group-events", callback: (($obj: Client, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::group-events", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::group-events", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::group-events", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: string, callback: any): number
    connect_after(sigName: string, callback: any): number
    emit(sigName: string, ...args: any[]): void
    disconnect(id: number): void
    on(sigName: string, callback: any): NodeJS.EventEmitter
    once(sigName: string, callback: any): NodeJS.EventEmitter
    off(sigName: string, callback: any): NodeJS.EventEmitter
    static name: string
    constructor (config?: Client_ConstructProps)
    _init (config?: Client_ConstructProps): void
    /* Static methods and pseudo-constructors */
    static new(dbusName: string, dbusObject: string): Client
    static $gtype: GObject.Type
}
export interface Menu_ConstructProps extends Gtk.Menu_ConstructProps {
    dbusName?: string
    dbusObject?: string
}
export class Menu {
    /* Properties of Gtk.Menu */
    accelGroup: Gtk.AccelGroup
    accelPath: string
    active: number
    anchorHints: Gdk.AnchorHints
    attachWidget: Gtk.Widget
    menuTypeHint: Gdk.WindowTypeHint
    monitor: number
    rectAnchorDx: number
    rectAnchorDy: number
    reserveToggleSize: boolean
    tearoffState: boolean
    tearoffTitle: string
    /* Properties of Gtk.MenuShell */
    takeFocus: boolean
    /* Properties of Gtk.Container */
    borderWidth: number
    child: Gtk.Widget
    resizeMode: Gtk.ResizeMode
    /* Properties of Gtk.Widget */
    canFocus: boolean
    canTarget: boolean
    cssClasses: string[]
    cursor: Gdk.Cursor
    focusOnClick: boolean
    focusable: boolean
    halign: Gtk.Align
    readonly hasDefault: boolean
    readonly hasFocus: boolean
    hasTooltip: boolean
    heightRequest: number
    hexpand: boolean
    hexpandSet: boolean
    layoutManager: Gtk.LayoutManager
    marginBottom: number
    marginEnd: number
    marginStart: number
    marginTop: number
    name: string
    opacity: number
    overflow: Gtk.Overflow
    readonly parent: Gtk.Widget
    receivesDefault: boolean
    readonly root: Gtk.Root
    readonly scaleFactor: number
    sensitive: boolean
    tooltipMarkup: string
    tooltipText: string
    valign: Gtk.Align
    vexpand: boolean
    vexpandSet: boolean
    visible: boolean
    widthRequest: number
    /* Fields of DbusmenuGtk.Menu */
    priv: MenuPrivate
    /* Fields of Gtk.Menu */
    menuShell: Gtk.MenuShell
    /* Fields of Gtk.MenuShell */
    container: Gtk.Container
    /* Fields of Gtk.Container */
    widget: Gtk.Widget
    /* Fields of Gtk.Widget */
    parentInstance: GObject.InitiallyUnowned
    /* Fields of GObject.InitiallyUnowned */
    gTypeInstance: GObject.TypeInstance
    /* Methods of DbusmenuGtk.Menu */
    getClient(): Client
    /* Methods of Gtk.Menu */
    attach(child: Gtk.Widget, leftAttach: number, rightAttach: number, topAttach: number, bottomAttach: number): void
    attachToWidget(attachWidget: Gtk.Widget, detacher?: Gtk.MenuDetachFunc | null): void
    detach(): void
    getAccelGroup(): Gtk.AccelGroup
    getAccelPath(): string
    getActive(): Gtk.Widget
    getAttachWidget(): Gtk.Widget
    getMonitor(): number
    getReserveToggleSize(): boolean
    getTearoffState(): boolean
    getTitle(): string
    placeOnMonitor(monitor: Gdk.Monitor): void
    popdown(): void
    popup(parentMenuShell: Gtk.Widget | null, parentMenuItem: Gtk.Widget | null, func: Gtk.MenuPositionFunc | null, button: number, activateTime: number): void
    popupAtPointer(triggerEvent?: Gdk.Event | null): void
    popupAtRect(rectWindow: Gdk.Window, rect: Gdk.Rectangle, rectAnchor: Gdk.Gravity, menuAnchor: Gdk.Gravity, triggerEvent?: Gdk.Event | null): void
    popupAtWidget(widget: Gtk.Widget, widgetAnchor: Gdk.Gravity, menuAnchor: Gdk.Gravity, triggerEvent?: Gdk.Event | null): void
    popupForDevice(device: Gdk.Device | null, parentMenuShell: Gtk.Widget | null, parentMenuItem: Gtk.Widget | null, func: Gtk.MenuPositionFunc | null, button: number, activateTime: number): void
    reorderChild(child: Gtk.Widget, position: number): void
    reposition(): void
    setAccelGroup(accelGroup?: Gtk.AccelGroup | null): void
    setAccelPath(accelPath?: string | null): void
    setActive(index: number): void
    setMonitor(monitorNum: number): void
    setReserveToggleSize(reserveToggleSize: boolean): void
    setScreen(screen?: Gdk.Screen | null): void
    setTearoffState(tornOff: boolean): void
    setTitle(title?: string | null): void
    /* Methods of Gtk.MenuShell */
    activateItem(menuItem: Gtk.Widget, forceDeactivate: boolean): void
    append(child: Gtk.MenuItem): void
    bindModel(model: Gio.MenuModel | null, actionNamespace: string | null, withSeparators: boolean): void
    cancel(): void
    deactivate(): void
    deselect(): void
    getParentShell(): Gtk.Widget
    getSelectedItem(): Gtk.Widget
    getTakeFocus(): boolean
    insert(child: Gtk.Widget, position: number): void
    prepend(child: Gtk.Widget): void
    selectFirst(searchSensitive: boolean): void
    selectItem(menuItem: Gtk.Widget): void
    setTakeFocus(takeFocus: boolean): void
    /* Methods of Gtk.Container */
    add(widget: Gtk.Widget): void
    checkResize(): void
    childGetProperty(child: Gtk.Widget, propertyName: string, value: any): void
    childNotifyByPspec(child: Gtk.Widget, pspec: GObject.ParamSpec): void
    childSetProperty(child: Gtk.Widget, propertyName: string, value: any): void
    childType(): GObject.Type
    forall(callback: Gtk.Callback): void
    foreach(callback: Gtk.Callback): void
    getBorderWidth(): number
    getChildren(): Gtk.Widget[]
    getFocusChain(): [ /* returnType */ boolean, /* focusableWidgets */ Gtk.Widget[] ]
    getFocusChild(): Gtk.Widget | null
    getFocusHadjustment(): Gtk.Adjustment | null
    getFocusVadjustment(): Gtk.Adjustment | null
    getPathForChild(child: Gtk.Widget): Gtk.WidgetPath
    getResizeMode(): Gtk.ResizeMode
    propagateDraw(child: Gtk.Widget, cr: cairo.Context): void
    remove(widget: Gtk.Widget): void
    resizeChildren(): void
    setBorderWidth(borderWidth: number): void
    setFocusChain(focusableWidgets: Gtk.Widget[]): void
    setFocusChild(child?: Gtk.Widget | null): void
    setFocusHadjustment(adjustment: Gtk.Adjustment): void
    setFocusVadjustment(adjustment: Gtk.Adjustment): void
    setReallocateRedraws(needsRedraws: boolean): void
    setResizeMode(resizeMode: Gtk.ResizeMode): void
    unsetFocusChain(): void
    /* Methods of Gtk.Widget */
    actionSetEnabled(actionName: string, enabled: boolean): void
    activate(): boolean
    activateAction(name: string, args?: GLib.Variant | null): boolean
    activateDefault(): void
    addController(controller: Gtk.EventController): void
    addCssClass(cssClass: string): void
    addMnemonicLabel(label: Gtk.Widget): void
    addTickCallback(callback: Gtk.TickCallback): number
    allocate(width: number, height: number, baseline: number, transform?: Gsk.Transform | null): void
    childFocus(direction: Gtk.DirectionType): boolean
    computeBounds(target: Gtk.Widget): [ /* returnType */ boolean, /* outBounds */ Graphene.Rect ]
    computeExpand(orientation: Gtk.Orientation): boolean
    computePoint(target: Gtk.Widget, point: Graphene.Point): [ /* returnType */ boolean, /* outPoint */ Graphene.Point ]
    computeTransform(target: Gtk.Widget): [ /* returnType */ boolean, /* outTransform */ Graphene.Matrix ]
    contains(x: number, y: number): boolean
    createPangoContext(): Pango.Context
    createPangoLayout(text?: string | null): Pango.Layout
    dragCheckThreshold(startX: number, startY: number, currentX: number, currentY: number): boolean
    errorBell(): void
    getAllocatedBaseline(): number
    getAllocatedHeight(): number
    getAllocatedWidth(): number
    getAllocation(): /* allocation */ Gtk.Allocation
    getAncestor(widgetType: GObject.Type): Gtk.Widget | null
    getCanFocus(): boolean
    getCanTarget(): boolean
    getChildVisible(): boolean
    getClipboard(): Gdk.Clipboard
    getCssClasses(): string[]
    getCssName(): string
    getCursor(): Gdk.Cursor | null
    getDirection(): Gtk.TextDirection
    getDisplay(): Gdk.Display
    getFirstChild(): Gtk.Widget | null
    getFocusOnClick(): boolean
    getFocusable(): boolean
    getFontMap(): Pango.FontMap | null
    getFontOptions(): cairo.FontOptions | null
    getFrameClock(): Gdk.FrameClock | null
    getHalign(): Gtk.Align
    getHasTooltip(): boolean
    getHeight(): number
    getHexpand(): boolean
    getHexpandSet(): boolean
    getLastChild(): Gtk.Widget | null
    getLayoutManager(): Gtk.LayoutManager | null
    getMapped(): boolean
    getMarginBottom(): number
    getMarginEnd(): number
    getMarginStart(): number
    getMarginTop(): number
    getName(): string
    getNative(): Gtk.Native | null
    getNextSibling(): Gtk.Widget | null
    getOpacity(): number
    getOverflow(): Gtk.Overflow
    getPangoContext(): Pango.Context
    getParent(): Gtk.Widget | null
    getPreferredSize(): [ /* minimumSize */ Gtk.Requisition | null, /* naturalSize */ Gtk.Requisition | null ]
    getPrevSibling(): Gtk.Widget | null
    getPrimaryClipboard(): Gdk.Clipboard
    getRealized(): boolean
    getReceivesDefault(): boolean
    getRequestMode(): Gtk.SizeRequestMode
    getRoot(): Gtk.Root | null
    getScaleFactor(): number
    getSensitive(): boolean
    getSettings(): Gtk.Settings
    getSize(orientation: Gtk.Orientation): number
    getSizeRequest(): [ /* width */ number | null, /* height */ number | null ]
    getStateFlags(): Gtk.StateFlags
    getStyleContext(): Gtk.StyleContext
    getTemplateChild(widgetType: GObject.Type, name: string): GObject.Object
    getTooltipMarkup(): string | null
    getTooltipText(): string | null
    getValign(): Gtk.Align
    getVexpand(): boolean
    getVexpandSet(): boolean
    getVisible(): boolean
    getWidth(): number
    grabFocus(): boolean
    hasCssClass(cssClass: string): boolean
    hasVisibleFocus(): boolean
    hide(): void
    inDestruction(): boolean
    initTemplate(): void
    insertActionGroup(name: string, group?: Gio.ActionGroup | null): void
    insertAfter(parent: Gtk.Widget, previousSibling?: Gtk.Widget | null): void
    insertBefore(parent: Gtk.Widget, nextSibling?: Gtk.Widget | null): void
    isAncestor(ancestor: Gtk.Widget): boolean
    isDrawable(): boolean
    isFocus(): boolean
    isSensitive(): boolean
    isVisible(): boolean
    keynavFailed(direction: Gtk.DirectionType): boolean
    listMnemonicLabels(): Gtk.Widget[]
    map(): void
    measure(orientation: Gtk.Orientation, forSize: number): [ /* minimum */ number | null, /* natural */ number | null, /* minimumBaseline */ number | null, /* naturalBaseline */ number | null ]
    mnemonicActivate(groupCycling: boolean): boolean
    observeChildren(): Gio.ListModel
    observeControllers(): Gio.ListModel
    pick(x: number, y: number, flags: Gtk.PickFlags): Gtk.Widget | null
    queueAllocate(): void
    queueDraw(): void
    queueResize(): void
    realize(): void
    removeController(controller: Gtk.EventController): void
    removeCssClass(cssClass: string): void
    removeMnemonicLabel(label: Gtk.Widget): void
    removeTickCallback(id: number): void
    setCanFocus(canFocus: boolean): void
    setCanTarget(canTarget: boolean): void
    setChildVisible(childVisible: boolean): void
    setCssClasses(classes: string[]): void
    setCursor(cursor?: Gdk.Cursor | null): void
    setCursorFromName(name?: string | null): void
    setDirection(dir: Gtk.TextDirection): void
    setFocusOnClick(focusOnClick: boolean): void
    setFocusable(focusable: boolean): void
    setFontMap(fontMap?: Pango.FontMap | null): void
    setFontOptions(options?: cairo.FontOptions | null): void
    setHalign(align: Gtk.Align): void
    setHasTooltip(hasTooltip: boolean): void
    setHexpand(expand: boolean): void
    setHexpandSet(set: boolean): void
    setLayoutManager(layoutManager?: Gtk.LayoutManager | null): void
    setMarginBottom(margin: number): void
    setMarginEnd(margin: number): void
    setMarginStart(margin: number): void
    setMarginTop(margin: number): void
    setName(name: string): void
    setOpacity(opacity: number): void
    setOverflow(overflow: Gtk.Overflow): void
    setParent(parent: Gtk.Widget): void
    setReceivesDefault(receivesDefault: boolean): void
    setSensitive(sensitive: boolean): void
    setSizeRequest(width: number, height: number): void
    setStateFlags(flags: Gtk.StateFlags, clear: boolean): void
    setTooltipMarkup(markup?: string | null): void
    setTooltipText(text?: string | null): void
    setValign(align: Gtk.Align): void
    setVexpand(expand: boolean): void
    setVexpandSet(set: boolean): void
    setVisible(visible: boolean): void
    shouldLayout(): boolean
    show(): void
    sizeAllocate(allocation: Gtk.Allocation, baseline: number): void
    snapshotChild(child: Gtk.Widget, snapshot: Gtk.Snapshot): void
    translateCoordinates(destWidget: Gtk.Widget, srcX: number, srcY: number): [ /* returnType */ boolean, /* destX */ number | null, /* destY */ number | null ]
    triggerTooltipQuery(): void
    unmap(): void
    unparent(): void
    unrealize(): void
    unsetStateFlags(flags: Gtk.StateFlags): void
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
    /* Methods of Gtk.Buildable */
    getBuildableId(): string
    /* Virtual methods of DbusmenuGtk.Menu */
    vfuncAddChild(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void
    vfuncCustomFinished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: object | null): void
    vfuncCustomTagEnd(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: object | null): void
    vfuncCustomTagStart(builder: Gtk.Builder, child: GObject.Object | null, tagname: string): [ /* returnType */ boolean, /* parser */ Gtk.BuildableParser, /* data */ object | null ]
    vfuncGetId(): string
    vfuncGetInternalChild(builder: Gtk.Builder, childname: string): GObject.Object
    vfuncParserFinished(builder: Gtk.Builder): void
    vfuncSetBuildableProperty(builder: Gtk.Builder, name: string, value: any): void
    vfuncSetId(id: string): void
    /* Virtual methods of Gtk.MenuShell */
    vfuncActivateCurrent(forceHide: boolean): void
    vfuncCancel(): void
    vfuncDeactivate(): void
    vfuncGetPopupDelay(): number
    vfuncInsert(child: Gtk.Widget, position: number): void
    vfuncMoveCurrent(direction: Gtk.MenuDirectionType): void
    vfuncMoveSelected(distance: number): boolean
    vfuncSelectItem(menuItem: Gtk.Widget): void
    vfuncSelectionDone(): void
    /* Virtual methods of Gtk.Container */
    vfuncAdd(widget: Gtk.Widget): void
    vfuncCheckResize(): void
    vfuncChildType(): GObject.Type
    vfuncCompositeName(child: Gtk.Widget): string
    vfuncForall(includeInternals: boolean, callback: Gtk.Callback): void
    vfuncGetChildProperty(child: Gtk.Widget, propertyId: number, value: any, pspec: GObject.ParamSpec): void
    vfuncGetPathForChild(child: Gtk.Widget): Gtk.WidgetPath
    vfuncRemove(widget: Gtk.Widget): void
    vfuncSetChildProperty(child: Gtk.Widget, propertyId: number, value: any, pspec: GObject.ParamSpec): void
    vfuncSetFocusChild(child?: Gtk.Widget | null): void
    /* Virtual methods of Gtk.Widget */
    vfuncComputeExpand(hexpandP: boolean, vexpandP: boolean): void
    vfuncContains(x: number, y: number): boolean
    vfuncCssChanged(change: Gtk.CssStyleChange): void
    vfuncDirectionChanged(previousDirection: Gtk.TextDirection): void
    vfuncFocus(direction: Gtk.DirectionType): boolean
    vfuncGetRequestMode(): Gtk.SizeRequestMode
    vfuncGrabFocus(): boolean
    vfuncHide(): void
    vfuncKeynavFailed(direction: Gtk.DirectionType): boolean
    vfuncMap(): void
    vfuncMeasure(orientation: Gtk.Orientation, forSize: number): [ /* minimum */ number | null, /* natural */ number | null, /* minimumBaseline */ number | null, /* naturalBaseline */ number | null ]
    vfuncMnemonicActivate(groupCycling: boolean): boolean
    vfuncMoveFocus(direction: Gtk.DirectionType): void
    vfuncQueryTooltip(x: number, y: number, keyboardTooltip: boolean, tooltip: Gtk.Tooltip): boolean
    vfuncRealize(): void
    vfuncRoot(): void
    vfuncSetFocusChild(child?: Gtk.Widget | null): void
    vfuncShow(): void
    vfuncSizeAllocate(width: number, height: number, baseline: number): void
    vfuncSnapshot(snapshot: Gtk.Snapshot): void
    vfuncStateFlagsChanged(previousStateFlags: Gtk.StateFlags): void
    vfuncSystemSettingChanged(settings: Gtk.SystemSetting): void
    vfuncUnmap(): void
    vfuncUnrealize(): void
    vfuncUnroot(): void
    /* Virtual methods of GObject.Object */
    vfuncConstructed(): void
    vfuncDispatchPropertiesChanged(nPspecs: number, pspecs: GObject.ParamSpec): void
    vfuncDispose(): void
    vfuncFinalize(): void
    vfuncGetProperty(propertyId: number, value: GObject.Value, pspec: GObject.ParamSpec): void
    vfuncNotify(pspec: GObject.ParamSpec): void
    vfuncSetProperty(propertyId: number, value: GObject.Value, pspec: GObject.ParamSpec): void
    /* Signals of Gtk.Menu */
    connect(sigName: "move-scroll", callback: (($obj: Menu, scrollType: Gtk.ScrollType) => void)): number
    connect_after(sigName: "move-scroll", callback: (($obj: Menu, scrollType: Gtk.ScrollType) => void)): number
    emit(sigName: "move-scroll", scrollType: Gtk.ScrollType): void
    on(sigName: "move-scroll", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "move-scroll", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "move-scroll", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "popped-up", callback: (($obj: Menu, flippedRect: object | null, finalRect: object | null, flippedX: boolean, flippedY: boolean) => void)): number
    connect_after(sigName: "popped-up", callback: (($obj: Menu, flippedRect: object | null, finalRect: object | null, flippedX: boolean, flippedY: boolean) => void)): number
    emit(sigName: "popped-up", flippedRect: object | null, finalRect: object | null, flippedX: boolean, flippedY: boolean): void
    on(sigName: "popped-up", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "popped-up", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "popped-up", callback: (...args: any[]) => void): NodeJS.EventEmitter
    /* Signals of Gtk.MenuShell */
    connect(sigName: "activate-current", callback: (($obj: Menu, forceHide: boolean) => void)): number
    connect_after(sigName: "activate-current", callback: (($obj: Menu, forceHide: boolean) => void)): number
    emit(sigName: "activate-current", forceHide: boolean): void
    on(sigName: "activate-current", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "activate-current", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "activate-current", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "cancel", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "cancel", callback: (($obj: Menu) => void)): number
    emit(sigName: "cancel"): void
    on(sigName: "cancel", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "cancel", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "cancel", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "cycle-focus", callback: (($obj: Menu, direction: Gtk.DirectionType) => void)): number
    connect_after(sigName: "cycle-focus", callback: (($obj: Menu, direction: Gtk.DirectionType) => void)): number
    emit(sigName: "cycle-focus", direction: Gtk.DirectionType): void
    on(sigName: "cycle-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "cycle-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "cycle-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "deactivate", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "deactivate", callback: (($obj: Menu) => void)): number
    emit(sigName: "deactivate"): void
    on(sigName: "deactivate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "deactivate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "deactivate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "insert", callback: (($obj: Menu, child: Gtk.Widget, position: number) => void)): number
    connect_after(sigName: "insert", callback: (($obj: Menu, child: Gtk.Widget, position: number) => void)): number
    emit(sigName: "insert", child: Gtk.Widget, position: number): void
    on(sigName: "insert", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "insert", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "insert", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "move-current", callback: (($obj: Menu, direction: Gtk.MenuDirectionType) => void)): number
    connect_after(sigName: "move-current", callback: (($obj: Menu, direction: Gtk.MenuDirectionType) => void)): number
    emit(sigName: "move-current", direction: Gtk.MenuDirectionType): void
    on(sigName: "move-current", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "move-current", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "move-current", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "move-selected", callback: (($obj: Menu, distance: number) => boolean)): number
    connect_after(sigName: "move-selected", callback: (($obj: Menu, distance: number) => boolean)): number
    emit(sigName: "move-selected", distance: number): void
    on(sigName: "move-selected", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "move-selected", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "move-selected", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "selection-done", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "selection-done", callback: (($obj: Menu) => void)): number
    emit(sigName: "selection-done"): void
    on(sigName: "selection-done", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "selection-done", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "selection-done", callback: (...args: any[]) => void): NodeJS.EventEmitter
    /* Signals of Gtk.Container */
    connect(sigName: "add", callback: (($obj: Menu, object: Gtk.Widget) => void)): number
    connect_after(sigName: "add", callback: (($obj: Menu, object: Gtk.Widget) => void)): number
    emit(sigName: "add", object: Gtk.Widget): void
    on(sigName: "add", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "add", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "add", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "check-resize", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "check-resize", callback: (($obj: Menu) => void)): number
    emit(sigName: "check-resize"): void
    on(sigName: "check-resize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "check-resize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "check-resize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "remove", callback: (($obj: Menu, object: Gtk.Widget) => void)): number
    connect_after(sigName: "remove", callback: (($obj: Menu, object: Gtk.Widget) => void)): number
    emit(sigName: "remove", object: Gtk.Widget): void
    on(sigName: "remove", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "remove", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "remove", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "set-focus-child", callback: (($obj: Menu, object: Gtk.Widget) => void)): number
    connect_after(sigName: "set-focus-child", callback: (($obj: Menu, object: Gtk.Widget) => void)): number
    emit(sigName: "set-focus-child", object: Gtk.Widget): void
    on(sigName: "set-focus-child", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "set-focus-child", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "set-focus-child", callback: (...args: any[]) => void): NodeJS.EventEmitter
    /* Signals of Gtk.Widget */
    connect(sigName: "destroy", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "destroy", callback: (($obj: Menu) => void)): number
    emit(sigName: "destroy"): void
    on(sigName: "destroy", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "destroy", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "destroy", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "direction-changed", callback: (($obj: Menu, previousDirection: Gtk.TextDirection) => void)): number
    connect_after(sigName: "direction-changed", callback: (($obj: Menu, previousDirection: Gtk.TextDirection) => void)): number
    emit(sigName: "direction-changed", previousDirection: Gtk.TextDirection): void
    on(sigName: "direction-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "direction-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "direction-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "hide", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "hide", callback: (($obj: Menu) => void)): number
    emit(sigName: "hide"): void
    on(sigName: "hide", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "hide", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "hide", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "keynav-failed", callback: (($obj: Menu, direction: Gtk.DirectionType) => boolean)): number
    connect_after(sigName: "keynav-failed", callback: (($obj: Menu, direction: Gtk.DirectionType) => boolean)): number
    emit(sigName: "keynav-failed", direction: Gtk.DirectionType): void
    on(sigName: "keynav-failed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "keynav-failed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "keynav-failed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "map", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "map", callback: (($obj: Menu) => void)): number
    emit(sigName: "map"): void
    on(sigName: "map", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "map", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "map", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "mnemonic-activate", callback: (($obj: Menu, groupCycling: boolean) => boolean)): number
    connect_after(sigName: "mnemonic-activate", callback: (($obj: Menu, groupCycling: boolean) => boolean)): number
    emit(sigName: "mnemonic-activate", groupCycling: boolean): void
    on(sigName: "mnemonic-activate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "mnemonic-activate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "mnemonic-activate", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "move-focus", callback: (($obj: Menu, direction: Gtk.DirectionType) => void)): number
    connect_after(sigName: "move-focus", callback: (($obj: Menu, direction: Gtk.DirectionType) => void)): number
    emit(sigName: "move-focus", direction: Gtk.DirectionType): void
    on(sigName: "move-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "move-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "move-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "query-tooltip", callback: (($obj: Menu, x: number, y: number, keyboardMode: boolean, tooltip: Gtk.Tooltip) => boolean)): number
    connect_after(sigName: "query-tooltip", callback: (($obj: Menu, x: number, y: number, keyboardMode: boolean, tooltip: Gtk.Tooltip) => boolean)): number
    emit(sigName: "query-tooltip", x: number, y: number, keyboardMode: boolean, tooltip: Gtk.Tooltip): void
    on(sigName: "query-tooltip", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "query-tooltip", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "query-tooltip", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "realize", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "realize", callback: (($obj: Menu) => void)): number
    emit(sigName: "realize"): void
    on(sigName: "realize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "realize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "realize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "show", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "show", callback: (($obj: Menu) => void)): number
    emit(sigName: "show"): void
    on(sigName: "show", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "show", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "show", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "state-flags-changed", callback: (($obj: Menu, flags: Gtk.StateFlags) => void)): number
    connect_after(sigName: "state-flags-changed", callback: (($obj: Menu, flags: Gtk.StateFlags) => void)): number
    emit(sigName: "state-flags-changed", flags: Gtk.StateFlags): void
    on(sigName: "state-flags-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "state-flags-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "state-flags-changed", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "unmap", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "unmap", callback: (($obj: Menu) => void)): number
    emit(sigName: "unmap"): void
    on(sigName: "unmap", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "unmap", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "unmap", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "unrealize", callback: (($obj: Menu) => void)): number
    connect_after(sigName: "unrealize", callback: (($obj: Menu) => void)): number
    emit(sigName: "unrealize"): void
    on(sigName: "unrealize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "unrealize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "unrealize", callback: (...args: any[]) => void): NodeJS.EventEmitter
    /* Signals of GObject.Object */
    connect(sigName: "notify", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    emit(sigName: "notify", pspec: GObject.ParamSpec): void
    on(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::accel-group", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::accel-group", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::accel-group", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::accel-group", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::accel-group", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::accel-path", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::accel-path", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::accel-path", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::accel-path", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::accel-path", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::active", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::active", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::active", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::active", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::active", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::anchor-hints", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::anchor-hints", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::anchor-hints", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::anchor-hints", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::anchor-hints", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::attach-widget", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::attach-widget", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::attach-widget", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::attach-widget", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::attach-widget", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::menu-type-hint", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::menu-type-hint", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::menu-type-hint", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::menu-type-hint", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::menu-type-hint", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::monitor", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::monitor", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::monitor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::monitor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::monitor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::rect-anchor-dx", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::rect-anchor-dx", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::rect-anchor-dx", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::rect-anchor-dx", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::rect-anchor-dx", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::rect-anchor-dy", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::rect-anchor-dy", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::rect-anchor-dy", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::rect-anchor-dy", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::rect-anchor-dy", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::reserve-toggle-size", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::reserve-toggle-size", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::reserve-toggle-size", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::reserve-toggle-size", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::reserve-toggle-size", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::tearoff-state", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::tearoff-state", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::tearoff-state", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::tearoff-state", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::tearoff-state", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::tearoff-title", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::tearoff-title", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::tearoff-title", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::tearoff-title", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::tearoff-title", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::take-focus", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::take-focus", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::take-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::take-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::take-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::border-width", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::border-width", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::border-width", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::border-width", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::border-width", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::child", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::child", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::child", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::child", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::child", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::resize-mode", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::resize-mode", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::resize-mode", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::resize-mode", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::resize-mode", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::can-focus", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::can-focus", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::can-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::can-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::can-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::can-target", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::can-target", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::can-target", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::can-target", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::can-target", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::css-classes", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::css-classes", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::css-classes", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::css-classes", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::css-classes", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::cursor", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::cursor", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::cursor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::cursor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::cursor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::focus-on-click", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::focus-on-click", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::focus-on-click", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::focus-on-click", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::focus-on-click", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::focusable", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::focusable", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::focusable", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::focusable", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::focusable", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::halign", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::halign", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::halign", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::halign", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::halign", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::has-default", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::has-default", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::has-default", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::has-default", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::has-default", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::has-focus", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::has-focus", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::has-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::has-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::has-focus", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::has-tooltip", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::has-tooltip", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::has-tooltip", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::has-tooltip", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::has-tooltip", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::height-request", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::height-request", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::height-request", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::height-request", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::height-request", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::hexpand", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::hexpand", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::hexpand", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::hexpand", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::hexpand", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::hexpand-set", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::hexpand-set", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::hexpand-set", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::hexpand-set", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::hexpand-set", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::layout-manager", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::layout-manager", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::layout-manager", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::layout-manager", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::layout-manager", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::margin-bottom", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::margin-bottom", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::margin-bottom", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::margin-bottom", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::margin-bottom", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::margin-end", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::margin-end", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::margin-end", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::margin-end", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::margin-end", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::margin-start", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::margin-start", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::margin-start", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::margin-start", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::margin-start", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::margin-top", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::margin-top", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::margin-top", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::margin-top", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::margin-top", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::name", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::name", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::name", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::name", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::name", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::opacity", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::opacity", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::opacity", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::opacity", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::opacity", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::overflow", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::overflow", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::overflow", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::overflow", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::overflow", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::parent", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::parent", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::parent", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::parent", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::parent", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::receives-default", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::receives-default", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::receives-default", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::receives-default", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::receives-default", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::root", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::root", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::root", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::root", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::root", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::scale-factor", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::scale-factor", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::scale-factor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::scale-factor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::scale-factor", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::sensitive", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::sensitive", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::sensitive", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::sensitive", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::sensitive", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::tooltip-markup", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::tooltip-markup", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::tooltip-markup", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::tooltip-markup", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::tooltip-markup", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::tooltip-text", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::tooltip-text", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::tooltip-text", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::tooltip-text", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::tooltip-text", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::valign", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::valign", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::valign", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::valign", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::valign", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::vexpand", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::vexpand", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::vexpand", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::vexpand", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::vexpand", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::vexpand-set", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::vexpand-set", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::vexpand-set", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::vexpand-set", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::vexpand-set", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::visible", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::visible", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::visible", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::visible", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::visible", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: "notify::width-request", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    connect_after(sigName: "notify::width-request", callback: (($obj: Menu, pspec: GObject.ParamSpec) => void)): number
    on(sigName: "notify::width-request", callback: (...args: any[]) => void): NodeJS.EventEmitter
    once(sigName: "notify::width-request", callback: (...args: any[]) => void): NodeJS.EventEmitter
    off(sigName: "notify::width-request", callback: (...args: any[]) => void): NodeJS.EventEmitter
    connect(sigName: string, callback: any): number
    connect_after(sigName: string, callback: any): number
    emit(sigName: string, ...args: any[]): void
    disconnect(id: number): void
    on(sigName: string, callback: any): NodeJS.EventEmitter
    once(sigName: string, callback: any): NodeJS.EventEmitter
    off(sigName: string, callback: any): NodeJS.EventEmitter
    static name: string
    constructor (config?: Menu_ConstructProps)
    _init (config?: Menu_ConstructProps): void
    /* Static methods and pseudo-constructors */
    static new(dbusName: string, dbusObject: string): Menu
    static new(): Menu
    static $gtype: GObject.Type
}
export abstract class ClientClass {
    /* Fields of DbusmenuGtk.ClientClass */
    parentClass: Dbusmenu.ClientClass
    rootChanged: (newroot: Dbusmenu.Menuitem) => void
    reserved1: () => void
    reserved2: () => void
    reserved3: () => void
    reserved4: () => void
    reserved5: () => void
    reserved6: () => void
    static name: string
}
export class ClientPrivate {
    static name: string
}
export abstract class MenuClass {
    /* Fields of DbusmenuGtk.MenuClass */
    parentClass: Gtk.MenuClass
    reserved1: () => void
    reserved2: () => void
    reserved3: () => void
    reserved4: () => void
    reserved5: () => void
    reserved6: () => void
    static name: string
}
export class MenuPrivate {
    static name: string
}
}