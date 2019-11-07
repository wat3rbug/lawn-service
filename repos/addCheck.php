<?php
require "Tables/Maintenance.php";
$name = $_POST['machine'];
$duration = $_POST['duration'];
$description = $_POST['description'];
$today = $_POST['last_checked'];

if (isset($name) && $name > 0 && isset($duration) && $duration > 0 && isset($today)) {
	$db = new Maintenance();
	$db->addMaintenance($name, $duration, $description, $today);
}
?>