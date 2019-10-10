<?php
require "Tables/Address.php";
$db = new Address();
$id = $_POST['id'];

$db->removeAddress($id);
?>