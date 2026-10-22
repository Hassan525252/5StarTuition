import { Link } from 'react-router-dom';
import { Brand } from './Brand';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-brand"><Brand light/><p>Personalised online tuition for Years 3–13, entrance exams and university admissions.</p><span>UK · UAE · Qatar · Bahrain · KSA · Worldwide</span></div>
        <div><h4>Explore</h4><Link to="/about">About Us</Link><Link to="/subjects">Subjects</Link><Link to="/exams-admissions">Exam Preparation</Link><Link to="/for-parents">For Parents</Link><Link to="/become-a-tutor">For Tutors</Link><Link to="/contact">Contact</Link></div>
        <div><h4>Support</h4><Link to="/faqs">FAQs</Link><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms & Conditions</Link><Link to="/safeguarding">Safeguarding</Link><Link to="/cancellation-policy">Cancellation Policy</Link></div>
        <div><h4>Get in touch</h4><a href="mailto:hello@5startuition.co.uk">hello@5startuition.co.uk</a><a href="https://wa.me/447983452340">WhatsApp +44 79 8345 2340</a><Link to="/find-a-tutor">Find a Tutor</Link><Link to="/login">Portal Sign In</Link></div>
      </div>
      <div className="footer-bottom shell"><span>© 2026 5 Star Tuition. All rights reserved.</span><span>Expert Tuition. Brighter Futures.</span></div>
    </footer>
  );
}
