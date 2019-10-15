<?php
require_once "Tables/ProfitLoss.php";
$start = $_POST['start'];
$end = $_POST['end'];

if (isset($start) && isset($end)) {
	$db = new ProfitLoss();
	$data = $db->getProfitLossBetweenDates($start, $end);
	header('Content-type: application/json');
	echo json_encode($data);
}
?>