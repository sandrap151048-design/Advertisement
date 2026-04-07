"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  Building, 
  Search,
  Download,
  Filter,
  Eye,
  Trash2,
  RefreshCw,
  TrendingUp,
  Clock
} from 'lucide-react';

interface ScratchOffer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  offer: {
    id: string;
    title: string;
    description: string;
    discount: string;
    type: string;
    color: string;
  };
  scratchedAt: string;
  source: string;
  claimed: boolean;
  createdAt: string;
  ipAddress: string;
  status: string;
  userAgent: string;
  expiresAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Statistics {
  totalOffers: number;
  todayOffers: number;
  offerTypes: string[];
}

export default function ScratchOffersAdminPage() {
  const [offers, setOffers] = useState<ScratchOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [statistics, setStatistics] = useState<Statistics>({
    totalOffers: 0,
    todayOffers: 0,
    offerTypes: []
  });
  const [selectedOffer, setSelectedOffer] = useState<ScratchOffer | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination?.page || 1).toString(),
        limit: (pagination?.limit || 10).toString()
      });

      if (filters.status !== 'all') {
        params.append('status', filters.status);
      }
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom);
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo);
      }

      const response = await fetch(`/api/scratch-offers?${params}`);
      const data = await response.json();

      if (data.success) {
        setOffers(data.data);
        setPagination(data.pagination);
        setStatistics(data.statistics);
      }
    } catch (error) {
      console.error('Error fetching scratch offers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch offers if pagination is properly initialized
    if (pagination && pagination.page) {
      fetchOffers();
    }
  }, [pagination?.page, filters]);

  // Initial fetch on component mount
  useEffect(() => {
    fetchOffers();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (pagination) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOfferTypeColor = (type: string) => {
    const colors = {
      percentage: '#3b82f6',
      free: '#10b981',
      fixed: '#f59e0b'
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#10b981',
      claimed: '#10b981',
      expired: '#ef4444',
      used: '#8b5cf6'
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const exportOffers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Company', 'Offer Title', 'Discount', 'Type', 'Status', 'Date', 'Expires'].join(','),
      ...offers.map(offer => [
        offer.name,
        offer.email,
        offer.phone,
        offer.companyName || '',
        offer.offer.title,
        offer.offer.discount,
        offer.offer.type,
        offer.status,
        formatDate(offer.createdAt),
        formatDate(offer.expiresAt)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scratch-offers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const isOfferExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)', 
      color: '#ffffff', 
      fontFamily: "'DM Sans', sans-serif" 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <header style={{ 
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
              fontWeight: 900, 
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Gift className="text-red-500" size={32} />
              Scratch Card Offers
            </h1>
            <p style={{ color: '#888', fontSize: '1rem' }}>
              Manage scratch card campaigns and track user engagement
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={fetchOffers}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              onClick={exportOffers}
              style={{
                background: 'rgba(230, 30, 37, 0.1)',
                border: '1px solid rgba(230, 30, 37, 0.2)',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </header>

        {/* Statistics Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              borderRadius: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(230, 30, 37, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(230, 30, 37, 0.2)'
              }}>
                <Gift className="text-red-500" size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem', color: '#ffffff' }}>
                  {statistics?.totalOffers || 0}
                </h3>
                <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>Total Claims</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
            style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              borderRadius: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(59, 130, 246, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <Calendar className="text-blue-500" size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem', color: '#ffffff' }}>
                  {statistics?.todayOffers || 0}
                </h3>
                <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>Today's Claims</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              borderRadius: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(16, 185, 129, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <TrendingUp className="text-green-500" size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem', color: '#ffffff' }}>
                  {offers.filter(o => o.offer.type === 'percentage').length}
                </h3>
                <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>Discount Offers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
            style={{ 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              borderRadius: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(139, 92, 246, 0.1)', 
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                <Users className="text-purple-500" size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem', color: '#ffffff' }}>
                  {new Set(offers.map(o => o.email)).size}
                </h3>
                <p style={{ color: '#888', fontSize: '0.9rem', margin: 0 }}>Unique Users</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="glass-card" style={{ 
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          borderRadius: '16px',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Filter size={20} color="#e61e25" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>Filters</h3>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff' }}>
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="all" style={{ color: '#000000', background: '#ffffff' }}>All Status</option>
                <option value="claimed" style={{ color: '#000000', background: '#ffffff' }}>Claimed</option>
                <option value="expired" style={{ color: '#000000', background: '#ffffff' }}>Expired</option>
                <option value="used" style={{ color: '#000000', background: '#ffffff' }}>Used</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff' }}>
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff' }}>
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* Offers Table */}
        <div className="glass-card" style={{ 
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
              <RefreshCw className="animate-spin" size={24} style={{ marginRight: '0.5rem' }} />
              <span>Loading offers...</span>
            </div>
          ) : offers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <Gift size={48} style={{ margin: '0 auto 1rem auto', color: 'rgba(255,255,255,0.1)' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: '#ffffff' }}>
                No offers found
              </h3>
              <p style={{ color: '#888' }}>No scratch card offers match your current filters</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {offers.map((offer, index) => (
                <motion.div
                  key={offer._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    padding: '1.5rem',
                    borderBottom: index < offers.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '1.2rem', 
                        marginBottom: '0.5rem', 
                        fontFamily: "'DM Sans', sans-serif", 
                        color: '#ffffff', 
                        fontWeight: 700 
                      }}>
                        {offer.name}
                      </h3>
                      {offer.companyName && (
                        <p style={{ 
                          color: '#888', 
                          fontSize: '0.9rem', 
                          marginBottom: '0.75rem',
                          margin: '0 0 0.75rem 0'
                        }}>
                          {offer.companyName}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaaaaa', fontSize: '0.9rem' }}>
                          <Mail size={16} color="#e61e25" />
                          {offer.email}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaaaaa', fontSize: '0.9rem' }}>
                          <Phone size={16} color="#e61e25" />
                          {offer.phone}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaaaaa', fontSize: '0.9rem' }}>
                          <Calendar size={16} color="#e61e25" />
                          {formatDate(offer.createdAt)}
                        </div>
                      </div>
                      
                      {/* Offer Details */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem', 
                        padding: '1rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}>
                        <div
                          style={{
                            width: '3rem',
                            height: '3rem',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 900,
                            backgroundColor: offer.offer.color
                          }}
                        >
                          {offer.offer.discount}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.25rem' }}>
                            {offer.offer.title}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#aaaaaa', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                            {offer.offer.description}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'capitalize' }}>
                            {offer.offer.type} • Expires: {formatDate(offer.expiresAt)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textTransform: 'capitalize',
                              backgroundColor: `${getStatusColor(offer.status)}20`,
                              color: getStatusColor(offer.status),
                              border: `1px solid ${getStatusColor(offer.status)}30`
                            }}
                          >
                            {offer.status}
                          </span>
                          {isOfferExpired(offer.expiresAt) && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#ef4444' }}>
                              <Clock size={12} />
                              <span>Expired</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedOffer(offer)}
                      style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        color: '#3b82f6',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        marginLeft: '1rem',
                        flexShrink: 0
                      }}
                    >
                      <Eye size={16} /> View
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '1rem',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px'
          }}>
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              style={{
                padding: '0.75rem 1.5rem',
                background: pagination.page === 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(230, 30, 37, 0.1)',
                border: pagination.page === 1 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(230, 30, 37, 0.2)',
                color: pagination.page === 1 ? '#666' : '#ffffff',
                borderRadius: '8px',
                cursor: pagination.page === 1 ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              Previous
            </button>
            <span style={{
              color: '#888',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              style={{
                padding: '0.75rem 1.5rem',
                background: pagination.page === pagination.pages ? 'rgba(255, 255, 255, 0.05)' : 'rgba(230, 30, 37, 0.1)',
                border: pagination.page === pagination.pages ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(230, 30, 37, 0.2)',
                color: pagination.page === pagination.pages ? '#666' : '#ffffff',
                borderRadius: '8px',
                cursor: pagination.page === pagination.pages ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Offer Detail Modal */}
      {selectedOffer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Offer Details</h2>
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">User Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Name</label>
                      <div className="font-medium">{selectedOffer.name}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Email</label>
                      <div className="font-medium">{selectedOffer.email}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Phone</label>
                      <div className="font-medium">{selectedOffer.phone}</div>
                    </div>
                    {selectedOffer.companyName && (
                      <div>
                        <label className="text-sm text-gray-400">Company</label>
                        <div className="font-medium">{selectedOffer.companyName}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Offer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Title</label>
                      <div className="font-medium">{selectedOffer.offer.title}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Description</label>
                      <div className="font-medium">{selectedOffer.offer.description}</div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Discount</label>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: selectedOffer.offer.color }}
                        >
                          {selectedOffer.offer.discount}
                        </div>
                        <span className="font-medium">{selectedOffer.offer.type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Technical Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-gray-400">Claimed Date</label>
                    <div>{formatDate(selectedOffer.createdAt)}</div>
                  </div>
                  <div>
                    <label className="text-gray-400">Expires Date</label>
                    <div className={isOfferExpired(selectedOffer.expiresAt) ? 'text-red-400' : ''}>
                      {formatDate(selectedOffer.expiresAt)}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400">IP Address</label>
                    <div>{selectedOffer.ipAddress}</div>
                  </div>
                  <div>
                    <label className="text-gray-400">Source</label>
                    <div>{selectedOffer.source}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}