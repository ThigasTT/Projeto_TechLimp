<?php
class User {
    private $conn;
    private $table = "Usuario";

    public $id_user;
    public $id_cep; 
    public $nome_user;
    public $telefone_celular_user;
    public $email_user;
    public $senha_user;
    public $complemento;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obter todos os usuários (com informações do CEP)
    public function getAll() {
        $query = "
            SELECT 
                u.id_user, 
                u.nome_user, 
                u.telefone_celular_user, 
                u.email_user, 
                u.complemento,
                c.cep, 
                c.logradouro, 
                c.bairro, 
                c.cidade, 
                c.uf 
            FROM " . $this->table . " u
            JOIN CEP c ON u.id_cep = c.id_cep
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Criar um novo usuário
    public function create() {
        $query = "
            INSERT INTO " . $this->table . " 
            (id_cep, nome_user, telefone_celular_user, email_user, senha_user, complemento) 
            VALUES (:id_cep, :nome_user, :telefone_celular_user, :email_user, :senha_user, :complemento)
        ";
        $stmt = $this->conn->prepare($query);

        // Bind dos parâmetros
        $stmt->bindParam(":id_cep", $this->id_cep);
        $stmt->bindParam(":nome_user", $this->nome_user);
        $stmt->bindParam(":telefone_celular_user", $this->telefone_celular_user);
        $stmt->bindParam(":email_user", $this->email_user);
        $stmt->bindParam(":senha_user", $this->senha_user);
        $stmt->bindParam(":complemento", $this->complemento);

        // Executar a query
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // Atualizar um usuário existente
    public function updateUser() {
        $query = "
            UPDATE usuario 
            SET 
                id_cep = :id_cep,
                nome_user = :nome_user,
                telefone_celular_user = :telefone_celular_user,
                email_user = :email_user,
                senha_user = :senha_user,
                complemento = :complemento
            WHERE id_user = :id_user
        ";
    
        $stmt = $this->conn->prepare($query);
    
        // Bind dos parâmetros
        $stmt->bindParam(":id_user", $this->id_user);
        $stmt->bindParam(":id_cep", $this->id_cep);
        $stmt->bindParam(":nome_user", $this->nome_user);
        $stmt->bindParam(":telefone_celular_user", $this->telefone_celular_user);
        $stmt->bindParam(":email_user", $this->email_user);
        $stmt->bindParam(":senha_user", $this->senha_user);
        $stmt->bindParam(":complemento", $this->complemento);
    
        // Executar a query
        return $stmt->execute();
    }

    // Excluir um usuário
    public function delete() {
        $query = "DELETE FROM usuario WHERE id_user = :id_user";
    
        $stmt = $this->conn->prepare($query);
    
        // Bind do parâmetro
        $stmt->bindParam(":id_user", $this->id_user);
    
        // Executar a query e retornar o resultado
        return $stmt->execute();
    }
}