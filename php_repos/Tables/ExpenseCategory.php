<?php
class ExpenseCategory {
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
	function getCategoryById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from expense_categories WHERE id = ? AND isDeleted = 0 LIMIT 1";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function removeCategory($id) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE expense_categories SET isDeleted = 1 WHERE ID = ?";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
		}
	}
	
	function editCategory($id, $name) {
		if (isset($id) && $id > 0) {
			$sql = "UPDATE expense_categories SET expense_type = ? WHERE ID = ? AND isDeleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->bindParam(2, $id);
			$statement->execute();
		}
	}
	
	function addCategory($name) {
		if (isset($name)) {
			$sql = "INSERT INTO expense_categories (expense_type) VALUES(?)";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $name);
			$statement->execute();
		}
	}
	
	function getAllCategories() {
		$sql = "SELECT * FROM expense_categories WHERE isDeleted = 0";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
}
?>