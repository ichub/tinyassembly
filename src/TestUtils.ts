export function loadVirtualDOM() {
    var jsdom = require('jsdom').jsdom;

    var exposedProperties = ['window', 'navigator', 'document'];

    global.document = jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
    process.env.NODE_ENV = 'production';
    Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
            exposedProperties.push(property);
            global[property] = document.defaultView[property];
        }
    });

    global.navigator = {
        // spoof this to not get react warnings about onscroll and such
        userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    };
}
