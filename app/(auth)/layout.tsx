const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
