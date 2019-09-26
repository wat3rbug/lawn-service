<?php
require "Billing.php";
$jobid = $_POST['id'];
$item = $_POST['item'];
$cost = $_POST['cost'];
$quantity = $_POST['quantity'];

if (isset($jobid) && $jobid > 0) {
	$db = new Billing();
	$db->addBillingItem($jobid, $item, $cost, $quantity);
}
?>