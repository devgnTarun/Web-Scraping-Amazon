import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/client/NavBar'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'], weight: ['300', '400', '500', '600']
})


export const metadata: Metadata = {
  title: `Smart Buy`,
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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerStyle={{}}
        />
        <main className='mx-w-[1000px] overflow-hidden mx-auto'>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  )
}
