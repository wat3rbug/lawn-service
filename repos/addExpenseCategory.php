<?php
require_once "Tables/ExpenseCategory.php";
$name = $_POST['name'];

$db = new ExpenseCategory();
$db->addCategory($name);	
?>