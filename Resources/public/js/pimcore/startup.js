pimcore.registerNS("pimcore.plugin.ObjectsWithCsvBundle");

pimcore.plugin.ObjectsWithCsvBundle = Class.create(pimcore.plugin.admin, {
    getClassName: function () {
        return "pimcore.plugin.ObjectsWithCsvBundle";
    },

    initialize: function () {
        pimcore.plugin.broker.registerPlugin(this);
    },

    pimcoreReady: function (params, broker) {
        // alert("ObjectsWithCsvBundle ready!");
    }
});

var ObjectsWithCsvBundlePlugin = new pimcore.plugin.ObjectsWithCsvBundle();
