<?php
require "Tables/Job.php";
$id = $_POST['id'];
$db = new Job();
$data = $db->getJobDetailsForId($id);
header('Content-type: application/json');
echo json_encode($data);
?>