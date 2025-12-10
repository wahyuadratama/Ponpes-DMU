<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            getGuruById($_GET['id']);
        } else {
            getAllGuru();
        }
        break;
    
    case 'POST':
        createGuru();
        break;
    
    case 'PUT':
        updateGuru();
        break;
    
    case 'DELETE':
        if (isset($_GET['id'])) {
            deleteGuru($_GET['id']);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getAllGuru() {
    global $conn;
    
    $sql = "SELECT * FROM guru ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    echo json_encode($data);
}

function getGuruById($id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM guru WHERE id = ?");
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Guru not found']);
    }
}

function createGuru() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $stmt = $conn->prepare("INSERT INTO guru (nama, nip, mapel, pendidikan, foto) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param('sssss', 
        $input['nama'], 
        $input['nip'], 
        $input['mapel'], 
        $input['pendidikan'], 
        $input['foto']
    );
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'id' => $conn->insert_id,
            'message' => 'Guru berhasil ditambahkan'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function updateGuru() {
    global $conn;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'ID is required']);
        return;
    }
    
    $stmt = $conn->prepare("UPDATE guru SET nama=?, nip=?, mapel=?, pendidikan=?, foto=? WHERE id=?");
    $stmt->bind_param('sssssi', 
        $input['nama'], 
        $input['nip'], 
        $input['mapel'], 
        $input['pendidikan'], 
        $input['foto'],
        $input['id']
    );
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Guru berhasil diupdate',
                'affected_rows' => $stmt->affected_rows
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'message' => 'No changes made',
                'affected_rows' => 0
            ]);
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}

function deleteGuru($id) {
    global $conn;
    
    $stmt = $conn->prepare("DELETE FROM guru WHERE id = ?");
    $stmt->bind_param('i', $id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Guru berhasil dihapus'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => $stmt->error]);
    }
}
?>
