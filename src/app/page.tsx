'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';
import EmployeeList from '@/components/employees/employee-list';

export default function Home() {
  const t = useTranslations('i18n');

  return (
    <Page back={false}>
      <div>
          <EmployeeList/>
      </div>
    </Page>
  );
}
