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

pimcore.objectsWithCsv.helpers.showPrettyMessage = function (type, title, text, errorText, detailText) {
    // types: info,error,success
    if (detailText) {
        detailText =
            '<pre style="font-size:11px;word-wrap: break-word;">'
            + detailText +
            "</pre>";
    }

    var errWin = new Ext.Window({
        modal: true,
        iconCls: "pimcore_icon_" + type,
        title: title,
        width: 700,
        maxHeight: 500,
        html: text + '<br>' + errorText,
        autoScroll: true,
        bodyStyle: "padding: 10px;",
        buttonAlign: "center",
        shadow: false,
        closable: false,
        buttons: [{
            text: t("details"),
            hidden: !detailText,
            handler: function () {
                errWin.close();

                var detailWindow = new Ext.Window({
                    modal: true,
                    title: t('details'),
                    width: 1000,
                    height: '95%',
                    html: detailText,
                    autoScroll: true,
                    bodyStyle: "padding: 10px;",
                    buttonAlign: "center",
                    shadow: false,
                    closable: true,
                    buttons: [{
                        text: t("OK"),
                        handler: function () {
                            detailWindow.close();
                        }
                    }]
                });
                detailWindow.show();
            }
        }, {
            text: t("OK"),
            handler: function () {
                errWin.close();
            }
        }]
    });
    errWin.show();

};

pimcore.objectsWithCsv.helpers.addCsrfTokenToUrl = function (url) {

    // only for /admin urls
    if(url.indexOf('/admin') !== 0) {
        return url;
    }

    if (url.indexOf('?') === -1) {
        url = url + "?";
    } else {
        url = url + "&";
    }
    url = url + 'csrfToken=' + pimcore.settings['csrfToken'];

    return url;
};