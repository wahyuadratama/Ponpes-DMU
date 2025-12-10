<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getBeritaById($_GET['id']);
        } else {
            getAllBerita();
        }
        break;
    
    case 'POST':
        createBerita();
        break;
    
    case 'PUT':
        updateBerita();
        break;
    
    case 'DELETE':
        if (isset($_GET['id'])) {
            deleteBerita($_GET['id']);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getAllBerita() {
    global $conn;
    
    $sql = "SELECT * FROM berita ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    echo json_encode($data);
}

function getBeritaById($id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM berita WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Berita not found']);
    }
}

function createBerita() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $conn->prepare("INSERT INTO berita (judul, kategori, status, author, excerpt, konten, gambar, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('ssssssss', 
        $input['judul'], 
        $input['kategori'], 
        $input['status'],
        $input['author'],
        $input['excerpt'],
        $input['konten'],
        $input['gambar'],
        $input['tags']
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Berita berhasil ditambahkan'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function updateBerita() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        return;
    }
    
    $stmt = $conn->prepare("UPDATE berita SET judul=?, kategori=?, status=?, author=?, excerpt=?, konten=?, gambar=?, tags=? WHERE id=?");
    $stmt->bind_param('ssssssssi', 
        $input['judul'], 
        $input['kategori'], 
        $input['status'],
        $input['author'],
        $input['excerpt'],
        $input['konten'],
        $input['gambar'],
        $input['tags'],
        $input['id']
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Berita berhasil diupdate'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function deleteBerita($id) {
    global $conn;
    
    $stmt = $conn->prepare("DELETE FROM berita WHERE id = ?");
    $stmt->bind_param('i', $id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Berita berhasil dihapus'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}
?>
