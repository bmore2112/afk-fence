<?php
declare(strict_types=1);

const RECIPIENT = 'afkfence@gmail.com';
const FROM_DOMAIN = 'afkfence.com';
const MIN_SECONDS_ON_PAGE = 3;
const RATE_LIMIT_SECONDS = 60;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function field(string $key, int $max): string
{
    $value = isset($_POST[$key]) ? (string) $_POST[$key] : '';
    $value = trim(str_replace(["\r", "\0"], '', $value));
    return mb_substr($value, 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

if (field('website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$startedAt = (int) field('ts', 20);
if ($startedAt > 0 && (time() - (int) ($startedAt / 1000)) < MIN_SECONDS_ON_PAGE) {
    respond(200, ['ok' => true]);
}

session_start();
$last = $_SESSION['afk_last_submit'] ?? 0;
if (time() - (int) $last < RATE_LIMIT_SECONDS) {
    respond(429, ['ok' => false, 'error' => 'too_many_requests']);
}

$name = field('name', 100);
$phone = field('phone', 30);
$email = field('email', 150);
$location = field('location', 120);
$service = field('service', 60);
$message = field('message', 3000);

$errors = [];
if ($name === '') {
    $errors[] = 'name';
}
if (strlen(preg_replace('/\D/', '', $phone)) < 10) {
    $errors[] = 'phone';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'invalid_fields', 'fields' => $errors]);
}

$singleLine = static fn(string $v): string => preg_replace('/[\r\n]+/', ' ', $v);

$body = implode("\n", [
    'New fence quote request from afkfence.com',
    '----------------------------------------',
    'Name:     ' . $singleLine($name),
    'Phone:    ' . $singleLine($phone),
    'Email:    ' . $singleLine($email),
    'Location: ' . $singleLine($location),
    'Service:  ' . $singleLine($service),
    '',
    'Project details:',
    $message,
    '',
    'Submitted: ' . date('Y-m-d H:i:s T'),
]);

$headers = implode("\r\n", [
    'From: AFK Fence Website <no-reply@' . FROM_DOMAIN . '>',
    'Reply-To: ' . $singleLine($email),
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$subject = 'Fence Quote Request: ' . $singleLine($name) . ($service ? ' (' . $singleLine($service) . ')' : '');

if (!mail(RECIPIENT, $subject, $body, $headers)) {
    error_log('[afk-fence] mail() failed for quote from ' . $email);
    respond(500, ['ok' => false, 'error' => 'send_failed']);
}

$_SESSION['afk_last_submit'] = time();
respond(200, ['ok' => true]);
