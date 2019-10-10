<?php
require "Tables/Address.php";
$db = new Address();
$data = $db->getAllAddresses();
header('Content-type: application/json');
echo json_encode($data);
?>