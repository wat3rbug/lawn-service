<?php
class Client {

	private $conn;
	private $list;
	
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
	
	function removeClient($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE clients SET deleted = 1 WHERE id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function getClientForId($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT id, firstName, lastName, email, phone FROM clients WHERE deleted = 0 AND id = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
		}
		return $output;
	}
	function editClient($id, $firstname, $lastname, $phone, $email) {
		$sql = "UPDATE clients set firstname =?, lastname = ?, phone = ?, email = ? where id = ?";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $firstname);
		$statement->bindParam(2, $lastname);
		$statement->bindParam(3, $phone);
		$statement->bindParam(4, $email);
		$statement->bindParam(5, $id);
		$statement->execute();	
	}
	
	function getAllClients() {
		$sql = "SELECT id, firstName, lastName, phone, email from clients where deleted = 0 ORDER BY firstName";
		$statement = $this->conn->query($sql);
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function addClient($firstname, $lastname, $phone, $email) {
		$sql = "INSERT INTO clients (firstname, lastname, phone, email) VALUES (?, ?, ?, ?)";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $firstname);
		$statement->bindParam(2, $lastname);
		$statement->bindParam(3, $phone);
		$statement->bindParam(4, $email);
		$statement->execute();
	}
}
?>
