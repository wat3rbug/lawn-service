<?php
require "Tables/Address.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new Address();
	$data = $db->getAddressForId($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>