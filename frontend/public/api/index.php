<?php

require_once("./utils.php");

if (!session_id()) {
    session_start();
}

$isPOST = $_SERVER["REQUEST_METHOD"] == "POST";

$route = $_GET["route"];
$routeParts = explode("/", $route);
$reqController = $routeParts[0];
$reqParam = $routeParts[1] ?? null;

$categories = loadJsonFile("./data/categories.json");
$items = loadJsonFile("./data/products.json");

$topSaleIds = [66, 65, 73];
$moreCount = 6;

$res = [];

if ($reqController === "top-sales") {
    foreach ($items as $item) {
        $itemId = intval($item["id"]);
        if (!in_array($itemId, $topSaleIds)) {
            continue;
        }

        $res[] = itemBasicMapper($item);
    }
} elseif ($reqController === "categories") {
    $res = $categories;
} elseif ($reqController === "items" && !is_null($reqParam)) {
    $res = findItemById($items, intval($reqParam));
} elseif ($reqController === "items" && is_null($reqParam)) {
    $categoryId = intval($_GET["categoryId"] ?? 0);
    $offset = intval($_GET["offset"] ?? 0);
    $q = strtolower(trim($_GET["q"] ?? ""));

    $filtered = [];

    foreach ($items as $item) {
        $itemCategory = intval($item["category"]);
        if ($categoryId !== 0 && $categoryId !== $itemCategory) {
            continue;
        }

        $itemTitle = strtolower($item["title"]);
        $itemColor = strtolower($item["color"]);
        if (
            $q !== ""
            && strpos($itemTitle, $q) !== false
            && strpos($itemColor, $q) !== false
        ) {
            continue;
        }

        $filtered[] = itemBasicMapper($item);
    }

    $res = array_slice($filtered, $offset, $offset + $moreCount);
} elseif ($reqController === "order" && $isPOST) {
    header("HTTP/1.1 204 No Content", true, 204);
    exit;
}

header("Content-Type: application/json; charset=utf-8");
echo encode($res);
