<?php
require "Tables/Maintenance.php";
$id = $_POST['id'];
if (isset($id) && $id > 0) {
	$db = new Maintenance();
	$db->removeMaintenance($id);
}
?>