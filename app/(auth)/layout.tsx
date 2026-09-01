interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="flex min-h-svh items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
