'use client';

import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk'; // ✅ correct import

export default function TelegramClientReady() {
  useEffect(() => {
    try {
      WebApp.ready(); // ✅ now works
    } catch (e) {
      console.warn('Telegram already initialized or error:', e);
    }
  }, []);

  return null;
}
