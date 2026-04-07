import { NextRequest, NextResponse } from 'next/server';

// Store offers in a variable (in production, use a database)
let offersStore: any[] = [
  {
    _id: '1',
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    companyName: 'Test Company',
    offer: {
      id: '1',
      title: '20% Off Advertisement Package',
      description: 'Get 20% discount on any advertisement package worth $500+',
      discount: '20%',
      type: 'percentage',
      color: '#3b82f6'
    },
    scratchedAt: new Date().toISOString(),
    source: 'homepage_hero_scratch',
    claimed: true,
    createdAt: new Date().toISOString(),
    ipAddress: '127.0.0.1',
    status: 'claimed',
    userAgent: 'Mozilla/5.0',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'all';
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

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
      todayOffers: offersStore.filter(offer => 
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

    // Store in memory
    offersStore.push(newOffer);
    
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