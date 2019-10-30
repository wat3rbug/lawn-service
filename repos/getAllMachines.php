<?php
require "Tables/Machine.php";
$db = new Machine();
$data = $db->getAllMachines();
header('Content-type: application/json');
echo json_encode($data);
?>