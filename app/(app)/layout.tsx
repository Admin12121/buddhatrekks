export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-[#0d1017] w-full h-full relative py-50">{children}</main>;
}
