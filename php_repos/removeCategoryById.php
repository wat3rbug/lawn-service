<?php
require_once "Tables/ExpenseCategory.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new ExpenseCategory();
	$db->removeCategory($id);
}
?>