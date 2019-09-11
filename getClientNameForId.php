<?php
require "Client.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new Client();
	$data = $db->getClientForId($id);
	header('Content-type: application/json');
	echo json_encode($data);
}