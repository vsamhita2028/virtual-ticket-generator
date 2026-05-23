import React, { useEffect, useState } from 'react';
import { Ticket, Share2, Zap, ArrowRight, Users } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

const features = [
  {
    icon: <Ticket size={22} />,
    color: '#0ea5e9',
    title: 'Your Hackathon Identity',
    desc: 'Get a unique, personalised identity card for the Build Beyond Limits hackathon.'
  },
  {
    icon: <Share2 size={22} />,
    color: '#8b5cf6',
    title: 'Share on Social Media',
    desc: 'Download your card and share it on LinkedIn, Twitter, or Instagram to show you\'re part of the arena.'
  },
  {
    icon: <Users size={22} />,
    color: '#10b981',
    title: 'Join the Community',
    desc: 'Organised by React Hyderabad and powered by Valkey, be part of a movement of builders.'
  },
  {
    icon: <Zap size={22} />,
    color: '#f59e0b',
    title: 'Ready in 60 Seconds',
    desc: 'Upload your photo, fill in your details, and your arena identity is ready to download.'
  }
];

export default function LandingPage({ onGetStarted }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="animate-fade-in"
      style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem 2rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease'
      }}
    >
      {/* Logo lockup */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap'
      }}>
        <img
          src={`${BASE}logos/valkey-horizontal-color-light.png`}
          alt="Valkey"
          style={{ height: '32px', objectFit: 'contain' }}
        />
        <div style={{
          width: '1px', height: '32px',
          background: 'rgba(255,255,255,0.15)'
        }} />
        <img
          src={`${BASE}logos/ReactHyderabadLogoFull.jpg`}
          alt="React Hyderabad"
          style={{ height: '36px', objectFit: 'contain', borderRadius: '6px' }}
        />
      </div>

      {/* Hero text */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '0.7rem', fontWeight: 800,
          color: 'var(--color-primary)',
          textTransform: 'uppercase', letterSpacing: '3px',
          border: '1px solid rgba(14,165,233,0.3)',
          background: 'rgba(14,165,233,0.08)',
          borderRadius: '100px', padding: '0.3rem 1rem',
          marginBottom: '1.25rem'
        }}>
          Build Beyond Limits Hackathon
        </div>

        <h2 style={{
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          fontWeight: 950,
          color: 'white',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: '1rem'
        }}>
          Forge Your <span style={{
            background: 'linear-gradient(90deg, #0ea5e9, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Arena Identity</span>
        </h2>

        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.7,
          maxWidth: '480px',
          margin: '0 auto'
        }}>
          Create your personalised hackathon identity card for the <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Build Beyond Limits</strong> hackathon,
          then download and share it on social media to show the world you're in the arena.
        </p>
      </div>

      {/* Feature cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1rem',
        marginBottom: '2.5rem'
      }}>
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              transition: 'border-color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = f.color + '60'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <div style={{
              color: f.color,
              background: f.color + '18',
              borderRadius: '10px',
              padding: '0.55rem',
              flexShrink: 0,
              marginTop: '0.1rem'
            }}>
              {f.icon}
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '0.3rem' }}>
                {f.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55 }}>
                {f.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className="btn btn-primary"
          onClick={onGetStarted}
          style={{
            fontSize: '1rem',
            padding: '0.85rem 2.5rem',
            borderRadius: '100px',
            fontWeight: 800,
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: '0 0 30px rgba(14,165,233,0.25)'
          }}
        >
          Get Started <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
