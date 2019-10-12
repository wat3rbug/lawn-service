<?php
require "Tables/Type.php";
$db = new Type();
$data = $db->getAllTypes();
header('Content-type: application/json');
echo json_encode($data);
?>