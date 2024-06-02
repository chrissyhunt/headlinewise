interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className="flex-grow flex flex-col align-center justify-center">
      {children}
    </main>
  )
}
