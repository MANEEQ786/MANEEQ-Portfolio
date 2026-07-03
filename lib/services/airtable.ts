export interface LeadData {
    name: string;
    email: string;
    meetingTime?: string;
    meetingLink?: string;
    bookingId?: string;
}

export interface LeadRecord extends LeadData {
    airtableRecordId: string;
}

export async function saveLead(data: LeadData): Promise<void> {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME ?? 'Leads';
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !apiKey) {
        console.warn('[Airtable] AIRTABLE_BASE_ID or AIRTABLE_API_KEY not set — skipping lead save.');
        return;
    }

    const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`;

    const fields: Record<string, string> = {
        Name: data.name,
        Email: data.email,
    };
    if (data.meetingTime) fields['Meeting Time'] = data.meetingTime;
    if (data.meetingLink) fields['Meeting Link'] = data.meetingLink;
    if (data.bookingId) fields['Booking ID'] = data.bookingId;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
        const body = await res.text();
        console.error('[Airtable] Save failed:', res.status, body);
        throw new Error(`Airtable save failed: ${res.status}`);
    }

    const record = await res.json();
    console.log('[Airtable] Lead saved. Record ID:', record.id);
}

export async function findLeadByEmail(email: string): Promise<LeadRecord | null> {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME ?? 'Leads';
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !apiKey) {
        throw new Error('Airtable env vars not configured');
    }

    const formula = encodeURIComponent(`{Email}="${email}"`);
    const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}?filterByFormula=${formula}&maxRecords=5`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Airtable search failed: ${res.status} ${body}`);
    }

    const json = await res.json();
    const records: Array<{ id: string; createdTime: string; fields: Record<string, string> }> = json.records ?? [];

    if (records.length === 0) return null;

    const sorted = [...records].sort(
        (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime(),
    );

    const r = sorted[0];
    return {
        airtableRecordId: r.id,
        name: r.fields['Name'] ?? '',
        email: r.fields['Email'] ?? '',
        meetingTime: r.fields['Meeting Time'] ?? '',
        meetingLink: r.fields['Meeting Link'] ?? '',
        bookingId: r.fields['Booking ID'] ?? '',
    };
}

export async function updateLead(recordId: string, fields: Partial<LeadData>): Promise<void> {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME ?? 'Leads';
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !apiKey) {
        throw new Error('Airtable env vars not configured');
    }

    const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}/${recordId}`;

    const updateFields: Record<string, string> = {};
    if (fields.name) updateFields['Name'] = fields.name;
    if (fields.email) updateFields['Email'] = fields.email;
    if (fields.meetingTime) updateFields['Meeting Time'] = fields.meetingTime;
    if (fields.meetingLink) updateFields['Meeting Link'] = fields.meetingLink;
    if (fields.bookingId) updateFields['Booking ID'] = fields.bookingId;

    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: updateFields }),
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Airtable update failed: ${res.status} ${body}`);
    }

    console.log('[Airtable] Lead updated. Record ID:', recordId);
}
