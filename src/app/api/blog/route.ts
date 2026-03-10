import { NextRequest, NextResponse } from 'next/server';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: string;
    status: 'published' | 'draft';
    readTime: string;
}

// In-memory storage (in production, use a database)
let blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Latest Signage Design Trends in UAE 2024',
        excerpt: 'Discover the cutting-edge design trends shaping the advertising landscape in the UAE this year.',
        content: `
            <h2>The Evolution of Signage Design in the UAE</h2>
            <p>The UAE's advertising landscape is constantly evolving, driven by technological advancements and changing consumer preferences. In 2024, we're seeing several key trends that are reshaping how businesses communicate with their audiences.</p>
            
            <h3>1. Sustainable Materials and Eco-Friendly Designs</h3>
            <p>Environmental consciousness is becoming increasingly important in the UAE. Businesses are now opting for sustainable materials like recycled aluminum, bamboo composites, and solar-powered LED systems. This shift not only reduces environmental impact but also appeals to eco-conscious consumers.</p>
            
            <h3>2. Interactive Digital Displays</h3>
            <p>Touch-enabled displays and QR code integration are becoming standard. These interactive elements allow customers to engage directly with brands, access additional information, and even make purchases on the spot.</p>
            
            <h3>3. Minimalist Arabic Typography</h3>
            <p>Clean, modern Arabic fonts are gaining popularity, especially in Dubai and Abu Dhabi. This trend reflects the UAE's commitment to preserving cultural identity while embracing contemporary design principles.</p>
            
            <h3>4. Smart Signage with IoT Integration</h3>
            <p>Internet of Things (IoT) technology is enabling signs to collect data, adjust content based on weather conditions, and even monitor foot traffic patterns. This data-driven approach helps businesses optimize their advertising strategies.</p>
            
            <h3>Conclusion</h3>
            <p>As we move through 2024, the key to successful signage in the UAE lies in balancing innovation with cultural sensitivity, sustainability with functionality, and technology with human connection.</p>
        `,
        author: 'Design Team',
        date: '2024-03-10',
        category: 'Design Trends',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        status: 'published',
        readTime: '5 min read'
    },
    {
        id: '2',
        title: 'ROI Analysis: Digital vs Traditional Signage',
        excerpt: 'A comprehensive case study comparing the return on investment between digital and traditional advertising methods.',
        content: `
            <h2>Understanding ROI in Modern Advertising</h2>
            <p>In today's competitive market, businesses need to make informed decisions about their advertising investments. This comprehensive analysis examines the return on investment (ROI) of digital versus traditional signage solutions.</p>
            
            <h3>Traditional Signage: The Foundation</h3>
            <p>Traditional signage has been the backbone of outdoor advertising for decades. Our analysis of 50 UAE businesses shows:</p>
            <ul>
                <li>Average ROI: 150-200% over 3 years</li>
                <li>Lower initial maintenance costs</li>
                <li>Proven durability in harsh UAE climate</li>
                <li>One-time content creation cost</li>
            </ul>
            
            <h3>Digital Signage: The Future</h3>
            <p>Digital displays offer dynamic content capabilities and real-time updates:</p>
            <ul>
                <li>Average ROI: 250-350% over 3 years</li>
                <li>Higher initial investment but lower long-term content costs</li>
                <li>Ability to display multiple campaigns</li>
                <li>Real-time performance tracking</li>
            </ul>
            
            <h3>Case Study: Dubai Mall Retailer</h3>
            <p>A major retailer in Dubai Mall switched from traditional to digital signage and saw:</p>
            <ul>
                <li>40% increase in foot traffic</li>
                <li>25% boost in sales conversion</li>
                <li>60% reduction in content update costs</li>
                <li>ROI improvement from 180% to 320%</li>
            </ul>
            
            <h3>Recommendations</h3>
            <p>The choice between digital and traditional signage depends on your specific needs, budget, and location. For high-traffic areas with frequent content changes, digital signage offers superior ROI. For permanent branding in stable locations, traditional signage remains cost-effective.</p>
        `,
        author: 'Marketing Team',
        date: '2024-03-08',
        category: 'Case Studies',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        status: 'published',
        readTime: '8 min read'
    },
    {
        id: '3',
        title: 'Dubai Municipality Signage Regulations Update',
        excerpt: 'Important updates to signage regulations in Dubai that every business owner should know.',
        content: `
            <h2>New Signage Regulations in Dubai</h2>
            <p>Dubai Municipality has updated its signage regulations to ensure better urban aesthetics and safety standards. Here's what businesses need to know.</p>
            
            <h3>Key Changes</h3>
            <ul>
                <li>New size restrictions for commercial signage</li>
                <li>Updated color guidelines for heritage areas</li>
                <li>Digital display brightness limitations</li>
                <li>Enhanced safety requirements for installation</li>
            </ul>
            
            <h3>Compliance Timeline</h3>
            <p>All existing signage must comply with new regulations by December 2024. New installations must follow updated guidelines immediately.</p>
        `,
        author: 'Legal Team',
        date: '2024-03-05',
        category: 'Regulations',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        status: 'published',
        readTime: '6 min read'
    }
];

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const status = searchParams.get('status');

        if (id) {
            // Get single post
            const post = blogPosts.find(p => p.id === id);
            if (!post) {
                return NextResponse.json(
                    { error: 'Post not found' },
                    { status: 404 }
                );
            }
            return NextResponse.json(post);
        }

        // Get all posts (filter by status if provided)
        let filteredPosts = blogPosts;
        if (status && status !== 'all') {
            filteredPosts = blogPosts.filter(post => post.status === status);
        }

        return NextResponse.json(filteredPosts);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const postData = await request.json();
        
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: postData.title,
            excerpt: postData.excerpt,
            content: postData.content,
            author: postData.author || 'Admin',
            date: new Date().toISOString().split('T')[0],
            category: postData.category,
            image: postData.image,
            status: postData.status || 'draft',
            readTime: `${Math.ceil(postData.content.length / 1000)} min read`
        };

        blogPosts.unshift(newPost);

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const postData = await request.json();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        const postIndex = blogPosts.findIndex(p => p.id === id);
        if (postIndex === -1) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const updatedPost: BlogPost = {
            ...blogPosts[postIndex],
            title: postData.title,
            excerpt: postData.excerpt,
            content: postData.content,
            author: postData.author,
            category: postData.category,
            image: postData.image,
            status: postData.status,
            readTime: `${Math.ceil(postData.content.length / 1000)} min read`
        };

        blogPosts[postIndex] = updatedPost;

        return NextResponse.json(updatedPost);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update post' },
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
                { error: 'Post ID is required' },
                { status: 400 }
            );
        }

        const postIndex = blogPosts.findIndex(p => p.id === id);
        if (postIndex === -1) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        blogPosts.splice(postIndex, 1);

        return NextResponse.json(
            { message: 'Post deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}