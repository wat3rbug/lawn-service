<?php
require "Job.php";
$date = $_POST['jobDate'];
$cost = $_POST['cost'];
$type = $_POST['jobType'];
$address = $_POST['address'];

if (isset($address) && $address > 0 && isset($type) && $type > 0 && isset($cost) && $cost > 0.0) {
	$db = new Job();
	$db->addJob($date, $cost, $type, $address);
}
?>