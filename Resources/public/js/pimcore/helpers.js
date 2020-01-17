pimcore.registerNS("pimcore.objectsWithCsv.helpers.x");

pimcore.objectsWithCsv.helpers.listify = function (data, textTobeAttached = null , prepend = true) {
    var response = '';
    if (textTobeAttached && textTobeAttached !== undefined && prepend) {
        response = textTobeAttached;
        response += '<br>';
    }

    if (typeof data === "object") {
        response += '<ul>';
        Object.values(data).map(function(record){
            response += '<li>' + record + '</li>';
        });
        response += '</ul>';
    }

    // !prepend -> append
    if (!prepend) {
        response += '<br>';
        response += textTobeAttached;
    }

    return response
};

pimcore.objectsWithCsv.helpers.showPrettyMessage = function (type, title, text, errorText, stack, code) {
    // types: info,error,success
    if (errorText != null && errorText != undefined) {
        if (t(errorText) != "~" + errorText + "~") {
            errorText = t(errorText);
        }

        text = text + '<br /><hr />' +
            '<span style="font-size:12px">'
            + '<b>' + errorText + '</b>' +
            "</span>";

    }
    if (stack) {
        stack = str_replace("#", "<br>#", stack);
        var htmlValue = '<a href="#">' + t("details") + '</a>';
        var detailedInfo = {
            xtype: "displayfield",
            readOnly: true,
            value: htmlValue,
            width: 300,
            listeners: {
                render: function (c) {
                    c.getEl().on('click', function () {
                        var detailedWindow = new Ext.Window({
                            modal: true,
                            title: t('details'),
                            width: 1000,
                            height: 600,
                            html: stack,
                            autoScroll: true,
                            bodyStyle: "padding: 10px; background:#fff;",
                            buttonAlign: "center",
                            shadow: false,
                            closable: true,
                            buttons: [{
                                text: t("OK"),
                                handler: function () {
                                    detailedWindow.close();
                                }
                            }]
                        });
                        detailedWindow.show();
                    }, c);
                }.bind(this)
            }
        };
    }

    if (code) {
        title = title + " " + code;
    }
    var errWin = new Ext.Window({
        modal: true,
        iconCls: 'pimcore_icon_' + type,
        title: title,
        width: 600,

        layout: 'vbox',
        items: [
            {
                xtype: 'panel',
                html: text,
                width: '100%'
            },
            detailedInfo
        ],
        autoScroll: true,
        bodyStyle: "padding: 10px; background:#fff;",
        buttonAlign: "center",
        shadow: false,
        closable: false,
        buttons: [{
            text: "OK",
            handler: function () {
                errWin.close();
            }
        }]
    });
    errWin.show();

};