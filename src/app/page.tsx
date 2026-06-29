'use client';

import { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

const emptySubscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Users,
  ClipboardList,
  RefreshCw,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════
   Service Images
   ═══════════════════════════════════════════════════ */
const serviceImages: Record<string, string> = {
  'Pendrive Data Recovery': 'https://sfile.chatglm.cn/images-ppt/6b27ea89ceac.png',
  'HDD Data Recovery': 'https://sfile.chatglm.cn/images-ppt/bd572a71a2db.jpg',
  'Memory Card Recovery': 'https://sfile.chatglm.cn/images-ppt/84509db0d57f.jpg',
  'SSD Data Recovery': 'https://sfile.chatglm.cn/images-ppt/b8091a5311e1.jpg',
  'RAID Recovery': 'https://sfile.chatglm.cn/images-ppt/3b8f828188e9.jpg',
  'Database & Server Recovery': 'https://sfile.chatglm.cn/images-ppt/2385e1f97df4.svg',
};

/* ═══════════════════════════════════════════════════
   ADMIN CREDENTIALS (demo)
   ═══════════════════════════════════════════════════ */
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

/* ═══════════════════════════════════════════════════
   ADMIN PANEL COMPONENT
   ═══════════════════════════════════════════════════ */
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
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { toast } = useToast();

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch submissions', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (authenticated) fetchSubmissions();
  }, [authenticated, fetchSubmissions]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUser('');
    setPass('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative mx-4 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-primary/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Manage contact submissions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {authenticated && (
              <Button variant="outline" size="sm" onClick={fetchSubmissions} disabled={loading}>
                <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={authenticated ? handleLogout : onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {!authenticated ? (
            /* ── Login Form ── */
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleLogin}
              className="mx-auto max-w-sm space-y-5"
            >
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Admin Login</h3>
                <p className="mt-1 text-sm text-muted-foreground">Enter credentials to access submissions</p>
              </div>

              {loginError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-center text-sm text-destructive">
                  {loginError}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="admin-user">Username</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="admin-user"
                    placeholder="Enter username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-pass">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="admin-pass"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                <LogOut className="mr-2 h-4 w-4 rotate-180" />
                Sign In
              </Button>
            </motion.form>
          ) : (
            /* ── Submissions Table ── */
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-4 flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">All Submissions</span>
                <Badge variant="secondary" className="ml-auto">
                  {submissions.length} total
                </Badge>
              </div>
              <ScrollArea className="h-[60vh] rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">#</TableHead>
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Phone</TableHead>
                      <TableHead className="font-semibold">Service</TableHead>
                      <TableHead className="font-semibold">Device</TableHead>
                      <TableHead className="font-semibold">Message</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                          <RefreshCw className="mx-auto mb-2 h-6 w-6 animate-spin" />
                          Loading submissions...
                        </TableCell>
                      </TableRow>
                    ) : submissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                          No submissions yet. They will appear here when users fill the contact form.
                        </TableCell>
                      </TableRow>
                    ) : (
                      submissions.map((s, i) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell className="font-medium">{s.name}</TableCell>
                          <TableCell className="text-muted-foreground">{s.email}</TableCell>
                          <TableCell className="text-muted-foreground">{s.phone}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-primary/30 text-primary text-xs whitespace-nowrap">
                              {s.serviceType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">{s.deviceType || '-'}</TableCell>
                          <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground" title={s.message}>
                            {s.message || '-'}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(s.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={s.status === 'pending' ? 'outline' : 'default'}
                              className={s.status === 'pending' ? 'border-yellow-500/50 text-yellow-600 dark:text-yellow-400 text-xs' : 'bg-green-500/20 text-green-700 dark:text-green-400 text-xs'}
                            >
                              {s.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════ */
function Navbar({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Database className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Data<span className="text-primary">Rescue</span> Pro
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}

          {/* Dark Mode Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {resolvedTheme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}

          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href="#contact">Get Free Quote</a>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:text-primary"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border/50 bg-background/95 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="mt-2 bg-primary text-primary-foreground" asChild>
              <a href="#contact" onClick={() => setOpen(false)}>Get Free Quote</a>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="hero-bg grid-bg relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="animate-float-delayed absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="animate-pulse-glow absolute bottom-20 left-1/3 h-2 w-2 rounded-full bg-primary" />
        <div className="animate-pulse-glow absolute top-40 right-1/4 h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ animationDelay: '1s' }} />
        <div className="animate-pulse-glow absolute top-60 left-1/4 h-1 w-1 rounded-full bg-teal-400" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
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
                <a href="#contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-border text-base" asChild>
                <a href="#services">
                  Our Services
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No Data, No Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Same-Day Diagnosis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>100% Confidential</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex lg:justify-center"
          >
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
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Card className="border-border/50 bg-card/80 backdrop-blur-sm card-hover cursor-default">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { value: '10,000+', label: 'Recoveries Done' },
            { value: '98.5%', label: 'Success Rate' },
            { value: '15+', label: 'Years Experience' },
            { value: '24/7', label: 'Emergency Support' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border/50 bg-card/50 p-4 text-center backdrop-blur-sm">
              <div className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES SECTION (with images)
   ═══════════════════════════════════════════════════ */
const services = [
  {
    icon: Usb,
    title: 'Pendrive Data Recovery',
    image: serviceImages['Pendrive Data Recovery'],
    description:
      'Recover files from corrupted, formatted, or physically damaged USB pendrives. We handle all brands and capacities — from 2GB to 1TB flash drives — recovering photos, documents, videos, and more.',
    features: ['Formatted drive recovery', 'RAW file system fix', 'Physically damaged pen drives', 'All USB brands supported'],
  },
  {
    icon: HardDrive,
    title: 'HDD Data Recovery',
    image: serviceImages['HDD Data Recovery'],
    description:
      'Expert recovery from crashed, clicking, or dead hard disk drives. Our cleanroom lab handles head crashes, bad sectors, firmware corruption, and mechanical failures for both internal and external HDDs.',
    features: ['Clicking / dead HDD', 'Head crash recovery', 'Bad sector handling', 'All HDD brands & sizes'],
  },
  {
    icon: MemoryStick,
    title: 'Memory Card Recovery',
    image: serviceImages['Memory Card Recovery'],
    description:
      'Retrieve lost photos, videos, and files from SD cards, microSD cards, CF cards, and all other memory card formats used in cameras, phones, and drones.',
    features: ['SD / microSD cards', 'CF / XD cards', 'Corrupted card recovery', 'Camera & drone cards'],
  },
  {
    icon: Disc3,
    title: 'SSD Data Recovery',
    image: serviceImages['SSD Data Recovery'],
    description:
      'Advanced NAND chip-level recovery for solid state drives. We recover data from failed SSDs, damaged controllers, and encrypted drives with cutting-edge tools.',
    features: ['NAND chip recovery', 'Firmware repair', 'Encrypted SSD support', 'All form factors'],
  },
  {
    icon: Server,
    title: 'RAID Recovery',
    image: serviceImages['RAID Recovery'],
    description:
      'Complete RAID array reconstruction and data recovery for RAID 0, 1, 5, 6, 10, and nested configurations. We handle multi-disk failures and controller issues.',
    features: ['RAID 0/1/5/6/10', 'Multi-disk failure', 'Controller issues', 'NAS & server recovery'],
  },
  {
    icon: Database,
    title: 'Database & Server Recovery',
    image: serviceImages['Database & Server Recovery'],
    description:
      'Specialized recovery for corrupt databases (MySQL, PostgreSQL, SQL Server), virtual machines, and enterprise server environments with minimal downtime.',
    features: ['SQL database repair', 'VM recovery', 'Exchange server', 'Enterprise solutions'],
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glow-teal group h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/90">
                {/* Service Image */}
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {service.title}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 shrink-0 text-primary" />
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

/* ═══════════════════════════════════════════════════
   WHY CHOOSE US
   ═══════════════════════════════════════════════════ */
const reasons = [
  {
    icon: ShieldCheck,
    title: 'No Data, No Fee',
    description:
      'We operate on a strict no-recovery, no-charge policy. If we cannot recover your data, you pay absolutely nothing. This ensures you bear zero financial risk when entrusting us with your device.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description:
      'Most standard recoveries are completed within 24-48 hours. For urgent cases, we offer emergency same-day and priority recovery services so you can get back to business without prolonged downtime.',
  },
  {
    icon: Shield,
    title: '100% Confidential',
    description:
      'Your data privacy is our top priority. We sign NDAs, follow strict data protection protocols, and ensure that your recovered files are never accessed, shared, or stored without your explicit permission.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Our dedicated support team is available around the clock. Whether it is a late-night emergency or a weekend crisis, you can always reach us for immediate assistance and status updates on your recovery.',
  },
  {
    icon: Award,
    title: 'Certified Experts',
    description:
      'Our engineers hold industry-leading certifications and have 15+ years of hands-on experience. We invest in continuous training and cutting-edge tools to stay ahead of evolving storage technologies.',
  },
  {
    icon: Zap,
    title: 'High Success Rate',
    description:
      'With a 98.5% recovery success rate across all device types, we consistently deliver results where others fail. Our cleanroom facilities and proprietary techniques maximize every recovery opportunity.',
  },
];

function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-us" className="relative py-24 sm:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Why Choose Us
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Why <span className="gradient-text">10,000+ Customers</span> Trust Us
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We combine cutting-edge technology with years of expertise to deliver the
            highest recovery success rate in the industry.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group flex gap-4 rounded-xl border border-border/50 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/70">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <reason.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">{reason.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PROCESS SECTION
   ═══════════════════════════════════════════════════ */
const steps = [
  {
    step: '01',
    title: 'Submit Your Request',
    description:
      'Fill out our quick contact form below or call us directly. Tell us about your device, the problem you are facing, and what data you need recovered. Our team will respond within 1 hour.',
  },
  {
    step: '02',
    title: 'Free Diagnosis',
    description:
      'Send or bring your device to our lab. Our engineers perform a thorough diagnosis using advanced tools, identifying the exact cause of data loss and providing you with a detailed recovery report and fixed quote.',
  },
  {
    step: '03',
    title: 'Data Recovery',
    description:
      'Once you approve, our specialists get to work in our certified cleanroom. Using state-of-the-art equipment and proprietary techniques, we carefully extract and reconstruct your lost data.',
  },
  {
    step: '04',
    title: 'Receive Your Data',
    description:
      'We verify the recovered files for integrity and transfer them to a new storage device of your choice. Pay only after you confirm your data is fully recovered and accessible.',
  },
];

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            How It Works
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple <span className="gradient-text">4-Step</span> Recovery Process
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Getting your data back is hassle-free. Follow our simple process and
            let our experts handle the rest.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="relative">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="glow-teal-strong flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                      {item.step}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent lg:hidden" />
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════ */
const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    text: 'My external HDD crashed with 5 years of business accounts. DataRescue Pro recovered everything within 2 days. Absolute lifesavers — I cannot thank them enough for their professionalism and speed.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Photographer',
    text: 'I accidentally formatted my 128GB SD card full of wedding photos. I was devastated. They recovered every single photo in original quality. Their no-data-no-fee promise gave me complete peace of mind.',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'IT Manager',
    text: 'Our RAID 5 server suffered a dual disk failure. Their team reconstructed the entire array and recovered all critical business data. The emergency service was fast and the communication was excellent throughout.',
    rating: 5,
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 sm:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Testimonials
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            What Our <span className="gradient-text">Customers</span> Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Real stories from real customers who trusted us with their most valuable data.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glow-teal h-full border-border/50 bg-card/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
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

/* ═══════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════ */
const serviceOptions = [
  'Pendrive Data Recovery',
  'HDD Data Recovery',
  'Memory Card Recovery',
  'SSD Data Recovery',
  'RAID Data Recovery',
  'Database Recovery',
  'Laptop Data Recovery',
  'Mobile Phone Recovery',
  'Other',
];

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    deviceType: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.serviceType) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast({
          title: 'Request Submitted!',
          description: 'Our team will contact you within 1 hour.',
        });
        setForm({ name: '', email: '', phone: '', serviceType: '', deviceType: '', message: '' });
      } else {
        toast({
          title: 'Submission Failed',
          description: data.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Network Error',
        description: 'Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Get In Touch
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Request a <span className="gradient-text">Free Consultation</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tell us about your data loss situation. We&apos;ll provide a free diagnosis
            and quote — no obligations, no hidden fees.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8 lg:col-span-2"
          >
            <div>
              <h3 className="mb-4 text-xl font-semibold">Contact Information</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Reach out to us through any of the channels below. Our team is
                available 24/7 for emergency data recovery needs.
              </p>
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

            <div className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm">
              <h4 className="mb-2 font-semibold text-primary">Emergency Recovery?</h4>
              <p className="text-sm text-muted-foreground">
                For urgent data loss situations, call our emergency hotline for
                immediate priority service and same-day recovery options.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="glow-teal border-border/50 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border-border/50 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border-border/50 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="border-border/50 bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deviceType">Device / Brand</Label>
                      <Input
                        id="deviceType"
                        name="deviceType"
                        placeholder="e.g. Samsung 1TB HDD"
                        value={form.deviceType}
                        onChange={handleChange}
                        className="border-border/50 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Required *</Label>
                    <Select
                      value={form.serviceType}
                      onValueChange={(val) => setForm((p) => ({ ...p, serviceType: val }))}
                    >
                      <SelectTrigger className="border-border/50 bg-background/50">
                        <SelectValue placeholder="Select a recovery service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Describe Your Problem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us what happened — how did you lose data? What files do you need recovered?"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      className="border-border/50 bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Request
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By submitting, you agree to our terms. Your information is 100%
                    secure and will never be shared with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════════════ */
function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="glow-teal-strong relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-emerald-500/10 p-8 text-center sm:p-12"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="relative">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Don&apos;t Panic — We Can Recover Your Data
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Whether you accidentally deleted files, dropped your drive, or
              experienced a complete system failure — we are here to help 24/7.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="#contact">
                  Get Free Diagnosis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                <a href="tel:+919876543210">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency Line
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  return (
    <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Database className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">
                Data<span className="text-primary">Rescue</span> Pro
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              India&apos;s most trusted data recovery service. We recover data from any
              device, any brand, any situation.
            </p>
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
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DataRescue Pro. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
              aria-label="Open admin panel"
            >
              <Lock className="h-3 w-3" />
              Admin
            </button>
            <p className="text-xs text-muted-foreground">
              Recovering your precious data since 2010.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      <AnimatePresence>
        {adminOpen && (
          <AdminPanel onClose={() => setAdminOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}