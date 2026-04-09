import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GuidesPage from './pages/GuidesPage';
import GuidePage from './pages/GuidePage';
import QuizPage from './pages/QuizPage';
import EstimatorPage from './pages/EstimatorPage';
import StatsPage from './pages/StatsPage';
import GlossaryPage from './pages/GlossaryPage';
import SectorsPage from './pages/SectorsPage';
import SectorDetailPage from './pages/SectorDetailPage';
import FunctionsPage from './pages/FunctionsPage';
import FunctionDetailPage from './pages/FunctionDetailPage';
import ComparisonsPage from './pages/ComparisonsPage';
import ComparisonPage from './pages/ComparisonPage';
import LocationsPage from './pages/LocationsPage';
import LocationPage from './pages/LocationPage';
import BlogPage from './pages/BlogPage';
import BlogArticlePage from './pages/BlogArticlePage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import SalaryPage from './pages/SalaryPage';
import IntentPage from './pages/IntentPage';
import LlmsTxtPage from './pages/LlmsTxtPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'guides', element: <GuidesPage /> },
      { path: 'guides/:guideId', element: <GuidePage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'fee-estimator', element: <EstimatorPage /> },
      { path: 'statistics', element: <StatsPage /> },
      { path: 'salary-benchmarks', element: <SalaryPage /> },
      { path: 'glossary', element: <GlossaryPage /> },
      { path: 'sectors', element: <SectorsPage /> },
      { path: 'sectors/:sectorId', element: <SectorDetailPage /> },
      { path: 'functions', element: <FunctionsPage /> },
      { path: 'functions/:functionId', element: <FunctionDetailPage /> },
      { path: 'comparisons', element: <ComparisonsPage /> },
      { path: 'comparisons/:comparisonId', element: <ComparisonPage /> },
      { path: 'locations', element: <LocationsPage /> },
      { path: 'locations/:locationId', element: <LocationPage /> },
      { path: 'insights', element: <BlogPage /> },
      { path: 'insights/:articleId', element: <BlogArticlePage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'intent/:intentId', element: <IntentPage /> },
      { path: 'llms.txt', element: <LlmsTxtPage /> },
    ],
  },
]);
