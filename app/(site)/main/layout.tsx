import MenuLeft from "@/components/menu/menu-left";
import MainHeader from "@/src/widgets/header/main-header";
export default function MainLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
        {modal} {/* не работает, не разобрался */}
      </main>
    </>
  );
}
