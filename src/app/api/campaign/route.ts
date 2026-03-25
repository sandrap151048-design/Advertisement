import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'campaigns.json');

function readCampaigns() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeCampaigns(campaigns: object[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(campaigns, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, company, service, message } = body;

    if (!name || !phone || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const campaigns = readCampaigns();
    const campaign = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      company: company || null,
      service,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    campaigns.push(campaign);
    writeCampaigns(campaigns);

    return NextResponse.json(
      { message: 'Campaign request submitted successfully!', campaign },
      { status: 201 }
    );
  } catch (error) {
    console.error('Campaign submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit campaign request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const campaigns = readCampaigns();
    const sorted = [...campaigns].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ campaigns: sorted }, { status: 200 });
  } catch (error) {
    console.error('Fetch campaigns error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
