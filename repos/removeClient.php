<?php
require "Tables/Client.php";
$id = $_POST['id'];

if(isset($id) && $id > 0) {
	$db = new Client();
	$db->removeClient($id);
}
?>