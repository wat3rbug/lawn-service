<?php
require "Tables/Machine.php";
$name = $_POST['name'];

if (isset($name)) {
	$db = new Machine();
	$db->addMachine($name);
}
?>