<?php
// Northwind Hűtéstechnika - kapcsolatfelvételi űrlap feldolgozó
// cPanel környezetben fut, a beérkező POST-ot a northwind@northwind.hu címre küldi.

header('Content-Type: application/json; charset=utf-8');

// CORS – ha más aldomainről hívnák
$allowedOrigins = ['https://northwind.hu', 'https://www.northwind.hu'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// JSON, form-encoded vagy multipart bemenet támogatása
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        $data = [];
    }
} else {
    $data = $_POST;
}

$name    = trim((string)($data['name']    ?? ''));
$email   = trim((string)($data['email']   ?? ''));
$phone   = trim((string)($data['phone']   ?? ''));
$message = trim((string)($data['message'] ?? ''));

// Egyszerű honeypot védelem
if (!empty($data['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Validáció
$errors = [];
if ($name === '' || mb_strlen($name) > 100) {
    $errors[] = 'Érvénytelen név.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255) {
    $errors[] = 'Érvénytelen email cím.';
}
if (mb_strlen($phone) > 50) {
    $errors[] = 'Érvénytelen telefonszám.';
}
if ($message === '' || mb_strlen($message) > 5000) {
    $errors[] = 'Érvénytelen üzenet.';
}

if ($errors) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
    exit;
}

// Header injection elleni védelem
$sanitizeHeader = function ($v) {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $v));
};
$safeName  = $sanitizeHeader($name);
$safeEmail = $sanitizeHeader($email);
$safePhone = $sanitizeHeader($phone);

$to      = 'northwind@northwind.hu';
$subject = '=?UTF-8?B?' . base64_encode('Új ajánlatkérés a weboldalról – ' . $safeName) . '?=';

$bodyLines = [
    'Új ajánlatkérés érkezett a northwind.hu weboldalról.',
    '',
    'Név:     ' . $safeName,
    'Email:   ' . $safeEmail,
    'Telefon: ' . ($safePhone !== '' ? $safePhone : '(nincs megadva)'),
    '',
    'Üzenet:',
    '--------------------------------------------------',
    $message,
    '--------------------------------------------------',
    '',
    'Időpont: ' . date('Y-m-d H:i:s'),
    'IP:      ' . ($_SERVER['REMOTE_ADDR'] ?? 'ismeretlen'),
];
$body = implode("\r\n", $bodyLines);

$fromAddress = 'northwind@northwind.hu';

// Csatolmány feldolgozás
$attachment = null;
if (!empty($_FILES['attachment']) && is_array($_FILES['attachment']) && ($_FILES['attachment']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK) {
    $file = $_FILES['attachment'];
    $maxSize = 10 * 1024 * 1024; // 10 MB
    $allowedExt = ['pdf', 'jpg', 'jpeg', 'png'];
    $allowedMime = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $detectedMime = function_exists('mime_content_type') ? mime_content_type($file['tmp_name']) : ($file['type'] ?? '');
    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'A csatolt fájl mérete túl nagy (max. 10 MB).']);
        exit;
    }
    if (!in_array($ext, $allowedExt, true) || !in_array($detectedMime, $allowedMime, true)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Nem támogatott fájlformátum. Engedélyezett: PDF, JPG, JPEG, PNG.']);
        exit;
    }
    $attachment = [
        'name' => preg_replace('/[\r\n"]/', '', basename($file['name'])),
        'mime' => $detectedMime,
        'data' => file_get_contents($file['tmp_name']),
    ];
}

$boundary = '=_NW_' . md5(uniqid('', true));
$headers  = 'From: Northwind Weboldal <' . $fromAddress . ">\r\n";
$headers .= 'Reply-To: ' . $safeName . ' <' . $safeEmail . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";

if ($attachment) {
    $headers .= 'Content-Type: multipart/mixed; boundary="' . $boundary . '"' . "\r\n";
    $multipart  = "--$boundary\r\n";
    $multipart .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $multipart .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $multipart .= $body . "\r\n\r\n";
    $multipart .= "--$boundary\r\n";
    $multipart .= 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['name'] . '"' . "\r\n";
    $multipart .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"' . "\r\n";
    $multipart .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $multipart .= chunk_split(base64_encode($attachment['data'])) . "\r\n";
    $multipart .= "--$boundary--";
    $body = $multipart;
} else {
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
}

$sent = @mail($to, $subject, $body, $headers, '-f' . $fromAddress);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Az üzenet küldése sikertelen.']);
}