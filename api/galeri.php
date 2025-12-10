<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getGaleriById($_GET['id']);
        } else {
            getAllGaleri();
        }
        break;
    
    case 'POST':
        createGaleri();
        break;
    
    case 'PUT':
        updateGaleri();
        break;
    
    case 'DELETE':
        if (isset($_GET['id'])) {
            deleteGaleri($_GET['id']);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getAllGaleri() {
    global $conn;
    
    $sql = "SELECT * FROM galeri ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    echo json_encode($data);
}

function getGaleriById($id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM galeri WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Galeri not found']);
    }
}

function createGaleri() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $conn->prepare("INSERT INTO galeri (judul, deskripsi, url) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', 
        $input['judul'], 
        $input['deskripsi'], 
        $input['url']
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Galeri berhasil ditambahkan'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function updateGaleri() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        return;
    }
    
    $stmt = $conn->prepare("UPDATE galeri SET judul=?, deskripsi=?, url=? WHERE id=?");
    $stmt->bind_param('sssi', 
        $input['judul'], 
        $input['deskripsi'], 
        $input['url'],
        $input['id']
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Galeri berhasil diupdate'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function deleteGaleri($id) {
    global $conn;
    
    $stmt = $conn->prepare("DELETE FROM galeri WHERE id = ?");
    $stmt->bind_param('i', $id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Galeri berhasil dihapus'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}
?>
