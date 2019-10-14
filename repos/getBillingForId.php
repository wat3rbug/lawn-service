<?php
require "Tables/Billing.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new Billing();
	$data = $db->getBillingForId($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>