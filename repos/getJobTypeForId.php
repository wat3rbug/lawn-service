<?php
require "Tables/Type.php";
$id = $_POST['id'];
$db = new Type();
$data = $db->getJobTypeById($id);
header('Content-type: application/json');
echo json_encode($data);
?>