<?php
require "Address.php";
$db = new Address();
$data = $db->getAllAddresses();
header('Content-type: application/json');
echo json_encode($data);
?>