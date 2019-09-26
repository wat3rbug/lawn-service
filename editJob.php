<?
require "Job.php";
$date = $_POST['editDate'];
$cost = $_POST['cost'];
$type = $_POST['jobType'];
$address = $_POST['address'];
$client = $_POST['client'];
$id = $_POST['id'];

if (isset($id) && $id > 0) {
	$db = new Job();
	$db->editJob($date, $cost, $type, $address, $client, $id);
}