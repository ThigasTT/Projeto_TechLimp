<?php
include_once '../config/database.php';
include_once '../controllers/CEPController.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$database = new Database();
$dbConnection = $database->getConnection();

$cepController = new CEPController($dbConnection);

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['cep'])) {
    $cepController->buscarCepExterno($_GET['cep']);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['cep'])) {
    $cepController->salvarCep($_POST['cep']);
} else {
    echo json_encode(["error" => "Rota não encontrada ou método inválido"]);
}