import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYMBOLS } from './BrandBookSymbols';
import { Zap, CheckCircle2, Activity, Building2, Ticket, Headphones, Hexagon, ChevronDown, Calculator, TrendingUp, Users, Mic, Contact, Clock, MessageSquare, Mail, Phone, LineChart, FileText, LayoutDashboard, Code, MonitorSpeaker, Waypoints, Info } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, ComposedChart, Line } from 'recharts';

const DeepOceanBackground = lazy(() => import('./Backgrounds').then(m => ({ default: m.DeepOceanBackground })));
const RealisticPlanet = lazy(() => import('./Planets').then(m => ({ default: m.RealisticPlanet })));
const BoomableSpaceObject = lazy(() => import('./BrandSpaceObjects').then(m => ({ default: m.BoomableSpaceObject })));
import { PLANETS_DATA } from '../data/planetsConstants';
import { INDUSTRY_TECH } from '../data/industryTechConstants';

const ACCORDION_FEATURES = [
  { id: 'voice-agent', name: 'Voice Agent', icon: Mic, subFeatures: ['Custom Voice Cloning', 'Multiple Languages', 'Real-time Sentiment Analysis'] },
  { id: 'crm', name: 'Ticket Management Platform / CRM', icon: Contact, subFeatures: ['Automated Triage', 'Analytics Dashboard', 'Agent Handoff', 'Custom Workflows', 'SLA Tracking', 'Omnichannel Inbox', 'Customer Journey Mapping', 'Knowledge Base Integration', 'Role-Based Access', 'Sentiment Analysis', 'Tags & Categorization', 'Duplicate Detection', 'Automated Responses', 'Macro Shortcuts', 'Export & Reporting', 'Audit logs', 'API Access', 'Custom Fields', 'Webhook Triggers', 'Third-party Plugins', 'Notes & Mentions', 'SLA Alerts', 'Agent Collision Detection'] },
  { id: 'tickets-included', name: 'Tickets Included Monthly', icon: Ticket, subFeatures: ['Volume Based Allocation', 'Automated Processing', 'Overage Rollover'] },
  { id: 'voice-hours', name: 'Voice Hours', icon: Clock, subFeatures: ['Overage Protection', 'Rollover Hours', 'Volume Discounts'] },
  { id: 'chat-agents', name: 'Chat Agents', icon: MessageSquare, subFeatures: ['Website Widget', 'Multi-channel Support', 'Context Awareness'] },
  { id: 'mail-agents', name: 'Mail Agents', icon: Mail, subFeatures: ['Inbox Scanning', 'Auto-reply Drafting', 'Prioritization'] },
  { id: 'switchboard', name: 'Human AI Switchboard for Phone Calls', icon: Phone, subFeatures: ['Smart Routing', 'Wait Time Management', 'Priority Queues', 'Interactive Voice Response (IVR)', 'Skill-Based Routing', 'Call Recording', 'Call Transcription', 'Live Keyword Spotting', 'Whisper Coaching', 'Barge-In Capabilities', 'Voicemail to Text', 'Callback Requests', 'Hold Music Customization', 'Business Hours Routing', 'Queue Announcements', 'Call Transfer (Warm/Cold)', 'Spam Call Filtering', 'Multi-level Menus', 'Caller ID Routing', 'Historical Call Analytics', 'Real-time Dashboard', 'Post-Call Surveys', 'Sentiment Analytics'] },
  { id: 'lead-roi', name: 'Lead Generation ROI Widgets', icon: LineChart, subFeatures: ['Conversion Tracking', 'A/B Testing', 'Dynamic Content'] },
  { id: 'lead-forms', name: 'ROI Lead Forms', icon: FileText, subFeatures: ['Smart Validation', 'Conditional Logic', 'CRM Sync'] },
  { id: 'dashboards', name: 'Custom Dashboards', icon: LayoutDashboard, subFeatures: ['Drag & Drop Builder', 'Real-time Metrics', 'Export & Reporting'] },
  { id: 'api', name: 'API', icon: Code, subFeatures: ['RESTful Endpoints', 'GraphQL', 'Webhooks'] },
  { id: 'api-integrations', name: 'API Integrations', icon: Waypoints, subFeatures: ['Salesforce', 'Zendesk', 'HubSpot'] },
  { id: 'screen-share', name: 'Screen Share Talking Agents', icon: MonitorSpeaker, subFeatures: ['Co-browsing', 'Visual Annotation', 'Secure Sessions', 'Live Troubleshooting Aid', 'Virtual Coaching & Onboarding', 'Joint Application Review', 'Video Call Integration', 'Remote Control (Permission-Based)', 'Real-time Step-by-step Guidance', 'Compliance Screen Recording', 'Redaction of PII', 'Action Highlights'] }
];

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  'voice-agent': 'Fully conversational natural language AI voice agent with custom-tailored vocal synthesis, instant cloning, and dual-sentiment monitoring.',
  'crm': 'Omnichannel support system tracking service agreements, with AI routing, detailed agent handoffs, custom CRM triggers, and ticket escalation.',
  'tickets-included': 'Monthly bandwidth of autonomous ticket resolutions allocated to the AI agents before human escalation or overage metrics.',
  'voice-hours': 'Flexible allocation of monthly outgoing/incoming calling duration, incorporating overage rollover benefits and automatic protection triggers.',
  'chat-agents': 'Intelligent digital chat widgets styled seamlessly for multi-channel website embeds, utilizing contextual dialog search keys.',
  'mail-agents': 'Automated email scanners that digest message themes, draft dynamic contextual template replies, and assign triage priority queue statuses.',
  'switchboard': 'Corporate telephony hub connecting automated voice response modules to live agents with real-time keyword spotting and warm handoffs.',
  'lead-roi': 'Analytic conversion trackers integrating multivariate testing parameters to monitor real-time financial gains generated by AI pathways.',
  'lead-forms': 'Conditional-logic responsive fields that capture incoming inquiries, validate formatting constraints, and synchronize profiles with CRMs.',
  'dashboards': 'Interactive status centers displaying neural activity maps, system volumes, custom query feeds, and real-time operational diagnostics.',
  'api': 'Direct developer endpoints offering full read and write triggers, sandbox interfaces, and automated security verification structures.',
  'api-integrations': 'Pre-configured enterprise connection templates mapping directly to standard tools like Salesforce, HubSpot, and Zendesk networks.',
  'screen-share': 'Co-browsing digital assistants capable of highlighting UI forms, masking sensitive client credentials, and guiding users visually.'
};

const INTEGRATION_CATEGORIES = [
  {
    title: 'CRM & SALES INTELLIGENCE',
    services: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive', 'Copper', 'Fireberry', 'Zendesk Sell', 'Dynamics 365', 'Insightly', 'Capsule', 'Freshsales', 'Bitrix24', 'Keap', 'Apollo.io', 'Clearbit', 'ZoomInfo', 'SalesLoft', 'Close', 'Nimble', 'Agile CRM']
  },
  {
    title: 'OPERATIONS & PRODUCTIVITY',
    services: ['Monday.com', 'Asana', 'Trello', 'ClickUp', 'Jira', 'Basecamp', 'Notion', 'Wrike', 'Smartsheet', 'Teamwork', 'Airtable', 'Miro', 'Todoist', 'Confluence', 'Lucidchart', 'Evernote', 'Linear', 'Coda', 'Roam Research', 'Obsidian']
  },
  {
    title: 'COMMUNICATION & OMNICHANNEL',
    services: ['WhatsApp', 'Slack', 'Microsoft Teams', 'Discord', 'Telegram', 'Zoom', 'Intercom', 'Twilio', 'Freshdesk', 'Gorgias', 'Drift', 'Viber', 'Line', 'Google Meet', 'Webex', 'RingCentral', 'SendGrid', 'Postmark', 'Mailgun', 'MessageBird']
  },
  {
    title: 'ERP & FINANCIAL ECOSYSTEMS',
    services: ['SAP', 'Oracle NetSuite', 'Sage', 'QuickBooks Online', 'Xero', 'FreshBooks', 'Stripe', 'PayPal', 'Square', 'Wave', 'Expensify', 'Gusto', 'ADP', 'Plaid', 'Braintree', 'Adyen', 'Workday Financials', 'Coupa', 'BlackLine']
  },
  {
    title: 'MARKETING & ADVERTISING',
    services: ['Mailchimp', 'ActiveCampaign', 'Klaviyo', 'Marketo', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'Semrush', 'Ahrefs', 'Hootsuite', 'Buffer', 'Braze', 'Iterable', 'Customer.io', 'Sprout Social', 'Omnisend', 'Mailersend']
  },
  {
    title: 'HR & TALENT MANAGEMENT',
    services: ['Workday', 'BambooHR', 'Deel', 'Rippling', 'Greenhouse', 'Lever', 'Workable', 'Gusto', 'HiBob', 'Paylocity', 'SuccessFactors', 'Fountain', 'Lattice', '15Five', 'Oyster', 'Remote', 'Culture Amp']
  },
  {
    title: 'CLOUD & DATA WAREHOUSES',
    services: ['AWS', 'Google Cloud', 'Azure', 'Snowflake', 'Databricks', 'BigQuery', 'Redshift', 'MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Kafka', 'Supabase', 'Vercel', 'Netlify', 'Heroku', 'DigitalOcean', 'PlanetScale']
  },
  {
    title: 'E-COMMERCE & RETAIL',
    services: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Salesforce Commerce Cloud', 'Etsy', 'Amazon Seller Central', 'eBay', 'Wix eCommerce', 'Square Online', 'PrestaShop', 'Printful', 'Shippo', 'ShipStation']
  },
  {
    title: 'SUPPORT & HELPDESK',
    services: ['Zendesk', 'Freshdesk', 'Salesforce Service Cloud', 'ServiceNow', 'Jira Service Management', 'Help Scout', 'Front', 'Kustomer', 'HappyFox', 'Gorgias', 'Kayako', 'Dixa', 'Reamaze']
  },
  {
    title: 'AUTOMATION & PROTOCOLS',
    services: ['n8n', 'Make.com', 'Zapier', 'IFTTT', 'Pabbly Connect', 'Workato', 'Tray.io', 'MuleSoft', 'Celigo', 'REST API', 'GraphQL', 'Webhooks', 'gRPC', 'SOAP', 'EDI', 'FTP/SFTP', 'Boomi', 'Jitterbit', 'SnapLogic']
  }
];

const PACKAGE_TABS = [
  {
    id: 'support',
    label: 'Support & Service',
    bundles: [
      { id: 'sup_pkg1', name: 'Support Starter', price: 499, highlight: false, features: 5, colors: ['#9ca3af', '#d1d5db'] },
      { id: 'sup_pkg2', name: 'Support Growth', price: 999, highlight: true, features: 8, colors: ['#4facfe', '#00f2fe'] },
      { id: 'sup_pkg3', name: 'Support Scale', price: 1999, highlight: false, features: 11, colors: ['#34d399', '#10b981'] },
      { id: 'sup_pkg4', name: 'Support Elite', price: 3499, highlight: false, features: 13, colors: ['#c084fc', '#a855f7'] },
    ]
  },
  {
    id: 'sales',
    label: 'Sales & Marketing',
    bundles: [
      { id: 'sal_pkg1', name: 'Sales Starter', price: 324, highlight: false, features: 6, colors: ['#9ca3af', '#d1d5db'] },
      { id: 'sal_pkg2', name: 'Sales Accelerate', price: 649, highlight: true, features: 9, colors: ['#fb923c', '#f97316'] },
      { id: 'sal_pkg3', name: 'Sales Ascend', price: 1299, highlight: false, features: 12, colors: ['#f472b6', '#ec4899'] },
      { id: 'sal_pkg4', name: 'Sales Dominator', price: 2274, highlight: false, features: 13, colors: ['#fb7185', '#e11d48'] },
    ]
  },
  {
    id: 'custom',
    label: 'Custom',
    bundles: [
      { id: 'cus_pkg1', name: 'Pilot Program', price: 'Contact', highlight: false, features: 7, colors: ['#9ca3af', '#d1d5db'] },
      { id: 'cus_pkg2', name: 'Departmental', price: 'Contact', highlight: false, features: 10, colors: ['#38bdf8', '#0ea5e9'] },
      { id: 'cus_pkg3', name: 'Enterprise Core', price: 'Contact', highlight: true, features: 13, colors: ['#e879f9', '#d946ef'] },
      { id: 'cus_pkg4', name: 'Global Nexus', price: 'Contact', highlight: false, features: 13, colors: ['#fbbf24', '#f59e0b'] },
    ]
  }
];

/** CallCenterIllustration — line-art two-operator scene. All strokes share
 *  one colour (text-[#4facfe] inherited via currentColor) so it reads as
 *  a single-tone diagram, not a busy illustration. Continuously animated
 *  with Framer Motion: characters nod, headset mics bob, phones ring with
 *  pulsing rings, sound-wave arcs travel out from each operator. */
const CallCenterIllustration = () => (
  <div className="shrink-0 w-full lg:w-[300px] max-w-[340px] mx-auto lg:mx-0 self-center">
    <svg viewBox="0 0 320 220" className="w-full h-auto text-[#4facfe]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="ccDeskGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* === LEFT OPERATOR === */}
      <motion.g animate={{ y: [0, -2, 0, 2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        {/* Sound-wave arcs from headset */}
        <motion.g
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M 38 56 Q 30 60 33 70" />
          <path d="M 33 50 Q 22 58 26 74" />
        </motion.g>
        {/* Head */}
        <circle cx="62" cy="62" r="16" />
        {/* Hair / cap line */}
        <path d="M 47 60 Q 62 44 77 60" />
        {/* Eyes */}
        <circle cx="58" cy="62" r="1.2" fill="currentColor" />
        <circle cx="68" cy="62" r="1.2" fill="currentColor" />
        {/* Headset band */}
        <path d="M 46 60 Q 46 44 62 44 Q 78 44 78 60" />
        {/* Ear cups */}
        <rect x="44" y="58" width="4" height="9" rx="1.5" />
        <rect x="76" y="58" width="4" height="9" rx="1.5" />
        {/* Mic boom */}
        <motion.path
          d="M 78 64 Q 86 70 78 78"
          animate={{ rotate: [0, 4, 0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '78px 64px' }}
        />
        <circle cx="78" cy="78" r="2" />
        {/* Body */}
        <path d="M 44 96 L 80 96 L 86 150 L 38 150 Z" />
        {/* Shoulder line */}
        <path d="M 50 100 L 74 100" />
      </motion.g>

      {/* === LEFT DESK + COMPUTER === */}
      <rect x="20" y="148" width="110" height="6" rx="1.5" fill="url(#ccDeskGrad)" />
      <rect x="44" y="118" width="50" height="30" rx="2" />
      <path d="M 44 142 L 94 142" />
      <rect x="62" y="148" width="14" height="3" />
      {/* Phone receiver (ringing) */}
      <motion.g
        animate={{ rotate: [0, -8, 0, 8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '110px 140px' }}
      >
        <rect x="100" y="128" width="20" height="9" rx="3" />
        <circle cx="104" cy="132.5" r="1" fill="currentColor" />
        <circle cx="116" cy="132.5" r="1" fill="currentColor" />
      </motion.g>
      {/* Ring waves from left phone */}
      <motion.g
        animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.4, 0.6] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
        style={{ transformOrigin: '110px 132px' }}
      >
        <path d="M 125 124 Q 132 132 125 140" />
        <path d="M 132 118 Q 144 132 132 146" />
      </motion.g>

      {/* === RIGHT OPERATOR === */}
      <motion.g animate={{ y: [0, 2, 0, -2, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}>
        {/* Sound-wave arcs from headset */}
        <motion.g
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <path d="M 282 56 Q 290 60 287 70" />
          <path d="M 287 50 Q 298 58 294 74" />
        </motion.g>
        {/* Head */}
        <circle cx="258" cy="62" r="16" />
        {/* Hair / cap line */}
        <path d="M 243 60 Q 258 44 273 60" />
        {/* Eyes */}
        <circle cx="254" cy="62" r="1.2" fill="currentColor" />
        <circle cx="264" cy="62" r="1.2" fill="currentColor" />
        {/* Headset band */}
        <path d="M 242 60 Q 242 44 258 44 Q 274 44 274 60" />
        {/* Ear cups */}
        <rect x="240" y="58" width="4" height="9" rx="1.5" />
        <rect x="272" y="58" width="4" height="9" rx="1.5" />
        {/* Mic boom */}
        <motion.path
          d="M 242 64 Q 234 70 242 78"
          animate={{ rotate: [0, -4, 0, 4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '242px 64px' }}
        />
        <circle cx="242" cy="78" r="2" />
        {/* Body */}
        <path d="M 240 96 L 276 96 L 282 150 L 234 150 Z" />
        {/* Shoulder line */}
        <path d="M 246 100 L 270 100" />
      </motion.g>

      {/* === RIGHT DESK + COMPUTER === */}
      <rect x="190" y="148" width="110" height="6" rx="1.5" fill="url(#ccDeskGrad)" />
      <rect x="226" y="118" width="50" height="30" rx="2" />
      <path d="M 226 142 L 276 142" />
      <rect x="244" y="148" width="14" height="3" />
      {/* Phone receiver (ringing, mirrored) */}
      <motion.g
        animate={{ rotate: [0, 8, 0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        style={{ transformOrigin: '210px 140px' }}
      >
        <rect x="200" y="128" width="20" height="9" rx="3" />
        <circle cx="204" cy="132.5" r="1" fill="currentColor" />
        <circle cx="216" cy="132.5" r="1" fill="currentColor" />
      </motion.g>
      {/* Ring waves from right phone */}
      <motion.g
        animate={{ opacity: [0, 0.8, 0], scale: [0.6, 1.4, 0.6] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
        style={{ transformOrigin: '210px 132px' }}
      >
        <path d="M 195 124 Q 188 132 195 140" />
        <path d="M 188 118 Q 176 132 188 146" />
      </motion.g>

      {/* Floor line under both desks */}
      <path d="M 14 156 L 306 156" strokeOpacity="0.4" />

      {/* Caption */}
      <text x="160" y="200" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="1.5" fill="currentColor" fillOpacity="0.5" stroke="none">
        LIVE · INBOUND · 24/7
      </text>
    </svg>
  </div>
);

const CosmicTierIcon = ({ index }: { index: number, colors: string[] }) => {
  // Custom cosmic SVG icons per tier with rich hover effects
  // 0=Starter (Comet/Meteor), 1=Growth (Satellite+orbits), 2=Scale (Telescope+stars), 3=Elite (Black Hole+accretion)

  // Tier 0 — Comet/Meteor with flame trail
  if (index === 0) {
    return (
      <div className="relative w-32 h-32 mb-6 flex items-center justify-center overflow-visible select-none">
        <svg viewBox="-10 -10 120 120" className="w-24 h-24" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="cometGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <radialGradient id="cometCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
              <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M 78 25 L 25 78" stroke="url(#cometGrad)" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          <path d="M 70 20 L 35 65" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M 82 35 L 40 72" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <circle cx="78" cy="25" r="14" fill="url(#cometCore)" />
          <circle cx="78" cy="25" r="6" fill="#fef3c7" className="" />
          <g className="opacity-0  transition-opacity duration-300">
            <circle cx="18" cy="82" r="2" fill="#f59e0b" className="animate-ping" style={{animationDelay: '0.1s'}} />
            <circle cx="14" cy="58" r="1.5" fill="#fbbf24" className="animate-ping" style={{animationDelay: '0.3s'}} />
            <circle cx="38" cy="88" r="1.5" fill="#dc2626" className="animate-ping" style={{animationDelay: '0.5s'}} />
            <circle cx="28" cy="90" r="1" fill="#fff" className="animate-ping" style={{animationDelay: '0.7s'}} />
          </g>
        </svg>
      </div>
    );
  }

  // Tier 1 — Satellite with orbiting rings
  if (index === 1) {
    return (
      <div className="relative w-32 h-32 mb-6 flex items-center justify-center overflow-visible select-none">
        <svg viewBox="-10 -10 120 120" className="w-24 h-24" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="satBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="satPanel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="#06b6d4" strokeOpacity="0.35" strokeWidth="1.2"
                   style={{transformOrigin: '50px 50px', animation: 'spin 8s linear infinite'}}
                   className="" />
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="#67e8f9" strokeOpacity="0.5" strokeWidth="1.2"
                   transform="rotate(60 50 50)"
                   style={{transformOrigin: '50px 50px', animation: 'spin 6s linear infinite reverse'}}
                   className="" />
          <ellipse cx="50" cy="50" rx="42" ry="14" fill="none" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1"
                   transform="rotate(-60 50 50)"
                   style={{transformOrigin: '50px 50px', animation: 'spin 7s linear infinite'}}
                   className="" />
          <rect x="42" y="42" width="16" height="16" rx="3" fill="url(#satBody)" stroke="#67e8f9" strokeWidth="0.8" />
          <rect x="18" y="46" width="22" height="8" fill="url(#satPanel)" stroke="#67e8f9" strokeWidth="0.6" />
          <rect x="60" y="46" width="22" height="8" fill="url(#satPanel)" stroke="#67e8f9" strokeWidth="0.6" />
          <line x1="22" y1="50" x2="38" y2="50" stroke="#67e8f9" strokeWidth="0.4" />
          <line x1="62" y1="50" x2="78" y2="50" stroke="#67e8f9" strokeWidth="0.4" />
          <line x1="50" y1="42" x2="50" y2="30" stroke="#67e8f9" strokeWidth="1" />
          <circle cx="50" cy="29" r="2.5" fill="#67e8f9" className="animate-pulse" />
          <circle cx="50" cy="29" r="5" fill="none" stroke="#67e8f9" strokeWidth="0.5" opacity="0.8"
                  style={{animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite'}} />
        </svg>
      </div>
    );
  }

  // Tier 2 — Telescope with starfield
  if (index === 2) {
    return (
      <div className="relative w-32 h-32 mb-6 flex items-center justify-center overflow-visible select-none">
        <svg viewBox="-10 -10 120 120" className="w-24 h-24" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="teleBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </radialGradient>
          </defs>
          <g transform="rotate(-30 50 55)">
            <rect x="22" y="50" width="56" height="11" rx="3" fill="url(#teleBody)" stroke="#6ee7b7" strokeWidth="0.6" />
            <rect x="24" y="52" width="52" height="2" fill="#34d399" opacity="0.4" />
            <ellipse cx="80" cy="55.5" rx="6" ry="9" fill="url(#lensGlow)" stroke="#6ee7b7" strokeWidth="1.2" />
            <circle cx="80" cy="55.5" r="3" fill="#34d399" className="animate-pulse" />
            <rect x="18" y="48" width="6" height="15" rx="1.5" fill="#059669" />
          </g>
          <line x1="40" y1="65" x2="35" y2="92" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="65" x2="52" y2="92" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="65" x2="40" y2="92" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          <g>
            <circle cx="20" cy="15" r="1.5" fill="#6ee7b7" className="animate-pulse" style={{animationDelay: '0s'}}/>
            <circle cx="35" cy="22" r="1" fill="#fff" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
            <circle cx="85" cy="12" r="1.5" fill="#34d399" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
            <circle cx="62" cy="8" r="1" fill="#fff" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
          </g>
          <g className="opacity-0  transition-opacity duration-500">
            <circle cx="14" cy="28" r="1" fill="#6ee7b7" className="animate-ping" style={{animationDelay: '0.1s'}}/>
            <circle cx="92" cy="32" r="1" fill="#34d399" className="animate-ping" style={{animationDelay: '0.4s'}}/>
            <circle cx="50" cy="6" r="0.8" fill="#fff" className="animate-ping" style={{animationDelay: '0.7s'}}/>
            <circle cx="75" cy="20" r="0.8" fill="#6ee7b7" className="animate-ping" style={{animationDelay: '1.0s'}}/>
          </g>
        </svg>
      </div>
    );
  }

  // Tier 3 — Black Hole with accretion disk
  return (
    <div className="relative w-32 h-32 mb-6 flex items-center justify-center overflow-visible select-none">
      <svg viewBox="-10 -10 120 120" className="w-24 h-24" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="bhCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="50%" stopColor="#1e0a3c" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </radialGradient>
          <linearGradient id="accretion1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="accretion2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="46" ry="11" fill="none" stroke="url(#accretion1)" strokeWidth="3.5"
                 style={{transformOrigin: '50px 50px', animation: 'spin 5s linear infinite'}}
                 className="" />
        <ellipse cx="50" cy="50" rx="40" ry="7" fill="none" stroke="url(#accretion2)" strokeWidth="2.5" opacity="0.7"
                 style={{transformOrigin: '50px 50px', animation: 'spin 3.5s linear infinite reverse'}}
                 className="" />
        <ellipse cx="50" cy="50" rx="34" ry="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"
                 style={{transformOrigin: '50px 50px', animation: 'spin 2.5s linear infinite'}}
                 className="" />
        <circle cx="50" cy="50" r="16" fill="url(#bhCore)" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.7" />
        <circle cx="50" cy="50" r="9" fill="#000" />
        <circle cx="50" cy="50" r="9" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.4"
                className="" />
        <g className="opacity-0  transition-opacity duration-500">
          <circle cx="85" cy="50" r="1.5" fill="#fbbf24" className="animate-ping" style={{animationDelay: '0s'}}/>
          <circle cx="15" cy="50" r="1.5" fill="#a855f7" className="animate-ping" style={{animationDelay: '0.4s'}}/>
          <circle cx="50" cy="15" r="1" fill="#fff" className="animate-ping" style={{animationDelay: '0.8s'}}/>
          <circle cx="50" cy="85" r="1" fill="#3b82f6" className="animate-ping" style={{animationDelay: '1.2s'}}/>
          <circle cx="78" cy="28" r="0.8" fill="#ec4899" className="animate-ping" style={{animationDelay: '0.2s'}}/>
          <circle cx="22" cy="72" r="0.8" fill="#06b6d4" className="animate-ping" style={{animationDelay: '0.6s'}}/>
        </g>
      </svg>
    </div>
  );
};

const getFeatureStatus = (featureId: string, bundle: any, fIndex: number) => {
  let isIncluded = fIndex < bundle.features;
  let customLabel = '';
  let customTitle = '';

  const isStarter = bundle.name.toLowerCase().includes('starter') || bundle.name.toLowerCase().includes('pilot');
  const isGrowth = bundle.name.toLowerCase().includes('growth') || bundle.name.toLowerCase().includes('accelerate') || bundle.name.toLowerCase().includes('departmental');
  const isScale = bundle.name.toLowerCase().includes('scale') || bundle.name.toLowerCase().includes('ascend') || bundle.name.toLowerCase().includes('core');
  const isElite = bundle.name.toLowerCase().includes('elite') || bundle.name.toLowerCase().includes('dominator') || bundle.name.toLowerCase().includes('nexus');
  const isSales = bundle.name.toLowerCase().includes('sales') || bundle.name.toLowerCase().includes('accelerate') || bundle.name.toLowerCase().includes('ascend') || bundle.name.toLowerCase().includes('dominator');

  if (featureId === 'crm') {
     if (isStarter) {
        isIncluded = false;
     }
     if (isSales) {
        customTitle = 'Leads and Sales CRM';
     }
  }

  if (featureId === 'lead-roi' || featureId === 'lead-forms') {
     isIncluded = true;
  }

  if (featureId === 'voice-hours') {
     let hours = '50 Hours';
     if (isGrowth) hours = '150 Hours';
     if (isScale) hours = '400 Hours';
     if (isElite) hours = '2000 Hours';
     customLabel = hours;
     isIncluded = true;
  }

  if (featureId === 'tickets-included') {
     let tickets = '350 Tickets';
     if (isGrowth) tickets = '800 Tickets';
     if (isScale) tickets = '1500 Tickets';
     if (isElite) tickets = '4000 Tickets';
     customLabel = tickets;
     if (isSales) {
        isIncluded = false;
     } else {
        isIncluded = true;
     }
  }

  return { isIncluded, customLabel, customTitle };
};

const FeatureAccordion = ({ feature, isIncluded, color1, customLabel, customTitle }: { feature: any, isIncluded: boolean, color1: string, customLabel?: string, customTitle?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isHighlighted = feature.id === 'crm' || feature.id === 'switchboard' || feature.id === 'screen-share';
  const IconComponent = feature.icon || CheckCircle2;
  return (
    <div className={`border-b border-white/5 py-3 ${isIncluded ? 'opacity-100' : 'opacity-30 grayscale pointer-events-none'}`}>
       <button onClick={() => isIncluded && setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left focus:outline-none group">
           <div className="flex items-center gap-3">
               <IconComponent className="w-4 h-4" style={{ color: isIncluded ? color1 : 'rgba(255,255,255,0.2)' }} />
               <span className={`font-sans text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors ${isHighlighted ? 'text-amber-300 font-bold drop-shadow-[0_0_5px_rgba(252,211,77,0.5)]' : 'text-white group-hover:text-white/80'}`}>
                 {customTitle || feature.name} {customLabel && <span className="ml-1 text-[#4facfe] font-mono opacity-90 tracking-normal capitalize">({customLabel})</span>}
               </span>
           </div>
           {isIncluded && <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-amber-300/80' : 'text-white/50'}`} />}
       </button>
       <AnimatePresence>
         {isOpen && (
           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <ul className="pl-7 mt-3 space-y-2">
                 {feature.subFeatures.map((sf: string, i: number) => (
                   <li key={i} className="text-[9px] font-sans text-white/60 flex items-center gap-2">
                     <div className="w-1 h-1 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: color1, color: color1 }} />
                     {sf}
                   </li>
                 ))}
              </ul>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState(PACKAGE_TABS[0].id);
  const [activeRains, setActiveRains] = useState<{ [key: string]: Array<{ id: string; x: number; y: number; emoji: any; size: number; delay: number; rot: number }> }>({});
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const triggerRain = (bundleId: string, indexInTab: number) => {
    const emojisMap: Record<number, Array<{ char: string; isTag?: boolean; label?: string }>> = {
      0: [ // Starter: paper money and coins
        { char: '💵' }, { char: '💸' }, { char: '🪙' }, { char: '🪙' }, { char: '💰' }, { char: '💵' }
      ],
      1: [ // Growth: phonecalls falling
        { char: '📞' }, { char: '☎️' }, { char: '💬' }, { char: '🔔' },
        { char: '📞', isTag: true, label: 'Incoming Call...' },
        { char: '💬', isTag: true, label: 'Connecting' }
      ],
      2: [ // Scale: mobile phone falling
        { char: '📱' }, { char: '📲' }, { char: '⚡' },
        { char: '📱', isTag: true, label: 'Agent Hub 📲' }
      ],
      3: [ // Elite: meeting finished & calendar dates booked
        { char: '🤝' }, { char: '📅' }, { char: '📆' }, { char: '✅' },
        { char: '🤝', isTag: true, label: 'Finished ✅' },
        { char: '📆', isTag: true, label: 'Booked 📅' }
      ]
    };

    const normalizedIndex = indexInTab % 4;
    const items = emojisMap[normalizedIndex] || emojisMap[0];
    const particlesList: Array<{ id: string; x: number; y: number; emoji: any; size: number; delay: number; rot: number }> = [];
    
    const count = 35;
    const baseId = `rain-${bundleId}-${Date.now().toString(36)}`;
    for (let i = 0; i < count; i++) {
      const pId = `${baseId}-${i}`;
      const item = items[Math.floor(Math.random() * items.length)];
      const x = Math.random() * 92; 
      const y = -15 - Math.random() * 30; 
      const size = item.isTag ? 10 : 20 + Math.random() * 16; 
      const delay = Math.random() * 0.5; 
      const rot = (Math.random() - 0.5) * 540; 
      
      const emojiNode = item.isTag ? (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-[#4facfe]/20 text-white border border-[#4facfe]/45 rounded-full font-sans text-[8px] font-bold uppercase tracking-wider whitespace-nowrap shadow-[0_0_12px_rgba(79,172,254,0.3)]">
          <span className="text-[10px]">{item.char}</span>
          <span>{item.label}</span>
        </span>
      ) : (
        <span className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.45)] select-none">{item.char}</span>
      );

      particlesList.push({
        id: pId,
        x,
        y,
        emoji: emojiNode,
        size,
        delay,
        rot
      });
    }

    setActiveRains(prev => ({
      ...prev,
      [bundleId]: particlesList
    }));

    setTimeout(() => {
      setActiveRains(prev => {
        const next = { ...prev };
        delete next[bundleId];
        return next;
      });
    }, 2800);
  };

  const activeTabData = PACKAGE_TABS.find(t => t.id === activeTab);
  
  // Voice Hours Calculator State
  const [voiceHours, setVoiceHours] = useState(100);
  const VOICE_HOUR_RATE = 7;
  const voiceCost = voiceHours * VOICE_HOUR_RATE;

  // ROI Calculator State
  const [roiIndustry, setRoiIndustry] = useState(INDUSTRY_TECH[0].id);
  const [roiRole, setRoiRole] = useState('service');
  const [workersCount, setWorkersCount] = useState(10);
  
  const ROLES = [
    { id: 'sales', label: 'Sales Representative' },
    { id: 'service', label: 'Customer Service Agent' },
    { id: 'support', label: 'Technical Support' }
  ];
  
  // Base average monthly salary mapping for simulation based on industry and role
  // Adjusted to ranges between $4,000 and $7,000
  const getIndustryData = (indId: string, roleId: string) => {
    const baseMonthly: Record<string, number> = {
      'defense': 6500, 'govt': 5500, 'logistics': 4500, 'marketing': 5500,
      'finance': 6000, 'academic': 4800, 'factory': 4200, 'hospitality': 4000,
      'shipping': 4300, 'construction': 5000, 'healthcare': 5800, 'realestate': 5200,
      'energy': 6000, 'agriculture': 4000, 'retail': 4000, 'automotive': 4800,
      'entertainment': 5000, 'telecomm': 5500, 'pharma': 6200, 'aerospace': 6500
    };
    
    const base = baseMonthly[indId] || 5000; 
    
    // Role modifiers
    const roleModifiers: Record<string, { multiplier: number, dailyCases: number, avgTimeMins: string }> = {
      'sales': { multiplier: 1.15, dailyCases: 30, avgTimeMins: '15m - 2h' },     // Lower interaction volume, higher value
      'service': { multiplier: 0.85, dailyCases: 100, avgTimeMins: '3m - 10m' },  // High volume routine interactions
      'support': { multiplier: 1.0, dailyCases: 60, avgTimeMins: '10m - 15m' }     // Moderate volume, higher complexity
    };
    const roleParams = roleModifiers[roleId] || roleModifiers['service'];
    
    // Calculate final monthly between 4k-7k roughly
    const rawSalary = Math.round(base * roleParams.multiplier);
    const clampedSalary = Math.max(4000, Math.min(7000, rawSalary));

    const automationPercentage = 70;

    return {
       monthlySalary: clampedSalary,
       dailyCases: roleParams.dailyCases,
       avgTimeMins: roleParams.avgTimeMins,
       automationPercentage,
       explanation: `Within ${indId || 'operations'}, AI agents effectively map standard structural workflows. Based on market telemetry, up to ${automationPercentage}% of the ${roleParams.dailyCases} daily tickets handled per ${roleId} employee can be fully resolved autonomously without human intervention.`
    };
  };

  const currentData = getIndustryData(roiIndustry, roiRole);
  const monthlySavings = (workersCount * currentData.monthlySalary) * (currentData.automationPercentage / 100);
  const aiResolvedCases = Math.round(currentData.dailyCases * (currentData.automationPercentage / 100));
  
  // Organization Monthly Volumes (22 working days)
  const orgMonthlyTotalCases = workersCount * currentData.dailyCases * 22;
  const orgMonthlyAiResolved = Math.round(orgMonthlyTotalCases * (currentData.automationPercentage / 100));
  const orgMonthlyHumanRemaining = orgMonthlyTotalCases - orgMonthlyAiResolved;

  const generateChartData = () => {
    const steps = [0.2, 0.5, 1, 1.5, 2];
    return steps.map(multiplier => {
       const simWorkers = Math.max(1, Math.round(workersCount * multiplier));
       const totalCases = simWorkers * currentData.dailyCases * 22;
       const humanCost = simWorkers * currentData.monthlySalary;
       const aiResolvedCasesSim = totalCases * (currentData.automationPercentage / 100);
       
       let avgMins = 10;
       if (currentData.avgTimeMins.includes('10m')) avgMins = 5;
       else if (currentData.avgTimeMins.includes('2h')) avgMins = 60;
       else if (currentData.avgTimeMins.includes('15m')) avgMins = 12;

       const savedHours = Math.round((aiResolvedCasesSim * avgMins) / 60);
       const projectedRed = humanCost * (currentData.automationPercentage / 100);

       return {
          name: `${totalCases.toLocaleString()} Cases`,
          cases: totalCases,
          savedHours: savedHours,
          "Fully Human Cost": humanCost,
          "Projected Reduction": Math.round(projectedRed)
       };
    });
  };

  const chartData = generateChartData();

  const generateVoiceChartData = () => {
    return [
      { name: 'Week 1', cost: Math.round(voiceCost * 0.22), hours: Math.round(voiceHours * 0.22) },
      { name: 'Week 2', cost: Math.round(voiceCost * 0.25), hours: Math.round(voiceHours * 0.25) },
      { name: 'Week 3', cost: Math.round(voiceCost * 0.28), hours: Math.round(voiceHours * 0.28) },
      { name: 'Week 4', cost: Math.round(voiceCost * 0.25), hours: Math.round(voiceHours * 0.25) },
    ];
  };

  const voiceChartData = generateVoiceChartData();

  return (
    <section className="relative pt-32 pb-56 min-h-screen bg-[#010610] text-white overflow-hidden font-sans">
      <DeepOceanBackground />

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center gap-6"
          >
            <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#4facfe] p-3 border border-[#4facfe]/20 rounded-full bg-[#4facfe]/5 flex items-center gap-3">
              <Hexagon className="w-4 h-4" /> SECTOR PRICING PROTOCOLS
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-[0.95] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] flex flex-col sm:flex-row flex-wrap sm:block gap-1 break-words">
              <span className="inline-block shrink-0">Pricing </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe] inline-block shrink-0 px-1">Plans</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200/50 font-mono tracking-wide mt-4">
              Select the optimal deployment scale for your organization.
            </p>
          </motion.div>
        </div>

        {/* Tabs Selection */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 relative z-30">
          {PACKAGE_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-full border ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#010610] border-transparent shadow-[0_0_20px_rgba(79,172,254,0.4)]' 
                  : 'bg-[#05101a] border-white/10 text-white/50 hover:text-white hover:border-[#4facfe]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Billing Switcher */}
        <div className="flex justify-center mb-16 relative z-30">
          <div className="bg-[#05101a] border border-white/10 rounded-full p-1.5 flex items-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 font-bold ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#010610] shadow-[0_0_15px_rgba(79,172,254,0.3)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`relative px-6 py-2.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 font-bold flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#010610] shadow-[0_0_15px_rgba(79,172,254,0.3)]'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-sans font-black tracking-normal uppercase transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#010610] text-[#00f2fe]'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}>
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto mb-40 relative z-20">
          <AnimatePresence mode="popLayout">
            {activeTabData?.bundles.map((bundle, i) => {
              const isRecommended = bundle.highlight;
              return (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`flex flex-col relative bg-[#020617]/80 backdrop-blur-md rounded-3xl border transition-all duration-300 overflow-visible ${
                    isRecommended 
                      ? 'z-10 lg:-translate-y-4' 
                      : 'border-white/10 z-0'
                  }`}
                  style={isRecommended ? { borderColor: bundle.colors[0], boxShadow: `0 0 35px ${bundle.colors[0]}35` } : {}}
                >
                  {/* Active Dynamic Rain Elements */}
                  {activeRains[bundle.id] && (
                    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
                      <style dangerouslySetInnerHTML={{ __html: activeRains[bundle.id].map(p => `
                        @keyframes fall-${p.id} {
                          0% { transform: translateY(${p.y}px) rotate(0deg); opacity: 0; }
                          15% { opacity: 1; }
                          85% { opacity: 1; }
                          100% { transform: translateY(520px) rotate(${p.rot}deg); opacity: 0; }
                        }
                        @keyframes drift-${p.id} {
                          0% { transform: translateX(0px); }
                          50% { transform: translateX(${Math.sin(p.x) * 30}px); }
                          100% { transform: translateX(${Math.cos(p.x) * -20}px); }
                        }
                        .p-${p.id} {
                          animation: fall-${p.id} 2.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
                          animation-delay: ${p.delay}s;
                        }
                        .px-${p.id} {
                          animation: drift-${p.id} 2.0s ease-in-out infinite alternate;
                        }
                      `).join('\n') }} />
                      {activeRains[bundle.id].map(p => (
                        <div
                          key={p.id}
                          className={`absolute p-${p.id}`}
                          style={{
                            left: `${p.x}%`,
                            top: `0px`,
                            fontSize: `${p.size}px`,
                          }}
                        >
                          <div className={`px-${p.id}`}>
                            {p.emoji}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {isRecommended && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 text-[#010610] font-sans text-[9px] font-black uppercase tracking-[0.3em] rounded-full flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,0,0,0.8)]" style={{ backgroundColor: bundle.colors[0], boxShadow: `0 0 15px ${bundle.colors[0]}B3` }}>
                      <Zap className="w-3.5 h-3.5 fill-current animate-pulse text-[#010610]" /> Recommended
                    </div>
                  )}

                  {bundle.highlight && (
                    <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-md font-mono text-[8px] font-black uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1 shadow-[0_0_12px_rgba(245,158,11,0.15)] select-none">
                      <span className="text-amber-400 animate-pulse">★</span>
                      <span>{bundle.price === 'Contact' ? 'Best Value' : 'Most Popular'}</span>
                    </div>
                  )}
                  <div 
                    onClick={() => triggerRain(bundle.id, i)}
                    className="p-8 border-b border-white/5 flex flex-col items-center text-center cursor-pointer select-none group/hdr relative"
                  >
                    <CosmicTierIcon index={i} colors={bundle.colors} />
                    <h3 className="text-xl font-display font-black tracking-widest uppercase mb-4 text-white group-hover/hdr:text-[#4facfe] transition-colors">
                      {bundle.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-6">
                      {bundle.price !== 'Contact' && <span className="text-lg font-sans opacity-50" style={{ color: bundle.colors[0] }}>$</span>}
                      <span className={`text-5xl font-display font-light tracking-tighter ${isRecommended ? 'text-transparent bg-clip-text' : 'text-white'}`} style={isRecommended ? { backgroundImage: `linear-gradient(to right, ${bundle.colors[0]}, ${bundle.colors[1]})` } : {}}>
                        {bundle.price === 'Contact' ? 'Contact' : (billingCycle === 'yearly' ? Math.round(bundle.price * 0.75) : bundle.price)}
                      </span>
                      {bundle.price !== 'Contact' && (
                        <div className="flex flex-col items-start ml-2">
                          {billingCycle === 'yearly' && (
                            <span className="text-[9px] line-through text-white/30 font-mono tracking-tighter">
                              ${bundle.price}/mo
                            </span>
                          )}
                          <span className="text-[9px] uppercase font-sans text-white/40 tracking-wider">
                            {billingCycle === 'yearly' ? '/ MO ANNUALLY' : '/ MO'}
                          </span>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerRain(bundle.id, i);
                      }}
                      className={`w-full py-4 text-[10px] font-sans font-black uppercase tracking-[0.3em] rounded-xl transition-all ${
                        !isRecommended 
                          ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                          : 'text-[#010610]'
                      }`}
                      style={isRecommended ? { backgroundImage: `linear-gradient(to right, ${bundle.colors[0]}, ${bundle.colors[1]})`, boxShadow: `0 0 20px ${bundle.colors[0]}66` } : {}}>
                      {bundle.price === 'Contact' ? 'Get Quote' : 'Deploy Scope'}
                    </button>
                  </div>
                  {/* Accordion Features List */}
                  <div className="p-6 flex-1 text-left flex flex-col overflow-y-auto max-h-[600px] styled-scrollbars">
                     {ACCORDION_FEATURES.map((feature, fIndex) => {
                       const { isIncluded, customLabel, customTitle } = getFeatureStatus(feature.id, bundle, fIndex);
                       return (
                         <FeatureAccordion 
                           key={feature.id} 
                           feature={feature} 
                           isIncluded={isIncluded} 
                           customLabel={customLabel}
                           customTitle={customTitle}
                           color1={bundle.colors[0]}
                         />
                       );
                     })}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-[1400px] mx-auto mb-20 text-left bg-gradient-to-r from-[#4facfe]/10 to-transparent border-l-4 border-[#4facfe] p-5 sm:p-6 rounded-r-xl backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="mt-1 bg-[#4facfe]/20 p-2 rounded-full shrink-0">
                <Info className="w-5 h-5 text-[#00f2fe]" />
              </div>
              <div className="w-full">
                <h3 className="text-white font-display font-bold uppercase tracking-wider mb-2 text-sm sm:text-base">What is a Ticket?</h3>
                <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed max-w-4xl mb-4">
                  A ticket represents a <strong className="text-white font-bold">fully resolved, end-to-end task or case</strong> completed by our AI, integrations, and automation layer. Rather than counting individual messages, minutes, or API calls, a ticket constitutes the entire workflow—handled seamlessly by the cooperative abilities of voice, chat, email, and agentic workflows from the moment a request is initiated until its 100% completion.
                </p>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg max-w-4xl">
                  <h4 className="text-[#4facfe] font-mono text-[10px] uppercase tracking-widest mb-2">Real-World Application: Tourism & Aviation</h4>
                  <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed">
                    A customer contacts support to change their travel itinerary. A <strong className="text-white">single ticket</strong> encompasses the AI agent answering the call, authenticating the passenger, querying the airline's database for availability, successfully rebooking the flight date and departure hours, updating the core CRM, and dispatching the new boarding passes via email—all autonomously executed without human intervention.
                  </p>
                </div>
              </div>
            </div>
            {/* Animated call-center illustration (Katia #8): two operators
                answering ringing phones. Single-colour line art so it sits
                quietly to the right of the explanation without competing
                with the cosmic page palette. */}
            <CallCenterIllustration />
          </div>
        </motion.div>

        {/* Interactive Feature Comparison Table */}
        <div className="max-w-[1400px] mx-auto mb-40 relative z-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] uppercase text-[#4facfe] mb-6 bg-[#4facfe]/10 px-4 py-2 rounded-sm border border-[#4facfe]/20">
              <LayoutDashboard className="w-4 h-4" /> COMPREHENSIVE CAPABILITY SPECTRA
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
              Interactive Plan Comparison
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/50 font-mono mt-4">
              Review exhaustive architectural capabilities mapped across each deployment tier. Hover or tap the <Info className="inline-block w-3.5 h-3.5 text-[#4facfe] mx-1" /> icon for system details.
            </p>
          </div>

          <div className="border border-white/10 bg-[#020617]/90 backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="overflow-x-auto lg:overflow-visible styled-scrollbars">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/5 bg-gradient-to-r from-blue-500/5 to-transparent">
                    <th className="p-6 sticky left-0 z-20 bg-[#020617] lg:bg-transparent font-mono text-[10px] text-white/50 uppercase tracking-widest min-w-[280px]">
                      System Modules & Features
                    </th>
                    {activeTabData?.bundles.map((bundle) => {
                      const capabilityPercent = Math.round((bundle.features / ACCORDION_FEATURES.length) * 100);
                      return (
                        <th key={bundle.id} className="p-6 font-display font-black uppercase tracking-wider text-center min-w-[130px]">
                          <div className="text-[10px] sm:text-xs text-white" style={{ textShadow: `0 0 10px ${bundle.colors[0]}40` }}>
                            {bundle.name}
                          </div>
                          <div className="text-sm sm:text-base font-mono tracking-tighter mt-1" style={{ color: bundle.colors[0] }}>
                            {bundle.price === 'Contact' ? 'Contact' : `$${billingCycle === 'yearly' ? Math.round(bundle.price * 0.75) : bundle.price}`}
                            {bundle.price !== 'Contact' && (
                              <span className="text-[9px] font-sans opacity-50 block tracking-normal">
                                {billingCycle === 'yearly' ? '/mo ann.' : '/mo'}
                              </span>
                            )}
                          </div>
                          
                          {/* Capability Progress Bar Indicator */}
                          <div className="mt-4 max-w-[100px] mx-auto text-left">
                            <div className="flex items-center justify-between font-mono text-[8px] text-white/40 mb-1 uppercase tracking-widest leading-none">
                              <span>CPBLTY</span>
                              <span className="font-bold" style={{ color: bundle.colors[0] }}>{capabilityPercent}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden p-[1px] border border-white/5 relative">
                              <div 
                                className="h-full rounded-full transition-all duration-500 ease-out"
                                style={{ 
                                  width: `${capabilityPercent}%`,
                                  backgroundImage: `linear-gradient(to right, ${bundle.colors[0]}, ${bundle.colors[1] || bundle.colors[0]})`,
                                  boxShadow: `0 0 10px ${bundle.colors[0]}60`
                                }}
                              />
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ACCORDION_FEATURES.map((feature, fIndex) => {
                    const IconComponent = feature.icon || CheckCircle2;
                    let featureDisplayName = feature.name;
                    if (activeTabData?.id === 'sales' && feature.id === 'crm') {
                        featureDisplayName = 'Leads and Sales CRM';
                    }
                    return (
                      <tr key={feature.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-5 sticky left-0 z-20 bg-[#020617] border-r border-white/5 lg:border-r-0 lg:bg-transparent min-w-[280px]">
                          <div className="flex items-center">
                            <IconComponent className="w-4 h-4 text-[#4facfe]/80 shrink-0 mr-3 group-hover:text-[#00f2fe] transition-colors" />
                            <span className="font-sans text-xs font-semibold text-white/90 uppercase tracking-wider">
                              {featureDisplayName}
                            </span>
                            
                            {/* Interactive Tooltip Icon Container */}
                            <div className="relative ml-2 inline-flex items-center">
                              <button
                                onMouseEnter={() => setHoveredFeature(feature.id)}
                                onMouseLeave={() => setHoveredFeature(null)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setHoveredFeature(hoveredFeature === feature.id ? null : feature.id);
                                }}
                                className="text-white/30 hover:text-[#00f2fe] transition-colors focus:outline-none p-1 rounded-full hover:bg-white/5"
                                aria-label={`More info about ${featureDisplayName}`}
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                              <AnimatePresence>
                                {hoveredFeature === feature.id && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                                    className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-[#05101a] border border-[#4facfe]/40 rounded-xl shadow-[0_0_25px_rgba(79,172,254,0.15)] backdrop-blur-md pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="text-[10px] font-sans font-black text-[#4facfe] uppercase tracking-widest mb-1">
                                      {featureDisplayName}
                                    </div>
                                    <p className="text-[10px] font-sans text-white/70 leading-relaxed mb-3">
                                      {FEATURE_DESCRIPTIONS[feature.id]}
                                    </p>
                                    <div className="border-t border-white/5 pt-2">
                                      <span className="text-[8px] font-mono text-white/45 uppercase tracking-widest block mb-1.5">Core Functionalities</span>
                                      <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                                        {feature.subFeatures.slice(0, 6).map((sf: string, sIdx: number) => (
                                          <li key={sIdx} className="text-[8px] text-white/50 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#4facfe]/70" />
                                            <span className="truncate" title={sf}>{sf}</span>
                                          </li>
                                        ))}
                                        {feature.subFeatures.length > 6 && (
                                          <li className="text-[8px] text-[#4facfe] italic font-mono col-span-2 mt-1">
                                            +{feature.subFeatures.length - 6} more modules
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </td>
                        {activeTabData?.bundles.map((bundle) => {
                          const { isIncluded, customLabel } = getFeatureStatus(feature.id, bundle, fIndex);
                          return (
                            <td key={bundle.id} className="p-5 text-center">
                              <div className="flex items-center justify-center">
                                {isIncluded ? (
                                  customLabel ? (
                                    <span className="text-[#4facfe] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#4facfe]/10 px-2 py-1 rounded shadow-[0_0_10px_rgba(79,172,254,0.2)]">{customLabel}</span>
                                  ) : (
                                    <div className="relative group/check">
                                      <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full scale-150 opacity-0 group-hover/check:opacity-100 transition-opacity" />
                                      <svg className="w-5 h-5 text-emerald-400 relative z-10 filter drop-shadow-[0_0_2px_rgba(52,211,153,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  )
                                ) : (
                                  <span className="text-white/10 font-mono text-sm leading-none">-</span>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Double Calculators Section */}
        <div className="max-w-[1400px] mx-auto mb-40 relative z-20">
           <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] uppercase text-[#4facfe] mb-6 bg-[#4facfe]/10 px-4 py-2 rounded-sm border border-[#4facfe]/20">
                <Calculator className="w-4 h-4" /> Operations Forecasting
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                Cost Benefit Calculators
              </h2>
           </div>

           <div className="grid grid-cols-1 gap-12">
             
             {/* 1. Voice Hours Calculator */}
             <div className="border border-white/10 bg-[#020617]/80 backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-full">
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-blue-500/10 to-transparent">
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-widest text-[#4facfe] flex items-center gap-4">
                     <Headphones className="w-6 h-6" /> Voice Operations Cost
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-2">
                    Calculates estimated monthly expense based on needed communication hours. Based on a flat rate of $7.00 per hour of neural voice processing.
                  </p>
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col md:flex-row items-center gap-12 justify-between">
                   
                   <div className="w-full flex-1">
                      <div className="flex justify-between items-end mb-6">
                         <label htmlFor="voiceHoursSlider" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2">
                           <Activity className="w-4 h-4 text-[#4facfe]" /> Comm Hours Needed
                         </label>
                         <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-widest">
                           {voiceHours.toLocaleString()}<span className="text-lg text-white/30 ml-2">HR</span>
                         </span>
                      </div>
                      <input 
                        id="voiceHoursSlider"
                        type="range" 
                        min="1" 
                        max="10000" 
                        step="10"
                        value={voiceHours}
                        onChange={(e) => setVoiceHours(parseInt(e.target.value))}
                        className="w-full appearance-none h-2 bg-white/10 rounded outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4facfe] [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(79,172,254,1)] cursor-pointer"
                      />
                      <div className="flex justify-between mt-4 font-mono text-[9px] text-white/30 uppercase tracking-widest">
                        <span>1 HR</span>
                        <span>10,000+ HR</span>
                      </div>
                   </div>

                   <div className="md:border-l border-t md:border-t-0 border-white/5 pt-8 md:pt-0 md:pl-12 flex flex-col justify-center items-start shrink-0">
                     <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-2">
                       Estimated Monthly Billing
                     </div>
                     <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-mono text-[#00f2fe]/60">$</span>
                        <span className="text-5xl sm:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">
                          {voiceCost.toLocaleString()}
                        </span>
                     </div>
                   </div>

                </div>
             </div>

             {/* 2. ROI Savings Calculator */}
             <div className="border border-emerald-500/30 bg-[#020617]/80 backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col h-fit">
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-emerald-500/10 to-transparent">
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-widest text-emerald-400 flex items-center gap-4">
                     <TrendingUp className="w-6 h-6" /> Agentic ROI & Savings
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-2">
                    Calculates projected monthly financial savings. Based on automating 70% of human workload for your chosen industry and operational role.
                  </p>
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center gap-8">
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                       <label htmlFor="industrySelect" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                         <Building2 className="w-4 h-4 text-emerald-400" /> Sector Protocol
                       </label>
                       <div className="relative">
                         <select 
                            id="industrySelect"
                            value={roiIndustry}
                            onChange={(e) => setRoiIndustry(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-xs md:text-sm uppercase tracking-wider outline-none focus:border-emerald-400/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                         >
                           {INDUSTRY_TECH.map(ind => (
                             <option key={ind.id} value={ind.id} className="bg-[#010610] text-white py-2">
                               {ind.name}
                             </option>
                           ))}
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                       </div>
                     </div>

                     <div>
                       <label htmlFor="roleSelect" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                         <Users className="w-4 h-4 text-emerald-400" /> Operational Role
                       </label>
                       <div className="relative">
                         <select 
                            id="roleSelect"
                            value={roiRole}
                            onChange={(e) => setRoiRole(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-xs md:text-sm uppercase tracking-wider outline-none focus:border-emerald-400/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                         >
                           {ROLES.map(role => (
                             <option key={role.id} value={role.id} className="bg-[#010610] text-white py-2">
                               {role.label}
                             </option>
                           ))}
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                       </div>
                     </div>
                   </div>
                   
                   <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex flex-col md:flex-row md:items-center justify-between border-t border-white/5 pt-4 mt-[-1rem] gap-4">
                     <span>Role Monthly Salary Basis:</span>
                     <span className="text-emerald-400 text-2xl md:text-4xl font-display font-black tracking-tighter flex items-baseline">
                        <span className="text-2xl text-emerald-400/70 mr-1">$</span>
                        {currentData.monthlySalary.toLocaleString()}
                        <span className="text-sm font-mono tracking-widest text-emerald-400/50 ml-2">/MO</span>
                     </span>
                   </div>

                   <div className="mt-4">
                      <div className="flex justify-between items-end mb-6">
                         <label htmlFor="workersSlider" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2">
                           <Users className="w-4 h-4 text-emerald-400" /> Organization Headcount
                         </label>
                         <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-widest">
                           {workersCount.toLocaleString()}
                         </span>
                      </div>
                      <input 
                        id="workersSlider"
                        type="range" 
                        min="1" 
                        max="500" 
                        step="1"
                        value={workersCount}
                        onChange={(e) => setWorkersCount(parseInt(e.target.value))}
                        className="w-full appearance-none h-2 bg-white/10 rounded outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(52,211,153,0.8)] cursor-pointer"
                      />
                      <div className="flex justify-between mt-4 font-mono text-[9px] text-white/30 uppercase tracking-widest">
                        <span>1 Employee</span>
                        <span>500+ Employees</span>
                      </div>
                   </div>

                   {/* Case Volume and Automation Telemetry */}
                   <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 mt-2 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(ellipse_at_center,_rgba(52,211,153,0.15)_0%,_transparent_70%)] pointer-events-none" />
                     <p className="font-sans text-xs text-emerald-400/90 leading-relaxed mb-4">
                       {currentData.explanation}
                     </p>
                     <div className="space-y-3 pt-4 border-t border-emerald-500/20">
                       <div className="flex justify-between items-center font-mono text-[10px] text-white/60 uppercase tracking-widest">
                         <span>Human Baseline (Cases/Day):</span>
                         <span className="text-white font-bold">{currentData.dailyCases}</span>
                       </div>
                       <div className="flex justify-between items-center font-mono text-[10px] text-white/60 uppercase tracking-widest">
                         <span>Avg Case Handling Time:</span>
                         <span className="text-white font-bold">{currentData.avgTimeMins}</span>
                       </div>
                       <div className="flex justify-between items-center font-mono text-[10px] text-white/60 uppercase tracking-widest">
                         <span>AI Projected Resolution:</span>
                         <span className="text-emerald-400 font-bold">{currentData.automationPercentage}% ({aiResolvedCases} cases)</span>
                       </div>
                     </div>
                   </div>

                   <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
                     <div className="flex flex-col xl:flex-row items-center justify-between gap-6 border-b border-white/5 pb-4">
                       <div className="font-mono text-[9px] uppercase tracking-widest text-white/50 leading-relaxed max-w-[150px] text-center xl:text-left">
                         Fully Human Cost (Monthly)
                       </div>
                       <div className="flex items-baseline gap-2">
                          <span className="text-xl font-mono text-white/40">$</span>
                          <span className="text-2xl lg:text-3xl font-display font-black tracking-tighter text-white/80">
                            {(workersCount * currentData.monthlySalary).toLocaleString()}
                          </span>
                       </div>
                     </div>
                     <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
                       <div className="font-mono text-[9px] uppercase tracking-widest text-emerald-500/60 leading-relaxed max-w-[150px] text-center xl:text-left">
                         Projected Monthly Cost Reduction
                       </div>
                       <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-mono text-emerald-400/60">$</span>
                          <span className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
                            {(Math.round(monthlySavings)).toLocaleString()}
                          </span>
                       </div>
                     </div>
                     <div className="bg-[#050b14] p-4 rounded-xl border border-white/5 flex gap-4 text-center divide-x divide-white/5">
                        <div className="flex-1">
                          <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider mb-2">Total Monthly Cases</div>
                          <div className="font-bold text-white tracking-widest">{orgMonthlyTotalCases.toLocaleString()}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono uppercase text-emerald-500/70 tracking-wider mb-2">AI Solved</div>
                          <div className="font-bold text-emerald-400 tracking-widest">{orgMonthlyAiResolved.toLocaleString()}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider mb-2">Human Delegated</div>
                          <div className="font-bold text-white/80 tracking-widest">{orgMonthlyHumanRemaining.toLocaleString()}</div>
                        </div>
                     </div>
                     
                     <div className="mt-8 h-48 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                           <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tick={{fill: 'rgba(255,255,255,0.4)'}} />
                           <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tick={{fill: 'rgba(255,255,255,0.4)'}} tickFormatter={(val) => val >= 1000 ? `$${(val/1000).toFixed(0)}k` : `$${val}`} />
                           <RechartsTooltip 
                             contentStyle={{ backgroundColor: 'rgba(5, 11, 20, 0.9)', borderColor: 'rgba(52, 211, 153, 0.2)', borderRadius: '8px' }}
                             itemStyle={{ color: '#fff', fontSize: '12px' }}
                             labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginBottom: '8px' }}
                             formatter={(value: any, name: string) => {
                               if (name === 'Saved Hours') return [`${value.toLocaleString()} hrs`, name];
                               return [`$${value.toLocaleString()}`, name];
                             }}
                           />
                           <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                           <Bar dataKey="Fully Human Cost" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                           <Bar dataKey="Projected Reduction" fill="#34d399" radius={[4, 4, 0, 0]} />
                           <Line type="monotone" dataKey="savedHours" name="Saved Hours" stroke="#4facfe" strokeWidth={2} dot={{ fill: '#4facfe', r: 3 }} />
                         </ComposedChart>
                       </ResponsiveContainer>
                     </div>

                   </div>

                </div>
             </div>

           </div>
        </div>

        {/* Brand Information Section */}
        <div className="max-w-4xl mx-auto relative z-20">
            <div className="space-y-8">
              <div className="font-mono text-[#4facfe] text-xs tracking-[0.4em] uppercase font-bold flex items-center gap-4">
                <div className="w-2 h-2 bg-[#4facfe] animate-pulse shadow-[0_0_10px_rgba(79,172,254,0.8)]" />
                System Integration
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                ALL AI INTEGRATIONS & AUTOMATIONS ARE INCLUDED
              </h2>
              <p className="font-sans text-white/60 text-lg leading-relaxed">
                Seamlessly connected to enterprise services, communication channels, and advanced automation webhooks for absolute operational freedom.
              </p>
              
              <div className="space-y-2 mt-8">
                {INTEGRATION_CATEGORIES.map((cat) => (
                  <div key={cat.title} className="border border-white/10 bg-[#05101a]/50 rounded-lg overflow-hidden transition-colors hover:border-[#4facfe]/30">
                    <button 
                      className="w-full text-left px-5 py-4 font-mono text-[10px] uppercase tracking-widest flex items-center justify-between group"
                      onClick={(e) => {
                        const content = e.currentTarget.nextElementSibling;
                        if (content) {
                          content.classList.toggle('hidden');
                          e.currentTarget.querySelector('svg')?.classList.toggle('rotate-180');
                        }
                      }}
                    >
                      <span className="text-[#4facfe] leading-none">{cat.title}</span>
                      <ChevronDown className="w-4 h-4 text-white/40 transition-transform duration-300 group-hover:text-white" />
                    </button>
                    <div className="hidden px-5 pb-5 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {cat.services.map(s => (
                          <span key={s} className="px-3 py-1.5 bg-[#4facfe]/5 border border-[#4facfe]/20 rounded text-[10px] font-mono text-white/60 uppercase tracking-wider">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .styled-scrollbars::-webkit-scrollbar {
          width: 4px;
        }
        .styled-scrollbars::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .styled-scrollbars::-webkit-scrollbar-thumb {
          background: rgba(79, 172, 254, 0.2);
          border-radius: 4px;
        }
        .styled-scrollbars:hover::-webkit-scrollbar-thumb {
          background: rgba(79, 172, 254, 0.5);
        }
        @keyframes floatStd {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(1.2deg); }
        }
        .floating-icon-std {
          animation: floatStd 4.2s infinite ease-in-out;
        }
        .floating-icon-delayed {
          animation: floatDelayed 4.8s infinite ease-in-out;
          animation-delay: 0.6s;
        }
        .floating-icon-fast {
          animation: floatFast 3.4s infinite ease-in-out;
        }
        @keyframes slideDash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}} />
    </section>
  );
};

export default Pricing;

