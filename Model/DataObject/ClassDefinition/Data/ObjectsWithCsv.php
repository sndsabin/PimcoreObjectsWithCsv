<?php
/**
 * Created by PhpStorm.
 * User: sndsabin
 * Date: 4/4/19
 * Time: 3:31 PM
 */

namespace ObjectsWithCsvBundle\Model\DataObject\ClassDefinition\Data;

use Pimcore\Model\DataObject\ClassDefinition\Data\ManyToManyObjectRelation;

class ObjectsWithCsv extends ManyToManyObjectRelation
{
    public $fieldtype = 'objectsWithCsv';
}