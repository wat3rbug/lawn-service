<?php
require "Tables/Maintenance.php";
$db = new Maintenance();
$data = $db->getAllChecks();
header('Content-type: application/json');
echo json_encode($data);
?>