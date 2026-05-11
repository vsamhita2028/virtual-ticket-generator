import React from 'react';
import { Shield, Zap, Target, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

const CLASSES = [
  {
    id: 'warrior',
    name: 'Cyber Warrior',
    description: 'Frontline attacker, masters of brute force code.',
    icon: <Shield size={32} />,
    color: '#f43f5e'
  },
  {
    id: 'mage',
    name: 'Tech Mage',
    description: 'Masters of high-level abstractions and complex logic.',
    icon: <Cpu size={32} />,
    color: '#0ea5e9'
  },
  {
    id: 'stalker',
    name: 'Data Stalker',
    description: 'Invisible hunters of bugs and hidden data patterns.',
    icon: <Target size={32} />,
    color: '#10b981'
  },
  {
    id: 'warden',
    name: 'System Warden',
    description: 'Shield of the arena, protecting core systems.',
    icon: <Zap size={32} />,
    color: '#fbbf24'
  }
];

export default function ClassSelection({ onBack, onSelect, selected, onNext }) {
  return (
    <div className="animate-fade-in p-4">
      <h2 className="text-center mb-8" style={{ fontSize: '2rem', fontWeight: 800 }}>Choose Your <span className="text-gradient">Class</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {CLASSES.map((item) => (
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
            {selected === item.id && (
              <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
            )}
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
          Initialize <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
