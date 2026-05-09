import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const avatars = [
  // Original Females
  { id: 'cyberpunk', name: 'Cyber Hacker', src: '/avatars/cyberpunk.png' },
  { id: 'fantasy', name: 'Tech Mage', src: '/avatars/fantasy.png' },
  // Original Robot
  { id: 'robot', name: 'AI Construct', src: '/avatars/robot.png' },
  // Original Females
  { id: 'steampunk', name: 'Clockwork Engineer', src: '/avatars/steampunk.png' },
  // Males & Neutral
  { id: 'space_marine', name: 'Space Marine', src: '/avatars/space_marine.png' },
  { id: 'cyber_ninja', name: 'Cyber Ninja', src: '/avatars/cyber_ninja.png' }
];

export default function AvatarSelection({ onSelect, selected, onNext, onBack }) {
  return (
    <div className="animate-fade-in" style={{ paddingBottom: '2rem' }}>
      <h2 className="text-center mb-6" style={{ fontSize: '2rem' }}>Choose Your Class</h2>
      
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
        }}>
          {avatars.map((avatar) => (
            <div 
              key={avatar.id}
              onClick={() => onSelect(avatar.id)}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                border: selected === avatar.id ? '2px solid var(--color-primary)' : '2px solid var(--glass-border)',
                transition: 'all 0.3s ease',
                transform: selected === avatar.id ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selected === avatar.id ? '0 0 20px var(--color-primary-glow)' : 'none',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (selected !== avatar.id) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'var(--color-primary-glow)';
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== avatar.id) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                }
              }}
            >
              <div style={{ aspectRatio: '1/1', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={avatar.src} 
                  alt={avatar.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  crossOrigin="anonymous" 
                />
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(4px)',
                padding: '0.75rem',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                borderTop: '1px solid var(--glass-border)'
              }}>
                {avatar.name}
              </div>
            </div>
          ))}
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
