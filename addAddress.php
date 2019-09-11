<?php
require "Address.php";
// $address1 = $_POST['address1'];
// $address2 = $_POST['address2'];
// $city = $_POST['city'];
// $state = $_POST['state'];
// $zipcode = $_POST['zipcode'];
$address1 = "812 Camelot";
$address2 = "";
$city = "Friendswood";
$state = "TX";
$zipcode = "77546";

$db = new Address();
if (isset($address1) && isset($city) && isset($state) && isset($zipcode)) {
	$db->addAddress($address1, $address2, $city, $state, $zipcode);
} else {
	echo "fail";
}
?>