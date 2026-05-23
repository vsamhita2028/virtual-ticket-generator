import React from 'react';
import { ArrowLeft, ArrowRight, Swords } from 'lucide-react';

const battles = [
  {
    id: 'ai-accessibility',
    title: 'AI for Accessibility',
    description: 'Build tools to help people with disabilities using AI.',
    color: '#10b981' // emerald
  },
  {
    id: 'sustainable-tech',
    title: 'Sustainable Tech',
    description: 'Create apps to track and reduce pollution or carbon footprints.',
    color: '#0ea5e9' // sky blue
  },
  {
    id: 'future-finance',
    title: 'Future of Finance',
    description: 'Design easy financial and payment tools for everyone.',
    color: '#f59e0b' // amber
  },
  {
    id: 'health-tech',
    title: 'Next-Gen HealthTech',
    description: 'Create systems to monitor health and analyze medical data.',
    color: '#f43f5e' // rose
  }
];

export default function BattleSelection({ onBack, onSelect, selected, onNext }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-center mb-2" style={{ fontSize: '2rem' }}>Choose Your Track</h2>
      <p className="text-center mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Select the hackathon track you want to work on.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {battles.map((battle) => (
          <div
            key={battle.id}
            onClick={() => onSelect(battle)}
            style={{
              cursor: 'pointer',
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${selected === battle.id ? battle.color : 'var(--glass-border)'}`,
              borderRadius: '16px',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              boxShadow: selected === battle.id ? `0 0 15px ${battle.color}40` : 'none',
              transform: selected === battle.id ? 'translateY(-5px)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selected !== battle.id) {
                e.currentTarget.style.borderColor = battle.color;
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (selected !== battle.id) {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                background: `${battle.color}20`,
                color: battle.color,
                padding: '0.5rem',
                borderRadius: '8px'
              }}>
                <Swords size={20} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{battle.title}</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              {battle.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <button className="btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="btn btn-primary" onClick={onNext} disabled={!selected}>
          Generate Identity <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
