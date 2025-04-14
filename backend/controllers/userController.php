<?php
include_once '../config/database.php';
include_once '../models/user.php';

class UserController {
    private $db;
    private $user;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
    }

    // Obter todos os usuários
    public function getUsers() {
        $stmt = $this->user->getAll();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $users = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $user_item = array(
                    "id_user" => $id_user,
                    "nome_user" => $nome_user,
                    "telefone_celular_user" => $telefone_celular_user,
                    "email_user" => $email_user,
                    "complemento" => $complemento,
                    "cep" => $cep,
                    "logradouro" => $logradouro,
                    "bairro" => $bairro,
                    "cidade" => $cidade,
                    "uf" => $uf
                );
                array_push($users, $user_item);
            }
            echo json_encode($users);
        } else {
            echo json_encode(["message" => "Nenhum usuário encontrado."]);
        }
    }

    // Criar um novo usuário
public function createUser() {
    // Obter os dados enviados no corpo da requisição
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar se os dados necessários estão presentes
    if (!isset($data['id_cep'], $data['nome_user'], $data['telefone_celular_user'], $data['email_user'], $data['senha_user'], $data['complemento'])) {
        echo json_encode(["success" => false, "message" => "Dados incompletos para criar usuário."]);
        return;
    }

    // Atribuir os dados recebidos ao modelo
    $this->user->id_cep = $data['id_cep'];
    $this->user->nome_user = $data['nome_user'];
    $this->user->telefone_celular_user = $data['telefone_celular_user'];
    $this->user->email_user = $data['email_user'];
    $this->user->senha_user = password_hash($data['senha_user'], PASSWORD_DEFAULT); // Criptografar a senha
    $this->user->complemento = $data['complemento'];

    // Tentar criar o usuário no banco de dados
    if ($this->user->create()) {
        echo json_encode(["success" => true, "message" => "Usuário criado com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao criar usuário."]);
    }
}

    //Atualizar um usuário
    public function updateUser() {
        $data = json_decode(file_get_contents("php://input"));
    
        // Log para depurar os dados recebidos
        error_log("Dados recebidos no updateUser: " . json_encode($data));
    
        // Verificar se o ID do usuário foi fornecido
        if (!isset($data->id_user)) {
            echo json_encode(["error" => "ID do usuário não fornecido."]);
            return;
        }
    
        // Atribuir os parâmetros ao modelo
        $this->user->id_user = $data->id_user;
        $this->user->id_cep = $data->id_cep;
        $this->user->nome_user = $data->nome_user;
        $this->user->telefone_celular_user = $data->telefone_celular_user;
        $this->user->email_user = $data->email_user;
        $this->user->senha_user = $data->senha_user;
        $this->user->complemento = $data->complemento;
    
        // Atualizar o usuário no banco
        if ($this->user->updateUser()) {
            echo json_encode(["message" => "Usuário atualizado com sucesso."]);
        } else {
            echo json_encode(["error" => "Erro ao atualizar o usuário."]);
        }
    }

  // Deletar um usuário
// Deletar um usuário
public function deleteUser() {
    // Obter os dados enviados no corpo da requisição
    $data = json_decode(file_get_contents("php://input"));

    // Verificar se o ID do usuário foi fornecido
    if (!isset($data->id_user)) {
        echo json_encode(["success" => false, "message" => "ID do usuário não fornecido."]);
        return;
    }

    // Atribuir o ID do usuário ao modelo
    $this->user->id_user = $data->id_user;

    // Tentar deletar o usuário no banco de dados
    if ($this->user->delete()) {
        echo json_encode(["success" => true, "message" => "Usuário deletado com sucesso."]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao deletar o usuário."]);
    }
}
}