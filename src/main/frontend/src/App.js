import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import Dashboard from './scenes/dashboard';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Team from './scenes/expenses';
import Contacts from './scenes/contacts';
import Form from './scenes/form';
import ExpenseFormEdit from './scenes/form/ExpenseFormEdit';
import FAQ from './scenes/faq';
import Bar from './scenes/bar';
import Pie from './scenes/pie';
import Line from './scenes/line';
import Expenses from './scenes/expenses';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/expenses" element={<Expenses />} />
                {/* <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} /> */}
                <Route path="/expenses/create" element={<Form />} />
                <Route path="/expenses/edit/:id" element={<ExpenseFormEdit />} />
                {/* <Route path="/calendar" element={<Calendar />} /> */}
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                {/* <Route path="/geography" element={<Geography />} /> */}
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
