<?php
include_once '../config/database.php';
include_once '../models/PontoDescarte.php';

class pontoDescarteController {
    private $db;
    private $pontoDescarte;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->pontoDescarte = new PontoDescarte($this->db);
    }

    // Obter todos os pontos de descarte
    public function getPontosDescarte() {
        $stmt = $this->pontoDescarte->getAll();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $pontos = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $ponto_item = array(
                    "id_ponto" => $id_ponto,
                    "id_cep" => $id_cep,
                    "nome_ponto" => $nome_ponto,
                    "contato_ponto" => $contato_ponto,
                );
                array_push($pontos, $ponto_item);
            }
            echo json_encode($pontos);
        } else {
            echo json_encode(["message" => "Nenhum ponto de descarte encontrado."]);
        }
    }

    // Criar um novo ponto de descarte
    public function createPontoDescarte() {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['id_cep'], $data['nome_ponto'], $data['contato_ponto'])) {
            echo json_encode(["success" => false, "message" => "Dados incompletos para criar o ponto de descarte."]);
            return;
        }

        $this->pontoDescarte->id_cep = $data['id_cep'];
        $this->pontoDescarte->nome_ponto = $data['nome_ponto'];
        $this->pontoDescarte->contato_ponto = $data['contato_ponto'];

        if ($this->pontoDescarte->save()) {
            echo json_encode(["success" => true, "message" => "Ponto de descarte criado com sucesso!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao criar o ponto de descarte."]);
        }
    }

    // Atualizar um ponto de descarte
    public function updatePontoDescarte() {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->id_ponto)) {
            echo json_encode(["error" => "ID do ponto de descarte não fornecido."]);
            return;
        }

        $this->pontoDescarte->id_ponto = $data->id_ponto;
        $this->pontoDescarte->id_cep = $data->id_cep;
        $this->pontoDescarte->nome_ponto = $data->nome_ponto;
        $this->pontoDescarte->contato_ponto = $data->contato_ponto;

        if ($this->pontoDescarte->update()) {
            echo json_encode(["message" => "Ponto de descarte atualizado com sucesso."]);
        } else {
            echo json_encode(["error" => "Erro ao atualizar o ponto de descarte."]);
        }
    }

    // Deletar um ponto de descarte
    public function deletePontoDescarte() {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->id_ponto)) {
            echo json_encode(["success" => false, "message" => "ID do ponto de descarte não fornecido."]);
            return;
        }

        $this->pontoDescarte->id_ponto = $data->id_ponto;

        if ($this->pontoDescarte->delete()) {
            echo json_encode(["success" => true, "message" => "Ponto de descarte deletado com sucesso."]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao deletar o ponto de descarte."]);
        }
    }
}