<?php

function decode($str)
{
    $asArray = true;
    $depth = 512;
    $fdata = rawurldecode($str);

    return json_decode($fdata, $asArray, $depth, JSON_THROW_ON_ERROR);
}

function encode($obj)
{
    return json_encode($obj, JSON_UNESCAPED_UNICODE);
}

function loadJsonFile($filename)
{
    return decode(file_get_contents($filename));
}

function itemBasicMapper($item)
{
    $props = ["id", "category", "title", "price", "images"];

    $res = [];
    foreach ($props as $prop) {
        $res[$prop] = $item[$prop];
    }

    return $res;
}

function findItemById($items, $id)
{
    foreach ($items as $item) {
        $itemId = intval($item["id"]);
        if ($itemId === $id) {
            return $item;
        }
    }

    return null;
}
