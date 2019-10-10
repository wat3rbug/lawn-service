<?php
require_once "Tables/Expense.php";
$id = $_GET['id'];

if (isset($id) && $id > 0) {
	$db = new Expense();
	$data = $db->getExpenseById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}

?>