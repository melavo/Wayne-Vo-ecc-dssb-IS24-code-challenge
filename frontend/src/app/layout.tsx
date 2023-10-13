"use client";
//import './globals.css'
import '@/styles/app.css';
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from '@/components/app.header';
import AppFooter from '@/components/app.footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Container from 'react-bootstrap/Container';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHeader />
        <Container className="main-container">
          {children}
        </Container>

        <AppFooter />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  )
}
