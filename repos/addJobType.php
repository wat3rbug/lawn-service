<?php
require "Tables/Type.php";
$type = $_POST['name'];
$use = $_POST['use'];

if (isset($type)) {
	$db = new Type();
	$db->addJobType($type, $use);
}
?>