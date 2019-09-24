<?php
require "Client.php";
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$billing = $_POST['billing'];

$db = new Client();
if (isset($firstname) && isset($phone)) {
	$db->addClient($firstname, $lastname, $phone, $email, $billing);
} else {
	echo "fail";
}
?>