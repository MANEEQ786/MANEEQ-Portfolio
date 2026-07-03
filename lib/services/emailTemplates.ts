/** Professional HTML email templates for portfolio — EN */

const B = {
    primary:     '#2563eb',
    primaryDark: '#1d4ed8',
    dark:        '#111827',
    gray:        '#64748b',
    lightGray:   '#f1f5f9',
    border:      '#e2e8f0',
    white:       '#ffffff',
};

function layout(title: string, body: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:40px 16px">
<table role="presentation" style="max-width:580px;width:100%;border-collapse:collapse">

  <tr><td style="padding:0 0 20px;text-align:center">
    <a href="https://saqibmasood.com" style="text-decoration:none">
      <span style="font-size:24px;font-weight:800;color:${B.primary}">Saqib</span><span style="font-size:24px;font-weight:800;color:${B.dark}"> Masood</span>
    </a>
  </td></tr>

  <tr><td style="background:${B.white};border-radius:16px;overflow:hidden;border:1px solid ${B.border};box-shadow:0 4px 24px rgba(0,0,0,0.06)">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

      <tr><td style="background:linear-gradient(135deg,${B.primary} 0%,${B.primaryDark} 100%);padding:32px 40px">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:2px;text-transform:uppercase">AI Strategy & Product</p>
        <h1 style="margin:0;font-size:26px;font-weight:800;color:#fff;line-height:1.25">${title}</h1>
      </td></tr>

      ${body}

      <tr><td style="padding:20px 40px;background:#f8fafc;border-top:1px solid ${B.border};text-align:center">
        <p style="margin:0 0 4px;font-size:12px;color:#94a3b8">Saqib Masood · AI Strategy &amp; Product Leader</p>
        <p style="margin:0;font-size:12px"><a href="https://visiontact.com" style="color:${B.primary};text-decoration:none">visiontact.com</a></p>
      </td></tr>

    </table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function row(icon: string, label: string, value: string): string {
    return `<tr>
  <td style="padding:10px 0;vertical-align:top;width:20px;font-size:15px">${icon}</td>
  <td style="padding:10px 0 10px 10px;vertical-align:top;width:130px;font-size:12px;font-weight:700;color:${B.gray};text-transform:uppercase;letter-spacing:0.5px">${label}</td>
  <td style="padding:10px 0 10px 10px;vertical-align:top;font-size:14px;color:${B.dark};font-weight:500">${value}</td>
</tr>`;
}

function btn(text: string, url: string): string {
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto">
  <tr><td style="border-radius:10px;background:${B.primary}">
    <a href="${url}" target="_blank" style="display:inline-block;padding:14px 36px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;border-radius:10px;letter-spacing:0.2px">${text}</a>
  </td></tr>
</table>`;
}

// ── User confirmation: meeting booked ────────────────────────────────────────

export function userMeetingEmail(data: {
    name: string;
    meetingTime: string | null;
    meetingLink: string;
    locale?: string;
}): string {
    const rows: string[] = [];
    if (data.meetingTime) rows.push(row('📅', 'Date & Time', `${data.meetingTime} (PKT)`));
    if (data.meetingLink) rows.push(row('🔗', 'Meeting', `<a href="${data.meetingLink}" style="color:${B.primary};text-decoration:none;font-weight:600">Join Video Call</a>`));

    return layout('Demo Meeting Confirmed ✅', `
<tr><td style="padding:32px 40px">
  <p style="margin:0 0 6px;font-size:16px;color:${B.dark};line-height:1.75">
    Hi <strong>${data.name}</strong>,
  </p>
  <p style="margin:0 0 28px;font-size:15px;color:${B.gray};line-height:1.75">
    Your demo meeting with <strong>Saqib Masood</strong> has been successfully scheduled.
  </p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid ${B.border};margin-bottom:28px">
    <tr><td style="padding:20px 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>
    </td></tr>
  </table>

  ${data.meetingLink ? btn('Join Meeting', data.meetingLink) : ''}

  <p style="margin:28px 0 0;font-size:13px;color:${B.gray};line-height:1.75;text-align:center;border-top:1px solid ${B.border};padding-top:20px">
    Need to reschedule? Simply reply to this email and we'll help you find a new time.
  </p>
</td></tr>`);
}

// ── Team notification: new meeting booked ────────────────────────────────────

export function teamMeetingEmail(data: {
    name: string;
    email: string;
    phone?: string;
    meetingTime: string | null;
    meetingLink: string;
    bookingId: string;
    locale?: string;
}): string {
    const rows = [
        row('👤', 'Name', data.name),
        row('📧', 'Email', `<a href="mailto:${data.email}" style="color:${B.primary};text-decoration:none">${data.email}</a>`),
    ];
    if (data.phone) rows.push(row('📞', 'Phone', data.phone));
    if (data.meetingTime) rows.push(row('📅', 'Date & Time', `${data.meetingTime} (PKT)`));
    if (data.meetingLink) rows.push(row('🔗', 'Join Link', `<a href="${data.meetingLink}" style="color:${B.primary};text-decoration:none">${data.meetingLink}</a>`));
    if (data.bookingId) rows.push(row('🆔', 'Booking ID', `<code style="font-size:12px;background:${B.lightGray};padding:2px 6px;border-radius:4px">${data.bookingId}</code>`));

    return layout('New Demo Booking 🎯', `
<tr><td style="padding:32px 40px">
  <p style="margin:0 0 6px;font-size:15px;color:${B.dark};line-height:1.75">
    A new demo meeting has been booked via your portfolio AI voice assistant.
  </p>
  <p style="margin:0 0 24px;font-size:13px;color:${B.gray}">Please review the details and prepare for the meeting.</p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid ${B.border};margin-bottom:24px">
    <tr><td style="padding:20px 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>
    </td></tr>
  </table>

  <p style="margin:0;font-size:11px;color:#94a3b8;text-align:center">Sent automatically by Portfolio AI Voice Assistant</p>
</td></tr>`);
}

// ── Team notification: new lead (no meeting) ─────────────────────────────────

export function teamLeadEmail(data: {
    name: string;
    email: string;
    locale?: string;
}): string {
    const rows = [
        row('👤', 'Name', data.name),
        row('📧', 'Email', `<a href="mailto:${data.email}" style="color:${B.primary};text-decoration:none">${data.email}</a>`),
        row('🤖', 'Source', 'Portfolio Voice Assistant'),
    ];

    return layout('New Lead Captured 🚀', `
<tr><td style="padding:32px 40px">
  <p style="margin:0 0 6px;font-size:15px;color:${B.dark};line-height:1.75">
    A new lead has been captured via your portfolio AI voice assistant.
  </p>
  <p style="margin:0 0 24px;font-size:13px;color:${B.gray}">Please follow up promptly to maximize conversion.</p>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;border:1px solid ${B.border};margin-bottom:28px">
    <tr><td style="padding:20px 24px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.join('')}</table>
    </td></tr>
  </table>

  ${btn('Reply to Lead', `mailto:${data.email}?subject=Demo Follow-up`)}

  <p style="margin:24px 0 0;font-size:11px;color:#94a3b8;text-align:center">Sent automatically by Portfolio AI Voice Assistant</p>
</td></tr>`);
}
