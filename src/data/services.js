import { 
  Globe, FileText, ShoppingCart, Code2, PenTool, Wrench,
  Smartphone, TabletSmartphone, Layers 
} from 'lucide-react';
import {
  SiGoogleplay, SiApple, SiLinphone
} from 'react-icons/si';
import { IoPhonePortraitOutline } from "react-icons/io5";

export const services = [
  // ==================== WEB ====================
  {
    id: '01',
    category: 'web',
    title: 'Landing Page',
    description: 'High-converting single page websites designed to capture attention and drive action.',
    icon: FileText,
    features: ['Copywriting-focused', 'Fast delivery', 'SEO optimized'],
  },
  {
    id: '02',
    category: 'web',
    title: 'Business Website',
    description: 'Professional multi-page websites that establish credibility and showcase your brand.',
    icon: Globe,
    features: ['Company profile', 'Service pages', 'Contact integration'],
  },
  {
    id: '03',
    category: 'web',
    title: 'E-Commerce',
    description: 'Custom online stores with seamless checkout experiences and easy product management.',
    icon: ShoppingCart,
    features: ['Product catalog', 'Payment gateway', 'Inventory management'],
  },
  {
    id: '04',
    category: 'web',
    title: 'Web Application',
    description: 'Complex web apps with user authentication, dashboards, and real-time features.',
    icon: Code2,
    features: ['User accounts', 'API integration', 'Scalable architecture'],
  },
  {
    id: '05',
    category: 'web',
    title: 'Custom Development',
    description: 'Tailor-made solutions for unique business needs, from internal tools to client portals.',
    icon: PenTool,
    features: ['Requirement analysis', 'Custom UI/UX', 'Third-party integrations'],
  },
  {
    id: '06',
    category: 'web',
    title: 'Maintenance & Upgrade',
    description: 'Keep your website secure, fast, and up-to-date with ongoing support and improvements.',
    icon: Wrench,
    features: ['Regular updates', 'Bug fixes', 'Performance optimization'],
  },

  // ==================== MOBILE APP ====================
  {
    id: '07',
    category: 'mobile',
    title: 'Android App (APK)',
    description: 'Native Android applications built with Flutter or Kotlin, ready to publish on Google Play Store.',
    icon: SiGoogleplay,
    features: ['Flutter / Kotlin', 'Push notifications', 'Play Store ready'],
  },
  {
    id: '08',
    category: 'mobile',
    title: 'iOS App',
    description: 'Sleek iPhone & iPad apps following Apple Human Interface Guidelines, ready for the App Store.',
    icon: SiApple,
    features: ['Swift / Flutter', 'App Store ready', 'iOS design guideline'],
  },
  {
    id: '09',
    category: 'mobile',
    title: 'Cross-Platform App',
    description: 'One codebase, two platforms. Build Android and iOS apps simultaneously with Flutter or React Native.',
    icon: IoPhonePortraitOutline,
    features: ['Android + iOS', 'Single codebase', 'Cost-efficient'],
  },
];
