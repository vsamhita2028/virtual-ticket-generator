import { useState } from 'react';
import ProfileUpload from './components/ProfileUpload';
import AvatarSelection from './components/AvatarSelection';
import NameInput from './components/NameInput';
import WeaponSelection from './components/WeaponSelection';
import BattleSelection from './components/BattleSelection';
import PlayerCard from './components/PlayerCard';

function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    realPhoto: null,
    realName: '',
    designation: '',
    organization: '',
    avatar: null,
    name: '',
    weapon: null,
    battle: null
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateDataMulti = (updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateData = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleProfileSubmit = (profileData) => {
    updateDataMulti(profileData);
    nextStep();
  };

  const handleAvatarSelect = (avatarId) => {
    updateData('avatar', avatarId);
  };

  const handleNameSubmit = (name) => {
    updateData('name', name);
    nextStep();
  };

  const handleWeaponSelect = (weapon) => {
    updateData('weapon', weapon);
  };

  const handleBattleSelect = (battle) => {
    updateData('battle', battle);
  };

  const restart = () => {
    setData({ realPhoto: null, realName: '', designation: '', organization: '', avatar: null, name: '', weapon: null, battle: null });
    setStep(1);
  };

  return (
    <div className="app-container">
      <header className="text-center mb-8 animate-fade-in">
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          ValkeyThon Arena
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
          {step === 1 ? 'Prepare for Transformation' : 'Build Your Player Profile'}
        </p>
      </header>

      <main className="glass-panel animate-fade-in" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Progress Bar (6 steps now) */}
        <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', background: 'var(--glass-border)', width: '100%' }}>
          <div 
            style={{ 
              height: '100%', 
              background: 'var(--color-primary)', 
              width: `${(step / 6) * 100}%`,
              transition: 'width 0.3s ease'
            }} 
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          {step === 1 && <ProfileUpload onNext={handleProfileSubmit} initialData={data} />}
          {step === 2 && <AvatarSelection onSelect={handleAvatarSelect} selected={data.avatar} onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <NameInput onBack={prevStep} onSubmit={handleNameSubmit} initialName={data.name} />}
          {step === 4 && <WeaponSelection onBack={prevStep} onSelect={handleWeaponSelect} selected={data.weapon?.id} onNext={nextStep} />}
          {step === 5 && <BattleSelection onBack={prevStep} onSelect={handleBattleSelect} selected={data.battle?.id} onNext={nextStep} />}
          {step === 6 && <PlayerCard data={data} onRestart={restart} />}
        </div>
      </main>
    </div>
  );
}

export default App;
