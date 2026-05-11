import React from 'react';
import { Trophy, Flame, Rocket, Gem, ChevronLeft, ChevronRight } from 'lucide-react';

const GOALS = [
  {
    id: 'clean',
    name: 'Clean Code King',
    description: 'Aiming for the most elegant and readable solution.',
    icon: <Gem size={32} />,
    color: '#10b981'
  },
  {
    id: 'slayer',
    name: 'Bug Slayer',
    description: 'Destroying every bug that dares to enter the arena.',
    icon: <Flame size={32} />,
    color: '#f43f5e'
  },
  {
    id: 'speed',
    name: 'Speed Demon',
    description: 'Finishing with the fastest execution time.',
    icon: <Rocket size={32} />,
    color: '#0ea5e9'
  },
  {
    id: 'legend',
    name: 'Arch Legend',
    description: 'Designing a system that will be studied for years.',
    icon: <Trophy size={32} />,
    color: '#fbbf24'
  }
];

export default function AchievementGoal({ onBack, onSelect, selected, onNext }) {
  return (
    <div className="animate-fade-in p-4">
      <h2 className="text-center mb-8" style={{ fontSize: '2rem', fontWeight: 800 }}>Arena <span className="text-gradient">Ambition</span></h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {GOALS.map((item) => (
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
          Set Ambition <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
