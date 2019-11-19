# Object With Csv - Pimcore Extension

Facilitates user to upload csv file for bulk attaching to objects datatype using csv upload functionality.

![DataObject Edit Form](/Docs/images/form.png "Dataobject Edit Form")

![CSV Upload](/Docs/images/upload-modal.png "CSV Upload")

# Installation

## Prerequisite

Requires **pimcore > 5.0** and **pimcore < 5.6**

### Step 1

- Run `composer require sndsabin/objects-with-csv-bundle`

### Step 2

- Enable the `ObjectWithCsvBundle` Extension

```php
    bin/console pimcore:bundle:enable ObjectsWithCsvBundle
```

### Step 3

- Then `objectWithCsv` would be available in field selector under Relations (Add Data Component -> Relation -> objectsWithCsv)

![objectWithCsv](/Docs/images/data-type.png "objectWithCsv")

# Sample CSV

### Example Scenario

Multiple products are to be attached to category in pimcore.

**Product** Dataobject

![product-dataobject](/Docs/images/product.png "Product DataObject")

where `sku` is the unique identifier to identify the `product` objects.

**Category** Dataobject

![product-dataobject](/Docs/images/category.png "Category DataObject")

and the Edit form for Category Objects

![DataObject Edit Form](/Docs/images/form.png "Dataobject Edit Form")

![CSV Upload](/Docs/images/upload-modal.png "CSV Upload")

So, In our case. the [sample csv](/Docs/csv/bulk-upload.csv "Sample CSV") be would be like the below :

```
sku
11111111
22222222
33333333
44444444
4zfd5698
```
