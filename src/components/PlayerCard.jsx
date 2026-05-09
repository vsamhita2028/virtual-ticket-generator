import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, RefreshCcw, ArrowRight, Sword, Ticket } from 'lucide-react';

export default function PlayerCard({ data, onRestart }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Map avatar id to actual image and display name
  const getAvatarDetails = () => {
    const base = import.meta.env.BASE_URL;
    switch (data.avatar) {
      case 'cyberpunk': return { src: `${base}avatars/cyberpunk.png`, class: 'Cyber Hacker' };
      case 'fantasy': return { src: `${base}avatars/fantasy.png`, class: 'Tech Mage' };
      case 'robot': return { src: `${base}avatars/robot.png`, class: 'AI Construct' };
      case 'steampunk': return { src: `${base}avatars/steampunk.png`, class: 'Clockwork Engineer' };
      case 'space_marine': return { src: `${base}avatars/space_marine.png`, class: 'Space Marine' };
      case 'cyber_ninja': return { src: `${base}avatars/cyber_ninja.png`, class: 'Cyber Ninja' };
      default: return { src: '', class: 'Unknown Player' };
    }
  };

  const avatar = getAvatarDetails();

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#020617',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${data.name}-valkeython-ticket.png`;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <h2 className="text-center mb-6" style={{ fontSize: '2rem' }}>Transformation Complete</h2>

      <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', paddingBottom: '1rem' }}>

        {/* VIRTUAL TICKET CARD */}
        <div
          ref={cardRef}
          style={{
            width: '800px',
            height: '500px', // slightly taller for header/footer
            minWidth: '800px',
            background: '#0f172a', // slate-900
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid rgba(14, 165, 233, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* HEADER: Event Branding */}
          <div style={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2rem',
            background: 'linear-gradient(to right, rgba(2,6,23,1), rgba(15,23,42,1))'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Ticket color="var(--color-primary)" size={28} />
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '2px', fontStyle: 'italic' }}>
                I AM ATTENDING VALKEY-THON
              </div>
            </div>
          </div>

          {/* HERO: Transformation Graphics */}
          <div style={{ flex: 1, position: 'relative', display: 'flex' }}>

            {/* Left Photo */}
            <div style={{ width: '50%', height: '100%', position: 'relative' }}>
              <img
                src={data.realPhoto || avatar.src}
                alt="Real Identity"
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }}
                crossOrigin="anonymous"
              />
            </div>

            {/* Right Photo */}
            <div style={{ width: '50%', height: '100%', position: 'relative' }}>
              <img
                src={avatar.src}
                alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                crossOrigin="anonymous"
              />
            </div>

            {/* Gradient Overlay for Text */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              background: 'linear-gradient(to top, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.6) 40%, transparent 100%), linear-gradient(to bottom, rgba(2,6,23,1) 0%, transparent 15%)',
              pointerEvents: 'none'
            }} />

            {/* Center Arrow */}
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              background: 'rgba(2, 6, 23, 0.8)',
              backdropFilter: 'blur(8px)',
              border: '2px solid var(--color-primary)',
              borderRadius: '50%',
              width: '46px', height: '46px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px var(--color-primary-glow)'
            }}>
              <ArrowRight size={22} color="var(--color-primary)" />
            </div>

            {/* Information Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '2rem',
              right: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              zIndex: 20
            }}>
              {/* Real Identity */}
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                  Identity
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', lineHeight: 1.1 }}>
                  {data.realName}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.25rem' }}>
                  {data.designation} <span style={{ color: 'var(--color-primary)' }}>@ {data.organization}</span>
                </div>
              </div>

              {/* Center Loadout/Quest */}
              <div style={{
                flex: '0 0 320px',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '0.75rem',
                backdropFilter: 'blur(8px)'
              }}>
                {data.weapon && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.4)', padding: '0.4rem 0.8rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                    <Sword size={12} color={data.weapon.color} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Equipped:</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: data.weapon.color }}>{data.weapon.name}</span>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                    Quest Accepted
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: data.battle?.color || 'var(--color-primary)', boxShadow: `0 0 10px ${data.battle?.color}` }} />
                    <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'white' }}>
                      {data.battle?.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arena Entity */}
              <div style={{ flex: 1, paddingLeft: '1rem', textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                  Arena Entity
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', lineHeight: 1.1 }}>
                  {data.name}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-primary)', marginTop: '0.25rem' }}>
                  {avatar.class}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER: Partners & Event Title */}
          <div style={{
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            background: 'rgba(2, 6, 23, 1)',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            {/* Community Partner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>
                Community<br />Partner
              </div>
              <div style={{ background: 'white', padding: '0.2rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <img src={`${import.meta.env.BASE_URL}logos/Juicer Technology.jpg`} alt="Juicer Technology" style={{ height: '30px' }} crossOrigin="anonymous" />
              </div>
            </div>

            {/* Event Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={`${import.meta.env.BASE_URL}logos/valkey-horizontal-color-light.png`} alt="Valkey" style={{ width: '75px', height: 'auto', display: 'block', verticalAlign: 'middle' }} crossOrigin="anonymous" />

              <span style={{ color: 'var(--color-text-muted)', fontWeight: 'bold' }}>X</span>
              <img src={`${import.meta.env.BASE_URL}logos/ReactHyderabadLogoFull.jpg`} alt="React Hyderabad" style={{ height: '40px', borderRadius: '4px', display: 'block' }} crossOrigin="anonymous" />
            </div>

            {/* Platform Partner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'white', padding: '0.2rem', borderRadius: '4px', display: 'flex', alignItems: 'center' }}>
                <img src={`${import.meta.env.BASE_URL}logos/goaAvo.jpg`} alt="goaAvo" style={{ height: '30px' }} crossOrigin="anonymous" />
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'left' }}>
                Platform<br />Partner
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button className="btn" onClick={onRestart}>
          <RefreshCcw size={18} /> Start Over
        </button>
        <button
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : <><Download size={18} /> Download</>}
        </button>
      </div>
    </div>
  );
}
