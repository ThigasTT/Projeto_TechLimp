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
           //         "telefone_celular_user" => $telefone_celular_user,
                    "email_user" => $email_user,
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
    if (!isset($data['nome_user'], $data['email_user'], $data['senha_user'])) {
        echo json_encode(["success" => false, "message" => "Dados incompletos para criar usuário."]);
        return;
    }
    
 //   $this->user->id_cep = $data['id_cep'];
    $this->user->nome_user = $data['nome_user'];
    $this->user->email_user = $data['email_user'];
    $this->user->senha_user = password_hash($data['senha_user'], PASSWORD_DEFAULT); // Criptografar a senha



    if ($this->user->create()) {
        echo json_encode(["success" => true, "message" => "Usuário criado com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao criar usuário."]);
    }
}

    //Fazer o login do usuário
    public function loginUser(){
        $data = json_decode(file_get_contents("php://input"));
        error_log("Dados recebidos no loginUser: " . json_encode($data));

        if(!isset($data->email_user, $data->senha_user)){
             echo json_encode(["error" => "todos os campos devem ser preenchidos"]);
             return;
            }
        $stmt = $this->user->loginUser($data->email_user);
       if($stmt->rowCount() == 1){
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if(password_verify($stmt->senha_user, $data->senha_user)){
                echo json_encode([
                    "success"=> true,
                    "message"=>"Usuario logado com sucesso",
                    "user"=>[
                        "id_user"=> $user["id_user"],
                        "nome_user"=> $user["nome_user"],
                        "email_user"=> $user["email_user"]                   
                        ]
                    ]);
            }else{
                echo json_encode([
                    "sucess"=> false,
                    "message"=> "Senha incorreta"
                ]);
            }
        }else{
            echo json_encode(["sucess"=>false,"message"=> "usuario não encontrado"]);
        }
    }   
    //Atualizar um usuário
    public function updateUser() {
        $data = json_decode(file_get_contents("php://input"));
    
        
        error_log("Dados recebidos no updateUser: " . json_encode($data));
    
    
        if (!isset($data->id_user)) {
            echo json_encode(["error" => "ID do usuário não fornecido."]);
            return;
        }
    

        $this->user->id_user = $data->id_user;
        $this->user->nome_user = $data->nome_user;
        $this->user->email_user = $data->email_user;
        $this->user->senha_user = $data->senha_user;
    
    
     
        if ($this->user->updateUser()) {
            echo json_encode(["message" => "Usuário atualizado com sucesso."]);
        } else {
            echo json_encode(["error" => "Erro ao atualizar o usuário."]);
        }
    }


// Deletar um usuário
public function deleteUser() {

    $data = json_decode(file_get_contents("php://input"));


    if (!isset($data->id_user)) {
        echo json_encode(["success" => false, "message" => "ID do usuário não fornecido."]);
        return;
    }

 
    $this->user->id_user = $data->id_user;

 
    if ($this->user->delete()) {
        echo json_encode(["success" => true, "message" => "Usuário deletado com sucesso."]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao deletar o usuário."]);
    }
}
}