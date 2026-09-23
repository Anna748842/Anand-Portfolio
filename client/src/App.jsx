import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Palette,
  Search,
  Send,
  Server,
  Sparkles,
  Sun,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const siteConfig = {
  name: "Anand Kumar Das",
  role: "Software Engineer",
  resumeUrl: "/Anand_Resume.pdf",

  linkedin: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/anand-kumar-das-9791723b4?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com/Anna748842",
  leetcode: import.meta.env.VITE_LEETCODE_URL || "https://leetcode.com/u/anand_kumar_das_1o9/",
};

const skills = {
  Programming: [
    { name: "Java", logo: "https://www.citypng.com/public/uploads/preview/hd-java-logo-transparent-background-701751694771845zainlxmlfo.png" },
    { name: "JavaScript", logo: "https://gm2k27.github.io/portfolio/public/images/js.png" },
    { name: "SQL", logo: "https://img.icons8.com/fluent/1200/sql.jpg" },
  ],
  Frontend: [
    { name: "React.js", logo: "https://logospng.org/download/react/logo-react-1024.png" },
    { name: "HTML5", logo: "https://w7.pngwing.com/pngs/940/524/png-transparent-html5-plain-wordmark-logo-icon.png" },
    { name: "CSS3", logo: "https://toppng.com/uploads/preview/css3-logo-vector-download-11573943110ujyqmvcq4d.png" },
    { name: "Tailwind CSS", logo: "https://images.icon-icons.com/2699/PNG/512/tailwindcss_logo_icon_167923.png" },
  ],
  Backend: [
    { name: "Node.js", logo: "https://e7.pngegg.com/pngimages/493/735/png-clipart-node-js-javascript-express-js-mongodb-github-github-angle-text.png" },
    { name: "Express.js", logo: "https://raw.githubusercontent.com/xpertpk/express-snippets/main/icon.png" },
    { name: "REST APIs", logo: "https://iexcel-technologies.com/wp-content/uploads/2023/07/rest.jpg" },
    { name: "MERN Stack", logo: "https://wallpaperbat.com/img/1170956-mean-stack-wallpaper.jpg" },
  ],
  Database: [
    { name: "MongoDB", logo: "https://images.seeklogo.com/logo-png/50/1/mongodb-icon-logo-png_seeklogo-503274.png" },
    { name: "SQL", logo: "https://img.icons8.com/fluent/1200/sql.jpg" },
  ],
  "Core CS": [
    { name: "DSA", logo: "https://static.vecteezy.com/system/resources/previews/020/401/458/non_2x/dsa-letter-logo-design-on-white-background-dsa-creative-circle-letter-logo-concept-dsa-letter-design-vector.jpg" },
    { name: "OOP", logo: "https://static.vecteezy.com/system/resources/previews/020/324/867/large_2x/oop-creative-circle-letter-logo-concept-oop-letter-design-oop-letter-logo-design-on-white-background-oop-creative-circle-letter-logo-concept-oop-letter-design-vector.jpg" },
    { name: "DBMS", logo: "https://play-lh.googleusercontent.com/7iXp6Em_l5UMys6X_A_kw8a4QLqkvxZqz4DsqT4hNCEkKfjsUCCdmWNoePiWptTO4A" },
    { name: "API Integration", logo: "https://img.freepik.com/premium-vector/api-cloud-integration-icon-design-isolated-white-background_1286261-118.jpg?semt=ais_hybrid" },
    { name: "Debugging", logo: "https://tse2.mm.bing.net/th/id/OIP.0k6FlPN1-cARgeg297lzxwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  ],
  Tools: [
    { name: "Git", logo: "https://tse4.mm.bing.net/th/id/OIP.w_QTY4vJeB4fX-VeAMkxHAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "GitHub", logo: "https://t4.ftcdn.net/jpg/03/85/94/91/360_F_385949189_W1ydL4Z3c6Uy2OfB9rZNdbxVaIMOs16F.jpg" },
  ],
};

const projects = [
  {
    title: "MedEase",
    category: "Doctor & Patient Healthcare Platform",
    description:
      "A full-stack healthcare platform focused on doctor discovery, patient management, secure authentication, and structured healthcare workflows.",
    technologies: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MySQL",
      "JavaScript",
    ],
    features: [
      "Authentication and authorization",
      "Email verification",
      "Mobile OTP verification",
      "Country-code validation",
      "Role-based access control",
      "Unique Doctor UID verification",
      "Form and server-side validation",
      "Doctor specialization standardization",
    ],
    github: "https://github.com/anandkumardas113-debug?tab=repositories",
    demo: "",
    caseStudy: true,
  },
  {
    title: "Smriti Setu",
    category: "AI-Based Cognitive & Memory Assistance Platform — SIH 2026",
    description:
      "An adaptive cognitive and memory assistance platform designed to support memory, attention, concentration, caregiver monitoring, and personalized assistance.",
    technologies: [
      "LLM/NLP",
      "STT",
      "TTS",
      "Local Storage",
      "Synchronization",
    ],
    features: [
      "Adaptive cognitive games",
      "Multilingual voice assistance",
      "Caregiver monitoring",
      "Reminders and alerts",
      "Performance tracking",
      "Personalized memory support",
      "Offline-first architecture",
    ],
    github: "https://github.com/anandkumardas113-debug/Smriti-Setu-NER",
    demo: "",
    caseStudy: true,
  },
  {
    title: "Portfolio Website",
    category: "Personal Developer Portfolio",
    description:
      "A responsive software-engineer portfolio built with a modern product-style interface, structured navigation, and recruiter-friendly content.",
    technologies: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
    features: [
      "Responsive UI",
      "Structured navigation",
      "Dark and light mode",
      "Command palette",
      "Accessible contact interface",
    ],
    github: "https://github.com/Anna748842/Portfolio",
    demo: "",
    caseStudy: false,
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-cyan-400">
        <Sparkles size={16} />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 leading-7 text-slate-400">{description}</p>
      )}
    </div>
  );
}

function ActionLink({ href, children, primary = false, icon: Icon = ArrowUpRight }) {
  const disabled = !href;

  return (
    <a
      href={disabled ? undefined : href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      aria-disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition",
        primary
          ? "border-cyan-300 bg-cyan-300 text-slate-950 hover:bg-cyan-200"
          : "border-white/10 bg-white/[0.04] text-slate-200 hover:border-cyan-300/40 hover:bg-cyan-300/10",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      {children}
      <Icon size={16} />
    </a>
  );
}

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Programming");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }

      if (event.key === "Escape") {
        setPaletteOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setPaletteOpen(false);
    setMobileOpen(false);
  };

  const submitContact = async (event) => {
    event.preventDefault();
    setFormStatus({ loading: true, type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setFormState({ name: "", email: "", message: "" });
      setFormStatus({
        loading: false,
        type: "success",
        message: "Message sent successfully.",
      });
    } catch (error) {
      setFormStatus({
        loading: false,
        type: "error",
        message: error.message,
      });
    }
  };

  const paletteItems = useMemo(
    () => [
      ["About", () => scrollTo("about")],
      ["Skills", () => scrollTo("skills")],
      ["Projects", () => scrollTo("projects")],
      ["Journey", () => scrollTo("journey")],
      ["Contact", () => scrollTo("contact")],
      ["GitHub", () => siteConfig.github && window.open(siteConfig.github, "_blank")],
      ["LinkedIn", () => siteConfig.linkedin && window.open(siteConfig.linkedin, "_blank")],
      ["LeetCode", () => siteConfig.leetcode && window.open(siteConfig.leetcode, "_blank")],
      ["Download Resume", () => window.open(siteConfig.resumeUrl, "_blank")],
    ],
    []
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-40" />
      <div className="pointer-events-none fixed left-1/2 top-20 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

      <Navbar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        theme={theme}
        setTheme={setTheme}
        scrollTo={scrollTo}
      />

      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <Skills activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
        <Projects />
        <Journey />
        <ProblemSolving />
        <Contact
          formState={formState}
          setFormState={setFormState}
          formStatus={formStatus}
          submitContact={submitContact}
        />
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Anand Kumar Das.</p>
          <p>Designed and built with React, Node.js, and attention to detail.</p>
        </div>
      </footer>

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            items={paletteItems}
            close={() => setPaletteOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar({ mobileOpen, setMobileOpen, theme, setTheme, scrollTo }) {
  const links = [
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Journey", "journey"],
    ["Contact", "contact"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3"
          aria-label="Go to homepage"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 font-bold text-cyan-300">
            AD
          </span>
          <span className="hidden text-sm font-semibold text-slate-200 sm:block">
            Anand Kumar Das
          </span>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-slate-400 transition hover:text-cyan-300"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-cyan-300/30 hover:text-cyan-300"
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <ActionLink href={siteConfig.resumeUrl} primary icon={Download}>
            <span className="hidden sm:inline">Resume</span>
          </ActionLink>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2 py-4">
              {links.map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="rounded-lg px-3 py-3 text-left text-slate-300 hover:bg-white/5"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ scrollTo }) {
  return (
    <section id="hero" className="relative px-6 pb-24 pt-24 md:pb-36 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-sm text-cyan-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
            Building thoughtful software
          </div>

          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
            Anand Kumar Das
          </h1>

          <p className="mt-5 text-xl font-medium text-cyan-300 md:text-2xl">
            Software Engineer
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Computer Science Engineering student and aspiring Software Engineer
            focused on full-stack development, backend systems, databases,
            problem solving, and building practical web applications.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {["Java", "JavaScript", "React", "Node.js", "MongoDB"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              View Projects
              <ArrowUpRight size={17} />
            </button>

            <ActionLink href={siteConfig.resumeUrl} icon={Download}>
              Download Resume
            </ActionLink>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <SocialLink href={siteConfig.linkedin} label="LinkedIn" icon={Linkedin} />
            <SocialLink href={siteConfig.github} label="GitHub" icon={Github} />
            <SocialLink href={siteConfig.leetcode} label="LeetCode" icon={Code2} />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-cyan-300/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-cyan-950/30">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
                <span className="ml-auto text-xs text-slate-500">
                  developer.profile
                </span>
              </div>

              <div className="space-y-5 py-6 font-mono text-sm">
                <p className="text-slate-500">
                  <span className="text-cyan-300">const</span>{" "}
                  engineer = {"{"}
                </p>
                <p className="pl-5 text-slate-300">
                  name: <span className="text-emerald-300">"Anand Kumar Das"</span>,
                </p>
                <p className="pl-5 text-slate-300">
                  focus: <span className="text-emerald-300">"Full-stack development"</span>,
                </p>
                <p className="pl-5 text-slate-300">
                  mindset: <span className="text-emerald-300">"Build. Connect. Improve."</span>,
                </p>
                <p className="text-slate-500">{"};"}</p>

                <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-200">
                  <div className="flex items-center gap-2">
                    <Terminal size={16} />
                    <span>Ready to build useful software.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SocialLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href || undefined}
      aria-label={label}
      aria-disabled={!href}
      className={cn(
        "rounded-lg border border-white/10 p-2.5 text-slate-400 transition hover:border-cyan-300/40 hover:text-cyan-300",
        !href && "cursor-not-allowed opacity-40"
      )}
    >
      <Icon size={18} />
    </a>
  );
}

function About() {
  return (
    <section id="about" className="border-y border-white/10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="01 / About"
          title="Curious about systems, focused on outcomes."
          description="Anand is a Computer Science Engineering student and aspiring Software Engineer interested in creating dependable, accessible, and practical software."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [Code2, "Software Development", "Building structured solutions with clean, maintainable code."],
            [Server, "Backend Development", "Designing APIs and server-side workflows for web applications."],
            [Database, "Database Management", "Working with data modeling, persistence, and database-backed features."],
            [Zap, "Problem Solving", "Applying DSA, OOP, debugging, and analytical thinking to software challenges."],
          ].map(([Icon, title, text], index) => (
            <Reveal key={title} delay={index * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30">
                <Icon className="mb-6 text-cyan-300" size={24} />
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ activeSkill, setActiveSkill }) {
  const imageSource =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="02 / Skills"
          title="A practical engineering toolkit."
          description="Technologies and concepts used across frontend, backend, database, and core computer science work."
        />

        <div className="grid gap-8 lg:grid-cols-[260px_1fr] xl:items-stretch">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {Object.keys(skills).map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkill(category)}
                className={cn(
                  "whitespace-nowrap rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-200",
                  activeSkill === category
                    ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-300 shadow-lg shadow-cyan-500/10"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSkill}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-900 shadow-2xl shadow-cyan-950/20"
          >
            <img
              src={imageSource}
              alt="Developer workspace"
              className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/85 to-cyan-950/75" />

            <div className="relative p-5 md:p-7">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">
                    Active stack
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {activeSkill}
                  </h3>
                </div>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-200">
                  {skills[activeSkill].length} tools
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {skills[activeSkill].map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm transition hover:border-cyan-300/30 hover:bg-cyan-300/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 text-[10px] font-semibold text-slate-400">
                        {skill.logo ? (
                          <img
                            src={skill.logo}
                            alt={skill.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          "LOGO"
                        )}
                      </div>
                      <span className="font-medium text-slate-100">{skill.name}</span>
                    </div>
                    <Check size={17} className="text-cyan-300" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="border-y border-white/10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="03 / Projects"
          title="Software built around real needs."
          description="Selected projects demonstrating full-stack development, application architecture, and product-focused thinking."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06]">
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                      {project.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="text-slate-600 transition group-hover:text-cyan-300" />
                </div>

                <p className="text-sm leading-7 text-slate-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm text-slate-400"
                    >
                      <Check className="mt-0.5 shrink-0 text-cyan-300" size={15} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2">
                  <ActionLink href={project.github} icon={Github}>
                    GitHub
                  </ActionLink>
                  <ActionLink href={project.demo} icon={ExternalLink}>
                    Live Demo
                  </ActionLink>
                  {project.caseStudy && (
                    <ActionLink href="">
                      Case Study
                    </ActionLink>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="04 / Journey"
          title="Learning with intention."
          description="An academic foundation supporting continued growth in software engineering."
        />

        <div className="relative ml-3 border-l border-cyan-300/30 pl-8">
          <TimelineItem
            date="2025–2029"
            title="B.Tech. Computer Science & Engineering"
            organization="BIT Sindri, Dhanbad"
            detail="First-year CGPA: 8.72/10"
          />
          <TimelineItem
            date="Class XII"
            title="ISC"
            organization="SSNMS Sijua, Dhanbad"
            detail="89.20%"
          />
          <TimelineItem
            date="Class X"
            title="SSC"
            organization="RMSHS Mahuda, Dhanbad"
            detail="96.60%"
          />
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ date, title, organization, detail }) {
  return (
    <Reveal className="relative mb-12 last:mb-0">
      <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border-4 border-slate-950 bg-cyan-300" />
      <p className="text-sm font-semibold text-cyan-300">{date}</p>
      <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-slate-300">{organization}</p>
      <p className="mt-2 text-sm text-slate-500">{detail}</p>
    </Reveal>
  );
}

function ProblemSolving() {
  const items = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Problem Solving",
    "Debugging",
    "Database Management",
    "Software Development",
  ];

  return (
    <section className="border-y border-white/10 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-cyan-400">
              <Terminal size={16} />
              05 / Engineering mindset
            </div>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Think clearly. Debug patiently. Build deliberately.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-slate-300"
              >
                <ChevronRight size={17} className="text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ formState, setFormState, formStatus, submitContact }) {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="06 / Contact"
          title="Have a problem worth solving?"
          description="Use the form below to start a conversation."
        />

        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 font-mono">
            <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </div>

            <p className="text-cyan-300">$ ./connect-with-anand</p>
            <p className="mt-4 leading-7 text-slate-400">
              Send a message about software development, backend systems,
              web applications, or collaboration.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={16} className="text-cyan-300" />
                Contact details available upon configuration
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Linkedin size={16} className="text-cyan-300" />
                LinkedIn profile
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Github size={16} className="text-cyan-300" />
                GitHub profile
              </div>
            </div>
          </div>

          <form
            onSubmit={submitContact}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Name"
                value={formState.name}
                onChange={(value) =>
                  setFormState({ ...formState, name: value })
                }
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                value={formState.email}
                onChange={(value) =>
                  setFormState({ ...formState, email: value })
                }
                placeholder="you@example.com"
              />
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Message
              </span>
              <textarea
                required
                minLength={10}
                rows={6}
                value={formState.message}
                onChange={(event) =>
                  setFormState({ ...formState, message: event.target.value })
                }
                placeholder="Tell me about your idea..."
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50"
              />
            </label>

            {formStatus.message && (
              <p
                className={cn(
                  "mt-4 text-sm",
                  formStatus.type === "success"
                    ? "text-emerald-300"
                    : "text-rose-300"
                )}
              >
                {formStatus.message}
              </p>
            )}

            <button
              type="submit"
              disabled={formStatus.loading}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-60"
            >
              {formStatus.loading ? "Sending..." : "Send Message"}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Input({ label, type = "text", value, onChange, placeholder }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50"
      />
    </label>
  );
}

function CommandPalette({ items, close }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/75 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={close}
    >
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -15 }}
        onMouseDown={(event) => event.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
          <Search size={18} className="text-slate-500" />
          <input
            autoFocus
            placeholder="Search sections and links..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
          />
          <kbd className="rounded border border-white/10 px-2 py-1 text-xs text-slate-500">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {items.map(([label, action]) => (
            <button
              key={label}
              onClick={action}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-cyan-300/10 hover:text-cyan-300"
            >
              {label}
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;