"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home, MessageSquare, Briefcase, TrendingUp, LogOut,
  Phone, Mail, Building2, Clock, User, FileText, Tag, RefreshCw, Search
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  phone: string;
  email: string;
  company: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

const SERVICE_LABELS: { [key: string]: string } = {
  'branding': 'Brand Identity',
  'digital-graphics': 'Digital Graphics',
  'vehicle-graphics': 'Vehicle Graphics',
  'signage': 'Signage',
  'exhibition': 'Exhibition & POS',
  'cladding': 'Cladding & Facade'
};

const SERVICE_COLORS: { [key: string]: string } = {
  'branding': '#8b5cf6',
  'digital-graphics': '#3b82f6',
  'vehicle-graphics': '#10b981',
  'signage': '#f59e0b',
  'exhibition': '#ec4899',
  'cladding': '#06b6d4'
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filtered, setFiltered] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin/login');
      return;
    }
    fetchCampaigns();
  }, [router]);

  useEffect(() => {
    let result = campaigns;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        (c.company && c.company.toLowerCase().includes(q))
      );
    }
    if (serviceFilter !== 'all') {
      result = result.filter(c => c.service === serviceFilter);
    }
    setFiltered(result);
  }, [campaigns, search, serviceFilter]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/campaign');
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    router.push('/');
  };

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
    { href: '/admin/contacts', label: 'Contact Forms', icon: <MessageSquare size={20} /> },
    { href: '/admin/services', label: 'Services', icon: <Briefcase size={20} /> },
    { href: '/admin/campaigns', label: 'Campaigns', icon: <TrendingUp size={20} /> },
  ];

    return (
      <div style={{ padding: '0' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
              Campaign <span style={{ color: '#e61e25' }}>Requests</span>
            </h1>
            <p style={{ color: '#888', margin: '0.3rem 0 0', fontSize: '0.95rem' }}>
              {campaigns.length} total submission{campaigns.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button onClick={fetchCampaigns} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: '#e61e25', border: 'none', borderRadius: 10,
            padding: '0.75rem 1.2rem', color: 'white', fontWeight: 600,
            cursor: 'pointer', fontSize: '0.9rem'
          }}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total', value: campaigns.length, color: '#e61e25' },
            { label: 'Pending', value: campaigns.filter(c => c.status === 'pending').length, color: '#f59e0b' },
            { label: 'In Progress', value: campaigns.filter(c => c.status === 'in-progress').length, color: '#3b82f6' },
            { label: 'Completed', value: campaigns.filter(c => c.status === 'completed').length, color: '#10b981' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, padding: '1.2rem 1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
            <input
              type="text" placeholder="Search by name, email, phone..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem 1rem 0.75rem 2.8rem',
                border: '1px solid #e0e0e0', borderRadius: 10,
                background: 'white', fontSize: '0.9rem', outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} style={{
            padding: '0.75rem 1rem', border: '1px solid #e0e0e0', borderRadius: 10,
            background: 'white', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', color: '#1a1a1a'
          }}>
            <option value="all">All Services</option>
            {Object.entries(SERVICE_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>
        </div>

        {/* Cards */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <div style={{ width: 50, height: 50, border: '4px solid rgba(255,107,53,0.2)', borderTop: '4px solid #e61e25', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <TrendingUp size={48} color="#ddd" style={{ marginBottom: '1rem' }} />
            <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>
              {campaigns.length === 0 ? 'No Campaign Requests Yet' : 'No Results Found'}
            </h3>
            <p style={{ color: '#888' }}>
              {campaigns.length === 0 ? 'Campaign submissions will appear here when customers submit the form.' : 'Try adjusting your search or filter.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((campaign, i) => {
              const serviceColor = SERVICE_COLORS[campaign.service] || '#6b7280';
              const statusColor = campaign.status === 'completed' ? '#10b981' : campaign.status === 'in-progress' ? '#3b82f6' : '#f59e0b';
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    background: 'white', borderRadius: 16,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                    overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Card Top Bar */}
                  <div style={{ height: 5, background: serviceColor }} />

                  <div style={{ padding: '1.5rem' }}>
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{ width: 46, height: 46, borderRadius: 12, background: `${serviceColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <User size={22} color={serviceColor} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a1a' }}>{campaign.name}</div>
                          <div style={{ fontSize: '0.8rem', color: serviceColor, fontWeight: 600, marginTop: '0.1rem' }}>
                            {SERVICE_LABELS[campaign.service] || campaign.service}
                          </div>
                        </div>
                      </div>
                      <span style={{
                        padding: '0.3rem 0.8rem', borderRadius: 20, fontSize: '0.78rem',
                        fontWeight: 600, background: `${statusColor}18`, color: statusColor,
                        textTransform: 'capitalize', whiteSpace: 'nowrap'
                      }}>
                        {campaign.status}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#444' }}>
                        <Phone size={15} color="#888" />
                        <span>{campaign.phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#444' }}>
                        <Mail size={15} color="#888" />
                        <a href={`mailto:${campaign.email}`} style={{ color: '#3b82f6', textDecoration: 'none' }}>{campaign.email}</a>
                      </div>
                      {campaign.company && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#444' }}>
                          <Building2 size={15} color="#888" />
                          <span>{campaign.company}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#444' }}>
                        <Tag size={15} color="#888" />
                        <span style={{ background: `${serviceColor}15`, color: serviceColor, padding: '0.2rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600 }}>
                          {SERVICE_LABELS[campaign.service] || campaign.service}
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '1rem', borderLeft: `3px solid ${serviceColor}`, marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 600, color: '#888', marginBottom: '0.5rem' }}>
                        <FileText size={13} /> MESSAGE
                      </div>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#333', lineHeight: 1.6 }}>{campaign.message}</p>
                    </div>

                    {/* Date */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#aaa' }}>
                      <Clock size={13} />
                      {new Date(campaign.createdAt).toLocaleString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
    </div>
  );
}
