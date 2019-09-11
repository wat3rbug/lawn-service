<?php
require "Client.php";
$db = new Client();
$data = $db->getAllClients();
header('Content-type: application/json');
echo json_encode($data);
?>