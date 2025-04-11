<?php
class ViaCEPService {
    public static function buscarCep($cep) {
        // Remover caracteres não numéricos
        $cep = preg_replace('/[^0-9]/', '', $cep);

        // Validar o CEP
        if (strlen($cep) !== 8) {
            return ["error" => "CEP inválido"];
        }

        // URL da API do ViaCEP
        $url = "https://viacep.com.br/ws/$cep/json/";

        // Consumir a API
        $response = file_get_contents($url);

        // Verificar se houve erro na requisição
        if ($response === false) {
            return ["error" => "Falha ao acessar a API do ViaCEP"];
        }

        // Decodificar o JSON retornado
        $data = json_decode($response, true);

        // Verificar se o CEP foi encontrado
        if (isset($data['erro']) && $data['erro'] === true) {
            return ["error" => "CEP não encontrado"];
        }

        // Retornar os dados do endereço
        return $data;
    }
}