export function PageContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="px-6">
            {children}
        </div>
    );
}