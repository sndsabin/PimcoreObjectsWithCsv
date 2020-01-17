pimcore.registerNS('pimcore.object.tags.objectsWithCsv');
pimcore.object.tags.objectsWithCsv = Class.create(pimcore.object.tags.objects, {
    type: "objectsWithCsv",
    getEditToolbarItems: function () {
        var toolbarItems = [
            {
                xtype: "tbspacer",
                width: 20,
                height: 16,
                cls: "pimcore_icon_droptarget"
            },
            {
                xtype: "tbtext",
                text: "<b>" + this.fieldConfig.title + "</b>"
            },
            "->",
            {
                xtype: "button",
                iconCls: "pimcore_icon_delete",
                handler: this.empty.bind(this)
            },
            {
                xtype: "button",
                icon: '/bundles/objectswithcsv/img/csv-import.svg',
                handler: function () {
                    var objRef = this;
                    var uploadWindowCompatible = new Ext.Window({
                        autoHeight: true,
                        title: t('upload'),
                        closeAction: 'close',
                        width: 400,
                        modal: true
                    });

                    var url = '/admin/objects-with-csv/parse';
                    url = pimcore.helpers.addCsrfTokenToUrl(url);
                    
                    var allowedClass = '';

                    this.fieldConfig.classes.forEach(function (data) {
                        allowedClass += data.classes;
                        allowedClass += ','
                    });


                    var uploadForm = new Ext.form.FormPanel({
                        fileUpload: true,
                        width: 500,
                        bodyStyle: 'padding: 10px;',
                        items: [
                            {
                            xtype: 'fileuploadfield',
                            emptyText: t("select_a_file"),
                            fieldLabel: t("file"),
                            width: 470,
                            name: 'csv-upload',
                            buttonText: "Upload Csv",
                            buttonConfig: {
                                iconCls: 'pimcore_icon_upload'
                            },
                            listeners: {
                                change: function () {
                                    uploadForm.getForm().submit({
                                        url: url,
                                        params: {
                                            allowedClass: allowedClass
                                        },
                                        method: 'POST',
                                        waitMsg: t("please_wait"),
                                        success: function (el, res) {

                                            var objData = Ext.decode(res.response.responseText)['data'];

                                            objRef.addDataFromSelector(objData);
                                            uploadWindowCompatible.close();

                                            var message = Ext.decode(res.response.responseText)['message'];
                                            uploadWindowCompatible.close();

                                            var missingItems = Ext.decode(res.response.responseText)['missingItems'];
                                            if (missingItems) {
                                                var detailedMissingMessage = Ext.decode(res.response.responseText)['detailedMissingMessage'];
                                                var detailedMessage = pimcore.objectsWithCsv.helpers.listify(missingItems, detailedMissingMessage, true);

                                                pimcore.objectsWithCsv.helpers.showPrettyMessage('info', 'Info', 'Missing Items', message, detailedMessage);
                                            } else {
                                                pimcore.helpers.showNotification(t("success"), message, "success");
                                            }

                                        },
                                        failure: function (el, res) {
                                            var message = Ext.decode(res.response.responseText)['message'];
                                            uploadWindowCompatible.close();
                                            pimcore.helpers.showNotification(t("error"), message, "error");
                                        }
                                    });
                                }
                            }
                        }]
                    });

                    uploadWindowCompatible.add(uploadForm);
                    uploadWindowCompatible.show();
                    uploadWindowCompatible.setWidth(501);
                    uploadWindowCompatible.updateLayout();
                }.bind(this)
            },
            {
                xtype: "button",
                iconCls: "pimcore_icon_search",
                handler: this.openSearchEditor.bind(this)
            },
            this.getCreateControl()
        ];

        return toolbarItems;
    }
});