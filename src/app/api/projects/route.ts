import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function readProjects() {
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

function writeProjects(projects: object[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const projects = readProjects();
    const sorted = [...projects].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
    return NextResponse.json({ projects: sorted }, { status: 200 });
  } catch (error) {
    console.error('Fetch projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, image, clientName } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const projects = readProjects();
    const project = {
      id: Date.now().toString(),
      title,
      description,
      category,
      image,
      clientName: clientName || null,
      status: 'published',
      createdAt: new Date().toISOString()
    };

    projects.push(project);
    writeProjects(projects);

    return NextResponse.json(
      { message: 'Project created successfully!', project },
      { status: 201 }
    );
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
