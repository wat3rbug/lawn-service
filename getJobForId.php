<?php
require "Job.php";
$id = $_POST['id'];
$db = new Job();
$data = $db->getJobForId($id);
header('Content-type: application/json');
echo json_encode($data);
?>