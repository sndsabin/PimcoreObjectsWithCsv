<?php

namespace ObjectsWithCsvBundle;

use Pimcore\Extension\Bundle\AbstractPimcoreBundle;

class ObjectsWithCsvBundle extends AbstractPimcoreBundle
{
    public function getJsPaths()
    {
        return [
            '/bundles/objectswithcsv/js/pimcore/helpers.js',
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
        return '2.0.0';
    }

    /**
     * Returns the bundle name that this bundle overrides.
     *
     * Despite its name, this method does not imply any parent/child relationship
     * between the bundles, just a way to extend and override an existing
     * bundle.
     *
     * @return string The Bundle name it overrides or null if no parent
     *
     * @deprecated This method is deprecated as of 3.4 and will be removed in 4.0.
     */
    public function getParent()
    {
        // TODO: Implement getParent() method.
    }
}
