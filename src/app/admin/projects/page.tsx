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
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import AdminFooter from '../components/AdminFooter';

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
        fetchProjects();
    }, [router]);

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

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setSuccessMessage('Project added successfully!');
                setIsAddModalOpen(false);
                setFormData({ title: '', description: '', category: 'Branding', image: '', clientName: '' });
                fetchProjects();
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error adding project:', error);
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

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div style={{ padding: '0' }}>
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
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.5rem' }}>
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

            <div style={{ background: 'white', padding: '1.2rem', borderRadius: '16px', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid #f0f0f0' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} size={18} />
                    <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', border: '1px solid #eee', borderRadius: '10px', color: '#000', background: '#ffffff' }} />
                </div>
            </div>

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                    <Loader2 className="animate-spin" size={40} color="#e61e25" />
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {filteredProjects.map((project) => (
                        <motion.div 
                            layout
                            key={project.id} 
                            style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ height: '180px', width: '100%', position: 'relative', background: '#f5f5f5' }}>
                                {project.image ? (
                                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{ background: 'rgba(230, 30, 37, 0.1)', color: '#e61e25', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        {project.category}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a1a' }}>{project.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', margin: '1rem 0', lineHeight: 1.5, flex: 1 }}>{project.description}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '1rem', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => openEditModal(project)} style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#f8fafc', color: '#64748b', cursor: 'pointer' }} title="Edit"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDeleteProject(project.id)} style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer' }} title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                    <Link href="/projects" target="_blank" style={{ fontSize: '0.85rem', color: '#e61e25', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        Preview <ExternalLink size={14} />
                                    </Link>
                                </div>
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
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '1rem', backdropFilter: 'blur(4px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                background: 'white', borderRadius: '24px', width: '100%',
                                maxWidth: '500px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                position: 'relative'
                            }}
                        >
                            <button 
                                onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: 'none', cursor: 'pointer', color: '#999' }}
                            >
                                <X size={24} />
                            </button>

                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '1.5rem' }}>
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
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: '#333' }}>Image URL</label>
                                    <input 
                                        type="text"
                                        required
                                        value={formData.image}
                                        onChange={e => setFormData({...formData, image: e.target.value})}
                                        style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #ddd', color: '#000', background: '#ffffff' }}
                                        placeholder="https://images.unsplash.com/..."
                                    />
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

                                <button 
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%', padding: '1rem', background: '#e61e25', color: '#ffffff', border: 'none',
                                        borderRadius: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(230, 30, 37, 0.3)'
                                    }}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (isEditModalOpen ? 'Save Changes' : 'Create Project')}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-spin { animation: spin 1s linear infinite; }
            `}</style>
            <AdminFooter />
        </div>
    );
}
