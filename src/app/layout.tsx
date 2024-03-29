import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/lib/base/components/Layout'
import "@fontsource/ubuntu";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans-jp";

export const metadata: Metadata = {
    description: "Leonardo Teixeira's portfolio",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <Layout>
                {children}
            </Layout>
        </html>
    )
}
