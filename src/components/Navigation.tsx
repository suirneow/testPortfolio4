import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Work' },
  { path: '/writing', label: 'Writing' },
  { path: '/log', label: 'Log' },
  { path: '/sandbox', label: 'Sandbox' },
  { path: '/info', label: 'Info' },
  { path: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border-light)]">
      <nav className="flex items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          className="font-outfit text-[11px] font-light tracking-[0.15em] uppercase"
        >
          shunto takaya
        </Link>
        <ul className="flex items-center gap-5 md:gap-7">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`font-outfit text-[10px] font-light tracking-[0.12em] uppercase transition-opacity duration-200 ${
                  location.pathname === item.path
                    ? 'opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
