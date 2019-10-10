<?php
require "Tables/Address.php";
$address1 = $_POST['address1'];
$address2 = $_POST['address2'];
$city = $_POST['city'];
$state = $_POST['state'];
$zipcode = $_POST['zipcode'];


$db = new Address();
if (isset($address1) && isset($city) && isset($state) && isset($zipcode)) {
	$db->addAddress($address1, $address2, $city, $state, $zipcode);
} 
?>