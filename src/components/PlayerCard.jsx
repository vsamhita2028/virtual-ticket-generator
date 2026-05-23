import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Download, RefreshCcw, Sword, Ticket, User, ShieldCheck, Zap, Star, Activity, BarChart3, Database, MapPin, Target as GoalIcon, X } from 'lucide-react';

const toDataURL = (url) => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  }));

export default function PlayerCard({ data, onRestart }) {
  const cardRef = useRef(null);
  const photoContainerRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scale, setScale] = useState(1);
  const [logoDataUrls, setLogoDataUrls] = useState({});
  const [containerSize, setContainerSize] = useState(null);
  const [imgSize, setImgSize] = useState(null);
  const [iosSaveImage, setIosSaveImage] = useState(null); // holds blob URL for iOS save overlay

  // Detect iOS (iPhone/iPad) — all iOS browsers use WebKit and block programmatic downloads
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);


  // Recalculate sizes when data.realPhoto changes
  useEffect(() => {
    if (!data.realPhoto) return;
    const img = new Image();
    img.src = data.realPhoto;
    img.onload = () => {
      setImgSize({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      if (photoContainerRef.current) {
        setContainerSize({
          width: photoContainerRef.current.clientWidth,
          height: photoContainerRef.current.clientHeight
        });
      }
    };
  }, [data.realPhoto]);

  // Handle image load event for inline img
  const handleImageLoad = (e) => {
    const img = e.currentTarget;
    const container = photoContainerRef.current || img.parentElement;
    if (container) {
      setContainerSize({
        width: container.clientWidth,
        height: container.clientHeight
      });
    }
    setImgSize({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };

  // Helper to compute image style simulating 'object-fit: cover'
  const getImgStyle = () => {
    if (!containerSize || !imgSize) {
      return {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      };
    }

    const R_c = containerSize.width / containerSize.height;
    const R_i = imgSize.width / imgSize.height;

    if (R_i > R_c) {
      const widthPercent = (R_i / R_c) * 100;
      return {
        position: 'absolute',
        width: `${widthPercent}%`,
        height: '100%',
        left: `${(100 - widthPercent) / 2}%`,
        top: '0%',
        objectFit: 'cover',
        display: 'block'
      };
    } else {
      const heightPercent = (R_c / R_i) * 100;
      return {
        position: 'absolute',
        width: '100%',
        height: `${heightPercent}%`,
        left: '0%',
        top: `${(100 - heightPercent) / 2}%`,
        objectFit: 'cover',
        display: 'block'
      };
    }
  };

  useEffect(() => {
    const logos = {
      valkey: `${import.meta.env.BASE_URL}logos/valkey-horizontal-color-light.png`,
      reactHyd: `${import.meta.env.BASE_URL}logos/ReactHyderabadLogoFull.jpg`,
      juicer: `${import.meta.env.BASE_URL}logos/JuicerTechnology.jpg`,
      goaAvo: `${import.meta.env.BASE_URL}logos/goaAvo.jpg`
    };

    const convertLogos = async () => {
      const converted = {};
      for (const [key, url] of Object.entries(logos)) {
        try {
          const dataUrl = await toDataURL(url);
          converted[key] = dataUrl;
        } catch (err) {
          console.error(`Failed to convert logo ${key} to data URL`, err);
          converted[key] = url; // Fallback to original URL
        }
      }
      setLogoDataUrls(converted);
    };

    convertLogos();
  }, []);

  // Responsive scaling logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        const newScale = (window.innerWidth * 0.9) / 600;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#020617',
        scale: 3,
        useCORS: true,
        allowTaint: false,
        logging: false,
        onclone: (clonedDoc) => {
          const card = clonedDoc.getElementById('virtual-ticket-card');
          if (card && card.parentElement) {
            card.parentElement.style.transform = 'none';
            card.parentElement.style.width = '600px';
            card.parentElement.style.height = '1000px';
          }
        }
      });

      const fileName = `valkeydossier-${(data.name || 'ticket').toLowerCase()}.png`;

      // Convert canvas to Blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1.0));

      let sw = null;
      if ('serviceWorker' in navigator) {
        sw = navigator.serviceWorker.controller;
        if (!sw) {
          try {
            const reg = await navigator.serviceWorker.ready;
            sw = reg.active;
          } catch (err) {
            console.log('SW not ready', err);
          }
        }
      }

      if (sw) {
        // Use Service Worker to mimic a server response with proper download headers
        // This triggers native download dialogs even on iOS!
        const downloadId = Math.random().toString(36).substring(2, 15);
        const messageChannel = new MessageChannel();
        
        messageChannel.port1.onmessage = (event) => {
          if (event.data.success) {
            // Using window.location.href is more reliable for native downloads on iOS 
            window.location.href = `/__download/${downloadId}`;
          }
        };

        sw.postMessage(
          { type: 'STORE_DOWNLOAD', id: downloadId, blob, filename: fileName },
          [messageChannel.port2]
        );
      } else if (isIOS) {
        // Fallback for iOS if SW is not ready (e.g. first page load)
        const blobUrl = URL.createObjectURL(blob);
        setIosSaveImage(blobUrl);
      } else {
        // Fallback for others if SW is not ready
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      }
    } catch (err) {
      console.error('Error generating image:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const closeIosOverlay = () => {
    if (iosSaveImage) {
      URL.revokeObjectURL(iosSaveImage);
    }
    setIosSaveImage(null);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '2rem 0' }}>
      <h2 className="text-center mb-8" style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
        <span className="text-gradient">Arena Identity Initialized</span>
      </h2>

      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        overflow: 'visible'
      }}>
        {/* MOBILE-RESPONSIVE SCALING WRAPPER */}
        <div style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          width: '600px',
          height: `${1000 * scale}px`,
          transition: 'transform 0.3s ease',
          marginBottom: '2rem'
        }}>

          {/* VIRTUAL TICKET CARD (CYBER BENTO - CLEANED) */}
          <div
            ref={cardRef}
            id="virtual-ticket-card"
            style={{
              width: '600px',
              height: '1000px',
              minWidth: '600px',
              background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
              borderRadius: '32px',
              overflow: 'hidden',
              border: '1px solid rgba(14, 165, 233, 0.4)',
              boxShadow: '0 80px 150px rgba(0,0,0,0.9), 0 0 50px rgba(14, 165, 233, 0.15)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {/* DECORATIVE BACKGROUND ELEMENTS */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, pointerEvents: 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(rgba(14, 165, 233, 0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              <div style={{ position: 'absolute', top: '15%', left: '-5%', width: '110%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.8), transparent)' }} />
              <div style={{ position: 'absolute', top: '75%', left: '-5%', width: '110%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.8), transparent)' }} />
            </div>

            {/* TOP HEADER: STATUS & BRANDING */}
            <div style={{
              height: '140px',
              background: 'rgba(15, 23, 42, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              borderBottom: '1px solid rgba(14, 165, 233, 0.3)',
              zIndex: 10,
              position: 'relative'
            }}>
              {/* Corner Accents */}
              <div style={{ position: 'absolute', top: '15px', left: '15px', width: '20px', height: '20px', borderTop: '2px solid var(--color-primary)', borderLeft: '2px solid var(--color-primary)' }} />
              <div style={{ position: 'absolute', top: '15px', right: '15px', width: '20px', height: '20px', borderTop: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)' }} />

              <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '0.4rem' }}>ENTERING THE BATTLEFIELD</div>
                <div style={{ fontSize: 'clamp(1.2rem, 4cqi, 1.9rem)', fontWeight: 950, color: 'white', textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap' }}>
                  <span style={{ color: 'var(--color-primary)', textShadow: '0 0 15px rgba(14,165,233,0.5)' }}>BUILD BEYOND LIMITS</span>
                </div>
              </div>
              <div style={{
                marginTop: '0.75rem', padding: '0.3rem 1.5rem', background: 'rgba(14, 165, 233, 0.1)',
                borderRadius: '100px', border: '1px solid rgba(14, 165, 233, 0.3)',
                fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '3px',
                maxWidth: '90%', wordBreak: 'break-word', overflowWrap: 'anywhere', textAlign: 'center'
              }}>
                Arena File: {data.name}
              </div>
            </div>

            {/* BENTO GRID CONTENT */}
            <div style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(10, 1fr)', columnGap: '1.25rem', rowGap: '1.75rem', zIndex: 10 }}>

              {/* PHOTO BOX (Large Hero) */}
              <div 
                ref={photoContainerRef}
                style={{
                  gridColumn: '1 / 6', gridRow: '1 / 6',
                  background: 'rgba(255,255,255,0.02)', borderRadius: '24px', overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)', position: 'relative'
                }}
              >
                {data.realPhoto ? (
                  <img
                    src={data.realPhoto}
                    alt="Subject Bio-Metric"
                    onLoad={handleImageLoad}
                    style={getImgStyle()}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={80} color="rgba(255,255,255,0.05)" />
                  </div>
                )}
                {/* Scanline Effect Overlay */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(14,165,233,0.1) 50%, transparent 50%)', backgroundSize: '100% 4px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '0.75rem', background: 'linear-gradient(to top, rgba(14, 165, 233, 0.9), transparent)', color: 'white', fontSize: '0.7rem', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  Subject Bio-Metric Verify
                </div>
              </div>

              {/* COMBINED IDENTITY & AFFILIATION CARD (Space-Optimized) */}
              <div style={{
                gridColumn: '6 / 13', gridRow: '1 / 6',
                background: 'rgba(15, 23, 42, 0.6)', borderRadius: '24px', padding: '1.75rem',
                border: '1px solid rgba(14, 165, 233, 0.2)', display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden'
              }}>
                {/* DECORATIVE: Top-right Barcode */}
                <div style={{ position: 'absolute', top: '2rem', right: '1.5rem', display: 'flex', gap: '2px', opacity: 0.2 }}>
                  {[3, 8, 4, 12, 6, 10, 4, 8].map((h, i) => (
                    <div key={i} style={{ width: '2px', height: `${h}px`, background: 'white' }} />
                  ))}
                </div>

                {/* Top Half: Identity */}
                <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-primary)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Full Identification</div>
                    <div style={{ fontSize: '0.5rem', color: '#22c55e', border: '1px solid #22c55e', padding: '1px 6px', borderRadius: '4px', fontWeight: 900 }}>SEC_VERIFIED</div>
                  </div>
                  <div style={{ fontSize: 'clamp(1.2rem, 3.8cqi, 2.2rem)', fontWeight: 950, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.05, textShadow: '0 0 20px rgba(14,165,233,0.2)', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{data.realName}</div>
                  <div style={{ fontSize: 'clamp(0.75rem, 2cqi, 1.1rem)', color: 'rgba(255,255,255,0.6)', fontWeight: 700, marginTop: '0.5rem', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{data.designation}</div>
                </div>

                {/* Horizontal Divider */}
                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.4), transparent)', margin: '1rem 0' }} />

                {/* Bottom Half: Affiliation & Arena in separate rows */}
                <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem', position: 'relative', zIndex: 5, overflow: 'hidden' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.25rem' }}>Organization</div>
                    <div style={{ fontSize: 'clamp(0.7rem, 2.5cqi, 1.15rem)', fontWeight: 900, color: 'white', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{data.organization}</div>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.55rem', color: 'var(--color-primary)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.25rem' }}>Arena Name</div>
                    <div style={{ fontSize: 'clamp(0.7rem, 2.5cqi, 1.15rem)', fontWeight: 900, color: 'white', textTransform: 'uppercase', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{data.name || 'VALKEYTHON'}</div>
                  </div>
                </div>

                {/* DECORATIVE: Background Tech Stream */}
                <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(14, 165, 233, 0.08)', textAlign: 'right', pointerEvents: 'none', lineHeight: 1.2 }}>
                  AUTH: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}<br />
                  SYS: ACTIVE_NODE_7<br />
                  LATENCY: 0.02ms
                </div>

                {/* Decorative background accent */}
                <Activity size={80} style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.03, color: 'var(--color-primary)' }} />
              </div>

              {/* DATA CONSTELLATION MODULE */}
              <div style={{
                gridColumn: '1 / 8', gridRow: '6 / 11',
                background: 'rgba(14, 165, 233, 0.03)', borderRadius: '24px', padding: '1.5rem',
                border: '1px solid rgba(14, 165, 233, 0.2)', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Neural Constellation</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--color-primary)', fontWeight: 800 }}>MAPPING: ACTIVE</div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {/* Constellation SVG Visualization */}
                  <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                    <svg width="150" height="150" viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 5px rgba(14, 165, 233, 0.3))' }}>
                      <line x1="20" y1="20" x2="50" y2="50" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.4" />
                      <line x1="50" y1="50" x2="80" y2="30" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.4" />
                      <line x1="50" y1="50" x2="60" y2="80" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.4" />
                      <line x1="20" y1="20" x2="10" y2="60" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.4" />
                      <circle cx="20" cy="20" r="3" fill="var(--color-primary)" />
                      <circle cx="50" cy="50" r="4" fill="white" />
                      <circle cx="80" cy="30" r="2.5" fill="var(--color-primary)" />
                      <circle cx="60" cy="80" r="2.5" fill="var(--color-primary)" />
                      <circle cx="10" cy="60" r="2" fill="var(--color-primary)" opacity="0.5" />
                      <text x="25" y="20" fontSize="4" fill="rgba(255,255,255,0.4)" fontWeight="700">[LOC: 1.1]</text>
                      <text x="55" y="55" fontSize="4" fill="rgba(255,255,255,0.4)" fontWeight="700">[CORE: 0.0]</text>
                      <text x="85" y="30" fontSize="4" fill="rgba(255,255,255,0.4)" fontWeight="700">[LOC: 2.4]</text>
                    </svg>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '0.75rem' }}>
                      <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Archetype Node</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{data.playerClass?.name}</div>
                    </div>
                    <div style={{ borderLeft: '2px solid #8b5cf6', paddingLeft: '0.75rem' }}>
                      <div style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Execution Realm</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{data.environment?.name}</div>
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '15px', height: '15px', borderBottom: '1px solid var(--color-primary)', borderRight: '1px solid var(--color-primary)', opacity: 0.3 }} />
              </div>

              {/* LOADOUT & OBJECTIVE */}
              <div style={{
                gridColumn: '8 / 13', gridRow: '6 / 8',
                background: 'rgba(244, 63, 94, 0.05)', borderRadius: '24px', padding: '1rem',
                border: '1px solid rgba(244, 63, 94, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f43f5e', marginBottom: '0.25rem' }}>
                  <Sword size={16} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase' }}>Loadout</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'white' }}>{data.weapon?.name}</div>
              </div>

              <div style={{
                gridColumn: '8 / 13', gridRow: '8 / 11',
                background: 'rgba(251, 191, 36, 0.05)', borderRadius: '24px', padding: '1.25rem',
                border: '1px solid rgba(251, 191, 36, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', marginBottom: '0.5rem' }}>
                  <Zap size={16} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase' }}>Squad Alliance</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white', lineHeight: 1.2, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{data.teamName || 'SOLO'}</div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.6rem', color: 'rgba(251, 191, 36, 0.5)', fontWeight: 800, textTransform: 'uppercase' }}>STATUS: ACTIVE</div>
              </div>

            </div>

            {/* FOOTER: BRANDING & PARTNERS */}
            <div style={{
              background: '#020617',
              padding: '0.85rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0',
              borderTop: '1px solid rgba(14, 165, 233, 0.3)',
              zIndex: 10,
              position: 'relative',
              height: '110px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', gap: '0.75rem' }}>
                {/* Powered by Valkey */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Powered by</div>
                  <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                    <img src={logoDataUrls.valkey || `${import.meta.env.BASE_URL}logos/valkey-horizontal-color-light.png`} alt="Valkey" style={{ height: '28px' }} />
                  </div>
                </div>
                {/* Hosted by React Hyderabad */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Hosted by</div>
                  <div style={{ height: '36px', display: 'flex', alignItems: 'center' }}>
                    <img src={logoDataUrls.reactHyd || `${import.meta.env.BASE_URL}logos/ReactHyderabadLogoFull.jpg`} alt="React Hyderabad" style={{ height: '36px', borderRadius: '6px' }} />
                  </div>
                </div>
                {/* Community Partner */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Community Partner</div>
                  <div style={{ height: '36px', display: 'flex', alignItems: 'center', background: 'white', padding: '0.3rem 0.6rem', borderRadius: '8px' }}>
                    <img src={logoDataUrls.juicer || `${import.meta.env.BASE_URL}logos/JuicerTechnology.jpg`} alt="Juicer Technology" style={{ height: '22px' }} />
                  </div>
                </div>
                {/* Platform Partner */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.45rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Platform Partner</div>
                  <div style={{ height: '36px', display: 'flex', alignItems: 'center', background: 'white', padding: '0.3rem 0.6rem', borderRadius: '8px' }}>
                    <img src={logoDataUrls.goaAvo || `${import.meta.env.BASE_URL}logos/goaAvo.jpg`} alt="GoAvo" style={{ height: '22px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* iOS Save Overlay — stays on the same page */}
      {iosSaveImage && (
        <div
          onClick={closeIosOverlay}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(2, 6, 23, 0.95)', zIndex: 10000,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '1.5rem', gap: '1rem',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <button
            onClick={closeIosOverlay}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              borderRadius: '50%', width: '40px', height: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white'
            }}
          >
            <X size={20} />
          </button>
          <div style={{
            background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '100px', padding: '0.5rem 1.25rem',
            fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)',
            textAlign: 'center'
          }}>
            📱 Long-press the image → tap <strong style={{ color: 'var(--color-primary)' }}>"Save to Photos"</strong>
          </div>
          <img
            src={iosSaveImage}
            alt="Your ValkeyThon Ticket"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '75vh',
              borderRadius: '16px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(14, 165, 233, 0.2)',
              border: '1px solid rgba(14, 165, 233, 0.3)'
            }}
          />
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
            Tap anywhere outside to close
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="card-actions">
        <button className="btn" onClick={onRestart}>
          <RefreshCcw size={20} /> Reboot Profile
        </button>
        <button
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? 'Syncing...' : <><Download size={20} /> {isIOS ? 'Save Identity' : 'Generate Identity'}</>}
        </button>
      </div>
    </div>
  );
}
