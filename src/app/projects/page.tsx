"use client";

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    ArrowRight, 
    Image as ImageIcon,
    Layout,
    ExternalLink,
    Filter,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    clientName?: string;
}

function ProjectsContent() {
    const searchParams = useSearchParams();
    const initialFilter = searchParams.get('filter') || 'All';

    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState(initialFilter);
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    const categories = ['All', 'Branding', 'Digital', 'Signage', 'Vehicle', 'Events', 'Interior'];

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
        fetchProjects();
    }, []);

    useEffect(() => {
        const filter = searchParams.get('filter');
        if (filter && categories.includes(filter)) {
            setFilterCategory(filter);
        }
    }, [searchParams]);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.projects) setProjects(data.projects);
        } catch (error) {
            console.error('Fetch error:', error);
        }
        setIsLoading(false);
    };

    const filteredProjects = projects.filter(p => {
        return filterCategory === 'All' || p.category === filterCategory;
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    return (
        <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
            <style jsx global>{`
                /* Ultra-aggressive scrollbar hiding for the Projects page */
                html, body {
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                }
                html::-webkit-scrollbar, body::-webkit-scrollbar {
                    display: none !important;
                    width: 0 !important;
                    height: 0 !important;
                }
                * {
                    scrollbar-width: none !important;
                    -ms-overflow-style: none !important;
                }
                *::-webkit-scrollbar {
                    display: none !important;
                }
                
                .container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
                .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
                .project-card { 
                    background: #111; border-radius: 24px; overflow: hidden; 
                    border: 1px solid rgba(255,255,255,0.05); transition: all 0.4s;
                }
                .project-card:hover { 
                    transform: translateY(-8px); border-color: rgba(230,30,37,0.3);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }
                
                .hero-projects {
                    position: relative;
                    height: 100vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: url('https://images.unsplash.com/photo-1546412414-e1885259563a?w=1600&q=80') center/cover no-repeat;
                    overflow: hidden;
                }
                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(10,10,10,0.5), rgba(10,10,10,0.95));
                    z-index: 1;
                }
                
                .filter-sticky-bar {
                    position: sticky;
                    top: 100px;
                    z-index: 100;
                    padding: 2rem 0;
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(25px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                /* Eliminate ghost sidebars or menus during refresh */
                .admin-sidebar, .mobile-menu:not(.open) {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
                
                .project-overview-bg {
                    position: relative;
                    padding: 120px 0;
                    background: url('https://images.unsplash.com/photo-1542744094-24638eff58bb?w=1600&q=80') center/cover no-repeat;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border-radius: 40px;
                    margin: 0 40px 80px 40px;
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
                    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                }
                .cta-btn-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 1.2rem 3rem;
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
                    box-shadow: 0 15px 30px rgba(255,255,255,0.2);
                }
            `}</style>

            <section className="hero-projects">
                <div className="hero-overlay"></div>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: 'center' }}>
                        <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-4px', color: 'white', lineHeight: 1 }}>
                            Our <span style={{ color: '#e61e25' }}>Projects</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', lineHeight: 1.6, fontWeight: 500 }}>
                            Discover our portfolio of premium advertisement solutions, from large-format signage to precision-crafted digital displays and elite fleet branding.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <div className="filter-sticky-bar">
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                style={{
                                    padding: '0.7rem 1.8rem', borderRadius: '50px', border: '1px solid',
                                    borderColor: filterCategory === cat ? '#e61e25' : 'rgba(255,255,255,0.15)',
                                    background: filterCategory === cat ? '#e61e25' : 'transparent',
                                    color: 'white', fontWeight: 800, cursor: 'pointer', transition: 'all 0.3s',
                                    fontSize: '0.85rem', letterSpacing: '0.5px'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </div>

            <section style={{ padding: '80px 0 120px 0' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1.2rem', letterSpacing: '-1.2px' }}>
                            <Layout size={36} color="#e61e25" />
                            Explore <span style={{ color: '#e61e25' }}>{filterCategory === 'All' ? 'Latest Work' : filterCategory}</span>
                        </h2>
                    </motion.div>

                    {isLoading ? (
                        <div style={{ padding: '120px 0', textAlign: 'center' }}>
                            <Loader2 className="animate-spin" size={48} color="#e61e25" />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div style={{ padding: '150px 0', textAlign: 'center', background: '#111', borderRadius: '32px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.3rem', fontWeight: 500 }}>No projects found in this category yet.</p>
                        </div>
                    ) : (
                        <motion.div className="projects-grid" variants={staggerContainer} initial="hidden" animate="visible" layout>
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project) => (
                                    <motion.div layout key={project.id} variants={fadeInUp} className="project-card">
                                        <div style={{ height: '240px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                            {project.image ? (
                                                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ textAlign: 'center', opacity: 0.2 }}>
                                                    <ImageIcon size={64} />
                                                    <p style={{ marginTop: '12px', fontSize: '0.8rem' }}>No Preview Available</p>
                                                </div>
                                            )}
                                            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: '#e61e25', padding: '6px 14px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                                                {project.category}
                                            </div>
                                        </div>
                                        <div style={{ padding: '2.5rem' }}>
                                            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '1rem', color: 'white', letterSpacing: '-0.5px' }}>{project.title}</h3>
                                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2.5rem', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {project.description}
                                            </p>
                                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.8rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Client</span>
                                                    <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{project.clientName || 'Confidential'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Project Overview CTA Section */}
            <motion.section 
                className="project-overview-bg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="project-overview-overlay"></div>
                <div className="project-overview-glass">
                    <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'white', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
                        Project Overview
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto', fontWeight: 500 }}>
                        A strategically placed outdoor campaign built to maximize visibility, attract attention, and deliver a strong brand presence in a busy commercial location.
                    </p>
                    <Link href="/contact" className="cta-btn-pill">
                        Get This for Your Brand <ArrowRight size={22} />
                    </Link>
                </div>
            </motion.section>
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" size={48} color="#e61e25" /></div>}>
            <ProjectsContent />
        </Suspense>
    );
}
