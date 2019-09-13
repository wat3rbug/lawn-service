<?php
class Job {
	
	function __construct() {
		include_once("DBConnection.php");
		$db = new DBCOnnection();
		$servername = $db->hostname;
		$username = $db->username;
		$password = $db->password;
		$charset = "utf8mb4";
		$database = $db->database;
		$dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
		$options = [
			PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES		=> true,
		];
		try {
			$this->conn = new PDO($dsn, $username, $password);
		} catch (\PDOException $e) {
			throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}
	}
	
	function addJob($date, $cost, $address, $type) {
		$sql = "INSERT INTO jobs (job_date, cost, address_id, type_id) VALUES (?, ?, ?, ?)";
		$statement->bindParam(1, $date);
		$statement->bindParam(2, $cost);
		$statement->bindParam(3, $address);
		$statement->bindParam(4, $type);
		$statement->execute();
	}
}
?>