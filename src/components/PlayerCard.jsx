import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Download, RefreshCcw, Sword, Ticket, User, ShieldCheck, Zap, Star, Activity, BarChart3, Database, MapPin, Target as GoalIcon } from 'lucide-react';

export default function PlayerCard({ data, onRestart }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#020617',
        scale: 3, 
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `valkeydossier-${data.name.toLowerCase()}.png`;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '1rem 0' }}>
      <h2 className="text-center mb-6" style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
        <span className="text-gradient">Arena Dossier Finalized</span>
      </h2>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        {/* VIRTUAL TICKET CARD (PORTRAIT - HIGH TECH Dossier style) */}
        <div
          ref={cardRef}
          style={{
            width: '540px',
            height: '960px',
            minWidth: '540px',
            background: '#020617',
            borderRadius: '40px',
            overflow: 'hidden',
            border: '2px solid rgba(14, 165, 233, 0.3)',
            boxShadow: '0 50px 120px rgba(0,0,0,0.9), 0 0 40px rgba(14, 165, 233, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* TOP DECORATIVE HEADER */}
          <div style={{
            height: '100px',
            background: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2rem',
            borderBottom: '2px solid rgba(14, 165, 233, 0.2)',
            zIndex: 10
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '2px' }}>
                I AM ATTENDING <span style={{ color: 'var(--color-primary)' }}>VALKEYTHON</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '4px', marginTop: '0.2rem', fontWeight: 800 }}>
                Arena File: {data.name}
              </div>
            </div>
          </div>

          {/* MAIN DATA GRID */}
          <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 10 }}>
            
            {/* Top Row: Photo & ID */}
            <div style={{ display: 'flex', gap: '1rem', height: '260px' }}>
              {/* Photo Card */}
              <div style={{ 
                width: '190px', 
                height: '260px', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.1)', 
                position: 'relative',
                background: '#0f172a'
              }}>
                {data.realPhoto ? (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${data.realPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={60} color="rgba(255,255,255,0.05)" />
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '0.5rem', background: 'rgba(14, 165, 233, 0.8)', color: 'white', fontSize: '0.65rem', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>
                  Bio-Metric Scan
                </div>
              </div>

              {/* Identity Details */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Real Identity</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>{data.realName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 700 }}>{data.designation}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Affiliation</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'white' }}>{data.organization}</div>
                </div>
              </div>
            </div>

            {/* TECHNICAL DOSSIER (Radar + Grid) */}
            <div style={{ background: 'rgba(14, 165, 233, 0.05)', borderRadius: '32px', border: '1px solid rgba(14, 165, 233, 0.2)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Radar Chart */}
                <div style={{ width: '140px', height: '140px', position: 'relative' }}>
                  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 5px var(--color-primary-glow))' }}>
                    <polygon points="50,5 95,38 78,92 22,92 5,38" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="50" y2="5" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="95" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="78" y2="92" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="22" y2="92" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="5" y2="38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <polygon 
                      points={`50,${data.attribute?.id === 'force' ? 10 : 30} ${data.attribute?.id === 'speed' ? 90 : 70},45 70,80 30,80 ${data.playerClass?.id === 'warden' ? 10 : 30},45`} 
                      fill="rgba(14, 165, 233, 0.4)" stroke="var(--color-primary)" strokeWidth="2" 
                    />
                  </svg>
                </div>
                {/* Highlights */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={16} color="var(--color-primary)" />
                    <div>
                      <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Class</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{data.playerClass?.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} color="#8b5cf6" />
                    <div>
                      <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Environment</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{data.environment?.name}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Secondary Stats Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', marginBottom: '0.25rem' }}>
                    <GoalIcon size={14} />
                    <span style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase' }}>Ambition</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>{data.goal?.name}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', marginBottom: '0.25rem' }}>
                    <Database size={14} />
                    <span style={{ fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase' }}>Stat Focus</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>{data.attribute?.name}</div>
                </div>
              </div>
            </div>

            {/* GEAR & QUEST SECTION */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f43f5e', marginBottom: '0.5rem' }}>
                  <Sword size={14} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Equipped Weapon</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>{data.weapon?.name}</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
                  <Zap size={14} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Current Quest</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>{data.battle?.title}</div>
              </div>
            </div>

          </div>

          {/* FOOTER: BRANDING & PARTNERS */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            borderTop: '2px solid rgba(14, 165, 233, 0.2)',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', justifyContent: 'center' }}>
              <img src={`${import.meta.env.BASE_URL}logos/valkey-horizontal-color-light.png`} alt="Valkey" style={{ height: '28px' }} crossOrigin="anonymous" />
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-primary)', opacity: 0.8 }}>X</div>
              <img src={`${import.meta.env.BASE_URL}logos/ReactHyderabadLogoFull.jpg`} alt="React Hyderabad" style={{ height: '34px', borderRadius: '6px' }} crossOrigin="anonymous" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Community Partner</div>
                <div style={{ background: 'white', padding: '0.3rem', borderRadius: '4px' }}>
                  <img src={`${import.meta.env.BASE_URL}logos/Juicer Technology.jpg`} alt="Juicer" style={{ height: '18px' }} crossOrigin="anonymous" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Platform Partner</div>
                <div style={{ background: 'white', padding: '0.3rem', borderRadius: '4px' }}>
                  <img src={`${import.meta.env.BASE_URL}logos/goaAvo.jpg`} alt="Go Avo" style={{ height: '18px' }} crossOrigin="anonymous" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button className="btn" onClick={onRestart}>
          <RefreshCcw size={18} /> Reset File
        </button>
        <button
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={isGenerating}
          style={{ minWidth: '200px' }}
        >
          {isGenerating ? 'Exporting...' : <><Download size={18} /> Download Dossier</>}
        </button>
      </div>
    </div>
  );
}
