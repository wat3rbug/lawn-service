<?php
require "Client.php";
$id = $_POST['id'];
$firstname = $_POST['firstName'];
$lastname = $_POST['lastName'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$billing = $_POST['billing'];

if (isset($id) && $id > 0) {
	$db = new Client();
	$db->editClient($id, $firstname, $lastname, $phone, $email, $billing);
}
?>