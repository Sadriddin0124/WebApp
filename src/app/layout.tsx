// app/layout.tsx or app/root-layout.tsx
import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { I18nProvider } from '@/core/i18n/provider';
import { Root } from '@/components/Root/Root';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';
import TelegramClientReady from '@/hooks/telegramReady';

export const metadata: Metadata = {
  title: 'RFS App',
  description: 'RFS dev',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <I18nProvider>
          <TelegramClientReady /> {/* ✅ Only runs on client */}
          <Root>
            {children}
          </Root>
        </I18nProvider>
      </body>
    </html>
  );
}



