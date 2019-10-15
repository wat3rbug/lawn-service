<?php
class ProfitLoss {

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
	
	function getProfitLossBetweenDates($start, $end) {
		if (isset($start) && isset($end)) {
			$sql = "SELECT * from v_profit_loss WHERE date >= ? AND date <= ? ORDER BY date DESC";
			$statement = $this->conn->prepare($sql);
			$statement->bindParam(2, $end);
			$statement->bindParam(1, $start);
			$statement->execute();
			while ($row = $statement->fetch()) {
				$output[] = $row;
			}
		}
		return $output;
	}
}
?>