import React, { useState, useRef } from 'react';
import { ArrowRight, Upload } from 'lucide-react';

export default function ProfileUpload({ onNext, initialData }) {
  const [realName, setRealName] = useState(initialData.realName || '');
  const [designation, setDesignation] = useState(initialData.designation || '');
  const [organization, setOrganization] = useState(initialData.organization || '');
  const [photoUrl, setPhotoUrl] = useState(initialData.realPhoto || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (realName.trim() && designation.trim() && organization.trim() && photoUrl) {
      onNext({ 
        realName: realName.trim(), 
        designation: designation.trim(), 
        organization: organization.trim(),
        realPhoto: photoUrl 
      });
    }
  };

  const isFormValid = realName.trim() && designation.trim() && organization.trim() && photoUrl;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '1rem 0' }}>
      <h2 className="text-center mb-2" style={{ fontSize: '2rem' }}>Transforming for ValkeyThon</h2>
      <p className="text-center mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Upload your real-world credentials before stepping into the arena.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '2px dashed var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
          >
            {photoUrl ? (
              <img src={photoUrl} alt="Real Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <Upload size={24} style={{ margin: '0 auto 0.5rem auto' }} />
                <span style={{ fontSize: '0.8rem' }}>Upload<br/>Photo</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="input-field"
            placeholder="Real Name"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="input-field"
            placeholder="Designation (e.g. Developer, Student)"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <input
            type="text"
            className="input-field"
            placeholder="Company or College Name"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
            Start Transformation <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
