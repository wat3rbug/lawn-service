<?php
require "Job.php";
$db = new Job();
$data = $db->GetAllJobs();
header('Content-type: application/json');
echo json_encode($data);