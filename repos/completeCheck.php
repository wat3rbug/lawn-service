<?php
require "Tables/Maintenance.php";
$id = $_POST['id'];
$today = $_POST['date'];

if (isset($today) && isset($id) && $id > 0) {
	$db = new Maintenance();
	$db->completeCheck($id, $today);
}
?>