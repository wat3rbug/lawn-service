<?php
require "Type.php";
$id = $_POST['id'];
$type = $_POST['type'];

if (isset($id) && $id > 0) {
	$db = new Type();
	$db->editJobType($id, $type);
}
?>