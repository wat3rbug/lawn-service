<?php
require "Client.php";
$db = new Client();
$id = $_POST['id'];

$db->removeClient($id);
?>