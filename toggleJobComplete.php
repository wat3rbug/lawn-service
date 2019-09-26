<?php
require "Job.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new Job();
	$db->toggleJobComplete($id);
}
?>