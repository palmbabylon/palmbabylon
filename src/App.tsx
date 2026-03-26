import { useState, useEffect, useRef, useCallback } from 'react';

// ===== DATA =====
const destinations = [
  { name: 'فيزا بالي', duration: '10-15 يوم عمل', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', imgThumb: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&q=60' },
  { name: 'فيزا قطر', duration: '5-15 يوم عمل', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', imgThumb: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100&q=60' },
  { name: 'فيزا جورجيا', duration: '10-15 يوم عمل', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80', imgThumb: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=100&q=60' },
  { name: 'موافقة مصر', duration: '7-14 يوم عمل', img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400&q=80', imgThumb: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=100&q=60' },
  { name: 'تأشيرة تايلند', duration: '72 ساعة عمل', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80', imgThumb: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=100&q=60' },
  { name: 'تأشيرة دبي', duration: '72 ساعة عمل', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80', imgThumb: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=100&q=60' },
];

const services = [
  { icon: '✈️', title: 'حجز تذاكر الطيران', desc: 'أفضل الأسعار على تذاكر الطيران لجميع الوجهات العالمية مع خيارات مرنة للتعديل والإلغاء' },
  { icon: '🏨', title: 'حجز الفنادق', desc: 'اختيار واسع من الفنادق الفاخرة والاقتصادية مع تأكيد فوري وضمان أفضل سعر' },
  { icon: '🕌', title: 'العمرة والزيارة', desc: 'باقات متكاملة لأداء العمرة والزيارة تشمل الإقامة والنقل والخدمات اللوجستية' },
  { icon: '🎫', title: 'التأشيرات السياحية', desc: 'إنجاز معاملات التأشيرات بسرعة وكفاءة مع متابعة مستمرة لحالة الطلب' },
  { icon: '🚗', title: 'المواصلات والنقل', desc: 'خدمات نقل مريحة من وإلى المطار، بالإضافة إلى تأجير السيارات في الوجهة' },
  { icon: '🎯', title: 'الجولات السياحية', desc: 'برامج سياحية منظمة مع مرشدين محترفين لاستكشاف أجمل المعالم العالمية' },
];

// ===== SVG COMPONENTS =====
function LogoSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="36" y="35" width="8" height="35" rx="3" fill="#8B6914"/>
      <rect x="37" y="35" width="3" height="35" rx="1.5" fill="#A07D1A" opacity="0.5"/>
      <path d="M40 35 C30 20 15 18 10 22 C15 20 28 22 38 33Z" fill="#2E7D32"/>
      <path d="M40 35 C32 18 20 10 14 12 C20 12 32 18 39 32Z" fill="#388E3C"/>
      <path d="M40 35 C48 18 60 10 66 12 C60 12 48 18 41 32Z" fill="#388E3C"/>
      <path d="M40 35 C50 20 65 18 70 22 C65 20 52 22 42 33Z" fill="#2E7D32"/>
      <path d="M40 35 C40 15 42 8 40 5 C38 8 40 15 40 35Z" fill="#43A047"/>
      <circle cx="33" cy="33" r="2.5" fill="#F26522"/>
      <circle cx="47" cy="33" r="2.5" fill="#F26522"/>
      <circle cx="36" cy="30" r="2" fill="#E55A1B"/>
      <circle cx="44" cy="30" r="2" fill="#E55A1B"/>
      <ellipse cx="40" cy="70" rx="18" ry="4" fill="#1a5f9e" opacity="0.3"/>
      <path d="M18 72 L18 58 C18 55 22 52 28 52 L52 52 C58 52 62 55 62 58 L62 72" stroke="#1a5f9e" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M28 52 L28 48 C28 46 32 44 40 44 C48 44 52 46 52 48 L52 52" stroke="#1a5f9e" strokeWidth="1.5" fill="none" opacity="0.3"/>
    </svg>
  );
}

function HeroLogoSvg({ isDark }: { isDark: boolean }) {
  return (
    <svg className="hero-logo-main" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="85" y="80" width="14" height="70" rx="5" fill="#8B6914"/>
      <rect x="87" y="80" width="5" height="70" rx="2.5" fill="#A07D1A" opacity="0.5"/>
      <path d="M92 80 C72 50 40 45 28 52 C42 48 68 52 88 75Z" fill="#2E7D32"/>
      <path d="M92 80 C78 42 55 28 44 32 C56 30 76 42 90 72Z" fill="#388E3C"/>
      <path d="M92 80 C106 42 129 28 140 32 C128 30 108 42 94 72Z" fill="#388E3C"/>
      <path d="M92 80 C112 50 144 45 156 52 C142 48 116 52 96 75Z" fill="#2E7D32"/>
      <path d="M92 80 C92 40 94 22 92 14 C90 22 92 40 92 80Z" fill="#43A047"/>
      <circle cx="78" cy="76" r="4" fill="#F26522"/>
      <circle cx="106" cy="76" r="4" fill="#F26522"/>
      <circle cx="82" cy="70" r="3.5" fill="#E55A1B"/>
      <circle cx="102" cy="70" r="3.5" fill="#E55A1B"/>
      <circle cx="86" cy="66" r="3" fill="#D4511A"/>
      <circle cx="98" cy="66" r="3" fill="#D4511A"/>
      <ellipse cx="92" cy="150" rx="35" ry="6" fill="#1a5f9e" opacity="0.2"/>
      <text x="230" y="85" fontFamily="Tajawal, sans-serif" fontSize="36" fontWeight="800" fill={isDark ? '#60a5fa' : '#0d3a5c'} textAnchor="middle" direction="rtl">نخلة بابل</text>
      <text x="230" y="115" fontFamily="Tajawal, sans-serif" fontSize="18" fontWeight="500" fill={isDark ? '#94a3b8' : '#666'} textAnchor="middle" direction="rtl">للسياحة والسفر</text>
      <text x="230" y="145" fontFamily="Tajawal, sans-serif" fontSize="14" fontWeight="500" fill="#F26522" textAnchor="middle" letterSpacing="3">PALM OF BABYLON</text>
      <line x1="175" y1="125" x2="285" y2="125" stroke="#F26522" strokeWidth="2" opacity="0.5"/>
    </svg>
  );
}

function FooterLogoSvg() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:'70px',width:'auto'}}>
      <rect x="36" y="35" width="8" height="35" rx="3" fill="#8B6914"/>
      <rect x="37" y="35" width="3" height="35" rx="1.5" fill="#A07D1A" opacity="0.5"/>
      <path d="M40 35 C30 20 15 18 10 22 C15 20 28 22 38 33Z" fill="#2E7D32"/>
      <path d="M40 35 C32 18 20 10 14 12 C20 12 32 18 39 32Z" fill="#388E3C"/>
      <path d="M40 35 C48 18 60 10 66 12 C60 12 48 18 41 32Z" fill="#388E3C"/>
      <path d="M40 35 C50 20 65 18 70 22 C65 20 52 22 42 33Z" fill="#2E7D32"/>
      <path d="M40 35 C40 15 42 8 40 5 C38 8 40 15 40 35Z" fill="#43A047"/>
      <circle cx="33" cy="33" r="2.5" fill="#F26522"/>
      <circle cx="47" cy="33" r="2.5" fill="#F26522"/>
      <circle cx="36" cy="30" r="2" fill="#E55A1B"/>
      <circle cx="44" cy="30" r="2" fill="#E55A1B"/>
      <ellipse cx="40" cy="70" rx="18" ry="4" fill="#1a5f9e" opacity="0.3"/>
    </svg>
  );
}

// ===== HOOKS =====
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedDiv({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ===== COUNTER COMPONENT =====
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const animated = useRef(false);

  useEffect(() => {
    if (!isVisible || animated.current) return;
    animated.current = true;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += increment;
      if (current < target) {
        setCount(Math.ceil(current));
        requestAnimationFrame(update);
      } else {
        setCount(target);
      }
    };
    update();
  }, [isVisible, target]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

// ===== CUSTOM SELECT =====
function CustomSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selected = destinations.find(d => d.name === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (value) setHasError(false);
  }, [value]);

  return (
    <>
      <div className="custom-select-wrapper" ref={wrapperRef}>
        <div
          className={`custom-select-trigger ${isOpen ? 'open' : ''} ${hasError ? 'error' : ''}`}
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); setHasError(false); }}
        >
          <span className="trigger-text">
            {selected ? (
              <>
                <img className="trigger-img" src={selected.imgThumb} alt={selected.name} />
                <span>{selected.name}</span>
              </>
            ) : value === 'وجهة أخرى' ? (
              <span>🌍 وجهة أخرى</span>
            ) : (
              <span className="trigger-placeholder">اختر الوجهة</span>
            )}
          </span>
          <span className="trigger-arrow">▼</span>
        </div>
        <div className={`custom-select-dropdown ${isOpen ? 'open' : ''}`}>
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className={`custom-option ${value === dest.name ? 'selected' : ''}`}
              onClick={() => { onChange(dest.name); setIsOpen(false); }}
            >
              <img className="option-img" src={dest.imgThumb} alt={dest.name} loading="lazy" />
              <div className="option-info">
                <div className="option-name">{dest.name}</div>
                <div className="option-duration">⏱ {dest.duration}</div>
              </div>
            </div>
          ))}
          <div
            className={`custom-option no-img ${value === 'وجهة أخرى' ? 'selected' : ''}`}
            onClick={() => { onChange('وجهة أخرى'); setIsOpen(false); }}
          >
            <span className="option-icon">🌍</span>
            <div className="option-info">
              <div className="option-name">وجهة أخرى</div>
              <div className="option-duration">حدد وجهتك في الملاحظات</div>
            </div>
          </div>
        </div>
      </div>
      {selected && (
        <div className={`destination-preview ${selected ? 'show' : ''}`}>
          <div className="preview-card">
            <img src={selected.img} alt={selected.name} />
            <div className="preview-overlay">
              <span className="preview-name">{selected.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formDest, setFormDest] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{name?: boolean; phone?: boolean; dest?: boolean}>({});

  const isDark = theme === 'dark';

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const y = window.pageYOffset;
      setScrolled(y > 50);
      setShowBackToTop(y > 500);

      // Active section detection
      const sections = document.querySelectorAll('section[id]');
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - headerHeight - 50;
        if (y >= sectionTop) {
          current = section.getAttribute('id') || 'home';
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on body overflow
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 80;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {name?: boolean; phone?: boolean; dest?: boolean} = {};
    if (!formName.trim()) errors.name = true;
    if (!formPhone.trim()) errors.phone = true;
    if (!formDest) errors.dest = true;
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    let message = `مرحباً، أود الاستفسار عن خدماتكم:\n\n`;
    message += `📋 *الاسم:* ${formName.trim()}\n`;
    message += `📱 *الهاتف:* ${formPhone.trim()}\n`;
    message += `✈️ *الوجهة:* ${formDest}\n`;
    if (formNotes.trim()) {
      message += `📝 *ملاحظات:* ${formNotes.trim()}\n`;
    }
    message += `\nتم الإرسال من موقع نخلة بابل`;

    const whatsappUrl = `https://wa.me/9647738884442?text=${encodeURIComponent(message)}`;

    setFormSuccess(true);
    setTimeout(() => { window.open(whatsappUrl, '_blank'); }, 800);
    setTimeout(() => {
      setFormName('');
      setFormPhone('');
      setFormDest('');
      setFormNotes('');
      setFormSuccess(false);
      setFormErrors({});
    }, 5000);
  };

  const handleDestinationClick = (name: string) => {
    const message = `مرحباً، أود الاستفسار عن: ${name}`;
    window.open(`https://wa.me/9647738884442?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* THEME TOGGLE */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        title="تبديل الوضع"
        aria-label="تبديل الوضع المظلم/المضيء"
      >
        {isDark ? <span>☀️</span> : <span>🌙</span>}
      </button>

      {/* BACK TO TOP */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="العودة للأعلى"
        aria-label="العودة للأعلى"
      >↑</button>

      {/* HEADER */}
      <header className={scrolled ? 'scrolled' : ''}>
        <nav className="nav-container">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
            <LogoSvg className="logo-svg" />
            <div className="logo-text">
              <span className="ar">نخلة بابل</span>
              <span className="en">PALM OF BABYLON</span>
            </div>
          </a>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {[
              { id: 'home', label: 'الرئيسية' },
              { id: 'services', label: 'خدماتنا' },
              { id: 'destinations', label: 'الوجهات' },
              { id: 'about', label: 'من نحن' },
            ].map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  style={activeSection === item.id ? { color: 'var(--primary-blue)' } : {}}
                >{item.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className="cta-btn" onClick={(e) => handleNavClick(e, 'contact')}>احجز الآن</a>
            </li>
          </ul>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="فتح القائمة">
            {menuOpen ? '✕' : '☰'}
          </button>
        </nav>
        <div className={`nav-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} />
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-content">
            <HeroLogoSvg isDark={isDark} />
            <h1>اكتشف العالم مع <span>نخلة بابل</span></h1>
            <p>نحن نصنع رحلات لا تُنسى. من حجز تذاكر الطيران إلى ترتيب أفضل الفنادق والجولات السياحية، نحن معك في كل خطوة.</p>
            <div className="hero-buttons">
              <a href="#destinations" className="btn-primary" onClick={(e) => handleNavClick(e, 'destinations')}>استكشف الوجهات ←</a>
              <a href="#contact" className="btn-secondary" onClick={(e) => handleNavClick(e, 'contact')}>تواصل معنا</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80" alt="سفر وسياحة" />
            <div className="floating-card card-1">
              <h4>+5000</h4>
              <p>عميل سعيد</p>
            </div>
            <div className="floating-card card-2">
              <h4>+50</h4>
              <p>وجهة حول العالم</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats-container">
          <AnimatedDiv className="stat-item">
            <h3><Counter target={15} />+</h3>
            <p>سنة خبرة</p>
          </AnimatedDiv>
          <AnimatedDiv className="stat-item">
            <h3><Counter target={5000} />+</h3>
            <p>عميل سعيد</p>
          </AnimatedDiv>
          <AnimatedDiv className="stat-item">
            <h3><Counter target={50} />+</h3>
            <p>وجهة سياحية</p>
          </AnimatedDiv>
          <AnimatedDiv className="stat-item">
            <h3>24/7</h3>
            <p>دعم مخصص</p>
          </AnimatedDiv>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services" id="services">
        <AnimatedDiv>
          <div className="section-header">
            <h2>خدماتنا <span>المتميزة</span></h2>
            <p>نقدم لك مجموعة شاملة من خدمات السفر والسياحة لتجربة سلسة ومريحة</p>
          </div>
        </AnimatedDiv>
        <div className="services-grid">
          {services.map((service) => (
            <AnimatedDiv key={service.title}>
              <div className="service-card">
                <div className="service-icon"><span>{service.icon}</span></div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations" id="destinations">
        <AnimatedDiv>
          <div className="section-header">
            <h2>وجهاتنا <span>المميزة</span></h2>
            <p>اختر من بين أفضل العروض السياحية المُعدة خصيصاً لك</p>
          </div>
        </AnimatedDiv>
        <div className="destinations-grid">
          {destinations.map((dest) => (
            <AnimatedDiv key={dest.name}>
              <div className="destination-card" onClick={() => handleDestinationClick(dest.name)}>
                <img src={dest.img} alt={dest.name} loading="lazy" />
                <div className="destination-overlay">
                  <h4>{dest.name}</h4>
                  <div className="destination-info">
                    <span className="duration-tag">⏱ {dest.duration}</span>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us" id="about">
        <div className="why-container">
          <AnimatedDiv>
            <div className="why-image">
              <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80" alt="سفر وسياحة" loading="lazy" />
              <div className="experience-badge">
                <h4>15+</h4>
                <p>سنة من<br/>الخبرة</p>
              </div>
            </div>
          </AnimatedDiv>
          <AnimatedDiv>
            <div className="why-content">
              <h2>لماذا تختار <span>نخلة بابل</span>؟</h2>
              <p>نحن لسنا مجرد وكالة سفر، نحن شريكك في صناعة ذكريات لا تُنسى. نجمع بين الخبرة العميقة والشغف بالسفر لتقديم تجربة فريدة.</p>
              <ul className="why-list">
                {[
                  { title: 'أسعار تنافسية', desc: 'نضمن لك أفضل الأسعار مع خيارات تناسب جميع الميزانيات' },
                  { title: 'دعم على مدار الساعة', desc: 'فريقنا متواجد 24/7 لمساعدتك في أي وقت ومن أي مكان' },
                  { title: 'برامج مخصصة', desc: 'نصمم رحلتك حسب تفضيلاتك واحتياجاتك الخاصة' },
                  { title: 'شراكات عالمية', desc: 'نتعاون مع أفضل خطوط الطيران والفنادق حول العالم' },
                ].map(item => (
                  <li key={item.title}>
                    <div className="check-icon">✓</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedDiv>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-container">
          <AnimatedDiv>
            <div className="contact-info">
              <h2>ابدأ رحلتك <span>الآن</span></h2>
              <p>تواصل معنا للحصول على استشارة مجانية وعرض سعر مخصص لرحلتك القادمة. نحن متواجدون في بغداد وإسطنبول لخدمتك.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <span className="location-badge">العراق</span>
                    <h4>العنوان - بغداد</h4>
                    <p>بغداد - نفق الشرطة - مقابل مصرف بغداد - مجاور معرض الشهم للسيارات</p>
                    <a href="https://maps.app.goo.gl/R28g7GzwkhCs5Lgc8" target="_blank" rel="noopener noreferrer" className="map-link">
                      🗺️ عرض على الخريطة
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <span className="location-badge">تركيا</span>
                    <h4>العنوان - إسطنبول</h4>
                    <p>تركيا - إسطنبول - يوسف باشا</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <h4>أرقام الهاتف - العراق</h4>
                    <div className="phone-row">
                      <a href="tel:+9647843511140" className="phone-link">+964 784 351 1140</a>
                      <a href="https://wa.me/9647843511140" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">💬 واتساب</a>
                    </div>
                    <div className="phone-row">
                      <a href="tel:+9647738884442" className="phone-link">+964 773 888 4442</a>
                      <a href="https://wa.me/9647738884442" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">💬 واتساب</a>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <h4>رقم الهاتف - تركيا</h4>
                    <div className="phone-row">
                      <a href="tel:+905538884443" className="phone-link">+90 553 888 4443</a>
                      <a href="https://wa.me/905538884443" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">💬 واتساب</a>
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-text">
                    <h4>البريد الإلكتروني</h4>
                    <p><a href="mailto:palm.babylon25@gmail.com" className="email-link">palm.babylon25@gmail.com</a></p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedDiv>
          <AnimatedDiv>
            <div className="contact-form" id="contactFormContainer">
              {!formSuccess ? (
                <>
                  <h3>أرسل استفسارك</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="fullName">الاسم الكامل</label>
                        <input
                          type="text"
                          id="fullName"
                          placeholder="أدخل اسمك الكامل"
                          value={formName}
                          onChange={(e) => { setFormName(e.target.value); setFormErrors(prev => ({...prev, name: false})); }}
                          style={formErrors.name ? { borderColor: '#ef4444' } : {}}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">رقم الهاتف</label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="أدخل رقم هاتفك"
                          value={formPhone}
                          onChange={(e) => { setFormPhone(e.target.value); setFormErrors(prev => ({...prev, phone: false})); }}
                          style={formErrors.phone ? { borderColor: '#ef4444' } : {}}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>الوجهة المطلوبة</label>
                      <CustomSelect value={formDest} onChange={(val) => { setFormDest(val); setFormErrors(prev => ({...prev, dest: false})); }} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="notes">ملاحظات إضافية</label>
                      <textarea
                        id="notes"
                        placeholder="اكتب أي تفاصيل إضافية هنا..."
                        value={formNotes}
                        onChange={(e) => setFormNotes(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="submit-btn">
                      <span>إرسال الطلب عبر واتساب</span>
                      <span>💬</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="form-success show">
                  <div className="success-icon">✅</div>
                  <h4>تم إرسال طلبك بنجاح!</h4>
                  <p>سيتم توجيهك إلى واتساب لإكمال التواصل</p>
                </div>
              )}
            </div>
          </AnimatedDiv>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <div className="floating-whatsapp">
        <a href="https://wa.me/9647738884442?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85" target="_blank" rel="noopener noreferrer">
          <span className="wa-icon">💬</span>
          <span className="whatsapp-text">تواصل معنا عبر واتساب</span>
        </a>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo-footer">
              <FooterLogoSvg />
              <div className="logo-footer-text">
                <div className="ar">نخلة بابل للسياحة والسفر</div>
                <div className="en">PALM OF BABYLON</div>
              </div>
            </div>
            <p>نخلة بابل للسياحة والسفر - شريكك الموثوق في صناعة أجمل الرحلات والذكريات. نقدم خدمات متكاملة منذ أكثر من 15 عاماً.</p>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="fc-icon">📍</span>
                <div>العراق - بغداد: نفق الشرطة، مقابل مصرف بغداد</div>
              </div>
              <div className="footer-contact-item">
                <span className="fc-icon">📍</span>
                <div>تركيا - إسطنبول: يوسف باشا</div>
              </div>
              <div className="footer-contact-item">
                <span className="fc-icon">📞</span>
                <div className="footer-phone">+964 784 351 1140</div>
              </div>
              <div className="footer-contact-item">
                <span className="fc-icon">📞</span>
                <div className="footer-phone">+964 773 888 4442</div>
              </div>
              <div className="footer-contact-item">
                <span className="fc-icon">📞</span>
                <div className="footer-phone">+90 553 888 4443</div>
              </div>
              <div className="footer-contact-item">
                <span className="fc-icon">✉️</span>
                <div>palm.babylon25@gmail.com</div>
              </div>
            </div>
            <div className="social-links">
              <a href="#" title="فيسبوك" aria-label="فيسبوك">📘</a>
              <a href="#" title="إنستغرام" aria-label="إنستغرام">📷</a>
              <a href="#" title="تويتر" aria-label="تويتر">🐦</a>
              <a href="#" title="يوتيوب" aria-label="يوتيوب">▶️</a>
            </div>
          </div>
          <div className="footer-links">
            <h4>روابط سريعة</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>الرئيسية</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>خدماتنا</a></li>
              <li><a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>الوجهات</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>من نحن</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>اتصل بنا</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>خدماتنا</h4>
            <ul>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>حجز تذاكر الطيران</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>حجز الفنادق</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>تأشيرات سياحية</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>العمرة والزيارة</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>برامج سياحية</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>الوجهات الشائعة</h4>
            <ul>
              <li><a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>فيزا بالي</a></li>
              <li><a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>فيزا قطر</a></li>
              <li><a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>فيزا جورجيا</a></li>
              <li><a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>موافقة مصر</a></li>
              <li><a href="#destinations" onClick={(e) => handleNavClick(e, 'destinations')}>تأشيرة دبي</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 نخلة بابل للسياحة والسفر. جميع الحقوق محفوظة | Palm of Babylon Travel & Tourism</p>
        </div>
      </footer>
    </>
  );
}
