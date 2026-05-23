import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function TeamInput({ onBack, onSubmit, initialTeamName }) {
  const [teamName, setTeamName] = useState(initialTeamName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      onSubmit(teamName.trim());
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem 0' }}>
      <h2 className="text-center mb-2" style={{ fontSize: '2rem' }}>Enter Your Team Name</h2>
      <p className="text-center mb-8" style={{ color: 'var(--color-text-muted)' }}>
        What is your hackathon team called? (Type Solo if you are coding alone)
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <input
            type="text"
            className="input-field"
            placeholder="e.g., Tech Titans, Solo Builder, Hack Wizards"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            autoFocus
            maxLength={30}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <button type="button" className="btn" onClick={onBack}>
            <ArrowLeft size={18} /> Back
          </button>
          
          <button type="submit" className="btn btn-primary" disabled={!teamName.trim()}>
            Next <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
