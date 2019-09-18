<?php
require "Job.php";
$id = $_POST['id'];

if (isset($id) && $id > 0){
	$db = new Job();
	$data = $db->getJobDetailsForId($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>
