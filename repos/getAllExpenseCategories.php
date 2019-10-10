<?php
require_once "Tables/ExpenseCategory.php";

$db = new ExpenseCategory();
$data  = $db->getAllCategories();
header('Content-type: application/json');
echo json_encode($data);
?>