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

    /**
     * @return string
     */
    public function getDescription()
    {
        return 'Facilitates user to upload csv file for bulk attaching to objects datatype using csv upload functionality.';
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return '1.0.1';
    }
}
