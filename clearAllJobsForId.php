<?php
require "Billing.php";
$id = $_POST['id'];
if (isset($id) && $id > 0) {
	$db = new Billing();
	$db->clearAllJobsForId($id);
}	
?>