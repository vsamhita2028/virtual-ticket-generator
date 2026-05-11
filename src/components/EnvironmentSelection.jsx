import React from 'react';
import { Cloud, HardDrive, Share2, Binary, ChevronLeft, ChevronRight } from 'lucide-react';

const ENVIRONMENTS = [
  {
    id: 'valkey',
    name: 'Valkey Core',
    description: 'High-performance caching and low-latency data hub.',
    icon: <Binary size={32} />,
    color: '#0ea5e9'
  },
  {
    id: 'react',
    name: 'React Engine',
    description: 'Mastering the virtual DOM and reactive UI states.',
    icon: <Share2 size={32} />,
    color: '#61dbfb'
  },
  {
    id: 'state',
    name: 'Distributed State',
    description: 'Managing complex global data across the cluster.',
    icon: <Cloud size={32} />,
    color: '#8b5cf6'
  },
  {
    id: 'velocity',
    name: 'Velocity Hub',
    description: 'High-speed key-value transactions in real-time.',
    icon: <HardDrive size={32} />,
    color: '#f43f5e'
  }
];

export default function EnvironmentSelection({ onBack, onSelect, selected, onNext }) {
  return (
    <div className="animate-fade-in p-4">
      <h2 className="text-center mb-8" style={{ fontSize: '2rem', fontWeight: 800 }}>Spawn <span className="text-gradient">Location</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {ENVIRONMENTS.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`selection-card ${selected === item.id ? 'active' : ''}`}
            style={{
              padding: '1.5rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              border: selected === item.id ? `2px solid ${item.color}` : '1px solid rgba(255,255,255,0.1)',
              background: selected === item.id ? `${item.color}15` : 'rgba(255,255,255,0.02)',
              position: 'relative'
            }}
          >
            <div style={{ color: item.color }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{item.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{item.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn" onClick={onBack}>
          <ChevronLeft size={20} /> Back
        </button>
        <button 
          className="btn btn-primary" 
          disabled={!selected}
          onClick={onNext}
          style={{ minWidth: '160px' }}
        >
          Secure Location <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
