import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface NavLayoutProps {
  children: React.ReactNode
}

export default function NavLayout({ children }: Readonly<NavLayoutProps>) {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col align-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
