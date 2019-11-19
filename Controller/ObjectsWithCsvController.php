<?php

namespace ObjectsWithCsvBundle\Controller;

use Pimcore\Controller\FrontendController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;


/**
 * @Route("admin/objects-with-csv")
 */
class ObjectsWithCsvController extends FrontendController
{
    /**
     * @Route("/parse", methods={"POST"})
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function parse(Request $request)
    {
        try {
            if ($_FILES) {
                return $this->processUploadedFile($request->get('allowedClass'));
            }
        } catch (\Exception $exception) {
            return new JsonResponse([
                'error' => true,
                'message' => "Something went wrong. Please try again.  \n" . $exception->getMessage()
            ], 418);
        }

    }

    /**
     * @param $allowedClass
     * @return JsonResponse
     */
    protected function processUploadedFile($allowedClass)
    {
        if (in_array(pathinfo($_FILES['csv-upload']['name'], PATHINFO_EXTENSION), ['csv'])) {
            $file = $_FILES['csv-upload']['tmp_name'];
            $csvParser = $this->get('objects_with_csv.csv_parser');
            $csvData = $csvParser->parseFile($file);

            if ($csvData) {
                return $this->processCsvData($csvData, $allowedClass);
            }


        } else {
            return new JsonResponse(['error' => true, 'message' => 'No file was found.'], 400);
        }
    }

    /**
     * @param $csvData
     * @param $allowedClass
     * @return JsonResponse
     */
    protected function processCsvData($csvData, $allowedClass)
    {
        $searchValues = [];
        $searchKey = htmlspecialchars(strip_tags(array_keys($csvData[0])[0])); // pick first index key

        // prepare data
        $searchValues = $this->bakeSearchData($csvData, $searchValues);

        // fetch objects
        if (is_array($allowedClasses = explode(',', $allowedClass))) {
            $dataObjectsArray = $this->retrieveDataObjects($allowedClasses, $searchKey, $searchValues);

            return new JsonResponse(['success' => true, 'data' => array_values($dataObjectsArray)], 200);

        } else {

            return new JsonResponse(['error' => true, 'message' => 'Please upload csv file.'], 418);
        }
    }

    /**
     * @param $csvData
     * @param $searchValues
     * @return array
     */
    protected function bakeSearchData($csvData, $searchValues)
    {
        foreach ($csvData as $data) {
            foreach ($data as $key => $value) {
                if (!is_null($value) && $value != '') {
                    $searchValues[] = (string) $value;
                }
            }
        }

        return $searchValues;
    }


    /**
     * @param $allowedClasses
     * @param $key
     * @param $searchValues
     * @return array
     */
    protected function retrieveDataObjects($allowedClasses, $key, $searchValues)
    {
        $dataObjectsArray = [];

        foreach ($allowedClasses as $class) {
            if (class_exists($className = "\\Pimcore\\Model\\DataObject\\" . ucfirst($class))) {
                if (!is_null($key) && $key != '' && count($searchValues)) {
                    $listName = '\\Pimcore\\Model\\DataObject\\' . ucfirst($class) . '\\Listing';
                    $list = new $listName();
                    $list->setCondition($key . " IN ('" . implode("','", $searchValues) . "')");
                    $dataObjects = $list->getObjects();

                    if ($dataObjects) {
                        foreach ($dataObjects as $dataObject) {
                            if (!isset($dataObjectsArray[$dataObject->getId()])) {
                                $dataObjectsArray[$dataObject->getId()] = [
                                    'id' => $dataObject->getId(),
                                    'fullpath' => $dataObject->getFullPath(),
                                    'published' => $dataObject->isPublished()
                                ];
                            }
                        }
                    }
                }

            }

        }

        return $dataObjectsArray;
    }
}
