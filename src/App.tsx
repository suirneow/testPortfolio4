import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Works from './pages/Works';
import WorkDetail from './pages/WorkDetail';
import Writing from './pages/Writing';
import WritingArticle from './pages/WritingArticle';
import Log from './pages/Log';
import LogEntry from './pages/LogEntry';
import Info from './pages/Info';
import Contact from './pages/Contact';
import Sandbox from './pages/Sandbox';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Works />} />
          <Route path="/work/:id" element={<WorkDetail />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/*" element={<WritingArticle />} />
          <Route path="/log" element={<Log />} />
          <Route path="/log/:id" element={<LogEntry />} />
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sandbox" element={<Sandbox />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
