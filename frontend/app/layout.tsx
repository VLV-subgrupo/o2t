import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope'
});

export const metadata: Metadata = {
    title: 'O2T',
    description: 'Olympics Traning Tracker',
    icons: {
        icon: '/favicon.ico'
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${manrope.className} bg-back min-h-screen dark`}>
                {children}
            </body>
        </html>
    );
}
