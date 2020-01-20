pimcore.registerNS('pimcore.object.classes.data.objectsWithCsv');
pimcore.object.classes.data.objectsWithCsv = Class.create(pimcore.object.classes.data.manyToManyObjectRelation, {
    type: 'objectsWithCsv',

    initialize: function (treeNode, initData) {
        this.type = "objectsWithCsv";

        this.initData(initData);

        if (typeof this.datax.lazyLoading == "undefined") {
            this.datax.lazyLoading = true;
        }

        pimcore.helpers.sanitizeAllowedTypes(this.datax, "classes");
        // overwrite default settings
        this.availableSettingsFields = ["name","title","tooltip","mandatory","noteditable","invisible",
            "visibleGridView","visibleSearch","style"];

        this.treeNode = treeNode;
    },

    /**
     * @returns {string}
     */
    getGroup: function () {
        return "relation";
    },
    /**
     * @returns {string}
     */
    getTypeName: function () {
        return t("objectsWithCsv");
    },
    /**
     * @returns {string}
     */
    getIconClass: function () {
        return "pimcore_icon_manyToManyObjectRelation";
    }


});