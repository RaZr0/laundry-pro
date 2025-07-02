import { AnonymousLayout } from "@/components/layout/anonymous/anonymous";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AnonymousLayout>
      {children}
    </AnonymousLayout>
  );
}
