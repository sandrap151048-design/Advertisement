import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const offersFile = path.join(dataDir, 'offers.json');
const settingsFile = path.join(dataDir, 'offer-settings.json');

async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

async function readOffers() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(offersFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeOffers(offers: any[]) {
  try {
    await ensureDataDir();
    await fs.writeFile(offersFile, JSON.stringify(offers, null, 2));
  } catch (error) {
    console.error('Error writing offers to file:', error);
    throw error;
  }
}

async function readSettings() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(settingsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { featuredOfferId: null };
  }
}

async function writeSettings(settings: any) {
  try {
    await ensureDataDir();
    await fs.writeFile(settingsFile, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Error writing settings to file:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');

    const offers = await readOffers();
    
    if (featured === 'true') {
      const settings = await readSettings();
      const featuredOffer = offers.find((o: any) => o.id === settings.featuredOfferId);
      return NextResponse.json({
        success: true,
        data: featuredOffer || null
      });
    }

    return NextResponse.json({
      success: true,
      data: offers
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.discount || !body.description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const offers = await readOffers();

    const newOffer = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      discount: body.discount,
      type: body.type || 'percentage',
      color: body.color || '#e61e25',
      active: body.active !== false,
      createdAt: new Date().toISOString()
    };

    offers.push(newOffer);
    await writeOffers(offers);

    return NextResponse.json({
      success: true,
      data: newOffer,
      message: 'Offer created successfully'
    });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create offer' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Offer ID is required' },
        { status: 400 }
      );
    }

    const offers = await readOffers();
    const offerIndex = offers.findIndex((o: any) => o.id === id);

    if (offerIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    offers[offerIndex] = {
      ...offers[offerIndex],
      ...body,
      id: offers[offerIndex].id,
      createdAt: offers[offerIndex].createdAt
    };

    await writeOffers(offers);

    return NextResponse.json({
      success: true,
      data: offers[offerIndex],
      message: 'Offer updated successfully'
    });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update offer' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Offer ID is required' },
        { status: 400 }
      );
    }

    const offers = await readOffers();
    const filteredOffers = offers.filter((o: any) => o.id !== id);

    if (filteredOffers.length === offers.length) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    await writeOffers(filteredOffers);

    // If deleted offer was featured, clear it
    const settings = await readSettings();
    if (settings.featuredOfferId === id) {
      settings.featuredOfferId = null;
      await writeSettings(settings);
    }

    return NextResponse.json({
      success: true,
      message: 'Offer deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete offer' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { featuredOfferId } = body;

    if (!featuredOfferId) {
      return NextResponse.json(
        { success: false, error: 'Featured offer ID is required' },
        { status: 400 }
      );
    }

    const offers = await readOffers();
    const offerExists = offers.find((o: any) => o.id === featuredOfferId);

    if (!offerExists) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    const settings = await readSettings();
    settings.featuredOfferId = featuredOfferId;
    await writeSettings(settings);

    return NextResponse.json({
      success: true,
      message: 'Featured offer updated successfully',
      data: settings
    });
  } catch (error) {
    console.error('Error updating featured offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update featured offer' },
      { status: 500 }
    );
  }
}
