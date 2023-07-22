import './globals.css'
import {Inter} from 'next/font/google'
import Header from "../components/layout/header";
import Footer from "@/components/layout/footer";
const inter = Inter({subsets: ['latin']})
import {ClientLayout} from "@/components/layout/clientLayout";

export const metadata = {
    title: 'BOM',
    description: 'bom testing',
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className='bg-white'>
        <body className={inter.className}>
        <ClientLayout>
            <Header/>
            {children}
            <Footer/>
        </ClientLayout>
        </body>
        </html>
    )
}
