import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const settingsFile = path.join(dataDir, 'offer-settings.json');

const defaultSettings = {
  enabled: true,
  limit: 100,
  expiryDate: '2026-12-31',
  offers: [
    { id: '1', title: '20% Discount on Services',  discount: '20% OFF', description: 'On your first advertising campaign', color: '#e61e25' },
    { id: '2', title: 'Free Branding Package',      discount: 'FREE',    description: 'Full corporate identity design', color: '#3b82f6' },
    { id: '3', title: 'Advertisement Design',       discount: 'FREE',    description: 'Professional billboard design', color: '#10b981' },
    { id: '4', title: 'Expert Consultation',        discount: 'FREE',    description: 'One-on-one strategy session', color: '#f59e0b' },
    { id: '5', title: 'Social Media Promotion',     discount: 'FREE',    description: 'One week of targeted social ads', color: '#8b5cf6' },
  ]
};

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {}
}

async function readSettings() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(settingsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultSettings;
  }
}

async function writeSettings(settings: any) {
  await ensureDataDir();
  await fs.writeFile(settingsFile, JSON.stringify(settings, null, 2));
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json({ success: true, ...settings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await writeSettings(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save settings' }, { status: 500 });
  }
}
