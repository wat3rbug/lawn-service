<?php
class Expense {
	
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
	function addExpense($date, $name, $quantity, $unitcost, $category) {
		$sql = "INSERT INTO expenses (name, unit_cost, quantity, expense_category, expense_date) VALUES (?, ?, ?, ?, ?)";
		$statement = $this->conn->prepare($sql);
		$statement->bindParam(1, $name);
		$statement->bindParam(2, $unitcost);
		$statement->bindParam(3, $quantity);
		$statement->bindParam(4, $category);
		$statement->bindParam(5, $date);
		$statement->execute();
	}
	
	function getAllExpenses() {
		$sql = "SELECT expenses.id, expense_date, name, unit_cost, quantity, expense_categories.expense_type FROM expenses JOIN expense_categories ON expenses.expense_category = expense_categories.id WHERE expenses.isdeleted = 0 ORDER BY expense_date DESC";
		$statement = $this->conn->prepare($sql);
		$statement->execute();
		while ($row = $statement->fetch()) {
			$output[] = $row;
		}
		return $output;
	}
	
	function getExpenseById($id) {
		if (isset($id) && $id > 0) {
			$sql = "SELECT * from expenses WHERE id = ? and isDeleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $id);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
	
	function getExpensesBetweenDates($start, $end) {
		if (isset($start) && isset($end)) {
			$sql = "SELECT expenses.id, expense_date, name,unit_cost, quantity, expense_categories.expense_type FROM expenses JOIN expense_categories ON expenses.expense_category = expense_categories.id WHERE expense_date IN (? , ?) AND  expenses.isdeleted = 0";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(1, $start);
			$statement->bindParam(2, $end);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
			return $output;
		}
	}
}	
?>