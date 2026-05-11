import React from 'react';
import { Swords, Activity, Brain, Clover, ChevronLeft, ChevronRight } from 'lucide-react';

const ATTRIBUTES = [
  {
    id: 'force',
    name: 'Strength',
    sub: 'Force',
    description: 'Increases raw power and impact of your solutions.',
    icon: <Swords size={28} />,
    color: '#ef4444'
  },
  {
    id: 'speed',
    name: 'Agility',
    sub: 'Speed',
    description: 'Increases execution speed and rapid deployment.',
    icon: <Activity size={28} />,
    color: '#0ea5e9'
  },
  {
    id: 'logic',
    name: 'Intelligence',
    sub: 'Logic',
    description: 'Enhances code optimization and complex problem solving.',
    icon: <Brain size={28} />,
    color: '#8b5cf6'
  },
  {
    id: 'crit',
    name: 'Luck',
    sub: 'Critical',
    description: 'Higher chance for breakthrough "Aha!" moments.',
    icon: <Clover size={28} />,
    color: '#10b981'
  }
];

export default function AttributeFocus({ onBack, onSelect, selected, onNext }) {
  return (
    <div className="animate-fade-in p-4">
      <h2 className="text-center mb-8" style={{ fontSize: '2rem', fontWeight: 800 }}>Allocate <span className="text-gradient">Stat Points</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
        {ATTRIBUTES.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`selection-card ${selected === item.id ? 'active' : ''}`}
            style={{
              padding: '1.25rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              border: selected === item.id ? `2px solid ${item.color}` : '1px solid rgba(255,255,255,0.1)',
              background: selected === item.id ? `${item.color}10` : 'rgba(255,255,255,0.02)',
              borderRadius: '20px'
            }}
          >
            <div style={{ 
              background: selected === item.id ? item.color : 'rgba(255,255,255,0.05)', 
              padding: '0.75rem', 
              borderRadius: '12px',
              color: selected === item.id ? 'white' : item.color
            }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{item.name}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: item.color, textTransform: 'uppercase', background: `${item.color}20`, padding: '0.1rem 0.5rem', borderRadius: '4px' }}>+{item.sub}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{item.description}</div>
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
          Confirm Stats <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
