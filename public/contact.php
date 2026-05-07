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

// JSON vagy form-encoded bemenet támogatása
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
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
$headers  = 'From: Northwind Weboldal <' . $fromAddress . ">\r\n";
$headers .= 'Reply-To: ' . $safeName . ' <' . $safeEmail . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, $headers, '-f' . $fromAddress);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Az üzenet küldése sikertelen.']);
}