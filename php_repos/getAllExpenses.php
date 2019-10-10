<?php
require_once "Tables/Expense.php";

$db = new Expense();
$data = $db->getAllExpenses();
header('Content-type: application/json');
echo json_encode($data);
?>