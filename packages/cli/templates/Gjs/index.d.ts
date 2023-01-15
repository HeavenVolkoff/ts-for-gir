/*
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in <%= APP_NAME %> itself or create a bug report on <%= APP_SOURCE %>
 */
import type { Lang, System, console as GjsConsole, Format, Signals, Package, gettext, Mainloop, byteArray } from './Gjs'
import type { Cairo } from './Cairo'
import type { Timers, Console, Encoding } from './whatwg'
// <%_ for (const girModule of girModules) { _%>
//   <%_ if(useNamespace){ _%>
// import type <%= girModule.importName %> from "./<%= girModule.packageName %>.js";
//   <%_ } else { _%>
// import type * as <%= girModule.importName %> from "./<%= girModule.packageName %>.js";
//   <%_ } _%>
// <%_ } _%>

/** @see https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts */
declare global {
    var setTimeout: typeof Timers.setTimeout
    var setInterval: typeof Timers.setInterval
    var clearTimeout: typeof Timers.clearTimeout
    var clearInterval: typeof Timers.clearInterval

    var console: Console

    var TextEncoder: typeof Encoding.TextEncoder
    var TextDecoder: typeof Encoding.TextDecoder

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/_bootstrap/default.js#L11-18 */
    var ARGV: string[]

    /**
     * Logs a message with severity equal to
     * {@link https://gjs-docs.gnome.org/glib20/glib.loglevelflags#default-level_message GLib.LogLevelFlags.LEVEL_MESSAGE}.
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Logging.md#logmessage
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/print.cpp#L25-53
     *
     * @param message A string or any coercible value
     */
     function log(message: any): void

     /**
      * Logs a stack trace for error, with an optional prefix, with severity equal to
      * {@link https://gjs-docs.gnome.org/glib20/glib.loglevelflags#default-level_warning GLib.LogLevelFlags.LEVEL_WARNING}.
      * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Logging.md#logerrorerror-prefix
      * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/print.cpp#L55-80
      * 
      * This function is commonly used in conjunction with `try...catch`
      * blocks to log errors while still trapping the exception.
      *
      * @param error An Error or GLib.Error object
      * @param prefix Optional prefix for the message
      */
     function logError(error: object, prefix?: any): void

    /**
     * Takes any number of strings (or values that can be coerced to strings),
     * joins them with a space and appends a newline character (`\n`).
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Logging.md#printmessages
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/print.cpp#L110-122
     * 
     * The resulting string is printed directly to stdout of the current process with
     * {@link https://docs.gtk.org/glib/func.print.html g_print()}.
     *
     * Note:
     *  This function is not useful for GNOME Shell extensions
     *
     * @param messages Any number of strings or coercible values
     */
    function print(...messages: any[]): void

    /**
     * Takes any number of strings (or values that can be coerced to strings),
     * joins them with a space and appends a newline character (`\n`).
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Logging.md#printerrmessages
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/print.cpp#L124-136
     * 
     * The resulting string is printed directly to stderr of the current process with
     * {@link https://docs.gtk.org/glib/func.printerr.html g_printerr()}.
     *
     * Note:
     *  This function is not useful for GNOME Shell extensions
     *
     * @param messages Any number of strings or coercible values
     */
    function printerr(...messages: any[]): void

    var imports: {
        /**
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/gjs/context.cpp#L342
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/gi/repo.cpp#L198-235
         */
        gi: {
            // <%_ for (const girModuleGroup of girModulesGrouped) { _%>
            //   <%= girModuleGroup.namespace %>: <%_ for (const [i, girModule] of girModuleGroup.modules.entries()) { _%>
            //     typeof <%= girModule.module.importName %>
            //     <%_ if (i !== girModuleGroup.modules.length - 1) { _%>
            //       |
            //     <%_ } _%>
            //   <%_ } _%>
            // <%_ } _%>
            // versions: {
            //     <%_ for (const girModuleGroup of girModulesGrouped) { _%>
            //       <%= girModuleGroup.namespace %>: <%_ for (const [i, girModule] of girModuleGroup.modules.entries()) { _%>
            //         '<%= girModule.module.version %>'
            //         <%_ if (i !== girModuleGroup.modules.length - 1) { _%>
            //           |
            //         <%_ } _%>
            //       <%_ } _%>
            //     <%_ } _%>
            // }
        }

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Lang.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/lang.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/_legacy.js
        lang: typeof Lang

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/cairo.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/cairo.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/cairo.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_cairo.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/cairo.cpp
        cairo: typeof Cairo

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/System.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/system.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/system.cpp#L276-284
        system: typeof System

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Format.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/format.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_format.js
        format: typeof Format

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/console.cpp#L283-285
        console: typeof GjsConsole

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Signals.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/signals.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_signals.js
        signals: typeof Signals

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Package/Specification.md#runtime-support
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/package.js
        package: typeof Package

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Gettext.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/gettext.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/_gettext.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/libgjs-private/gjs-util.c#L63-84
        gettext: typeof gettext

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Mainloop.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/mainloop.js
        mainloop: typeof Mainloop

        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/ByteArray.md
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/byteArray.js
        // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/gjs/byteArray.cpp#L205-207
        byteArray: typeof byteArray

        /**
         * An array of paths that are used to look for files.
         * If you want to prepend a path you can do something like `imports.searchPath.unshift(myPath)`.
         */
        searchPath: string[]
    }
}

export const gi: typeof globalThis.imports.gi
export { Cairo } from './Cairo'
export { Lang, Format, System, gettext, Signals, Package, Mainloop, byteArray } from './Gjs'
export default globalThis.imports
