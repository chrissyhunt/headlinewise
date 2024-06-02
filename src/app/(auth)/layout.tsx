interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className="align-center flex flex-grow flex-col justify-center">
      {children}
    </main>
  )
}
