import React from 'react';
import { Coffee, ScrollText, Keyboard, Bird, Headphones, ArrowLeft, ArrowRight, Glasses, BatteryCharging, Terminal } from 'lucide-react';

const weapons = [
  {
    id: 'coffee',
    name: 'Midnight Code Brew',
    description: '+100 Stamina. Immunity to sleep status effects.',
    icon: Coffee,
    color: '#d97706' // amber
  },
  {
    id: 'stackoverflow',
    name: 'Scroll of StackOverflow',
    description: 'Summons ancient developer wisdom. 50% chance to copy-paste solution.',
    icon: ScrollText,
    color: '#f97316' // orange
  },
  {
    id: 'keyboard',
    name: 'Mechanical Keyboard',
    description: '120 WPM Area-of-Effect noise damage. Click-clack intimidation.',
    icon: Keyboard,
    color: '#ec4899' // pink
  },
  {
    id: 'rubberduck',
    name: 'Rubber Duck Familiar',
    description: '+50 Debugging Wisdom. Listens to all your problems without judging.',
    icon: Bird,
    color: '#eab308' // yellow
  },
  {
    id: 'headphones',
    name: 'Noise Cancelling Aura',
    description: 'Total invulnerability to office distractions and small talk.',
    icon: Headphones,
    color: '#8b5cf6' // purple
  },
  {
    id: 'visor',
    name: 'Dark Mode Visor',
    description: 'Reduces eye strain. +50 to night-vision bug hunting.',
    icon: Glasses,
    color: '#06b6d4' // cyan
  },
  {
    id: 'energydrink',
    name: 'Energy Drink IV',
    description: 'Continuous stamina regeneration. May cause jitters and fast typing.',
    icon: BatteryCharging,
    color: '#10b981' // emerald
  },
  {
    id: 'gitpush',
    name: 'Git Push --Force',
    description: 'Ultimate chaotic move. Overwrites reality. Handle with extreme care.',
    icon: Terminal,
    color: '#ef4444' // red
  }
];

export default function WeaponSelection({ onBack, onSelect, selected, onNext }) {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <h2 className="text-center mb-2" style={{ fontSize: '2rem' }}>Equip Your Loadout</h2>
      <p className="text-center mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Choose your primary coder weapon to survive the hackathon
      </p>

      {/* Scrollable container for smaller screens */}
      <div style={{
        maxHeight: '60vh',
        overflowY: 'auto',
        padding: '1rem',
        borderRadius: '16px',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {weapons.map((weapon) => {
            const Icon = weapon.icon;
            return (
              <div
                key={weapon.id}
                onClick={() => onSelect(weapon)}
                style={{
                  cursor: 'pointer',
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${selected === weapon.id ? weapon.color : 'var(--glass-border)'}`,
                  borderRadius: '16px',
                  padding: '1.25rem',
                  transition: 'all 0.3s ease',
                  boxShadow: selected === weapon.id ? `0 0 15px ${weapon.color}40` : 'none',
                  transform: selected === weapon.id ? 'translateY(-5px)' : 'none',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (selected !== weapon.id) {
                    e.currentTarget.style.borderColor = weapon.color;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected !== weapon.id) {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                  }
                }}
              >
                <div style={{ 
                  background: `${weapon.color}20`, 
                  color: weapon.color,
                  padding: '1rem',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  marginBottom: '1rem'
                }}>
                  <Icon size={32} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{weapon.name}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>
                  {weapon.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1.5rem' }}>
        <button className="btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back
        </button>
        <button className="btn btn-primary" onClick={onNext} disabled={!selected}>
          Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
