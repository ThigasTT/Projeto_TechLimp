<?php
// Habilitar CORS e configurar cabeçalhos
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Log para verificar requisições
error_log("Método: " . $_SERVER["REQUEST_METHOD"]);
error_log("Caminho: " . (isset($_GET['url']) ? $_GET['url'] : "Nenhum caminho"));
error_log("Dados recebidos: " . file_get_contents('php://input'));

// Verificar se a chave 'url' existe no $_GET
$path = isset($_GET['url']) ? explode("/", $_GET['url']) : [];

// Verificar se o caminho está vazio
if (empty($path) || !isset($path[0]) || $path[0] === "") {
    echo json_encode(["message" => "Rota não encontrada."]);
    exit;
}

// Incluir controladores
include_once '../controllers/UserController.php';
include_once '../controllers/CEPController.php';
include_once'../controllers/pontoDescarteController.php';
include_once '../config/Database.php';

// Obter o método HTTP
$requestMethod = $_SERVER["REQUEST_METHOD"];

// Cria a conexão com o banco de dados
$database = new Database();
$dbConnection = $database->getConnection();

// Rotas para usuários
if ($path[0] === "users") {
    $controller = new UserController();

    if ($requestMethod === "GET") {
        $controller->getUsers();
    } elseif ($requestMethod === "POST") {
        $controller->createUser();
    } elseif ($requestMethod === "PUT") {
        $controller->updateUser();
    } elseif ($requestMethod === "DELETE") {
        $controller->deleteUser();
    } else {
        echo json_encode(["message" => "Método não suportado para usuários."]);
    }
}

// Rotas para CEPs
elseif ($path[0] === "ceps") {
    $controller = new CEPController($dbConnection);

    if ($requestMethod === "GET") {
            $controller->buscarCEPs(); // Busca todos os CEPs
        }
     elseif ($requestMethod === "POST") {
        $controller->salvarCep(); // Salva o CEP enviado
    } else {
        echo json_encode(["message" => "Método não suportado para CEPs."]);
    }
}

//Rotas para pontos de descarte

elseif ($path[0] === "points") {
    $controller = new PontoDescarteController();

    if ($requestMethod === "GET") {
        $controller->getPontosDescarte();
    } elseif ($requestMethod === "POST") {
        $controller->createPontoDescarte();
    }
}
// Rota não encontrada
else {
    echo json_encode(["message" => "Rota não encontrada."]);
}