import AuroraMockup from '../components/mockups/AuroraMockup';
import NordicMockup from '../components/mockups/NordicMockup';
import PulseMockup from '../components/mockups/PulseMockup';
import CulinaryMockup from '../components/mockups/CulinaryMockup';

export const portfolio = [
  {
    id: 1,
    title: 'GWD Studio',
    category: 'Personal Website',
    description: 'Premium web development studio website showcasing services and portfolio.',
    tech: ['React', 'Vite', 'Tailwind', 'GSAP'],
    type: 'iframe',
    url: 'https://galvinalfito.my.id',
    large: true,
  },
  {
    id: 2,
    title: 'Aurora Digital',
    category: 'Landing Page',
    description: 'A modern landing page for a digital marketing agency, focusing on lead generation and brand awareness.',
    tech: ['React', 'Tailwind', 'GSAP'],
    type: 'mockup',
    mockup: AuroraMockup,
    large: true,
  },
  {
    id: 3,
    title: 'Pulse Fitness',
    category: 'Web Application',
    description: 'Membership management dashboard for gyms with real-time analytics and member tracking.',
    tech: ['React', 'Node.js', 'MongoDB'],
    type: 'mockup',
    mockup: PulseMockup,
    large: false,
  },
  {
    id: 4,
    title: 'Culinary Studio',
    category: 'Company Profile',
    description: 'Elegant website for a culinary school showcasing courses, chef profiles, and student testimonials.',
    tech: ['React', 'Tailwind', 'Sanity'],
    type: 'mockup',
    mockup: CulinaryMockup,
    large: false,
  },
  {
    id: 5,
    title: 'Nordic Interiors',
    category: 'E-Commerce',
    description: 'Minimalist online store for Scandinavian furniture brand with custom checkout and product management.',
    tech: ['Next.js', 'Stripe', 'Sanity'],
    type: 'mockup',
    mockup: NordicMockup,
    large: false,
  },
];