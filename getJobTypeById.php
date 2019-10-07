<?php
require "Type.php";
$id = $_GET['id'];

if (isset($id) && $id > 0) {
	$db = new Type();
	$data = $db->getJobTypeById($id);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>