<?php
require "Job.php";
$beginning = $_GET['beginning'];
$end = $_GET['end'];

// $beginning = '2019-10-3';
// $end = '2019-10-10';
if (isset($beginning) && isset($end)) {
	$db = new Job();
	$data = $db->getAllJobsBetweenDates($beginning, $end);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>