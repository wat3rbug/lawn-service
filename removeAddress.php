<?php
require "Address.php";
$db = new Address();
$id = $_POST['id'];

$db->removeAddress($id);
?>