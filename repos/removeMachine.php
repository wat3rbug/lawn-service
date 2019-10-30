<?php
require "Tables/Machine.php";
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new Machine();
	$db->removeMachine($id);
}
?>