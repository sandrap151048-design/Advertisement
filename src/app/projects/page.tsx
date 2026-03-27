"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, 
    Image as ImageIcon,
    Layout,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    images: string[];
    detailsTitle?: string;
}

const ALL_PROJECTS: Project[] = [
    {
        id: 'def-1',
        title: 'Brand Identity Showcase',
        description: 'Complete visual identity transformation featuring premium logo design, color theory application, and comprehensive brand guidelines for a global corporate client.',
        category: 'Brand Identity',
        images: [
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
        ]
    },
    {
        id: 'def-2',
        title: 'Digital Printing Excellence',
        description: 'High-precision large format printing for luxury retail displays, capturing vibrant colors and sharp details to maximize visual pull in high-traffic shopping malls.',
        category: 'Digital Printing',
        images: [
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
            'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80'
        ]
    },
    {
        id: 'def-2-2',
        title: 'Indoor Creative Displays',
        description: 'Innovative indoor banner solutions for corporate environments, utilizing premium materials and high-definition printing to deliver clear and professional brand messaging.',
        category: 'Digital Printing',
        images: [
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80'
        ]
    },
    {
        id: 'def-3',
        title: 'Premium Vehicle Wraps',
        description: 'State-of-the-art vehicle branding for commercial fleets, using high-durability vinyl to ensure long-lasting brand visibility across the UAE.',
        category: 'Vehicle Branding',
        images: [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
            'https://images.unsplash.com/photo-1603380353725-f8a4d39cc41e?w=800&q=80'
        ]
    },
    {
        id: 'def-4',
        title: 'Strategic Signage Systems',
        description: 'High-visibility 3D LED signage installations designed for maximum impact in premium commercial districts, ensuring your brand stays visible 24/7.',
        category: 'Signage',
        images: [
            'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
            'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80'
        ]
    },
    {
        id: 'def-4-2',
        title: 'Commercial Wayfinding',
        description: 'Comprehensive wayfinding and directional signage solutions for large-scale developments, merging functionality with sophisticated design.',
        category: 'Signage',
        images: [
            'https://images.unsplash.com/photo-1581447100511-c0536294e19b?w=800&q=80',
            'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=800&q=80'
        ]
    },
    {
        id: 'def-5',
        title: 'POS Display Solutions',
        description: 'Custom-designed point-of-sale displays focused on driving customer engagement and maximizing product visibility in competitive retail settings.',
        category: 'Display Solutions',
        images: [
            'https://images.unsplash.com/photo-1531053326607-9d349096d887?w=800&q=80',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80'
        ]
    },
    {
        id: 'def-6',
        title: 'Architectural Facades',
        description: 'Premium building facade solutions combining high-quality ACP cladding with integrated signage to create a powerful architectural identity.',
        category: 'Facade & Cladding',
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
        ]
    }
];

function ProjectsContent() {
    const router = useRouter();
    const [filterCategory, setFilterCategory] = useState('All');
    const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const categories = [
        'All', 'Brand Identity', 'Digital Printing', 'Vehicle Branding', 
        'Display Solutions', 'Signage', 'Facade & Cladding'
    ];

    useEffect(() => {
        fetchDynamicProjects();
    }, []);

    const fetchDynamicProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.projects) {
                // Adapt dynamic projects to public interface
                const adapted = data.projects.map((p: any) => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    category: p.category,
                    images: p.image ? [p.image] : [],
                    detailsTitle: p.title
                }));
                setDynamicProjects(adapted);
            }
        } catch (error) {
            console.error('Error fetching dynamic projects:', error);
        }
        setIsLoading(false);
    };

    const combinedProjects = [...ALL_PROJECTS, ...dynamicProjects];

    const filteredProjects = combinedProjects.filter(p => {
        if (filterCategory === 'All') return true;
        return p.category.toLowerCase().includes(filterCategory.toLowerCase());
    });

    const CATEGORY_IMAGES: { [key: string]: string[] } = {
        'Brand Identity': [
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
            'https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80'
        ],
        'Digital Printing': [
            'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&q=80',
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80'
        ],
        'Vehicle Branding': [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80'
        ],
        'Display Solutions': [
            'https://images.unsplash.com/photo-1531053326607-9d349096d887?w=800&q=80',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80'
        ],
        'Signage': [
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
            'https://images.unsplash.com/photo-1581447100511-c0536294e19b?w=800&q=80'
        ],
        'Facade & Cladding': [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'
        ]
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        router.push('/');
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    return (
        <div style={{ background: '#ffffff', minHeight: '100vh', color: '#1a1a1a' }}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
                
                .container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
                
                .hero-works {
                    position: relative;
                    height: 95vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80') center/cover no-repeat;
                    overflow: hidden;
                    text-align: center;
                }
                .hero-works-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 1;
                }
                .hero-works-content {
                    position: relative;
                    z-index: 2;
                }
                .hero-works-h1 {
                    font-size: clamp(3rem, 8vw, 6rem);
                    font-weight: 900;
                    color: white;
                    letter-spacing: -2px;
                    line-height: 1;
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                }
                .hero-works-h1 span {
                    color: #e61e25;
                }
                .hero-works-tagline {
                    color: white;
                    font-size: 1.5rem;
                    letter-spacing: 2px;
                    opacity: 0.9;
                    font-weight: 500;
                }
                
                .section-header {
                    padding: 80px 0 60px 0;
                    text-align: center;
                    background: #fdfdfd;
                }
                .title-our {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 0.2rem;
                    color: #000;
                }
                .title-projects {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-size: 3rem;
                    color: #000;
                    margin-bottom: 2rem;
                }
                .header-desc {
                    max-width: 800px;
                    margin: 0 auto;
                    color: #444;
                    font-size: 1.1rem;
                    line-height: 1.6;
                    font-weight: 500;
                }
                
                .category-nav {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    margin-bottom: 80px;
                    padding: 0 20px;
                }
                .cat-btn {
                    padding: 0.6rem 1.8rem;
                    border-radius: 4px;
                    border: 1px solid #ddd;
                    background: white;
                    color: #444;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 0.85rem;
                }
                .cat-btn.active {
                    background: #111;
                    color: white;
                    border-color: #111;
                }
                
                .project-cluster {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 40px;
                    margin-bottom: 100px;
                    align-items: center;
                }
                .cluster-text {
                    background: white;
                    padding: 60px;
                    border: 1px solid rgba(0,0,0,0.05);
                    border-radius: 24px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.03);
                }
                .cluster-title {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 2rem;
                    letter-spacing: -1px;
                }
                .cluster-desc {
                    color: #666;
                    line-height: 1.8;
                    font-size: 1.05rem;
                }
                .cluster-images {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .cluster-images.single {
                    grid-template-columns: 1fr;
                }
                .cluster-img {
                    width: 100%;
                    height: 500px;
                    object-fit: cover;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                
                .project-overview-bg {
                    position: relative;
                    padding: 160px 0;
                    background: url('https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1600&q=80') center/cover no-repeat;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-top: 100px;
                }
                .project-overview-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.4);
                    z-index: 1;
                }
                .project-overview-glass {
                    position: relative;
                    z-index: 2;
                    max-width: 900px;
                    background: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(30px);
                    -webkit-backdrop-filter: blur(30px);
                    padding: 5rem 3rem;
                    border-radius: 32px;
                    text-align: center;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .cta-btn-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 1rem 2.5rem;
                    background: #f0f0f0;
                    color: #1a1a1a;
                    font-weight: 800;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 1.1rem;
                    margin-top: 2rem;
                }
                .cta-btn-pill:hover {
                    background: white;
                    transform: translateY(-4px);
                }
                
                @media (max-width: 1024px) {
                    .project-cluster { grid-template-columns: 1fr; }
                    .cluster-img { height: 350px; }
                }
            `}</style>

            <header className="hero-works">
                <div className="hero-works-overlay"></div>
                <div className="hero-works-content">
                    <motion.h1 
                        className="hero-works-h1"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Our <span>Impact</span>
                    </motion.h1>
                    <motion.div 
                        className="hero-works-tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Real campaigns. Real impact.
                    </motion.div>
                </div>
            </header>

            <section className="section-header">
                <div className="container">
                    <div className="title-our">Our</div>
                    <div className="title-projects">Projects</div>
                    <p className="header-desc">
                        Explore real world advertising campaigns crafted to maximize visibility, attract attention, and deliver strong brand impact across prime locations.
                    </p>
                </div>
            </section>

            <div className="category-nav">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`cat-btn ${filterCategory === cat ? 'active' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <section style={{ paddingBottom: '100px' }}>
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filterCategory}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}
                        >
                            {isLoading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                                    <Loader2 className="animate-spin" size={40} color="#e61e25" />
                                </div>
                            ) : filteredProjects.length > 0 ? (
                                filteredProjects.map((project, idx) => (
                                    <div key={project.id || idx} className="project-cluster" style={{ flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}>
                                        <div className="cluster-text">
                                            <h2 className="cluster-title">{project.title}</h2>
                                            <p className="cluster-desc">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className={`cluster-images ${project.images.length === 1 ? 'single' : ''}`}>
                                            {project.images.length > 0 ? (
                                                project.images.map((img, i) => (
                                                    <img key={i} src={img} alt={`${project.title} ${i + 1}`} className="cluster-img" />
                                                ))
                                            ) : (
                                                <div className="cluster-img-placeholder">
                                                    <span>No image available</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '5rem', background: '#f9f9f9', borderRadius: '24px' }}>
                                    <h3 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '1rem' }}>No projects found in this category</h3>
                                    <button onClick={() => setFilterCategory('All')} style={{ background: '#e61e25', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>View All Projects</button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <section className="project-overview-bg">
                <div className="project-overview-overlay"></div>
                <div className="project-overview-glass">
                    <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                        Project Overview
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto', fontWeight: 500 }}>
                        A strategically placed outdoor campaign built to maximize visibility, attract attention, and deliver a strong brand presence in a busy commercial location.
                    </p>
                    <Link href="/contact" className="cta-btn-pill">
                        Get This for Your Brand <ArrowRight size={22} style={{ marginLeft: '10px' }} />
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" size={48} color="#e61e25" /></div>}>
            <ProjectsContent />
        </Suspense>
    );
}
