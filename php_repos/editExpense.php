<?php
require_once "Tables/Expense.php";
$id = $_POST['id'];
$name = $_POST['name'];
$quantity = $_POST['quantity'];
$unitCost = $_POST['unitCost'];
$category = $_POST['category'];
$date = $_POST['date'];

$db = new Expense();
$db->editExpense($id, $date, $name, $quantity, $unitCost, $category);	
?>