<?php
require "Type.php";
$type = $_POST['type'];
if (isset($type)) {
	$db = new Type();
	$db->addJobType($type);
}
?>