"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Search, 
    Edit2, 
    Trash2, 
    ExternalLink, 
    Image as ImageIcon,
    Layout,
    CheckCircle,
    X,
    Loader2,
    ArrowLeft,
    Eye
} from 'lucide-react';
import Link from 'next/link';
import AdminFooter from '../components/AdminFooter';

const ALL_PROJECTS: Project[] = [
    {
        id: 'def-1',
        title: 'Brand Identity Showcase',
        description: 'Complete visual identity transformation featuring premium logo design, color theory application, and comprehensive brand guidelines for a global corporate client.',
        category: 'Brand Identity',
        image: '/signage-branding.png',
        status: 'published',
        createdAt: new Date().toISOString()
    },
    {
        id: 'def-2',
        title: 'Digital Printing Excellence',
        description: 'High-precision large format printing for luxury retail displays, capturing vibrant colors and sharp details to maximize visual pull in high-traffic shopping malls.',
        category: 'Digital Printing',
        image: '/signage-digital-print.png',
        status: 'published',
        createdAt: new Date().toISOString()
    },
    {
        id: 'def-3',
        title: 'Premium Vehicle Wraps',
        description: 'State-of-the-art vehicle branding for commercial fleets, using high-durability vinyl to ensure long-lasting brand visibility across the UAE.',
        category: 'Vehicle Branding',
        image: '/signage-vehicle.png',
        status: 'published',
        createdAt: new Date().toISOString()
    },
    {
        id: 'def-4',
        title: 'Strategic Signage Systems',
        description: 'High-visibility 3D LED signage installations designed for maximum impact in premium commercial districts, ensuring your brand stays visible 24/7.',
        category: 'Signage',
        image: '/signage-production.png',
        status: 'published',
        createdAt: new Date().toISOString()
    },
    {
        id: 'def-5',
        title: 'POS Display Solutions',
        description: 'Custom-designed point-of-sale displays focused on driving customer engagement and maximizing product visibility in competitive retail settings.',
        category: 'Display Solutions',
        image: '/signage-exhibition.png',
        status: 'published',
        createdAt: new Date().toISOString()
    },
    {
        id: 'def-6',
        title: 'Architectural Facades',
        description: 'Premium building facade solutions combining high-quality ACP cladding with integrated signage to create a powerful architectural identity.',
        category: 'Facade & Cladding',
        image: '/signage-cladding.png',
        status: 'published',
        createdAt: new Date().toISOString()
    }
];

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    clientName?: string;
    status: string;
    createdAt: string;
}

export default function AdminProjectsPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    // Modal states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Branding',
        image: '',
        clientName: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const categories = ['All', 'Branding', 'Digital', 'Signage', 'Vehicle', 'Events', 'Interior'];

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        const userStr = localStorage.getItem('adminUser');
        const user = userStr ? JSON.parse(userStr) : null;

        if (auth !== 'true' || user?.email !== 'admin@gmail.com') {
            router.push('/admin/login');
            return;
        }
        setIsAuthorized(true);
        fetchProjects();
    }, [router]);

    if (!isAuthorized) {
        return <div style={{ minHeight: '100vh', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" size={48} color="#e61e25" /></div>;
    }

    async function fetchProjects() {
        setIsLoading(true);
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (data.projects) setProjects(data.projects);
        } catch (error) {
            console.error('Fetch error:', error);
        }
        setIsLoading(false);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (limit 2MB for Base64)
            if (file.size > 2 * 1024 * 1024) {
                alert('File is too large! Please select an image smaller than 2MB.');
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                setSuccessMessage('Project added successfully!');
                setIsAddModalOpen(false);
                setFormData({ title: '', description: '', category: 'Brand Identity', image: '', clientName: '' });
                fetchProjects();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                alert('Error: ' + (data.error || 'Failed to create project'));
            }
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Something went wrong. Please check your connection and try again.');
        }
        setIsSubmitting(false);
    };

    const handleEditProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProject) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/projects/${currentProject.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSuccessMessage('Project updated successfully!');
                setIsEditModalOpen(false);
                fetchProjects();
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
        setIsSubmitting(false);
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setSuccessMessage('Project deleted successfully!');
                fetchProjects();
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const openEditModal = (project: Project) => {
        setCurrentProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            category: project.category,
            image: project.image,
            clientName: project.clientName || ''
        });
        setIsEditModalOpen(true);
    };

    const allProjects = [...(projects || []), ...ALL_PROJECTS];

    const filteredProjects = allProjects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || p.category.toLowerCase().includes(filterCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ padding: '0', background: '#ffffff', minHeight: '100vh', color: '#1c1c1c' }}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
                
                .hover-red:hover { color: #e61e25 !important; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1s linear infinite; }

                .project-cluster {
                    display: grid;
                    grid-template-columns: 1fr 1.5fr;
                    gap: 40px;
                    margin-bottom: 80px;
                    align-items: center;
                    background: transparent;
                }

                .cluster-text {
                    background: #1c1c1c;
                    padding: clamp(1.5rem, 4vw, 3.5rem);
                    border: 1px solid rgba(12, 12, 12,0.05);
                    border-radius: 24px;
                    box-shadow: 0 20px 50px rgba(12, 12, 12,0.03);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    position: relative;
                    max-height: 500px;
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #e61e25 rgba(255, 255, 255, 0.1);
                }

                .cluster-title {
                    font-size: clamp(1.8rem, 5vw, 2.8rem);
                    font-weight: 800;
                    margin-bottom: 1.5rem;
                    letter-spacing: -1px;
                    color: #ffffff;
                }

                .cluster-desc {
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.8;
                    font-size: 1.05rem;
                    margin-bottom: 2rem;
                }

                .cluster-images {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 30px;
                }

                .cluster-img {
                    width: 100%;
                    height: 550px;
                    object-fit: cover;
                    border-radius: 20px;
                    box-shadow: 0 15px 45px rgba(12, 12, 12,0.1);
                    transition: all 0.6s ease;
                }

                .cluster-img:hover {
                    box-shadow: 0 30px 60px rgba(12, 12, 12,0.2);
                    transform: scale(1.02);
                }

                .cluster-admin-actions {
                    display: flex;
                    gap: 1rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    padding-top: 2rem;
                    margin-top: 1rem;
                }

                .admin-btn {
                    padding: 0.8rem 1.5rem;
                    border-radius: 12px;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    font-size: 0.95rem;
                }

                .admin-btn.edit {
                    background: rgba(255, 255, 255, 0.1);
                    color: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .admin-btn.delete {
                    background: rgba(230, 30, 37, 0.08);
                    color: #e61e25;
                }

                .admin-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(12, 12, 12,0.1);
                }

                .admin-btn.edit:hover {
                    background: rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .admin-btn.delete:hover {
                    background: #e61e25;
                    color: white;
                }

                @media (max-width: 1024px) {
                    .project-cluster { grid-template-columns: 1fr; gap: 30px; }
                    .cluster-images.single { height: 450px; }
                    .cluster-text { padding: 2.5rem 1.5rem; }
                }

                @media (max-width: 768px) {
                    .project-cluster { display: flex !important; flex-direction: column !important; }
                    .cluster-images { order: 2 !important; height: 400px; }
                    .cluster-text { order: 1 !important; text-align: left; }
                }

                /* Hide scrollbars for projects container */
                .projects-container::-webkit-scrollbar {
                    display: none;
                }
                .projects-container {
                    scrollbar-width: none;
                }

                /* Hide scrollbars for individual project cards */
                .cluster-text::-webkit-scrollbar {
                    display: none;
                }
                .cluster-text {
                    scrollbar-width: none;
                }
            `}</style>

            <div style={{ padding: '2rem 3rem' }}>
                <AnimatePresence>
                    {successMessage && (
                        <motion.div 
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            style={{
                                position: 'fixed', top: '2rem', right: '2rem',
                                background: '#10b981', color: 'white', padding: '1rem 2rem',
                                borderRadius: '12px', display: 'flex', alignItems: 'center',
                                gap: '0.5rem', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                                zIndex: 1000, fontWeight: 600
                            }}
                        >
                            <CheckCircle size={20} />
                            {successMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '1.5rem' }}>
                    <div>
                        <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.5rem', transition: 'all 0.3s' }} className="hover-red">
                            <ArrowLeft size={18} /> Back to Dashboard
                        </Link>
                        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1c1c1c', marginBottom: '0.5rem' }}>
                            Projects <span style={{ color: '#e61e25' }}>Management</span>
                        </h1>
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsAddModalOpen(true)} 
                        style={{ background: '#e61e25', color: 'white', border: 'none', padding: '0.8rem 1.8rem', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(230, 30, 37, 0.3)' }}
                    >
                        <Plus size={20} /> New Project
                    </motion.button>
                </div>

                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', marginBottom: '4rem', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid #f0f0f0', boxShadow: '0 4px 15px rgba(12, 12, 12,0.02)' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} size={18} />
                        <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.9rem 1rem 0.9rem 3rem', border: '1px solid #eee', borderRadius: '12px', color: '#000', background: '#fcfcfc', fontSize: '0.95rem' }} />
                    </div>
                </div>

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                    <Loader2 className="animate-spin" size={40} color="#e61e25" />
                </div>
            ) : (
                <div 
                    className="projects-container"
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '4rem',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                        paddingRight: '1rem',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#e61e25 #f1f1f1'
                    }}
                >
                    {filteredProjects.map((project, idx) => (
                        <motion.div 
                            layout
                            key={project.id} 
                            className="project-cluster"
                            style={{ flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}
                        >
                            <div className="cluster-text">
                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{ background: 'rgba(230, 30, 37, 0.1)', color: '#e61e25', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800 }}>
                                        {project.category}
                                    </span>
                                </div>
                                <h2 className="cluster-title">{project.title}</h2>
                                <p className="cluster-desc">{project.description}</p>
                                
                                <div className="cluster-admin-actions">
                                    <button onClick={() => openEditModal(project)} className="admin-btn edit">
                                        <Edit2 size={18} /> Edit Project
                                    </button>
                                    <button onClick={() => handleDeleteProject(project.id)} className="admin-btn delete">
                                        <Trash2 size={18} /> Delete
                                    </button>
                                </div>
                            </div>

                            <div className={`cluster-images single`}>
                                {project.image ? (
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="cluster-img"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/projects-hero-bg.png';
                                        }}
                                    />
                                ) : (
                                    <div className="cluster-img-placeholder">
                                        <ImageIcon size={48} />
                                        <span>No image available</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(12, 12, 12,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem', backdropFilter: 'blur(4px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                background: 'white', borderRadius: '24px', width: '100%',
                                maxWidth: '500px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(12, 12, 12,0.25)',
                                position: 'relative'
                            }}
                        >
                            <button 
                                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}
                            >
                                <X size={24} />
                            </button>

                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1c1c1c', marginBottom: '1.5rem' }}>
                                {isEditModalOpen ? 'Edit Project' : 'Add New Project'}
                            </h2>

                            <form onSubmit={isEditModalOpen ? handleEditProject : handleAddProject}>
                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Project Title</label>
                                    <input 
                                        type="text" required
                                        value={formData.title}
                                        onChange={e => setFormData({...formData, title: e.target.value})}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', color: '#000', background: '#ffffff' }}
                                        placeholder="Enter project title"
                                    />
                                </div>

                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', background: '#ffffff', color: '#000' }}
                                    >
                                        {categories.filter(c => c !== 'All').map(c => (
                                            <option key={c} value={c} style={{ color: '#000' }}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Client Name</label>
                                    <input 
                                        type="text"
                                        value={formData.clientName}
                                        onChange={e => setFormData({...formData, clientName: e.target.value})}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', color: '#000', background: '#ffffff' }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>
                                        Image (Direct Upload)
                                    </label>
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', color: '#000', background: '#ffffff' }}
                                    />
                                    {formData.image && (
                                        <div style={{ marginTop: '1rem', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #eee' }}>
                                            <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Description</label>
                                    <textarea 
                                        required
                                        value={formData.description}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', height: '100px', resize: 'none', color: '#000', background: '#ffffff' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                    <button 
                                        type="button"
                                        onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                        style={{
                                            flex: 1, padding: '1rem', background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0',
                                            borderRadius: '12px', fontWeight: 700, cursor: 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        disabled={isSubmitting}
                                        style={{
                                            flex: 2, padding: '1rem', background: '#e61e25', color: '#ffffff', border: 'none',
                                            borderRadius: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(230, 30, 37, 0.3)'
                                        }}
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (isEditModalOpen ? 'Save Changes' : 'Create Project')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            </div>
            <AdminFooter />
        </div>
    );
}
