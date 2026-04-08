import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Path to store offers data
const dataDir = path.join(process.cwd(), 'data');
const offersFile = path.join(dataDir, 'scratch-offers.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Read offers from file
async function readOffers() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(offersFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

// Write offers to file
async function writeOffers(offers: any[]) {
  try {
    await ensureDataDir();
    await fs.writeFile(offersFile, JSON.stringify(offers, null, 2));
  } catch (error) {
    console.error('Error writing offers to file:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'all';
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    // Read offers from file
    const offersStore = await readOffers();

    // Filter offers based on parameters
    let filteredOffers = [...offersStore];
    
    if (status !== 'all') {
      filteredOffers = filteredOffers.filter(offer => offer.status === status);
    }
    
    if (dateFrom) {
      filteredOffers = filteredOffers.filter(offer => 
        new Date(offer.createdAt) >= new Date(dateFrom)
      );
    }
    
    if (dateTo) {
      filteredOffers = filteredOffers.filter(offer => 
        new Date(offer.createdAt) <= new Date(dateTo)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOffers = filteredOffers.slice(startIndex, endIndex);

    // Statistics
    const statistics = {
      totalOffers: offersStore.length,
      todayOffers: offersStore.filter((offer: any) => 
        new Date(offer.createdAt).toDateString() === new Date().toDateString()
      ).length,
      offerTypes: ['percentage', 'free', 'fixed']
    };

    // Pagination info
    const pagination = {
      page,
      limit,
      total: filteredOffers.length,
      pages: Math.ceil(filteredOffers.length / limit)
    };

    return NextResponse.json({
      success: true,
      data: paginatedOffers,
      pagination,
      statistics
    });

  } catch (error) {
    console.error('Error fetching scratch offers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch scratch offers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.offer) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Read existing offers
    const offersStore = await readOffers();

    // Create new offer entry
    const newOffer = {
      _id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      companyName: body.companyName || '',
      offer: body.offer,
      scratchedAt: body.scratchedAt || new Date().toISOString(),
      source: body.source || 'homepage',
      claimed: false,
      createdAt: new Date().toISOString(),
      ipAddress: request.ip || '127.0.0.1',
      status: 'claimed',
      userAgent: request.headers.get('user-agent') || '',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Add to offers and save to file
    offersStore.push(newOffer);
    await writeOffers(offersStore);
    
    console.log('New offer saved:', newOffer);
    console.log('Total offers:', offersStore.length);

    return NextResponse.json({
      success: true,
      data: newOffer,
      message: 'Scratch offer saved successfully'
    });

  } catch (error) {
    console.error('Error saving scratch offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save scratch offer' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const offerId = searchParams.get('id');

    if (!offerId) {
      return NextResponse.json(
        { success: false, error: 'Offer ID is required' },
        { status: 400 }
      );
    }

    // Read existing offers
    const offersStore = await readOffers();

    // Filter out the offer to delete
    const updatedOffers = offersStore.filter((offer: any) => offer._id !== offerId);

    // Check if offer was found
    if (updatedOffers.length === offersStore.length) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    // Save updated offers
    await writeOffers(updatedOffers);

    console.log('Offer deleted:', offerId);
    console.log('Total offers remaining:', updatedOffers.length);

    return NextResponse.json({
      success: true,
      message: 'Offer deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting scratch offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete scratch offer' },
      { status: 500 }
    );
  }
}