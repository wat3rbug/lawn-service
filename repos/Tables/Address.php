<?php
class Address {

	private $conn;
	
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
	
	function removeAddress($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE addresses SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function getAddressForId($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT id, address1, address2, city, state, zipcode FROM addresses WHERE deleted = 0 AND id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
		}
		return $output;
	}
	function editAddress($id, $address1, $address2, $city, $state, $zipcode) {
		$sql = "UPDATE addresses set address1 =?, address2 = ?, city = ?, state = ?, zipcode = ? where id = ?";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $address1);
		$statement->bindParam(2, $address2);
		$statement->bindParam(3, $city);
		$statement->bindParam(4, $state);
		$statement->bindParam(5, $zipcode);
		$statement->bindParam(6, $id);
		$statement->execute();	
	}
	
	function getAllAddresses() {
		$sql = "SELECT id, address1, address2, city, state, zipcode from addresses where deleted = 0 ORDER BY address1";
		$statement = $this->conn->query($sql);
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function addAddress($address1, $address2, $city, $state, $zipcode) {
		$sql = "INSERT INTO addresses (address1, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?)";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $address1);
		$statement->bindParam(2, $address2);
		$statement->bindParam(3, $city);
		$statement->bindParam(4, $state);
		$statement->bindParam(5, $zipcode);
		$statement->execute();
	}
}
?>