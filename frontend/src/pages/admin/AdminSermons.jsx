import React, { useState } from 'react';
import { Video, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

const AdminSermons = () => {
    const [sermons, setSermons] = useState([
        { id: 1, title: 'The Fire That Never Dies', speaker: 'Prophet Joshua', date: '2026-03-01', category: 'Revival', youtubeUrl: '' },
        { id: 2, title: 'Walking in Divine Authority', speaker: 'Prophet Joshua', date: '2026-02-22', category: 'Prophetic', youtubeUrl: '' },
        { id: 3, title: 'Unshakeable Faith', speaker: 'Prophet Joshua', date: '2026-02-15', category: 'Faith', youtubeUrl: '' },
    ]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this sermon?')) {
            setSermons(sermons.filter(s => s.id !== id));
        }
    };

    const categoryColors = {
        Revival: { bg: 'rgba(255, 69, 0, 0.1)', color: 'var(--color-fire)' },
        Prophetic: { bg: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-gold)' },
        Faith: { bg: 'rgba(40, 167, 69, 0.1)', color: '#28a745' },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ color: 'var(--color-text-primary)', fontSize: '1.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Video color="var(--color-gold)" /> Manage Sermons
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', margin: 0, marginTop: '5px' }}>
                        Add and manage sermon recordings and teachings.
                    </p>
                </div>
                <button style={{
                    backgroundColor: 'var(--color-gold)',
                    color: '#000',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '0',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: 'var(--glow-gold)'
                }}>
                    <Plus size={18} /> Add Sermon
                </button>
            </div>

            {/* Sermons Table */}
            <div style={{
                backgroundColor: 'var(--color-bg-card)',
                borderRadius: '12px',
                border: '1px solid var(--color-border-outline)',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: 'var(--color-bg-darker)', borderBottom: '1px solid var(--color-border-outline)' }}>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Sermon Title</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Speaker</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Date</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500' }}>Category</th>
                            <th style={{ padding: '15px 20px', color: 'var(--color-text-secondary)', fontWeight: '500', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sermons.map((sermon) => {
                            const cat = categoryColors[sermon.category] || { bg: 'rgba(108,117,125,0.1)', color: '#6c757d' };
                            return (
                                <tr key={sermon.id} style={{ borderBottom: '1px solid var(--color-border-outline)' }}>
                                    <td style={{ padding: '15px 20px', color: 'var(--color-text-primary)', fontWeight: '500' }}>{sermon.title}</td>
                                    <td style={{ padding: '15px 20px', color: 'var(--color-text-secondary)' }}>{sermon.speaker}</td>
                                    <td style={{ padding: '15px 20px', color: 'var(--color-text-secondary)' }}>
                                        {new Date(sermon.date).toLocaleDateString([], { dateStyle: 'medium' })}
                                    </td>
                                    <td style={{ padding: '15px 20px' }}>
                                        <span style={{
                                            backgroundColor: cat.bg,
                                            color: cat.color,
                                            padding: '3px 10px',
                                            borderRadius: '12px',
                                            fontSize: '0.82rem',
                                            fontWeight: '600'
                                        }}>{sermon.category}</span>
                                    </td>
                                    <td style={{ padding: '15px 20px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                                        {sermon.youtubeUrl && (
                                            <a href={sermon.youtubeUrl} target="_blank" rel="noopener noreferrer"
                                                style={{ background: 'transparent', border: 'none', color: '#ff0000', cursor: 'pointer' }}>
                                                <ExternalLink size={17} />
                                            </a>
                                        )}
                                        <button style={{ background: 'transparent', border: 'none', color: 'var(--color-gold)', cursor: 'pointer' }}>
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(sermon.id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-fire)', cursor: 'pointer' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {sermons.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    No sermons added yet. Click "Add Sermon" to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminSermons;
