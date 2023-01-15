<% if(moduleType === 'esm') { %>
export const gi = globalThis.imports.gi;
export const byteArray = globalThis.imports.byteArray;
export const Lang = globalThis.imports.lang;
export const Format = globalThis.imports.format;
export const Mainloop = globalThis.imports.mainloop;
export const gettext = globalThis.imports.gettext;
export const System = globalThis.imports.system;
export const Signals = globalThis.imports.signals;
export const Package = globalThis.imports.package;
<% } else { %>  
module.exports = {
    gi: globalThis.imports.gi,
    byteArray: globalThis.imports.byteArray,
    Lang: globalThis.imports.lang,
    Format: globalThis.imports.format,
    Mainloop: globalThis.imports.mainloop,
    gettext: globalThis.imports.gettext,
    System: globalThis.imports.system,
    Signals: globalThis.imports.signals,
    Package: globalThis.imports.package
}
<% } %>

export default globalThis.imports || {}
