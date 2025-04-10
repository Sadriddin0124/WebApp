export const getTelegramWebApp = () => {
    if (typeof window !== 'undefined') {
      if (!window.Telegram) {
        // Inject mock when not in Telegram
        window.Telegram = {
          WebApp: {
            initData: '',
            initDataUnsafe: {},
            platform: 'web',
            ready: () => {},
            expand: () => {},
          },
        };
      }
  
      return window.Telegram.WebApp;
    }
  
    return null;
  };
  

  declare global {
    interface Window {
      Telegram?: {
        WebApp: {
          initData?: string;
          initDataUnsafe?: any;
          platform?: string;
          ready?: () => void;
          expand?: () => void;
          close?: () => void;
          sendData?: (data: string) => void;
          // Add more methods if you use them
        };
      };
    }
  }
  