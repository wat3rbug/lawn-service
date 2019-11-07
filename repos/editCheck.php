<?php
require "Tables/Maintenance.php";
$date = $_POST['date'];
$duration = $_POST['duration'];
$description = $_POST['description'];
$id = $_POST['id'];

if (isset($id) && $id > 0 && isset($date) && isset($duration) && isset($description)) {
	$db = new Maintenance();
	$db->editMaintenance($id, $date, $duration, $description);
}
?>