'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAppStore } from '@/lib/store';
import * as api from '@/lib/api';
import type { ChatConfig } from '@/lib/types';
import Button from '@/components/ui/Button';

interface ChatConfigEditorProps {
  siteId: string;
}

const defaultConfig: ChatConfig = {
  whatsappNumber: '',
  whatsappMessage: '',
  messengerPageId: '',
  showWhatsapp: false,
  showMessenger: false,
};

export default function ChatConfigEditor({ siteId }: ChatConfigEditorProps) {
  const currentSite = useAppStore((s) => s.currentSite);
  const setCurrentSite = useAppStore((s) => s.setCurrentSite);

  const [config, setConfig] = useState<ChatConfig>({ ...defaultConfig });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentSite?.chatConfig) {
      setConfig(currentSite.chatConfig);
    } else {
      setConfig({ ...defaultConfig });
    }
  }, [currentSite]);

  const updateField = (field: keyof ChatConfig, value: string | boolean) => {
    setConfig((c) => ({ ...c, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await api.sites.updateSite(siteId, {
        chatConfig: config,
      } as any);
      setCurrentSite(updated);
      toast.success('Chat config saved');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Chat Widget Config
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* WhatsApp Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-xs font-semibold text-green-800">WhatsApp</span>
            </div>
            <button
              type="button"
              onClick={() => updateField('showWhatsapp', !config.showWhatsapp)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${
                config.showWhatsapp ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${
                  config.showWhatsapp ? 'translate-x-[18px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block text-[10px] font-medium text-gray-600 mb-0.5">
                Phone Number (+88)
              </label>
              <div className="flex items-center">
                <span className="px-2 py-1.5 text-xs bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500">+88</span>
                <input
                  type="text"
                  value={config.whatsappNumber}
                  onChange={(e) => updateField('whatsappNumber', e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="flex-1 px-3 py-1.5 text-sm rounded-r-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-600 mb-0.5">
                Pre-filled Message
              </label>
              <input
                type="text"
                value={config.whatsappMessage}
                onChange={(e) => updateField('whatsappMessage', e.target.value)}
                placeholder="Hi, I want to know about admission..."
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* Messenger Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z" />
              </svg>
              <span className="text-xs font-semibold text-blue-800">Messenger</span>
            </div>
            <button
              type="button"
              onClick={() => updateField('showMessenger', !config.showMessenger)}
              className={`relative w-10 h-5.5 rounded-full transition-colors ${
                config.showMessenger ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${
                  config.showMessenger ? 'translate-x-[18px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          <div>
            <label className="block text-[10px] font-medium text-gray-600 mb-0.5">
              Facebook Page ID
            </label>
            <input
              type="text"
              value={config.messengerPageId}
              onChange={(e) => updateField('messengerPageId', e.target.value)}
              placeholder="your-page-id"
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-2">Preview</label>
          <div className="relative h-24 bg-white rounded-lg border border-gray-100">
            <div className="absolute bottom-2 right-2 flex flex-col gap-2 items-end">
              {config.showWhatsapp && (
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              )}
              {config.showMessenger && (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2.2s' }}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z" />
                  </svg>
                </div>
              )}
              {!config.showWhatsapp && !config.showMessenger && (
                <span className="text-[10px] text-gray-400">Enable a service to preview</span>
              )}
            </div>
          </div>
        </div>

        <Button size="sm" loading={saving} onClick={handleSave} className="w-full">
          Save Chat Config
        </Button>
      </div>
    </div>
  );
}
