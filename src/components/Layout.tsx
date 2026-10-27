import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border-light)] px-6 py-8 md:px-10">
        <p className="font-outfit text-[10px] font-light tracking-[0.1em] text-[var(--color-text-lighter)]">
          © {new Date().getFullYear()} shunto takaya / suimeow
        </p>
      </footer>
    </div>
  );
}
