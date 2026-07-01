'use client';

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  HardDrive,
  Usb,
  MemoryStick,
  Database,
  Shield,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Zap,
  Headphones,
  Award,
  Server,
  Disc3,
  ArchiveRestore,
  ArrowRight,
  Menu,
  X,
  Star,
  Sun,
  Moon,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  Users,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   ADMIN CREDENTIALS (hardcoded for demo)
   ═══════════════════════════════════════════ */
const ADMIN_CREDS = { username: 'admin', password: 'admin123' };

/* ═══════════════════════════════════════════
   THEME TOGGLE COMPONENT
   ═══════════════════════════════════════════ */
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/60 transition-all hover:bg-accent hover:border-primary/30"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Sun className="h-4 w-4 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
            <Moon className="h-4 w-4 text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ═══════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════ */
function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <img src="/hero-bg.png" alt="DataRescue Pro Logo" className="h-9 w-9 rounded-lg object-cover" />
          <span className="text-lg font-bold tracking-tight">
            Data<span className="text-primary">Rescue</span> Pro
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="sm" className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href="#contact">Get Free Quote</a>
          </Button>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                  {link.label}
                </a>
              ))}
              <Button size="sm" className="mt-2 bg-primary text-primary-foreground" asChild>
                <a href="#contact" onClick={() => setOpen(false)}>Get Free Quote</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16 max-w-full">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-bg.png" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-white/[0.94] dark:bg-background/80" />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="animate-float absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="animate-float-delayed absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="animate-pulse-glow absolute bottom-20 left-1/3 h-2 w-2 rounded-full bg-primary" />
        <div className="animate-pulse-glow absolute top-40 right-1/4 h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animationDelay: '1s' }} />
        <div className="animate-pulse-glow absolute top-60 left-1/4 h-1 w-1 rounded-full bg-teal-400" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Trusted by 10,000+ Customers
            </Badge>
            <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Recover Your{' '}
              <span className="gradient-text">Lost Data</span>{' '}
              With Expert Precision
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              From crashed hard drives to corrupted pendrives, our certified specialists
              recover data from any storage device. No data, no charge — guaranteed.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base" asChild>
                <a href="#contact">Get Free Consultation <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-base" asChild>
                <a href="#services">Our Services <ChevronRight className="ml-1 h-4 w-4" /></a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {['No Data, No Fee', 'Same-Day Diagnosis', '100% Confidential'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:flex lg:justify-center">
            <div className="glow-teal relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: HardDrive, label: 'HDD Recovery', color: 'text-teal-400' },
                  { icon: Usb, label: 'Pendrive Recovery', color: 'text-emerald-400' },
                  { icon: MemoryStick, label: 'Memory Card', color: 'text-cyan-400' },
                  { icon: Server, label: 'RAID Recovery', color: 'text-teal-300' },
                  { icon: Disc3, label: 'SSD Recovery', color: 'text-green-400' },
                  { icon: ArchiveRestore, label: 'File Recovery', color: 'text-emerald-300' },
                ].map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                    <Card className="border-border/50 bg-white dark:bg-card/80 backdrop-blur-sm card-hover cursor-default shadow-sm">
                      <CardContent className="flex flex-col items-center gap-3 p-6">
                        <item.icon className={`h-10 w-10 ${item.color}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: '10,000+', label: 'Recoveries Done' },
            { value: '98.5%', label: 'Success Rate' },
            { value: '15+', label: 'Years Experience' },
            { value: '24/7', label: 'Emergency Support' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border/50 bg-white dark:bg-card/50 p-4 text-center backdrop-blur-sm shadow-sm">
              <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES SECTION (with images)
   ═══════════════════════════════════════════ */
const services = [
  {
    icon: Usb,
    title: 'Pendrive Data Recovery',
    image: '/services/pendrive.png',
    description: 'Recover files from corrupted, formatted, or physically damaged USB pendrives. We handle all brands and capacities — from 2GB to 1TB flash drives.',
    features: ['Formatted drive recovery', 'RAW file system fix', 'Physically damaged pen drives', 'All USB brands supported'],
  },
  {
    icon: HardDrive,
    title: 'HDD Data Recovery',
    image: '/services/hdd.png',
    description: 'Expert recovery from crashed, clicking, or dead hard disk drives. Our cleanroom lab handles head crashes, bad sectors, and mechanical failures.',
    features: ['Clicking / dead HDD', 'Head crash recovery', 'Bad sector handling', 'All HDD brands & sizes'],
  },
  {
    icon: MemoryStick,
    title: 'Memory Card Recovery',
    image: '/services/memorycard.png',
    description: 'Retrieve lost photos, videos, and files from SD cards, microSD cards, CF cards used in cameras, phones, and drones.',
    features: ['SD / microSD cards', 'CF / XD cards', 'Corrupted card recovery', 'Camera & drone cards'],
  },
  {
    icon: Disc3,
    title: 'SSD Data Recovery',
    image: '/services/ssd.png',
    description: 'Advanced NAND chip-level recovery for solid state drives. We recover data from failed SSDs, damaged controllers, and encrypted drives.',
    features: ['NAND chip recovery', 'Firmware repair', 'Encrypted SSD support', 'All form factors'],
  },
  {
    icon: Server,
    title: 'RAID Recovery',
    image: '/services/raid.png',
    description: 'Complete RAID array reconstruction and data recovery for RAID 0, 1, 5, 6, 10. We handle multi-disk failures and controller issues.',
    features: ['RAID 0/1/5/6/10', 'Multi-disk failure', 'Controller issues', 'NAS & server recovery'],
  },
  {
    icon: Database,
    title: 'Database & Server Recovery',
    image: '/services/database.png',
    description: 'Specialized recovery for corrupt databases (MySQL, PostgreSQL, SQL Server), virtual machines, and enterprise server environments.',
    features: ['SQL database repair', 'VM recovery', 'Exchange server', 'Enterprise solutions'],
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden max-w-full" ref={ref}>
      <div className="absolute inset-0 z-0">
        <img src="/sections/services-bg.png" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-white/[0.96] dark:bg-background/88" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Our Services
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Complete Data Recovery <span className="gradient-text">Solutions</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We recover data from every type of storage device. Whether it&apos;s a simple
            deleted file or a complex RAID failure, our experts have you covered.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Card className="glow-teal group h-full overflow-hidden border-border/50 bg-white dark:bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 dark:hover:bg-card/90 shadow-sm">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted/30">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground shadow-lg">
                    <service.icon className="h-5 w-5" />
                  </div>
                </div>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WHY CHOOSE US
   ═══════════════════════════════════════════ */
const reasons = [
  { icon: ShieldCheck, title: 'No Data, No Fee', description: 'We operate on a strict no-recovery, no-charge policy. If we cannot recover your data, you pay absolutely nothing — zero financial risk.' },
  { icon: Clock, title: 'Fast Turnaround', description: 'Most standard recoveries completed within 24-48 hours. Emergency same-day and priority recovery services are also available.' },
  { icon: Shield, title: '100% Confidential', description: 'Your data privacy is our top priority. We sign NDAs and follow strict data protection protocols on every case.' },
  { icon: Headphones, title: '24/7 Support', description: 'Our dedicated support team is available around the clock — late-night emergencies or weekend crises, we are always here.' },
  { icon: Award, title: 'Certified Experts', description: 'Our engineers hold industry certifications and have 15+ years of hands-on experience with cutting-edge recovery tools.' },
  { icon: Zap, title: '98.5% Success Rate', description: 'We consistently deliver results where others fail. Our cleanroom facilities and proprietary techniques maximize every opportunity.' },
];

function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-us" className="relative py-24 sm:py-32 overflow-hidden max-w-full" ref={ref}>
      <div className="absolute inset-0 z-0">
        <img src="/sections/whyus-bg.png" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-white/[0.96] dark:bg-background/88" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Why Choose Us</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Why <span className="gradient-text">10,000+ Customers</span> Trust Us
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We combine cutting-edge technology with years of expertise to deliver the highest recovery success rate in the industry.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div key={reason.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="group flex gap-4 rounded-xl border border-border/50 bg-white dark:bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 dark:hover:bg-card/70 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <reason.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PROCESS SECTION
   ═══════════════════════════════════════════ */
const steps = [
  { step: '01', title: 'Submit Your Request', description: 'Fill out our quick contact form or call us directly. Tell us about your device and the problem. Our team responds within 1 hour.' },
  { step: '02', title: 'Free Diagnosis', description: 'Send or bring your device to our lab. Our engineers perform a thorough diagnosis and provide a detailed recovery report and fixed quote.' },
  { step: '03', title: 'Data Recovery', description: 'Once you approve, our specialists work in our certified cleanroom using state-of-the-art equipment to extract and reconstruct your data.' },
  { step: '04', title: 'Receive Your Data', description: 'We verify recovered files for integrity and transfer them to a new storage device. Pay only after you confirm everything is recovered.' },
];

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="relative py-24 sm:py-32 overflow-hidden max-w-full" ref={ref}>
      <div className="absolute inset-0 z-0">
        <img src="/sections/process-bg.png" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-white/[0.96] dark:bg-background/88" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">How It Works</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple <span className="gradient-text">4-Step</span> Recovery Process
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Getting your data back is hassle-free. Follow our simple process and let our experts handle the rest.</p>
        </motion.div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }}>
              <div className="relative">
                <div className="mb-4 flex items-center gap-4">
                  <div className="glow-teal-strong flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent sm:block" />
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
const testimonials = [
  { name: 'Rajesh Kumar', role: 'Business Owner', text: 'My external HDD crashed with 5 years of business accounts. DataRescue Pro recovered everything within 2 days. Absolute lifesavers — I cannot thank them enough for their professionalism and speed.', rating: 5 },
  { name: 'Priya Sharma', role: 'Photographer', text: 'I accidentally formatted my 128GB SD card full of wedding photos. I was devastated. They recovered every single photo in original quality. Their no-data-no-fee promise gave me complete peace of mind.', rating: 5 },
  { name: 'Amit Patel', role: 'IT Manager', text: 'Our RAID 5 server suffered a dual disk failure. Their team reconstructed the entire array and recovered all critical business data. The emergency service was fast and the communication was excellent throughout.', rating: 5 },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden max-w-full" ref={ref}>
      <div className="absolute inset-0 z-0">
        <img src="/sections/testimonials-bg.png" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-white/[0.96] dark:bg-background/88" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Testimonials</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            What Our <span className="gradient-text">Customers</span> Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Real stories from real customers who trusted us with their most valuable data.</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Card className="glow-teal h-full border-border/50 bg-white dark:bg-card/60 backdrop-blur-sm shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════ */
function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-20 overflow-hidden max-w-full" ref={ref}>
      <div className="absolute inset-0 z-0">
        <img src="/sections/process-bg.png" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-white/[0.96] dark:bg-background/88" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }}
          className="glow-teal-strong relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10 p-8 text-center sm:p-12"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Don&apos;t Panic — We Can Recover Your Data</h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">Whether you accidentally deleted files, dropped your drive, or experienced a complete system failure — we are here to help 24/7.</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">Get Free Diagnosis <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                <a href="tel:+919876543210"><Phone className="mr-2 h-4 w-4" />Call Emergency Line</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════ */
const serviceOptions = [
  'Pendrive Data Recovery', 'HDD Data Recovery', 'Memory Card Recovery',
  'SSD Data Recovery', 'RAID Data Recovery', 'Database Recovery',
  'Laptop Data Recovery', 'Mobile Phone Recovery', 'Other',
];

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', serviceType: '', deviceType: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.serviceType) {
      toast({ title: 'Missing Fields', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) {
        toast({ title: 'Request Submitted!', description: 'Our team will contact you within 1 hour.' });
        setForm({ name: '', email: '', phone: '', serviceType: '', deviceType: '', message: '' });
      } else {
        toast({ title: 'Submission Failed', description: data.error || 'Something went wrong.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Network Error', description: 'Please check your connection and try again.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden max-w-full" ref={ref}>
      <div className="absolute inset-0 z-0">
        <img src="/sections/contact-bg.png" alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-white/[0.96] dark:bg-background/88" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Get In Touch</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Request a <span className="gradient-text">Free Consultation</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tell us about your data loss situation. We&apos;ll provide a free diagnosis and quote — no obligations, no hidden fees.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-8 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">Reach out to us through any of the channels below. Our team is available 24/7 for emergency data recovery needs.</p>
            </div>
            <div className="space-y-5">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: '24/7 Emergency Line' },
                { icon: Mail, label: 'Email Us', value: 'support@datarescuepro.com', sub: 'Response within 1 hour' },
                { icon: MapPin, label: 'Visit Us', value: 'Tech Park, Sector 62', sub: 'Noida, UP 201301' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-sm text-foreground">{item.value}</div>
                    <div className="text-xs text-muted-foreground">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
              <h4 className="mb-2 font-semibold text-primary">Emergency Recovery?</h4>
              <p className="text-sm text-muted-foreground">For urgent data loss situations, call our emergency hotline for immediate priority service and same-day recovery options.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-3">
            <Card className="glow-teal border-border/50 bg-white dark:bg-card/60 backdrop-blur-sm shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required className="border-border/50 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required className="border-border/50 bg-background/50" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required className="border-border/50 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deviceType">Device / Brand</Label>
                      <Input id="deviceType" name="deviceType" placeholder="e.g. Samsung 1TB HDD" value={form.deviceType} onChange={handleChange} className="border-border/50 bg-background/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Required *</Label>
                    <Select value={form.serviceType} onValueChange={(val) => setForm((p) => ({ ...p, serviceType: val }))}>
                      <SelectTrigger className="border-border/50 bg-background/50"><SelectValue placeholder="Select a recovery service" /></SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Describe Your Problem</Label>
                    <Textarea id="message" name="message" placeholder="Tell us what happened — how did you lose data? What files do you need recovered?" rows={4} value={form.message} onChange={handleChange} className="border-border/50 bg-background/50 resize-none" />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                    {submitting ? (
                      <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />Submitting...</span>
                    ) : (
                      <span className="flex items-center gap-2">Submit Request <ArrowRight className="h-4 w-4" /></span>
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">By submitting, you agree to our terms. Your information is 100% secure and will never be shared.</p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/hero-bg.png" alt="DataRescue Pro Logo" className="h-8 w-8 rounded-lg object-cover" />
              <span className="font-bold">Data<span className="text-primary">Rescue</span> Pro</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">India&apos;s most trusted data recovery service. We recover data from any device, any brand, any situation.</p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Pendrive Recovery', 'HDD Recovery', 'SSD Recovery', 'Memory Card Recovery', 'RAID Recovery'].map((s) => (
                <li key={s}><a href="#services" className="transition-colors hover:text-primary">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['About Us', 'Our Team', 'Careers', 'Blog', 'Privacy Policy'].map((s) => (
                <li key={s}><a href="#" className="transition-colors hover:text-primary">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> support@datarescuepro.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Noida, UP 201301</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} DataRescue Pro. All rights reserved.</p>
          <button onClick={onAdminClick} className="text-xs text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
            <Lock className="h-3 w-3" /> Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   ADMIN PANEL
   ═══════════════════════════════════════════ */
interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  deviceType: string;
  message: string;
  status: string;
  createdAt: string;
}

function AdminPanel({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) setSubmissions(data.data);
      else toast({ title: 'Error', description: 'Failed to fetch submissions.', variant: 'destructive' });
    } catch {
      toast({ title: 'Network Error', description: 'Could not connect to server.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (authenticated) fetchSubmissions();
  }, [authenticated, fetchSubmissions]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDS.username && password === ADMIN_CREDS.password) {
      setAuthenticated(true);
      toast({ title: 'Login Successful', description: 'Welcome, Admin!' });
    } else {
      toast({ title: 'Login Failed', description: 'Invalid username or password.', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername('');
    setPassword('');
    onClose();
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }); }
    catch { return d; }
  };

  /* ── Login Screen ── */
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <Card className="glow-teal border-border/50 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                  <Lock className="h-7 w-7 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">Admin Login</h1>
                <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access the admin panel</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="admin-user">Username</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="admin-user" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required className="border-border/50 bg-background/50 pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-pass">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="admin-pass" type={showPw ? 'text' : 'password'} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border-border/50 bg-background/50 pl-10 pr-10" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password">
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">Sign In</Button>
              </form>
              <div className="mt-6 text-center">
                <button onClick={onClose} className="text-sm text-muted-foreground hover:text-primary transition-colors">&larr; Back to Website</button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  /* ── Dashboard ── */
  const pending = submissions.filter(s => s.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary"><Database className="h-5 w-5 text-primary-foreground" /></div>
            <div>
              <span className="font-bold">Data<span className="text-primary">Rescue</span> Pro</span>
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchSubmissions} disabled={loading} className="border-border/50">
              <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={onClose} className="border-border/50">
              <ArrowRight className="mr-1.5 h-3.5 w-3.5 rotate-180" /> Site
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-destructive/50 text-destructive hover:bg-destructive/10">
              <LogOut className="mr-1.5 h-3.5 w-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">Submission Dashboard</h1>
            <p className="mt-1 text-muted-foreground">View and manage contact form submissions from your website.</p>
          </motion.div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Card className="border-border/50 bg-card/60">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><Users className="h-5 w-5" /></div>
                <div>
                  <div className="text-2xl font-bold">{submissions.length}</div>
                  <div className="text-xs text-muted-foreground">Total Submissions</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/60">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500"><AlertCircle className="h-5 w-5" /></div>
                <div>
                  <div className="text-2xl font-bold">{pending}</div>
                  <div className="text-xs text-muted-foreground">Pending Review</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/60 hidden sm:block">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500"><CheckCircle className="h-5 w-5" /></div>
                <div>
                  <div className="text-2xl font-bold">{submissions.length - pending}</div>
                  <div className="text-xs text-muted-foreground">Reviewed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card className="border-border/50 bg-card/60 overflow-hidden">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
                </div>
              ) : submissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <AlertCircle className="mb-3 h-10 w-10 opacity-30" />
                  <p className="text-sm">No submissions yet. They will appear here when users submit the contact form.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/30">
                        <th className="px-4 py-3 text-left font-semibold">#</th>
                        <th className="px-4 py-3 text-left font-semibold">Name</th>
                        <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Email</th>
                        <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Phone</th>
                        <th className="px-4 py-3 text-left font-semibold">Service</th>
                        <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Device</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                        <th className="px-4 py-3 text-left font-semibold hidden xl:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((s, i) => (
                        <tr key={s.id} className="border-b border-border/30 transition-colors hover:bg-muted/20">
                          <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                          <td className="px-4 py-3 font-medium">{s.name}</td>
                          <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{s.email}</td>
                          <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{s.phone}</td>
                          <td className="px-4 py-3"><Badge variant="outline" className="border-primary/30 text-primary text-xs">{s.serviceType}</Badge></td>
                          <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{s.deviceType || '—'}</td>
                          <td className="px-4 py-3">
                            <Badge variant={s.status === 'pending' ? 'outline' : 'secondary'} className={s.status === 'pending' ? 'border-yellow-500/30 text-yellow-500' : 'bg-emerald-500/10 text-emerald-500'}>
                              {s.status === 'pending' ? 'Pending' : 'Reviewed'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground hidden xl:table-cell">{formatDate(s.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAdminClick={() => setShowAdmin(true)} />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer onAdminClick={() => setShowAdmin(true)} />
    </div>
  );
}