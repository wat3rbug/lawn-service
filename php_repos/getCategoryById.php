<?php
require_once "Tables/ExpenseCategory.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new namespace\ExpenseCategory();
	$data  = $db->getCategoryById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>