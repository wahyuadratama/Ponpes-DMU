<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getPesanById($_GET['id']);
        } else {
            getAllPesan();
        }
        break;
    
    case 'POST':
        createPesan();
        break;
    
    case 'PUT':
        updatePesan();
        break;
    
    case 'DELETE':
        if (isset($_GET['id'])) {
            deletePesan($_GET['id']);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getAllPesan() {
    global $conn;
    
    $sql = "SELECT * FROM pesan ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    echo json_encode($data);
}

function getPesanById($id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM pesan WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Pesan not found']);
    }
}

function createPesan() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $conn->prepare("INSERT INTO pesan (nama, email, subjek, pesan, status) VALUES (?, ?, ?, ?, ?)");
    $status = isset($input['status']) ? $input['status'] : 'unread';
    $stmt->bind_param('sssss', 
        $input['nama'], 
        $input['email'], 
        $input['subjek'],
        $input['pesan'],
        $status
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Pesan berhasil dikirim'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function updatePesan() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        return;
    }
    
    $stmt = $conn->prepare("UPDATE pesan SET status=? WHERE id=?");
    $stmt->bind_param('si', 
        $input['status'],
        $input['id']
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Status pesan berhasil diupdate'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function deletePesan($id) {
    global $conn;
    
    $stmt = $conn->prepare("DELETE FROM pesan WHERE id = ?");
    $stmt->bind_param('i', $id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Pesan berhasil dihapus'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}
?>
