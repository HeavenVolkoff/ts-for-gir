// <% if(useNamespace){ %>
// import GObject from './GObject-2.0.js';
// import GLib from './GLib-2.0.js';
// <% } else { %>
import * as GObject from './GObject-2.0'
import * as GLib from './GLib-2.0'
// <% } %>

export namespace Package {
    /**
     * Although there are references in the documentation of more properties that
     * this object should accepts, only the following are actually used in the init code,
     * and all must be defined, due to the others having their values derived from them.
     */
    interface PackageInitParams {
        /**
         * Package name (eg. org.foo.Bar.App)
         * Used as pkglibdir and pkgdatadir
         */
        name: string
        version: string
        prefix: string
        libdir: string
    }

    /**
     * Base name of the entry point script.
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/package.js#L105
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/script/package.js#L37-43
     */
    export const name: string | undefined

    /** Package version */
    export const version: string | undefined
    /** Installation prefix */
    export const prefix: string | undefined
    /** Usually it would be prefix + '/share' */
    export const datadir: string | undefined
    /** Usually it would be prefix + '/lib' (or '/lib64') */
    export const libdir: string | undefined
    /**
     * Directory to look for private data files, such as images, stylesheets and UI definitions
     * Usually it will be datadir + name when installed and './data' when running from the source tree
     */
    export const pkgdatadir: string | undefined
    /**
     * Directory to look for JS modules
     * Usually it will be libdir + name when installed and './lib' when running from the source tree
     */
    export const pkglibdir: string | undefined
    /**
     * Directory to look for JS modules;
     * Usually it will will be pkglibdir when installed and './src' when running from the source tree
     */
    export const moduledir: string | undefined
    /**
     * Directory containing gettext translation files
     * Usually it will be datadir + '/locale' when installed and './po' in the source tree
     */
    export const localedir: string | undefined

    /**
     * Initialize directories and global variables. Must be called
     * before any of other API in Package is used.
     *
     * @param params package parameters
     */
    export function init(params: PackageInitParams): void

    /**
     * This is the function to use if you want to have multiple
     * entry points in one package.
     * You must define a main(ARGV) function inside the passed
     * in module, and then the launcher would be
     *
     * imports.package.init(...);
     * imports.package.run(imports.entrypoint);
     *
     * @param module the module to run
     * @returns the exit code of the module's main() function
     */
    export function run(module: { main: (argv: string[]) => void | number }): number | undefined

    /**
     * shortcut to init+run
     *
     * @param params see init()
     */
    export function start(params: PackageInitParams): void

    /**
     * Mark a dependency on a specific version of one or more
     * external GI typelibs.
     * `libs` must be an object whose keys are a typelib name,
     * and values are the respective version. The empty string
     * indicates any version.
     *
     * @param libs the external dependencies to import
     */
    export function require(libs: Record<string, string>): void

    /**
     * As checkSymbol(), but exit with an error if the
     * dependency cannot be satisfied.
     *
     * @param lib an external dependency to import
     * @param ver version of the dependency
     * @param symbol symbol to check for
     */
    export function requireSymbol(lib: string, ver?: string, symbol?: string): void

    /**
     * Check whether an external GI typelib can be imported
     * and provides @symbol.
     *
     * Symbols may refer to
     *  - global functions         ('main_quit')
     *  - classes                  ('Window')
     *  - class / instance methods ('IconTheme.get_default' / 'IconTheme.has_icon')
     *  - GObject properties       ('Window.default_height')
     *
     * @param lib an external dependency to import
     * @param ver version of the dependency
     * @param symbol symbol to check for
     * @returns true if `lib` can be imported and provides `symbol`, false otherwise
     */
    export function checkSymbol(lib: string, ver?: string, symbol?: string): boolean

    /** Convenience function to initialize gettext for a package. */
    export function initGettext(): void

    /**
     * Modifies String prototype to add a format() method.
     *
     * @deprecated Use JS string interpolation
     */
    export function initFormat(): void

    /**
     * Adds a submodule directory to the search and library paths of the package.
     *
     * @param module submodule to be initialized
     */
    export function initSubmodule(module: string): void
}

export namespace System {
    /**
     * This property contains the name of the script as it was invoked from the command line.
     * In C and other languages, this information is contained in the first element of
     * the platform's equivalent of argv, but GJS's ARGV only contains the
     * subsequent command-line arguments.
     * In other words, ARGV[0] in GJS is the same as argv[1] in C.
     */
    export const programInvocationName: string

    /** This property contains version information about GJS. */
    export const version: number

    /** The full path of the executed program. */
    export const programPath: string | null

    /**
     * A list of arguments passed to the current process.
     * This is effectively an alias for the global ARGV,
     * which is misleading in that it is not equivalent to the platform's argv.
     */
    export const programArgs: string[]

    /**
     * This works the same as C's exit() function; exits the program,
     * passing a certain error code to the shell.
     * The shell expects the error code to be zero if there was no error,
     * or non-zero (any value you please) to indicate an error.
     *
     * @param code An exit code
     */
    export function exit(code: number): void

    /**
     * Return the memory address of any GObject as a string.
     *
     * @param o Any GObject
     * @returns A hexadecimal string (e.g. 0xb4f170f0)
     */
    export function addressOfGObject(o: GObject.Object): string

    /**
     * Return the memory address of any object as a string.
     * This is the address of memory being managed by the JavaScript engine, which may
     * represent a wrapper around memory elsewhere.
     *
     * WARNING:
     *  Don't use this as a unique identifier!
     *  JavaScript's garbage collector can move objects around in memory, or deduplicate
     *  identical objects, so this value may change during the execution of a program.
     *
     * @param o Any Object
     * @returns A hexadecimal string (e.g. 0xb4f170f0)
     */
    export function addressOf(o: object): string

    /** Run the garbage collector. */
    export function gc(): void

    /**
     * Return the reference count of any GObject-derived type.
     * When an object's reference count is zero, it is cleaned up and erased from memory.
     *
     * Note: When the object was already disposed, return 0
     *
     * @param o Any GObject
     * @reutrns reference count of the object
     */
    export function refcount(o: GObject.Object): number

    /**
     * Inserts a breakpoint instruction into the code.
     *
     * WARNING:
     *  Using this function in code run outside of GDB will abort the process
     *
     * With System.breakpoint() calls in your code, a GJS program can be debugged by running it in GDB:
     * ```sh
     * gdb --args gjs script.js
     * ```
     */
    export function breakpoint(): void

    /**
     * Clears the timezone cache.
     *
     * Note:
     *  This is a workaround for SpiderMonkey Bug {@link https://bugzilla.mozilla.org/show_bug.cgi?id=1004706 #1004706}.
     */
    export function clearDateCaches(): void

    /**
     * Dump a representation of internal heap memory.
     * If path is not given, GJS will write the contents to stdout.
     *
     * @param path Optional file path
     */
    export function dumpHeap(path: string): void

    /**
     * Dump internal garbage collector statistics.
     * If path is not given, GJS will write the contents to stdout.
     *
     * @param path Optional file path
     */
    export function dumpMemoryInfo(path: string): void
}

export namespace byteArray {
    export interface ByteArray {
        toGBytes(): GLib.Bytes
        // 'UTF-8'
        toString(encoding?: string): string
    }

    /**
     * Class that wraps an Uint8Array and integrates it with byteArray's toGBytes and toString methods
     * It also dynamically grows the underlying Uint8Array when setting values on out of bounds indices
     */
    export class ByteArray extends Uint8Array {}

    /**
     * Convert a String into a newly constructed Uint8Array
     * Creates a new Uint8Array of the same length as the String,
     * then assigns each Uint8Array entry the corresponding byte value
     * of the String encoded according to the given encoding (or UTF-8 if not given).
     *
     * @param str A string to encode
     * @param encoding Optional encoding of string
     * @returns A new byte array containing the encoded string
     * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode `TextEncoder.encode`} instead.
     */
    export function fromString(str: string, encoding: string): Uint8Array

    /**
     * Converts the Uint8Array into a literal string.
     * The bytes are interpreted according to the given encoding (or UTF-8 if not given).
     * The resulting string is guaranteed to round-trip back into an identical
     * ByteArray by passing the result to ByteArray.fromString().
     *
     * @param byteArray A byte array to decode
     * @param enconding Optional encoding of byteArray
     * @returns A string decoded from the byte array
     * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/decode `TextDecoder.decode`} instead.
     */
    export function toString(byteArray: Uint8Array, enconding?: string): string

    /**
     * Convert a GLib.Bytes instance into a newly constructed Uint8Array.
     * The contents are copied.
     *
     * @param bytes A GLib.Bytes to convert
     * @returns A new byte array containing the bytes of the GLib.Bytes
     * @deprecated Use {@link https://gjs-docs.gnome.org/glib20/glib.bytes#function-to_array `GLib.Bytes.toArray`} instead.
     */
    export function fromGBytes(bytes: GLib.Bytes): Uint8Array

    /**
     * Convert a Uint8Array into a newly constructed GLib.Bytes instance.
     *
     * @param byteArray A byte array to convert
     * @returns A new GLib.Bytes containing the bytes of the byte array
     * @deprecated Use {@link https://gjs-docs.gnome.org/glib20/glib.bytes#function-new `new GLib.Bytes()`} instead.
     */
    export function toGBytes(byteArray: Uint8Array): GLib.Bytes

    /**
     * Convert a number iterable into a newly constructed GLib.Bytes instance.
     *
     * @param array A number iterable to convert to a byte array
     * @returns A new byte array containing the bytes of the number iterable
     */
    export function fromArray(array: Iterable<number>): ByteArray
}

export namespace console {
    /** GJS's REPL implementation */
    export function interact(): void
}

export namespace Lang {
    /**
     * Create a legacy class object
     *
     * @param params: Class parameters
     * @param otherArgs: Other arguments
     * @returns Class constructor
     * @deprecated Use native {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes JavaScript Classes} instead
     */
    export function Class(params: object, ...otherArgs: any[]): Object

    /**
     * Create a legacy class object
     *
     * @param params: Interface parameters
     * @param otherArgs: Other arguments
     * @returns Interface constructor
     * @deprecated Use native {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes JavaScript Classes} instead
     */
    export function Interface(obj: object): Object

    /**
     * Retrieve an Legacy Class object Metaclass
     *
     * @param obj Legacy Class Object
     * @returns Metaclass or null
     * @deprecated Use native {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes JavaScript Classes} instead
     */
    export function getMetaClass(obj: object): null | Object

    /**
     * Binds obj to callback. Makes it possible to refer to "obj"
     * using this within the callback.
     *
     * @param obj obj the object to bind
     * @param callback callback callback to bind obj in
     * @param bindArguments bindArguments additional arguments to the callback
     * @returns Bounded callback
     * @deprecated Use {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind `Function.prototype.bind`} instead
     */
    export function bind<T, R>(
        obj: object,
        callback: (...args: any[]) => any,
        ...bindArguments: any[]
    ): (...args: any[]) => any

    /**
     * Copy all properties from source to dest, including those that are prefixed with an underscore (e.g. _privateFunc()).
     *
     * @param source The source object
     * @param dest The target object
     * @deprecated Use {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign `Object.assign`} instead
     */
    export function copyProperties(source: object, dest: object): void

    /**
     * Copy all public properties from source to dest, excluding those that are prefixed with an underscore (e.g. _privateFunc()).
     *
     * @param source The source object
     * @param dest The target object
     * @deprecated Use {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign `Object.assign`} instead
     */
    export function copyPublicProperties(source: object, dest: object): void

    /**
     * Count the number of properties in an object.
     *
     * @param obj The object to count properties
     * @returns Number of properties
     * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys `Object.keys(obj).length`} instead
     */
    export function countProperties(obj: object): number
}

export namespace gettext {
    // An enumeration of locale categories supported by GJS.
    // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/libgjs-private/gjs-util.c#L32-54
    // https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/libgjs-private/gjs-util.h#L78-88
    export enum LocaleCategory {
        // Character classificatio
        CTYPE,
        // Formatting of nonmonetary numeric values
        NUMERIC,
        // Formatting of date and time values
        TIME,
        // String collation
        COLLATE,
        // Formatting of monetary values
        MONETARY,
        // Localizable natural-language messages
        MESSAGES,
        // All of the locale
        ALL,
    }

    /**
     * Set or query the program's current locale.
     *
     * Note:
     * It is rarely, if ever, necessary to call this function in GJS
     *
     * @param category A locale category
     * @param locale  A locale string, or null to query the locale
     * @returns A locale string, or null if locale is not null
     */
    export function setlocale(category: LocaleCategory, locale: string | null): string

    /**
     * Set the default domain to domainName, which is used in all future gettext calls.
     * Typically this will be the project name or another unique identifier.
     *
     * For example, GNOME Calculator might use something like "gnome-calculator"
     * while a GNOME Shell Extension might use its extension UUID.
     *
     * Note:
     * That this does not affect functions that take an explicit domainName argument, such as Gettext.dgettext().
     *
     * @param domainName A translation domain
     */
    export function textdomain(domainName: string | null): void

    /**
     * Specify dirName as the directory that contains translations for domainName.
     * In most cases, dirName will be the system locale directory, such as /usr/share/locale.
     * GNOME Shell's ExtensionUtils.initTranslations() method, on the other hand,
     * will check an extension's directory for a locale subdirectory before falling back to the system locale directory.
     *
     * @param domainName A translation domain
     * @param dirname  A directory path
     */
    export function bindtextdomain(domainName: string, dirname: string | null): void

    /**
     * This function is a wrapper of dgettext() which does not translate the message
     * if the default domain as set with Gettext.textdomain() has no translations for the current locale.
     *
     * Note:
     * This is equivalent to calling `Gettext.dgettext(null, msgid)`
     *
     * @param msgid A string to translate
     * @returns  A translated message
     */
    export function gettext(msgid: string): string

    /**
     * This function is a wrapper of dgettext() which does not translate the message
     * if the default domain as set with Gettext.textdomain() has no translations for the current locale.
     *
     * @param domainName A translation domain
     * @param msgid A string to translate
     * @returns  A translated message
     */
    export function dgettext(domainName: string | null, msgid: string): string

    /**
     * This is a variant of Gettext.dgettext() that allows specifying a locale category.
     *
     * @param domainName  A translation domain
     * @param msgid A string to translate
     * @param category A locale category
     * @retuns A translated message
     */
    export function dcgettext(domainName: string | null, msgid: string, category: LocaleCategory): string

    /**
     * Translate a string that may or may not be plural, like "I have 1 apple" and "I have 2 apples".
     *
     * In GJS, this should be used in conjunction with Format.vprintf(), which supports the same substitutions as printf()
     *
     * Note: This is equivalent to calling Gettext.dngettext(null, msgid1, msgid2, n)
     *
     * @param msgid The singular form of the string to be translated
     * @param msgid_plural The plural form of the string to be translated
     * @param n The number determining the translation form to use
     * @returns A translated message
     */
    export function ngettext(msgid: string, msgid_plural: string, n: number): string

    /**
     * This function is a wrapper of dngettext() which does not translate the message
     * if the default domain as set with textdomain() has no translations for the current locale.
     *
     * @param domainName A translation domain
     * @param msgid_plural The plural form of the string to be translated
     * @param n The number determining the translation form to use
     * @returns A translated message
     */
    export function dngettext(domainName: string, msgid: string, msgid_plural: string, n: number): string

    /**
     * This is a variant of Gettext.dgettext() which supports a disambiguating message context.
     *
     * This is used to disambiguate a translation where the same word may be used differently,
     * depending on the situation. For example, in English "read" is the same for both past
     * and present tense, but may not be in other languages.
     *
     * Note:
     * This is equivalent to calling `Gettext.dpgettext(null, context, msgid)`
     *
     * @param context A context to disambiguate msgid
     * @param msgid A string to translate
     * @returns A translated message
     */
    export function pgettext(context: string | null, msgid: string): string

    /**
     * This is a variant of Gettext.dgettext() which supports a disambiguating message context.
     *
     * Note:
     * This is an alias for `GLib.dpgettext2()`
     *
     * @param domainName A translation domain
     * @param context A context to disambiguate msgid
     * @param msgid A string to translate
     * @returns A translated message
     */
    export function dpgettext(domainName: string | null, context: string | null, msgid: string): string

    /**
     * Create an object with bindings for `Gettext.gettext()`, `Gettext.ngettext()` and
     * `Gettext.pgettext()`, bound to a domainName.
     *
     * @param domainName A domain name
     * @returns An object with common gettext methods bound to a domainName
     */
    export function domain(domainName: string): {
        gettext: (msgid: string) => string
        ngettext: (msgid: string, msgid_plural: string, n: number) => string
        pgettext: (context: string | null, msgid: string) => string
    }
}

export namespace Format {
    /**
     * Substitute the specifiers in fmt with args and return a new string.
     * It supports the %s, %d, %x and %f specifiers.
     *
     * For %f it also supports precisions like vprintf('%.2f', [1.526]).
     * All specifiers can be prefixed with a minimum field width
     * E.g. vprintf('%5s', ['foo'])).
     * Unless the width is prefixed with '0', the formatted string will be padded with spaces.
     *
     * @param str A format template
     * @param args Formatting substitutions
     * @returns Formatted string
     * @deprecated Prefer {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals template literals} when possible
     */
    export function vprintf(str: string, args: string[]): string

    /**
     * Substitute the specifiers in fmt with args and print the result to stdout.
     *
     * @param fmt A format template
     * @param args Formatting substitutions
     * @deprecated Use {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals template literals} with print() instead
     */
    export function printf(fmt: string, ...args: any[]): void

    /**
     * This function is intended to extend the String object and provide
     * an String.format API for string formatting.
     *
     * It has to be set up using:
     * ```js
     * String.prototype.format = Format.format;
     * ```
     *
     * Usage:
     * ```js
     * "somestring %s %d".format('hello', 5);
     * ```
     *
     * @param fmt A new formatted string
     * @param args Formatting substitutions
     * @returns Formatted string
     * @deprecated Use {@link vprintf} instead
     */
    export function format(fmt: string, ...args: any[]): string
}

export namespace Mainloop {
    /**
     * Adds a function to be called whenever there are no higher priority events pending.
     *
     * If the function returns false it is automatically removed from the list of event sources and will not be called again.
     * If not given, priority defaults to GLib.PRIORITY_DEFAULT_IDLE.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.idle_add
     *
     * @param handler The function to call
     * @param priority Optional priority
     * @returns  The newly-created idle source
     */
    export function idle_add(handler: (...args: any[]) => any, priority?: number): GLib.Source

    /**
     * Creates a new idle source.
     *
     * If not given, priority defaults to GLib.PRIORITY_DEFAULT_IDLE.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.idle_source_new
     *
     * @param handler The function to call
     * @param priority Optional priority
     * @returns  The newly-created idle source
     */
    export function idle_source(handler: (...args: any[]) => any, priority?: number): GLib.Source

    /**
     * Stops a main loop from running. Any calls to Mainloop.run(name) for the loop will return.
     *
     * If name is given, this function will create a new GLib.MainLoop if necessary.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.mainloop#method-quit
     *
     * @param name Optional name
     */
    export function quit(name: string): void

    /**
     * Runs a main loop until Mainloop.quit() is called on the loop.
     *
     * If name is given, this function will create a new GLib.MainLoop if necessary.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.mainloop#method-run
     *
     * @param name Optional name
     */
    export function run(name: string): void

    /**
     * Removes the source with the given ID from the default main context.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.source#function-remove
     *
     * @param id The ID of the source to remove
     * @returns  For historical reasons, this function always returns true
     */
    export function source_remove(id: number): boolean

    /**
     * Sets a function to be called at regular intervals, with the given priority.
     * The function is called repeatedly until it returns false,
     * at which point the timeout is automatically destroyed and the function will not be called again.
     *
     * The scheduling granularity/accuracy of this source will be in milliseconds.
     * If not given, priority defaults to GLib.PRIORITY_DEFAULT.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.timeout_add
     *
     * @param timeout The timeout interval in milliseconds
     * @param handler The function to call
     * @param priority Optional priority
     * @returns The newly-created timeout source
     */
    export function timeout_add(timeout: number, handler: (...args: any[]) => any, priority?: number): GLib.Source

    /**
     * Sets a function to be called at regular intervals, with the given priority.
     * The function is called repeatedly until it returns false,
     * at which point the timeout is automatically destroyed and the function will not be called again.
     *
     * The scheduling granularity/accuracy of this source will be in seconds.
     * If not given, priority defaults to GLib.PRIORITY_DEFAULT.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.timeout_add_seconds
     *
     * @param timeout The timeout interval in seconds
     * @param handler The function to call
     * @param priority Optional priority
     * @returns The newly-created timeout source
     */
    export function timeout_add_seconds(
        timeout: number,
        handler: (...args: any[]) => any,
        priority?: number,
    ): GLib.Source

    /**
     * Creates a new timeout source.
     *
     * The scheduling granularity/accuracy of this source will be in milliseconds.
     * If not given, priority defaults to GLib.PRIORITY_DEFAULT.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.timeout_source_new
     *
     * @param timeout The timeout interval in milliseconds
     * @param handler The function to call
     * @param priority Optional priority
     * @returns The newly-created timeout source
     */
    export function timeout_source(timeout: number, handler: (...args: any[]) => any, priority?: number): GLib.Source

    /**
     * Creates a new timeout source.
     *
     * The scheduling granularity/accuracy of this source will be in seconds.
     * If not given, priority defaults to GLib.PRIORITY_DEFAULT.
     *
     * @see https://gjs-docs.gnome.org/glib20/glib.timeout_source_new_seconds
     *
     * @param timeout The timeout interval in seconds
     * @param handler The function to call
     * @param priority Optional priority
     * @returns The newly-created timeout source
     */
    export function timeout_seconds_source(
        timeout: number,
        handler: (...args: any[]) => any,
        priority?: number,
    ): GLib.Source
}

export namespace Signals {
    interface WithSignals {
        /**
         * Connects a callback to a signal for an object.
         * Pass the returned ID to disconect() to remove the handler.
         * If callback returns true, emission will stop and no other handlers will be invoked.
         *
         * Warning:
         * Unlike GObject signals, this within a signal callback will always refer to the global object (ie. globalThis).
         *
         * @param name A signal name
         * @param callback A callback function
         * @returns A signal id
         */
        connect(name: string, callback: (...args: any[]) => any): number

        /**
         * Disconnects a handler for a signal.
         *
         * @param id A signal id
         */
        disconnect(id: number): void

        /**
         * Emits a signal for an object. Emission stops if a signal handler returns true.
         * Unlike GObject signals, it is not necessary to declare signals or define their signature.
         * Simply call emit() with whatever signal name you wish, with whatever arguments you wish.
         *
         * @param name A signal name
         * @param args Any number of arguments, of any type
         */
        emit(name: string, ...args): void

        /**
         * Checks if a handler ID is connected.
         *
         * @param id The ID of the handler to be disconnected
         * @returns true if connected, or false if not
         */
        signalHandlerIsConnected(id: number): boolean

        /** Disconnects all signal handlers for an object. */
        disconnectAll(): void
    }

    /**
     * Applies the Signals convenience methods to an Object.
     * Generally, this is called on an object prototype, but may also be called on an
     * object instance.
     *
     * @param proto The prototype to add the signal methods
     */
    export function addSignalMethods(proto: object): void
}

/**
 * TODO: Tweener
 * @see https://gitlab.gnome.org/GNOME/gjs/-/tree/1.72.3/modules/script/tweener
 * @deprecated
 */
export namespace Tweener {}

/**
 * TODO: jsUnit
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/master/modules/script/jsUnit.js
 * @deprecated Use {@link https://github.com/ptomato/jasmine-gjs Jasmine GJ}
 */
export namespace jsUnit {}
