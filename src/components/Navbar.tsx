import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Radio, 
  FileText, 
  MapPin, 
  Cpu, 
  Volume2, 
  VolumeX, 
  AlertTriangle,
  Menu, 
  X, 
  UserCheck, 
  ChevronDown,
  RefreshCw,
  Users,
  Crown,
  Shield,
  HardHat,
  LogOut,
  Lightbulb,
  LightbulbOff,
  BellRing,
  BellOff,
  RotateCcw
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';
import { soundAlert } from '../services/audioAlert';

interface NavbarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  activeAlertCount: number;
  currentUser: UserProfile;
  onChangeUser: () => void;
  onLogout?: () => void;
  onTriggerEmergency: () => void;
  onRefreshData: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  isFirebaseConnected?: boolean;
  onResetPageLevels?: () => void;
  isAlarmActive?: boolean;
  onToggleAlarm?: () => void;
  isLightActive?: boolean;
  onToggleLight?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeAlertCount,
  currentUser,
  onChangeUser,
  onLogout,
  onTriggerEmergency,
  onRefreshData,
  isSimulating,
  onToggleSimulation,
  isFirebaseConnected = true,
  onResetPageLevels,
  isAlarmActive = false,
  onToggleAlarm,
  isLightActive = false,
  onToggleLight,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundAlert.getMutedState());

  const handleToggleSound = () => {
    const muted = soundAlert.toggleMute();
    setIsMuted(muted);
    if (!muted) soundAlert.playFeedbackBeep();
  };

  const isSuperOrAdmin = currentUser.role === 'superadmin' || currentUser.role === 'admin';

  const navLinks: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-4 h-4" /> },
    { id: 'monitoreo', label: 'Monitoreo IoT', icon: <Radio className="w-4 h-4" /> },
    { 
      id: 'alertas', 
      label: 'Alertas', 
      icon: <AlertTriangle className="w-4 h-4" />, 
      badge: activeAlertCount > 0 ? activeAlertCount : undefined 
    },
    { id: 'equipos', label: 'Equipos y Arriendos', icon: <Cpu className="w-4 h-4" /> },
    { id: 'reportes', label: 'Historial y Reportes', icon: <FileText className="w-4 h-4" /> },
    { id: 'faenas', label: 'Faenas y Sectores', icon: <MapPin className="w-4 h-4" /> },
    ...(isSuperOrAdmin ? [
      { id: 'usuarios' as NavigationTab, label: 'Usuarios y Roles', icon: <Users className="w-4 h-4" /> }
    ] : [])
  ];

  const getRoleTheme = () => {
    switch (currentUser.role) {
      case 'superadmin':
        return {
          bg: 'bg-purple-950/80 border-purple-800 text-purple-200',
          avatarBg: 'bg-purple-900 text-purple-200 border-purple-700',
          badgeText: 'SuperAdmin',
          icon: <Crown className="w-3 h-3 text-purple-400" />
        };
      case 'admin':
        return {
          bg: 'bg-cyan-950/80 border-cyan-800 text-cyan-200',
          avatarBg: 'bg-cyan-900 text-cyan-200 border-cyan-700',
          badgeText: 'Admin',
          icon: <Shield className="w-3 h-3 text-cyan-400" />
        };
      default:
        return {
          bg: 'bg-amber-950/80 border-amber-800 text-amber-200',
          avatarBg: 'bg-amber-900 text-amber-200 border-amber-700',
          badgeText: 'Usuario Normal',
          icon: <HardHat className="w-3 h-3 text-amber-400" />
        };
    }
  };

  const roleTheme = getRoleTheme();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* ZONE 1: BRAND WORDMARK */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => onSelectTab('dashboard')} 
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-150 flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
                Mine<span className="text-cyan-400">Safe</span>
                <span className="hidden sm:inline text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-300 border border-cyan-700/50 font-medium">IoT</span>
              </span>
            </button>
          </div>

          {/* ZONE 2: PRIMARY NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-1 min-w-0 overflow-x-auto no-scrollbar">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    soundAlert.playFeedbackBeep();
                  }}
                  title={item.label}
                  className={`flex items-center gap-2 px-2.5 xl:px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {item.icon}
                  <span className="hidden xl:inline">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 text-xs font-semibold rounded-full bg-rose-950 text-rose-300 border border-rose-800/80">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: ACTIONS & USER PROFILE */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 flex-shrink-0">
            {/* Firebase Realtime Database Status */}
            <div 
              title={isFirebaseConnected ? "Conectado a Firebase Realtime Database: https://minefase-fc5f5-default-rtdb.firebaseio.com/" : "Conectando a RTDB..."}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300"
            >
              <span className={`w-2 h-2 rounded-full ${isFirebaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className="font-semibold text-emerald-400">RTDB: minefase-fc5f5</span>
            </div>

            {/* Simulation stream toggle */}
            <button
              onClick={onToggleSimulation}
              title={isSimulating ? 'Pausar simulación IoT' : 'Activar simulación IoT'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isSimulating 
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/50' 
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="hidden xl:inline">{isSimulating ? 'En Vivo' : 'Pausado'}</span>
            </button>

            {/* Manual refresh button */}
            <button
              onClick={onRefreshData}
              title="Actualizar mediciones ahora"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Audio chime mute button */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Activar sirena de alertas' : 'Silenciar sirena de alertas'}
              className={`p-1.5 rounded-lg border transition-colors ${
                isMuted 
                  ? 'text-slate-500 bg-slate-900/50 border-slate-800' 
                  : 'text-cyan-400 bg-cyan-950/40 border-cyan-800/50 hover:bg-cyan-900/40'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Quick Toggle Light Button */}
            {onToggleLight && (
              <button
                onClick={onToggleLight}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                  isLightActive
                    ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md shadow-amber-500/50 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-300'
                }`}
                title={isLightActive ? 'Luz / Baliza encendida - Clic para apagar' : 'Luz apagada - Clic para encender'}
              >
                {isLightActive ? <Lightbulb className="w-4 h-4 fill-current" /> : <LightbulbOff className="w-4 h-4" />}
                <span className="hidden 2xl:inline text-[11px] font-bold">{isLightActive ? 'Luz ON' : 'Luz'}</span>
              </button>
            )}

            {/* Quick Toggle Alarm Button */}
            {onToggleAlarm && (
              <button
                onClick={onToggleAlarm}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                  isAlarmActive
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse font-bold shadow-md shadow-rose-950'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-300'
                }`}
                title={isAlarmActive ? 'Alarma activa - Clic para desactivar sirena' : 'Alarma inactiva - Clic para activar sirena'}
              >
                {isAlarmActive ? <BellRing className="w-4 h-4 animate-bounce" /> : <BellOff className="w-4 h-4" />}
                <span className="hidden 2xl:inline text-[11px] font-bold">{isAlarmActive ? 'Alarma ON' : 'Alarma'}</span>
              </button>
            )}

            {/* Quick Reset Page Levels Button */}
            {onResetPageLevels && (
              <button
                onClick={onResetPageLevels}
                className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-cyan-300 hover:border-cyan-800 text-xs flex items-center gap-1 transition-colors"
                title="Resetear niveles de la página a condiciones basales seguras (DS 132)"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span className="hidden 2xl:inline text-[11px]">Reset</span>
              </button>
            )}

            {/* User Account / Role switcher button */}
            <button
              onClick={onChangeUser}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-colors hover:scale-102 ${roleTheme.bg}`}
              title="Clic para cambiar de usuario o iniciar sesión"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border ${roleTheme.avatarBg}`}>
                {currentUser.name.charAt(0)}
              </div>
              <div className="text-left hidden xl:block">
                <p className="font-semibold text-white truncate max-w-[120px]">{currentUser.name.split(' ')[0]}</p>
                <p className="text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
                  {roleTheme.icon}
                  {roleTheme.badgeText}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Logout button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-rose-950/40 hover:border-rose-800/60 text-slate-400 hover:text-rose-300 text-xs transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden xl:inline text-[11px] font-medium">Salir</span>
              </button>
            )}

            {/* Emergency Protocol Trigger */}
            <button
              onClick={onTriggerEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-sm shadow-rose-950 transition-colors whitespace-nowrap"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Evacuación</span>
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
            <button
              onClick={handleToggleSound}
              className="p-2 text-slate-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                    soundAlert.playFeedbackBeep();
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  onChangeUser();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800 px-3 py-2 rounded-lg"
              >
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>{currentUser.name} ({roleTheme.badgeText})</span>
              </button>
              <button
                onClick={() => {
                  onTriggerEmergency();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 text-xs font-semibold rounded-lg bg-rose-600 text-white"
              >
                Evacuación
              </button>
            </div>

            {onLogout && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg border border-rose-800 bg-rose-950/60 text-rose-300 hover:bg-rose-900"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
