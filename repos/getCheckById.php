<?php
require "Tables/Maintenance.php";
$id = $_POST['id'];
if (isset($id) && $id > 0) {
	$db = new Maintenance();
	$data = $db->getMaintenanceById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>