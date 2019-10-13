<?php
require_once "Tables/Job.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new Job();
	$db->removeJob($id);
}
?>