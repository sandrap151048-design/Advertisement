import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        const projects = await db.collection('projects')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        return NextResponse.json({ projects });
    } catch (error) {
        console.error('Projects API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}
