// <% if(useNamespace){ %>
// import GLib from './GLib-2.0.js';
// <% } else { %>
import * as GLib from './GLib-2.0'
// <% } %>

/**
 * GJS implements the {@link https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers WHATWG Timers} specification,
 * with some changes to accommodate the GLib event loop.
 *
 * In particular, the returned value of `setInterval()` and `setTimeout()` is not a `Number`, but a {@link GLib.Source}.
 *
 * @since Gjs 1.71.1
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Timers.md
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_timers.js
 */
export namespace Timers {
    /**
     * Schedules a timeout to run `handler` after `timeout` milliseconds.
     * Any `arguments` are passed straight through to the `handler`.
     * @since Gjs 1.71.1
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Timers.md#settimeouthandler-timeout-arguments
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_timers.js#L62-86
     *
     * @param handler The callback to invoke
     * @param timeout Timeout in milliseconds
     * @param args Arguments to pass to handler
     */
    export function setTimeout(handler: (...args: any[]) => any, timeout?: number, ...args: any[]): GLib.Source

    /**
     * Schedules a `timeout` to run `handler` every `timeout` milliseconds.
     * Any `arguments` are passed straight through to the `handler`.
     * @since Gjs 1.71.1
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Timers.md#setintervalhandler-timeout-arguments
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_timers.js#L88-111
     * 
     * @param handler the callback to invoke
     * @param timeout interval in milliseconds
     * @param args arguments to pass to `handler`
     * @returns The identifier of the repeated action
     */
    export function setInterval(handler: (...args: any[]) => any, timeout?: number, ...args: any[]): GLib.Source

    /**
     * Cancels the timeout set with {@link setTimeout} identified by `id`.
     * @since Gjs 1.71.1
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Timers.md#cleartimeoutid
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_timers.js#L126-131
     *
     * @param id the identifier of the timeout you want to cancel.
     */
    export function clearTimeout(id: GLib.Source): void

    /**
     * Cancels the timeout set with {@link setInterval} identified by `id`.
     * @since Gjs 1.71.1
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Timers.md#clearintervalid
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_timers.js#L133-138
     * 
     * @param id the identifier of the interval you want to cancel.
     */
    export function clearInterval(id: GLib.Source): void
}

/**
 * GJS implements the {@link https://console.spec.whatwg.org WHATWG Console} specification, with some changes to accommodate GLib.
 *
 * In particular, log severity is mapped to {@link GLib.LogLevelFlags} and some methods are not implemented:
 *  - `console.profile()`
 *  - `console.profileEnd()`
 *  - `console.timeStamp()`
 *
 * @since Gjs 1.69.2
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js
 */
export interface Console {
    /**
     * Logs a critical message if the condition is not truthy.
     * See {@link error|`console.error`} for additional information.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoleassertcondition-data
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L116-141
     *
     * @param condition A boolean condition which, if false, causes the log to print
     * @param data Formatting substitutions, if applicable
     */
    assert(condition?: boolean, ...data: any[]): void

    /**
     * Resets grouping and clears the terminal on systems supporting ANSI
     * terminal control sequences.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoleclear
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L143-155
     *
     * In file-based stdout or systems which do not support clearing,
     * {@link clear|`console.clear`} has no visual effect.
     */
    clear(): void

    /**
     * Logs a message with severity equal to {@link GLib.LogLevelFlags.DEBUG}.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoledebugdata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L157-164
     *
     * @param data Formatting substitutions, if applicable
     */
    debug(...data: any[]): void

    /**
     * Logs a message with severity equal to {@link GLib.LogLevelFlags.CRITICAL}.
     * Does not use {@link GLib.LogLevelFlags.ERROR} to avoid asserting and
     * forcibly shutting down the application.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoleerrordata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L166-175
     *
     * @param data Formatting substitutions, if applicable
     */
    error(...data: any[]): void

    /**
     * Logs a message with severity equal to {@link GLib.LogLevelFlags.INFO}.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoleinfodata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L177-184
     *
     * @param data formatting substitutions, if applicable
     */
    info(...data: any[]): void

    /**
     * Logs a message with severity equal to {@link GLib.LogLevelFlags.MESSAGE}.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolelogdata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L186-193
     *
     * @param data formatting substitutions, if applicable
     */
    log(...data: any[]): void

    /**
     * This is an alias for {@link log|`console.log`} in GJS.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoletabletabulardata-options
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L195-198
     *
     * @param tabularData data to be displayed in a table format
     * @param _properties ignored
     */
    table(tabularData: any, _properties?: never): void

    /**
     * Outputs a stack trace to the console.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoletracedata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L200-214
     *
     * @param data formatting substitutions, if applicable
     */
    trace(...data: any[]): void

    /**
     * Logs a message with severity equal to {@link GLib.LogLevelFlags.LEVEL_WARNING}.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolewarndata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L216-223
     *
     * @param data formatting substitutions, if applicable
     */
    warn(...data: any[]): void

    /**
     * Resurively display all properties of `item`.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolediritem-options
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L225-234
     *
     * @param item an item to format generically
     * @param options any additional options for the formatter. Unused in our implementation.
     */
    dir(item?: object, options?: never): void

    /**
     * This is an alias for {@link log|`console.log`} in GJS
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoledirxmldata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L236-242
     *
     * @param data formatting substitutions, if applicable
     */
    dirxml(...data: any[]): void

    // 1.2 Counting functions
    // https://console.spec.whatwg.org/#counting

    /**
     * Logs how many times {@link count|`console.count`} has been called with a given `label`.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolecountlabel
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L247-261
     *
     * See {@link countReset|`console.countReset`} for resetting a count.
     *
     * @param label Optional label
     */
    count(label?: string): void

    /**
     * Resets a counter used with {@link count|`console.count`}.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolecountresetlabel
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L263-276
     *
     * @param label The unique label to reset the count for
     */
    countReset(label: string): void

    // 1.3 Grouping functions
    // https://console.spec.whatwg.org/#grouping

    /**
     * Creates a new inline group in the console log,
     * causing any subsequent console messages to be indented by an additional level,
     * until {@link groupEnd|`console.groupEnd`} is called.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolegroupdata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L281-291
     *
     * @param data Formatting substitutions, if applicable
     */
    group(...data: any[]): void

    /**
     * Alias for {@link group|`console.group`}.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolegroupcollapseddata
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L293-303
     *
     * @param data Formatting substitutions, if applicable
     */
    groupCollapsed(...data: any[]): void

    /**
     * Exits the current inline group in the console log.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consolegroupend
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L305-310
     */
    groupEnd(): void

    // 1.4 Timing functions
    // https://console.spec.whatwg.org/#timing

    /**
     * Starts a timer you can use to track how long an operation takes.
     * You give each timer a unique name.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoletimelabel
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L315-322
     *
     * @param label unique identifier for this action, pass to
     *   {@link timeEnd|`console.timeEnd`} to complete
     */
    time(label?: string): void

    /**
     * Logs the time since the last call to {@link time|`console.time`} to complete where `label` is the same.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoletimeloglabel
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L324-349
     *
     * @param label unique identifier for this action, pass to
     *   {@link timeEnd|`console.timeEnd`} to complete
     * @param data string substitutions, if applicable
     */
    timeLog(label?: string, ...data: any[]): void

    /**
     * Logs the time since the last call to {@link time|`console.time`} and completes the action.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Console.md#consoletimeendlabel
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L351-375
     *
     * Call {@link time|`console.time`} again to re-measure.
     *
     * @param label unique identifier for this action
     */
    timeEnd(label?: string): void

    // Non-standard functions which are de-facto standards.
    // Similar to Node, we define these as no-ops for now.

    /**
     * @deprecated Not implemented in GJS
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L380-387
     *
     * @param _label unique identifier for this action
     */
    profile(_label?: string): void

    /**
     * @deprecated Not implemented in GJS
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L389-395
     *
     * @param _label unique identifier for this action
     */
    profileEnd(_label?: string): void

    /**
     * @deprecated Not implemented in GJS
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L397-403
     *
     * @param _label unique identifier for this action
     */
    timeStamp(_label?: string): void

    // GJS-specific extensions for integrating with GLib structured logging

    /**
     * Current log domain used for subsequent console messages.
     * Defaults to 'Gjs-Console'
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L416-421
     */
     readonly logDomain: string

    /**
     * Sets the log domain to use for subsequent console messages.
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/console.js#L407-414
     *
     * Defaults to 'Gjs-Console'.
     *
     * @param logDomain the GLib log domain this Console should print with.
     */
    setLogDomain(logDomain: string): void
}

/**
 * GJS implements the {@link https://encoding.spec.whatwg.org WHATWG Encoding} specification.
 *
 * The {@link Encoding.TextDecoder|`TextDecoder`} interface represents a decoder for a specific text encoding,
 * such as `UTF-8`, `ISO-8859-2`, `KOI8-R`, `GBK`, etc.
 * A decoder takes a list of bytes as input and emits a list of code points.
 *
 * The {@link Encoding.TextEncoder|`TextEncoder`} interface takes a list of code points as input and emits a list of `UTF-8` bytes.
 *
 * @since Gjs 1.69.2
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Encoding.md
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js
 * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/gjs/text-encoding.cpp
 */
export namespace Encoding {
    export interface TextDecodeOptions {
        /** Stream mode is not supported yet. */
        stream?: false
    }

    export interface TextDecoderOptions {
        /** Indicates whether to throw or substitute when invalid characters are encountered. */
        fatal?: boolean
        /** Indicates whether to ignore the byte order for UTF-8 arrays. */
        ignoreBOM?: boolean
    }

    export interface TextEncoderEncodeIntoResult {
        /**
         * The number of `UTF-16` units of code from the source that has been converted over to `UTF-8`.
         * This may be less than {@link String.length|`String.length`} if {@link Uint8Array|`Uint8Array`} did not have enough space.
         */
        read?: number
        /**
         * The number of bytes modified in the destination {@link Uint8Array|`Uint8Array`}.
         * The bytes written are guaranteed to form complete `UTF-8` byte sequences.
         */
        written?: number
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.75.1/modules/esm/_encoding/encodingMap.js */
    export type TextDecoderEncoding =
        | 'l2'     | 'latin5'   | 'x-cp1254'   | 'iso-ir-127'  | 'windows-31j'
        | 'l3'     | 'cp1255'   | 'x-cp1255'   | 'iso_8859-6'  | 'windows-949'
        | 'l4'     | 'cp1256'   | 'x-cp1256'   | 'iso-ir-126'  | 'unicodefffe'
        | 'l6'     | 'cp1257'   | 'x-cp1257'   | 'iso_8859-7'  | 'unicodefeff'
        | 'l9'     | 'cp1258'   | 'x-cp1258'   | 'iso-ir-138'  | 'iso-8859-8-i'
        | 'l1'     | 'gb2312'   | 'csgb2312'   | 'iso_8859-8'  | 'windows-1250'
        | 'l5'     | 'csbig5'   | 'x-x-big5'   | 'iso-ir-157'  | 'windows-1251'
        | 'gbk'    | 'x-sjis'   | 'x-euc-jp'   | 'iso8859-10'  | 'windows-1252'
        | '866'    | 'korean'   | 'ms_kanji'   | 'iso8859-13'  | 'windows-1253'
        | 'koi'    | 'utf-16'   | 'ksc_5601'   | 'iso8859-14'  | 'windows-1254'
        | 'mac'    | 'gb18030'  | 'macintosh'  | 'iso8859-15'  | 'windows-1255'
        | 'big5'   | 'logical'  | 'shift_jis'  | 'iso8859-11'  | 'windows-1256'
        | 'utf8'   | 'cskoi8r'  | 'iso8859-2'  | 'iso-8859-1'  | 'windows-1257'
        | 'koi8'   | 'koi8-ru'  | 'iso8859-3'  | 'iso-ir-100'  | 'windows-1258'
        | 'sjis'   | 'dos-874'  | 'iso8859-4'  | 'iso_8859-1'  | 'iso-8859-6-e'
        | 'utf-8'  | 'tis-620'  | 'iso8859-5'  | 'iso-8859-9'  | 'iso-8859-6-i'
        | 'cp866'  | 'chinese'  | 'iso8859-6'  | 'iso-ir-148'  | 'sun_eu_greek'
        | 'greek'  | 'gb_2312'  | 'iso8859-7'  | 'iso_8859-9'  | 'iso-8859-8-e'
        | 'ascii'  | 'cn-big5'  | 'iso8859-8'  | 'gb_2312-80'  | 'unicode11utf8'
        | 'cp819'  | 'cseuckr'  | 'iso885910'  | 'csshiftjis'  | 'unicode20utf8'
        | 'x-gbk'  | 'ksc5601'  | 'iso885913'  | 'iso-ir-149'  | 'csksc56011987'
        | 'ms932'  | 'unicode'  | 'iso885914'  | 'iso-8859-10' | 'x-mac-cyrillic'
        | 'ucs-2'  | 'utf-16be' | 'iso885915'  | 'iso-8859-13' | 'ansi_x3.4-1968'
        | 'ibm866' | 'utf-16le' | 'iso885911'  | 'iso-8859-14' | 'ks_c_5601-1987'
        | 'koi8-r' | 'csibm866' | 'iso8859-1'  | 'iso-8859-15' | 'ks_c_5601-1989'
        | 'koi8-u' | 'iso88592' | 'iso8859-9'  | 'iso-8859-16' | 'x-unicode20utf8'
        | 'euc-jp' | 'iso88593' | 'iso-ir-58'  | 'windows-874' | 'iso_8859-2:1987'
        | 'euc-kr' | 'iso88594' | 'shift-jis'  | 'iso-2022-jp' | 'iso_8859-3:1988'
        | 'latin2' | 'cyrillic' | 'csunicode'  | 'csisolatin2' | 'iso_8859-4:1988'
        | 'latin3' | 'iso88595' | 'iso-8859-2' | 'csisolatin3' | 'iso_8859-5:1988'
        | 'latin4' | 'asmo-708' | 'iso-8859-3' | 'csisolatin4' | 'iso_8859-6:1987'
        | 'arabic' | 'ecma-114' | 'iso-8859-4' | 'csiso88596e' | 'csisolatingreek'
        | 'greek8' | 'iso88596' | 'iso-8859-5' | 'csiso88596i' | 'iso_8859-7:1987'
        | 'hebrew' | 'ecma-118' | 'iso-8859-6' | 'csiso88598e' | 'iso_8859-8:1988'
        | 'visual' | 'elot_928' | 'iso-8859-7' | 'csiso88598i' | 'iso_8859-1:1987'
        | 'latin6' | 'iso88597' | 'iso-8859-8' | 'csisolatin6' | 'iso_8859-9:1989'
        | 'koi8_r' | 'iso88598' | 'iso-ir-101' | 'csisolatin9' | 'x-mac-ukrainian'
        | 'cp1250' | 'x-cp1250' | 'iso_8859-2' | 'iso_8859-15' | 'csiso58gb231280'
        | 'cp1251' | 'x-cp1251' | 'iso-ir-109' | 'csmacintosh' | 'iso-10646-ucs-2'
        | 'cp1252' | 'iso88591' | 'iso_8859-3' | 'x-mac-roman' | 'csisolatinarabic'
        | 'ibm819' | 'us-ascii' | 'iso-ir-110' | 'iso-8859-11' | 'csisolatinhebrew'
        | 'latin1' | 'x-cp1252' | 'iso_8859-4' | 'csisolatin1' | 'unicode-1-1-utf-8'
        | 'cp1253' | 'x-cp1253' | 'iso-ir-144' | 'csisolatin5' | 'csisolatincyrillic'
        | 'cp1254' | 'iso88599' | 'iso_8859-5' | 'csiso2022jp' | 'cseucpkdfmtjapanese'

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js#L135-153 */
    export interface TextEncoder {
        /**
         * A `string` containing the name of the decoding algorithm used by the specific decoder.
         * @since Gjs 1.69.2
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Encoding.md#textencoderencoding
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js#L140-142
         * 
         * It can only have the following value: `utf-8`.
         */
        readonly encoding: 'utf-8'

        /**
         * Takes a `string` as input, and returns a {@link Uint8Array|`Uint8Array`} containing
         * the text given in parameters encoded with the specific method for that TextEncoder object.
         * @since Gjs 1.69.2
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Encoding.md#textencoderencodestring
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js#L144-147
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/gjs/text-encoding.cpp#L521-538
         *
         * @param input A string containing the text to encode
         * @returns  A {@link Uint8Array|`Uint8Array`} object containing UTF-8 encoded text
         */
        encode(input?: string): Uint8Array

        /**
         * Takes a `string` to encode and a destination {@link Uint8Array|`Uint8Array`} to put
         * resulting `UTF-8` encoded text into, and returns a dictionary object indicating the
         * progress of the encoding.
         * @since Gjs 1.69.2
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Encoding.md#textencoderencodeintoinput-output
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js#L149-152
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/gjs/text-encoding.cpp#L540-550
         * 
         * Note:
         *  This is potentially more performant than the {@link encode|`TextEncoder.encode`} method
         *
         * @param source Text to encode.
         * @param destination Buffer to place the resulting UTF-8 encoded text into.
         * @returns An object containing the number of UTF-16 units read and bytes written.
         */
        encodeInto(source: string, destination: Uint8Array): TextEncoderEncodeIntoResult
    }

    /**
     * Represents an encoder for a `UTF-8`.
     * It takes a stream of code points as input and emits a stream of bytes.
     *
     * @since Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Encoding.md#textencoder
     */
    export class TextEncoder {
        /** Returns a newly created {@link TextEncoder|`TextEncoder`}. */
        constructor()
    }

    /** @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js#L8-133 */
    export interface TextDecoder {
        /**
         * A `string` containing the name of the decoding algorithm used by the specific decoder.
         * @since Gjs 1.69.2
         */
        readonly encoding: TextDecoderEncoding
        /**
         * A `boolean` indicating whether the error mode is fatal.
         * @since Gjs 1.69.2
         * 
         * If this value is `true` the processed text cannot be decoded because of malformed data.
         * If this value is `false` malformed data is replaced with placeholder characters.
         */
        readonly fatal: boolean
        /**
         * A `boolean` indicating whether the byte order mark is ignored.
         * @since Gjs 1.69.2
         */
        readonly ignoreBOM: boolean

        /**
         * Returns a string containing the text, given in parameters,
         * decoded with the specific method for that {@link TextDecoder|`TextDecoder`} object.
         * @since Gjs 1.69.2
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Encoding.md#textdecoderdecodebuffer-options
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js#L83-132
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/gjs/text-encoding.cpp#L356-377
         *
         * @param buffer Buffer containing the text to decode
         * @param options Object defining the decode options
         * @throws TypeError When the error mode is `fatal` and the encoder method encounter an error
         */
        decode(buffer?: ArrayBufferView | ArrayBuffer, options?: TextDecodeOptions): string
    }

    /**
     * Represents a decoder for a specific text encoding.
     * It takes a stream of bytes as input and emits a stream of code points.
     *
     * @version Gjs 1.69.2
     * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.74.0/doc/Encoding.md#textdecoderutflabel-options
     */
    export class TextDecoder {
        /**
         * Returns a newly created {@link TextDecoder|`TextDecoder`} object for the encoding specified in parameter.
         * @version Gjs 1.69.2
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/esm/_encoding/encoding.js#L34-81
         *
         * @param utfLabel The label of the encoding to use. Defaults to 'utf-8'.
         * @param options Object defining the decode options.
         * @throws RangeError When the encoding is unknown or is one of the two values leading to a
         *    'replacement' decoding algorithm ("iso-2022-cn" or "iso-2022-cn-ext")
         */
        constructor(utfLabel?: TextDecoderEncoding, options?: TextDecoderOptions)
    }
}
