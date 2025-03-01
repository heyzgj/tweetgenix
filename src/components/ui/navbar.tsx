interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex space-x-4 p-4 bg-gray-100">
      {children}
    </nav>
  );
} 