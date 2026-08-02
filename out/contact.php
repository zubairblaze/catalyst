<?php
/**
 * contact.php — Server-side mailer for The Catalyst FZE website.
 *
 * This file is placed in the root of the static export (public/ → out/).
 * Apache/cPanel runs it as a normal PHP file alongside the static HTML.
 *
 * Configure SMTP by either:
 *   A) Setting environment variables in cPanel → "Setup Node.js App" / PHP env
 *   B) Editing the $config array below directly.
 *
 * Uses PHP's built-in mail() when SMTP_ vars are absent, or cPanel's
 * configured default SMTP.  For a custom SMTP add PHPMailer via Composer
 * (see the comment at the bottom of this file).
 */

// ─── CORS / headers ────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Allow the same origin only (tighten to your domain in production)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://thecatalystfze.com', 'https://www.thecatalystfze.com'];
if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: *'); // loosen only during dev
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

// ─── Config (override with env vars on cPanel) ────────────────────────────
$config = [
    'to'       => getenv('CONTACT_TO')  ?: 'info@thecatalystfze.com',
    'from'     => getenv('SMTP_FROM')   ?: 'The Catalyst Website <info@thecatalystfze.com>',
    'replyTo'  => '',   // filled in below from form data
];

// ─── Parse JSON body ──────────────────────────────────────────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid request.']);
    exit;
}

// ─── Honeypot ─────────────────────────────────────────────────────────────
// Bots fill the hidden "company" field; humans never see it.
if (!empty($data['company'])) {
    // Silently accept — do not tip off bots.
    echo json_encode(['ok' => true, 'delivered' => false]);
    exit;
}

// ─── Validate ─────────────────────────────────────────────────────────────
$name    = trim($data['name']    ?? '');
$email   = trim($data['email']   ?? '');
$message = trim($data['message'] ?? '');
$phone   = trim($data['phone']   ?? '');
$service = trim($data['service'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill in your name, email and message.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

// ─── Build email ──────────────────────────────────────────────────────────
function esc(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$subject = "New enquiry from {$name}" . ($service ? " — {$service}" : '');

$rows = [
    ['Name',    $name],
    ['Email',   $email],
    ['Phone',   $phone   ?: '—'],
    ['Service', $service ?: '—'],
];

// Plain-text body
$textParts = array_map(fn($r) => "{$r[0]}: {$r[1]}", $rows);
$textBody  = implode("\n", $textParts) . "\n\nMessage:\n{$message}";

// HTML body
$tableRows = implode('', array_map(
    fn($r) => '<tr>'
        . '<td style="padding:4px 12px 4px 0;color:#64748b">' . esc($r[0]) . '</td>'
        . '<td style="padding:4px 0"><strong>' . esc($r[1]) . '</strong></td>'
        . '</tr>',
    $rows
));

$htmlBody = <<<HTML
<div style="font-family:Arial,sans-serif;color:#0f172a">
  <h2 style="color:#0641b4;margin:0 0 12px">New website enquiry</h2>
  <table style="border-collapse:collapse">{$tableRows}</table>
  <p style="margin:16px 0 6px;color:#64748b">Message</p>
  <p style="white-space:pre-wrap;margin:0">{$htmlBody_msg}</p>
</div>
HTML;

// Fix: build the message part separately to avoid heredoc interpolation issues
$htmlBody = str_replace('{$htmlBody_msg}', esc($message), $htmlBody);

// ─── Send via PHP mail() ──────────────────────────────────────────────────
// cPanel automatically routes mail() through your domain's mail server.
// If you need a custom SMTP, install PHPMailer (see instructions below).
$boundary = md5(uniqid('', true));
$headers  = implode("\r\n", [
    "From: {$config['from']}",
    "Reply-To: {$name} <{$email}>",
    'MIME-Version: 1.0',
    "Content-Type: multipart/alternative; boundary=\"{$boundary}\"",
    'X-Mailer: PHP/' . PHP_VERSION,
]);

$body  = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $textBody . "\r\n\r\n";
$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=utf-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n";
$body .= $htmlBody . "\r\n\r\n";
$body .= "--{$boundary}--";

$sent = mail($config['to'], $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true, 'delivered' => true]);
} else {
    // mail() failed — this usually means cPanel mail is misconfigured.
    // The JS falls back to mailto: automatically.
    http_response_code(502);
    echo json_encode([
        'ok'    => false,
        'error' => 'Could not send your message. Please email us directly.',
    ]);
}

/*
 * ─────────────────────────────────────────────────────────────────────────
 * TO USE A CUSTOM SMTP SERVER (e.g. Gmail, SendGrid, Mailgun):
 *
 * 1. Upload PHPMailer to your cPanel (e.g. in /home/user/vendor/phpmailer/):
 *    wget https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.3.zip
 *    unzip v6.9.3.zip
 *
 * 2. Replace the mail() block above with:
 *
 *    require '/home/YOUR_CPANEL_USER/vendor/phpmailer/phpmailer/src/PHPMailer.php';
 *    require '/home/YOUR_CPANEL_USER/vendor/phpmailer/phpmailer/src/SMTP.php';
 *    require '/home/YOUR_CPANEL_USER/vendor/phpmailer/phpmailer/src/Exception.php';
 *
 *    $mailer = new PHPMailer\PHPMailer\PHPMailer(true);
 *    $mailer->isSMTP();
 *    $mailer->Host       = getenv('SMTP_HOST') ?: 'mail.thecatalystfze.com';
 *    $mailer->SMTPAuth   = true;
 *    $mailer->Username   = getenv('SMTP_USER') ?: 'info@thecatalystfze.com';
 *    $mailer->Password   = getenv('SMTP_PASS') ?: '';
 *    $mailer->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
 *    $mailer->Port       = (int)(getenv('SMTP_PORT') ?: 465);
 *    $mailer->setFrom(getenv('SMTP_USER'), 'The Catalyst Website');
 *    $mailer->addAddress($config['to']);
 *    $mailer->addReplyTo($email, $name);
 *    $mailer->isHTML(true);
 *    $mailer->Subject = $subject;
 *    $mailer->Body    = $htmlBody;
 *    $mailer->AltBody = $textBody;
 *    $sent = $mailer->send();
 * ─────────────────────────────────────────────────────────────────────────
 */
