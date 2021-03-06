import type { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';
import styles from 'styles/Home.module.scss';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

type Props = {
  name: string;
  jobTitle: string;
  children: ReactNode;
  Top?: ReactNode;
};

export default function Layout({ name, children, jobTitle, Top }: Props) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('resume_title', { name })}</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content={t('resume_title', { name })} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={clsx(styles.top, 'bg-violet-100 print:bg-transparent')}>
        <LanguageSwitcher className="print:hidden absolute top-2 right-10" />
        <Header name={name} jobTitle={jobTitle} />
        {Top && (
          <div className={'flex flex-col gap-10 print:gap-4 justify-self-end'}>
            {Top}
          </div>
        )}
      </div>

      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
