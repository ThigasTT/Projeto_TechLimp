<?php
include_once '../config/database.php';
include_once '../models/PontoDescarte.php';
include_once '../models/CEP.php';

class pontoDescarteController {
    private $db;
    private $pontoDescarte;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->pontoDescarte = new PontoDescarte($this->db);
    }

    function obterCoordenadasPorCEP($cep) {
        $apiKey = "6121245f691f42e097ad7cefe3942557"; // Substitua pela sua chave do OpenCage
        $url = "https://api.opencagedata.com/geocode/v1/json?q=$cep&key=$apiKey";
    
        $response = file_get_contents($url);
        $data = json_decode($response, true);
    
        if (isset($data['results'][0]['geometry'])) {
            return [
                'latitude' => $data['results'][0]['geometry']['lat'],
                'longitude' => $data['results'][0]['geometry']['lng']
            ];
        } else {
            return null; // CEP inválido ou não encontrado
        }
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
                    "latitude" => $latitude,
                    "longitude" => $$longitude
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

        //verifica se as variaveis estão vazias
        if (!isset($data['id_cep'], $data['nome_ponto'], $data['contato_ponto'])) {
            echo json_encode(["success" => false, "message" => "Dados incompletos para criar o ponto de descarte."]);
            return;
        }

        $cepModel = new CEP($this->db);
        $cep = $cepModel->getById($data['id_cep']);


            // Obter latitude e longitude com base no CEP
    $coordenadas = $this->obterCoordenadasPorCEP($cep['cep']);
    if (!$coordenadas) {
        echo json_encode(["success" => false, "message" => "Não foi possível obter as coordenadas para o CEP informado."]);
        return;
    }

        $this->pontoDescarte->id_cep = $data['id_cep'];
        $this->pontoDescarte->nome_ponto = $data['nome_ponto'];
        $this->pontoDescarte->contato_ponto = $data['contato_ponto'];
        $this->pontoDescarte->latitude = $coordenadas['latitude'];
        $this->pontoDescarte->longitude = $coordenadas['longitude'];

        if ($this->pontoDescarte->save()) {
            echo json_encode(["success" => true, "message" => "Ponto de descarte criado com sucesso!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Erro ao criar o ponto de descarte."]);
        }
    }

    public function updatePontoDescarte() {
        // Obter os dados enviados na requisição
        $data = json_decode(file_get_contents("php://input"), true);
    
        // Verificar se os dados necessários foram fornecidos
        if (!isset($data['id_ponto'], $data['id_cep'], $data['nome_ponto'], $data['contato_ponto'])) {
            echo json_encode(["error" => "Dados incompletos para atualização do ponto de descarte."]);
            return;
        }

        
    
        // Atribuir os dados recebidos ao modelo
        $this->pontoDescarte->id_ponto = $data['id_ponto'];
        $this->pontoDescarte->id_cep = $data['id_cep'];
        $this->pontoDescarte->nome_ponto = $data['nome_ponto'];
        $this->pontoDescarte->contato_ponto = $data['contato_ponto'];
    
        // Tentar atualizar o ponto de descarte
        if ($this->pontoDescarte->update()) {
            echo json_encode(["success" => true, "message" => "Ponto de descarte atualizado com sucesso."]);
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