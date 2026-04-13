import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const leadsFile = path.join(dataDir, 'offer-leads.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {}
}

async function readLeads() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(leadsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeLeads(leads: any[]) {
  await ensureDataDir();
  await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));
}

export async function GET() {
  const leads = await readLeads();
  return NextResponse.json({ success: true, data: leads });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, businessName, offerWon, offerId } = body;

    if (!name || !phone || !email || !businessName) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const leads = await readLeads();
    const newLead = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      businessName,
      offerWon,
      offerId,
      date: new Date().toISOString(),
      status: 'pending'
    };

    leads.push(newLead);
    await writeLeads(leads);

    return NextResponse.json({ success: true, data: newLead });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });

  const leads = await readLeads();
  const filtered = leads.filter((l: any) => l.id !== id);
  await writeLeads(filtered);
  return NextResponse.json({ success: true });
}
