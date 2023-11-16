import type { Metadata } from 'next'
import { Poppins  } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/client/NavBar'

const poppins = Poppins({subsets : ['latin'] , weight : [
  '300' , '400', '500' , '600' , '700'
]})


export const metadata: Metadata = {
  title: `Buying Sense`,
  description: 'Real price is a platform, which helps you to notify , whenever your favourite product price goes up or it come in stock.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className='mx-w-[1440px]'> 
        <NavBar/>
        {children}
        </main>
      </body>
    </html>
  )
}
