import { useState } from 'react';
import ProfileUpload from './components/ProfileUpload';
import NameInput from './components/NameInput';
import ClassSelection from './components/ClassSelection';
import EnvironmentSelection from './components/EnvironmentSelection';
import WeaponSelection from './components/WeaponSelection';
import AttributeFocus from './components/AttributeFocus';
import AchievementGoal from './components/AchievementGoal';
import BattleSelection from './components/BattleSelection';
import PlayerCard from './components/PlayerCard';

function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    realPhoto: null,
    realName: '',
    designation: '',
    organization: '',
    name: '',
    playerClass: null,
    environment: null,
    weapon: null,
    attribute: null,
    goal: null,
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

  const handleNameSubmit = (name) => {
    updateData('name', name);
    nextStep();
  };

  const handleClassSelect = (playerClass) => {
    updateData('playerClass', playerClass);
  };

  const handleEnvironmentSelect = (environment) => {
    updateData('environment', environment);
  };

  const handleWeaponSelect = (weapon) => {
    updateData('weapon', weapon);
  };

  const handleAttributeSelect = (attribute) => {
    updateData('attribute', attribute);
  };

  const handleGoalSelect = (goal) => {
    updateData('goal', goal);
  };

  const handleBattleSelect = (battle) => {
    updateData('battle', battle);
  };

  const restart = () => {
    setData({ 
      realPhoto: null, realName: '', designation: '', organization: '', 
      name: '', playerClass: null, environment: null, weapon: null, 
      attribute: null, goal: null, battle: null 
    });
    setStep(1);
  };

  return (
    <div className="app-container">
      <header className="text-center mb-8 animate-fade-in">
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          ValkeyThon Arena
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
          {step === 1 ? 'Prepare for Transformation' : 'Forge Your Arena Identity'}
        </p>
      </header>

      <main className="glass-panel animate-fade-in" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* CREATIVE STEP INDICATOR (Nodes) */}
        <div style={{ 
          padding: '1rem 2rem', 
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(2, 6, 23, 0.4)'
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  width: num === step ? '28px' : '8px', 
                  height: '8px', 
                  borderRadius: '4px',
                  background: num <= step ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                  boxShadow: num === step ? '0 0 15px var(--color-primary-glow)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}
              >
                {num === step && (
                  <div style={{ 
                    position: 'absolute', top: '-22px', left: '50%', transform: 'translateX(-50%)',
                    fontSize: '0.55rem', fontWeight: 900, color: 'var(--color-primary)', textTransform: 'uppercase',
                    whiteSpace: 'nowrap', letterSpacing: '1px'
                  }}>
                    S-{num}
                  </div>
                )}
              </div>
              {num < 9 && <div style={{ width: '15px', height: '1px', background: 'rgba(255,255,255,0.05)' }} />}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {step === 1 && <ProfileUpload onNext={handleProfileSubmit} initialData={data} />}
          {step === 2 && <NameInput onBack={prevStep} onSubmit={handleNameSubmit} initialName={data.name} />}
          {step === 3 && <ClassSelection onBack={prevStep} onSelect={handleClassSelect} selected={data.playerClass?.id} onNext={nextStep} />}
          {step === 4 && <EnvironmentSelection onBack={prevStep} onSelect={handleEnvironmentSelect} selected={data.environment?.id} onNext={nextStep} />}
          {step === 5 && <WeaponSelection onBack={prevStep} onSelect={handleWeaponSelect} selected={data.weapon?.id} onNext={nextStep} />}
          {step === 6 && <AttributeFocus onBack={prevStep} onSelect={handleAttributeSelect} selected={data.attribute?.id} onNext={nextStep} />}
          {step === 7 && <AchievementGoal onBack={prevStep} onSelect={handleGoalSelect} selected={data.goal?.id} onNext={nextStep} />}
          {step === 8 && <BattleSelection onBack={prevStep} onSelect={handleBattleSelect} selected={data.battle?.id} onNext={nextStep} />}
          {step === 9 && <PlayerCard data={data} onRestart={restart} />}
        </div>
      </main>
    </div>
  );
}

export default App;
