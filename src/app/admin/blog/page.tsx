"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, User, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    const categories = ['All', 'Design Trends', 'Case Studies', 'Industry News', 'Maintenance Tips', 'Regulations'];
    const statuses = ['All', 'published', 'draft'];

    // Sample blog posts
    const samplePosts: BlogPost[] = [
        {
            id: '1',
            title: 'Latest Signage Design Trends in UAE 2024',
            excerpt: 'Discover the cutting-edge design trends shaping the advertising landscape in the UAE this year.',
            content: 'Full blog content here...',
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
            content: 'Full blog content here...',
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
            content: 'Full blog content here...',
            author: 'Legal Team',
            date: '2024-03-05',
            category: 'Regulations',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
            status: 'draft',
            readTime: '6 min read'
        }
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPosts(samplePosts);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesStatus = selectedStatus === 'All' || post.status === selectedStatus;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const handleDeletePost = (id: string) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            setPosts(posts.filter(post => post.id !== id));
        }
    };

    const handleStatusChange = (id: string, newStatus: 'published' | 'draft') => {
        setPosts(posts.map(post => 
            post.id === id ? { ...post, status: newStatus } : post
        ));
    };

    return (
        <div style={{ padding: '2rem' }}>
            {/* Header */}
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h1 style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 800, 
                        marginBottom: '0.5rem',
                        color: 'var(--color-text-main)'
                    }}>
                        Blog Management
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Create, edit, and manage your blog posts and resources
                    </p>
                </div>
                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-primary"
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        padding: '1rem 2rem'
                    }}
                >
                    <Plus size={20} />
                    New Article
                </button>
            </div>

            {/* Filters */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: '1rem',
                    alignItems: 'end'
                }}>
                    {/* Search */}
                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 600,
                            color: 'var(--color-text-main)'
                        }}>
                            Search Articles
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Search 
                                size={20} 
                                style={{ 
                                    position: 'absolute', 
                                    left: '1rem', 
                                    top: '50%', 
                                    transform: 'translateY(-50%)',
                                    color: 'var(--color-text-muted)'
                                }} 
                            />
                            <input
                                type="text"
                                placeholder="Search by title or content..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.8rem 1rem 0.8rem 3rem',
                                    border: '1px solid var(--color-card-border)',
                                    borderRadius: '8px',
                                    fontSize: '0.95rem'
                                }}
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 600,
                            color: 'var(--color-text-main)'
                        }}>
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                border: '1px solid var(--color-card-border)',
                                borderRadius: '8px',
                                fontSize: '0.95rem'
                            }}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            fontWeight: 600,
                            color: 'var(--color-text-main)'
                        }}>
                            Status
                        </label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                border: '1px solid var(--color-card-border)',
                                borderRadius: '8px',
                                fontSize: '0.95rem'
                            }}
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>
                                    {status === 'All' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                        {posts.length}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Total Articles</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>
                        {posts.filter(p => p.status === 'published').length}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Published</p>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.5rem' }}>
                        {posts.filter(p => p.status === 'draft').length}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Drafts</p>
                </div>
            </div>

            {/* Blog Posts Table */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '4rem', textAlign: 'center' }}>
                        <div style={{ 
                            width: '50px', 
                            height: '50px', 
                            border: '3px solid rgba(124, 58, 237, 0.3)', 
                            borderTop: '3px solid var(--color-primary)', 
                            borderRadius: '50%', 
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 1rem'
                        }} />
                        <p style={{ color: 'var(--color-text-muted)' }}>Loading articles...</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div style={{ padding: '4rem', textAlign: 'center' }}>
                        <h3 style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>No articles found</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                            {searchTerm || selectedCategory !== 'All' || selectedStatus !== 'All' 
                                ? 'Try adjusting your filters or search terms.'
                                : 'Create your first blog post to get started.'
                            }
                        </p>
                        <button 
                            onClick={() => setShowCreateModal(true)}
                            className="btn btn-primary"
                        >
                            Create First Article
                        </button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="admin-table" style={{ width: '100%' }}>
                            <thead>
                                <tr style={{ background: 'rgba(124, 58, 237, 0.05)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Article</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Category</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Author</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Date</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post) => (
                                    <motion.tr 
                                        key={post.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{ borderBottom: '1px solid var(--color-card-border)' }}
                                    >
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img 
                                                    src={post.image} 
                                                    alt={post.title}
                                                    style={{ 
                                                        width: '60px', 
                                                        height: '60px', 
                                                        borderRadius: '8px', 
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                <div>
                                                    <h4 style={{ 
                                                        fontWeight: 600, 
                                                        marginBottom: '0.25rem',
                                                        color: 'var(--color-text-main)'
                                                    }}>
                                                        {post.title}
                                                    </h4>
                                                    <p style={{ 
                                                        color: 'var(--color-text-muted)', 
                                                        fontSize: '0.85rem',
                                                        margin: 0,
                                                        maxWidth: '300px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>
                                                        {post.excerpt}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: 'rgba(124, 58, 237, 0.1)',
                                                color: 'var(--color-primary)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600
                                            }}>
                                                {post.category}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                            {post.author}
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                            {new Date(post.date).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <select
                                                value={post.status}
                                                onChange={(e) => handleStatusChange(post.id, e.target.value as 'published' | 'draft')}
                                                style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid var(--color-card-border)',
                                                    background: post.status === 'published' ? '#10b981' : '#f59e0b',
                                                    color: 'white',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600
                                                }}
                                            >
                                                <option value="published">Published</option>
                                                <option value="draft">Draft</option>
                                            </select>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        background: 'rgba(59, 130, 246, 0.1)',
                                                        color: '#3b82f6',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    title="View Article"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setEditingPost(post)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        background: 'rgba(16, 185, 129, 0.1)',
                                                        color: '#10b981',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    title="Edit Article"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    style={{
                                                        padding: '0.5rem',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        color: '#ef4444',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    title="Delete Article"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal would go here */}
            {(showCreateModal || editingPost) && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '2rem',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>
                            {editingPost ? 'Edit Article' : 'Create New Article'}
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                            This is a placeholder for the blog editor. In a full implementation, this would include:
                        </p>
                        <ul style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                            <li>Rich text editor for content</li>
                            <li>Image upload functionality</li>
                            <li>SEO meta fields</li>
                            <li>Category and tag management</li>
                            <li>Preview functionality</li>
                        </ul>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button 
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditingPost(null);
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    border: '1px solid var(--color-card-border)',
                                    borderRadius: '8px',
                                    background: 'transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-primary"
                                style={{ padding: '0.75rem 1.5rem' }}
                            >
                                {editingPost ? 'Update' : 'Create'} Article
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}