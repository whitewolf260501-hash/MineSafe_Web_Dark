import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Volume2, 
  Wind, 
  Radio, 
  CheckCircle, 
  X,
  PhoneCall
} from 'lucide-react';
import { soundAlert } from '../services/audioAlert';

interface EmergencyModalProps {
  onClose: () => void;
  onConfirmEvacuation: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  onClose,
  onConfirmEvacuation,
}) => {
  const [protocolStep, setProtocolStep] = useState<'confirm' | 'broadcasting' | 'active'>('confirm');
  const [selectedProtocol, setSelectedProtocol] = useState<'total' | 'galeria_sur' | 'gases'>('total');

  const handleExecuteEvacuation = () => {
    setProtocolStep('broadcasting');
    soundAlert.playCriticalAlert();
    setTimeout(() => {
      setProtocolStep('active');
      onConfirmEvacuation();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-rose-700/80 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl shadow-rose-950/50">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 border border-rose-700 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Protocolo de Emergencia y Evacuación
              </h2>
              <p className="text-xs text-rose-300 font-medium">Activación de Contingencia de Faena Minera (DS 132)</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {protocolStep === 'confirm' && (
          <div className="space-y-4">
            <div className="p-4 bg-rose-950/40 border border-rose-900/60 rounded-xl text-xs text-slate-200 leading-relaxed space-y-2">
              <p className="font-semibold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                ADVERTENCIA OPERACIONAL
              </p>
              <p>
                Al confirmar esta acción se emitirá una alerta sonora de evacuación prioritaria en las radios de cuadrilla, se conmutarán los extractores de ventilación a régimen forzado y se notificará al Centro de Despacho de Rescate.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Alcance del Protocolo
              </label>
              
              <div 
                onClick={() => setSelectedProtocol('total')}
                className={`p-3 rounded-lg border cursor-pointer text-xs transition-colors flex items-center justify-between ${
                  selectedProtocol === 'total' ? 'bg-rose-950/50 border-rose-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <span className="font-bold block">Evacuación Total de Faena Subterránea</span>
                  <span className="text-[11px] text-slate-400">Todos los niveles hacia superficie y refugios mineros herméticos.</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              </div>

              <div 
                onClick={() => setSelectedProtocol('galeria_sur')}
                className={`p-3 rounded-lg border cursor-pointer text-xs transition-colors flex items-center justify-between ${
                  selectedProtocol === 'galeria_sur' ? 'bg-rose-950/50 border-rose-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <span className="font-bold block">Repliegue Sectorial Galería 4-Sur</span>
                  <span className="text-[11px] text-slate-400">Aislamiento por emanación de gas CO/CO2 y confinamiento.</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleExecuteEvacuation}
                className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-lg shadow-lg shadow-rose-950 transition-all flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                CONFIRMAR Y ACTIVAR EVACUACIÓN
              </button>
            </div>
          </div>
        )}

        {protocolStep === 'broadcasting' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-900/60 border border-rose-600 text-rose-300 flex items-center justify-center mx-auto animate-spin">
              <Radio className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Transmitiendo Señal de Emergencia LoRa / LTE</h3>
              <p className="text-xs text-slate-400 mt-1">Conmutando mangas de ventilación y encendiendo sirenas...</p>
            </div>
          </div>
        )}

        {protocolStep === 'active' && (
          <div className="py-4 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Alarma de Evacuación Difundida en Faena</h3>
              <p className="text-xs text-slate-300 mt-1">
                Todas las cuadrillas han recibido la orden de evacuación a sus detectores portátiles. La ventilación forzada está operando al 100%.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-left text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-400 block">Contactos de Soporte Minero:</span>
              <div>· Central de Emergencia Mina: anexo #2222</div>
              <div>· Rescate Sernageomin: 1404</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
            >
              Volver a la Consola de Monitoreo
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
