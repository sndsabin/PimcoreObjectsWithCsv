<?php

namespace ObjectsWithCsvBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class ObjectsWithCsvBundle extends AbstractPimcoreBundle
{
    public function getJsPaths()
    {
        return [
//            '/bundles/objectswithcsv/js/pimcore/startup.js'
            '/bundles/objectswithcsv/js/pimcore/objects/classes/data/objectsWithCsv.js',
            '/bundles/objectswithcsv/js/pimcore/objects/classes/tags/objectsWithCsv.js'
        ];
    }
}
