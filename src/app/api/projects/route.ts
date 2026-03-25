import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        const projects = await db.collection('projects')
            .find({})
            .sort({ createdAt: -1 })
            .toArray();
        return NextResponse.json(projects || []);
    } catch (error) {
        console.error('Projects API Error:', error);
        // Return empty array instead of error to prevent UI crash
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, category, image, description } = body;

        if (!title || !category || !image) {
            return NextResponse.json(
                { error: 'Title, category, and image are required' },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const project = {
            title,
            category,
            image,
            description: description || '',
            createdAt: new Date()
        };

        const result = await db.collection('projects').insertOne(project);

        return NextResponse.json({
            message: 'Project added successfully',
            id: result.insertedId
        });
    } catch (error) {
        console.error('Error adding project:', error);
        return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const db = await getDatabase();
        await db.collection('projects').deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
