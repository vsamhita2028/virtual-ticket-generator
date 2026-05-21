import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NameInput({ onBack, onSubmit, initialName }) {
  const [name, setName] = useState(initialName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem 0' }}>
      <h2 className="text-center mb-2" style={{ fontSize: '2rem' }}>Choose Your Nickname</h2>
      <p className="text-center mb-8" style={{ color: 'var(--color-text-muted)' }}>
        Enter a cool gaming nickname or codename for your ticket.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <input
            type="text"
            className="input-field"
            placeholder="e.g., Neo, PixelCoder, Shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            maxLength={20}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <button type="button" className="btn" onClick={onBack}>
            <ArrowLeft size={18} /> Back
          </button>
          
          <button type="submit" className="btn btn-primary" disabled={!name.trim()}>
            Next <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
