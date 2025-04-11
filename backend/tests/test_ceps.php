<?php
// URL base da API
$base_url = "http://localhost/Projeto_Techlimp/backend/routes";

// Função para enviar requisições HTTP
function sendRequest($method, $endpoint, $data = null) {
    $url = $GLOBALS['base_url'] . $endpoint;
    $options = [
        'http' => [
            'method' => $method,
            'header' => "Content-Type: application/json",
        ]
    ];

    if ($data) {
        $options['http']['content'] = json_encode($data);
    }

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    return json_decode($response, true);
}

// Testar Busca de CEPs
function testGetCEPs() {
    $response = sendRequest("GET", "/ceps");
    print_r($response);
}

// Testar Inserção de CEP
function testCreateCEP() {
    $data = [
        "cep" => "09931-270",
        "logradouro" => "Rua Macahuba",
        "bairro" => "Campanário",
        "cidade" => "Diadema",
        "uf" => "SP"
    ];
    $response = sendRequest("POST", "/ceps", $data);
    print_r($response);
}

// Executar Testes
echo "Testando Consulta de CEPs:\n";
testGetCEPs();

echo "\nTestando Inserção de CEP:\n";
testCreateCEP();