declare global {
    interface Error {
        /**
         * Small HACK: we add a matches() method to standard Errors so that
         * you can do `if (e.matches(Ns.FooError, Ns.FooError.SOME_CODE))`
         * without checking instanceof
         * @see https://gitlab.gnome.org/GNOME/gjs/-/blob/1.72.3/modules/core/overrides/GLib.js#L270-275
         * 
         * @param domain Error domain
         * @param code Error code
         */
        matches(domain: Quark, code: number): boolean
    }
}
