import { cls } from '@shared/lib';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project Title',
  description: 'Project Description',
  authors: [{ name: 'HyoungMin', url: 'https://github.com/hyoungqu23' }],
};

interface IRootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<IRootLayoutProps>) => {
  return (
    <html lang='ko'>
      <body className={cls(pretendard.className, 'antialiased')}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-ExtraBold.subset.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.subset.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.subset.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.subset.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.subset.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});
