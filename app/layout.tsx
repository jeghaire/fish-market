import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/store/DataProvider';
import { Fraunces, Open_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Basket from '@/components/Basket';
import { Toaster } from 'react-hot-toast';

const body = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body'
});
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces'
});

export const metadata = {
  title: 'Fish Market',
  description: 'The #1 bespoke yet modest fashion line in Africa'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${body.variable} ${fraunces.variable} flex h-full flex-col scroll-smooth font-body antialiased`}
      >
        <AuthProvider>
          <GlobalProvider>
            <Header />
            {children}
            <Footer />
            <Basket />
            <Toaster />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
