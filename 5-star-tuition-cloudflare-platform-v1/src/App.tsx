import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FindTutorPage, BecomeTutorPage } from './pages/FormPages';
import { AboutPage, ExamsAdmissionsPage, HowItWorksPage, NotFoundPage, PricingPage, ResourcesPage, SubjectDetailPage, SubjectsPage, TuitionPage, TutorProfilePage, TutorsPage } from './pages/PublicPages';
import { CancellationPolicyPage, ContactPage, CurriculaPage, FaqPage, ParentsPage, PrivacyPage, ReviewsPage, SafeguardingPage, TermsPage, TutorsInfoPage } from './pages/ContentPages';
import { AdminPortalPage, LoginPage, ParentPortalPage, TutorPortalPage } from './pages/PortalPages';

export default function App(){return <BrowserRouter><Routes>
  <Route element={<Layout/>}>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/tuition" element={<TuitionPage/>}/>
    <Route path="/curricula" element={<CurriculaPage/>}/>
    <Route path="/subjects" element={<SubjectsPage/>}/>
    <Route path="/subjects/:slug" element={<SubjectDetailPage/>}/>
    <Route path="/exams-admissions" element={<ExamsAdmissionsPage/>}/>
    <Route path="/how-it-works" element={<HowItWorksPage/>}/>
    <Route path="/pricing" element={<PricingPage/>}/>
    <Route path="/tutors" element={<TutorsPage/>}/>
    <Route path="/tutors/:id" element={<TutorProfilePage/>}/>
    <Route path="/find-a-tutor" element={<FindTutorPage/>}/>
    <Route path="/become-a-tutor" element={<BecomeTutorPage/>}/>
    <Route path="/for-tutors" element={<TutorsInfoPage/>}/>
    <Route path="/for-parents" element={<ParentsPage/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/reviews" element={<ReviewsPage/>}/>
    <Route path="/resources" element={<ResourcesPage/>}/>
    <Route path="/faqs" element={<FaqPage/>}/>
    <Route path="/contact" element={<ContactPage/>}/>
    <Route path="/safeguarding" element={<SafeguardingPage/>}/>
    <Route path="/privacy" element={<PrivacyPage/>}/>
    <Route path="/terms" element={<TermsPage/>}/>
    <Route path="/cancellation-policy" element={<CancellationPolicyPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
  </Route>
  <Route path="/login" element={<LoginPage/>}/>
  <Route path="/parent/dashboard" element={<ParentPortalPage/>}/>
  <Route path="/tutor/dashboard" element={<TutorPortalPage/>}/>
  <Route path="/admin/dashboard" element={<AdminPortalPage/>}/>
</Routes></BrowserRouter>}
