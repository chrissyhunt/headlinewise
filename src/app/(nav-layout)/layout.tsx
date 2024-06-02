import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface NavLayoutProps {
  children: React.ReactNode
}

export default function NavLayout({ children }: Readonly<NavLayoutProps>) {
  return (
    <>
      <Navbar />
      <main className="align-center flex flex-grow flex-col justify-center">
        {children}
      </main>
      <Footer />
    </>
  )
}
