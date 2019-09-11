<?php
require "Client.php";
$db = new Client();
//$id = $_POST['id'];
$id = 5;
$db->removeClient($id);
?>