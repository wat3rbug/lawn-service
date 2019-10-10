<?php
require_once "Tables/Expense.php";
$id = $_POST['id'];

$db = new Expense();
$db->removeExpense($id);	
?>