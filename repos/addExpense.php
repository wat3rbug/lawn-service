<?php
require_once "Tables/Expense.php";
$name = $_POST['name'];
$quantity = $_POST['quantity'];
$unitCost = $_POST['unitCost'];
$category = $_POST['category'];
$date = $_POST['date'];

$db = new Expense();
$db->addExpense($date, $name, $quantity, $unitCost, $category);	
?>