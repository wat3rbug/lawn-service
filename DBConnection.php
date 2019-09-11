<?php

class DBConnection {
	
	public $database;
	public $username;
	public $hostname;
	public $password;
	
	function __construct() {
		$this->password = "67triumph";
		$this->database = "lawn_service";
		$this->hostname = "db-server";
		$this->username = "lawnmowerman";
	}
}
?>
