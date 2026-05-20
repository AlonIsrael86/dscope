export const SECTOR_AUTOMATIONS: Record<string, { id: string, title: string, desc: string, type: string }[]> = {
  "Insurance": [
    { "id": "1", "title": "Automated Claims Processing", "desc": "Neural verification of damage and cost estimation", "type": "Agent" },
    { "id": "2", "title": "Fraud Detection", "desc": "Anomaly detection via historical pattern matching", "type": "API" },
    { "id": "3", "title": "Risk Assessment Agent", "desc": "Dynamic risk scoring based on real-time data", "type": "Agent" },
    { "id": "4", "title": "Customer Onboarding", "desc": "Automated document verification and risk classification", "type": "Agent" },
    { "id": "5", "title": "Policy Personalization", "desc": "Tailoring policies using AI-driven customer profiling", "type": "API" },
    { "id": "6", "title": "Underwriting Automation", "desc": "Machine learning for faster, accurate underwriting", "type": "Agent" }
  ],
  "Global Delivery": [
    { "id": "1", "title": "Route Optimization", "desc": "Dynamic routing based on traffic and weather", "type": "API" },
    { "id": "2", "title": "Predictive Maintenance", "desc": "IoT sensors predicting vehicle failure before it happens", "type": "Agent" },
    { "id": "3", "title": "Demand Forecasting", "desc": "AI predicting inventory needs across nodes", "type": "API" },
    { "id": "4", "title": "Automated Dispatching", "desc": "Assigning loads to drivers based on hours of service", "type": "Agent" },
    { "id": "5", "title": "Freight Rate Prediction", "desc": "Dynamic pricing for spot market freight", "type": "API" },
    { "id": "6", "title": "Customs Clearance", "desc": "NLP mapping documentation for border crossing", "type": "Agent" }
  ],
  "Strategic Mgmt": [
    { "id": "1", "title": "Competitor Analysis", "desc": "Real-time tracking of competitor pricing and strategies", "type": "Agent" },
    { "id": "2", "title": "Market Sentiment", "desc": "Analyzing public data for brand perception shifts", "type": "API" },
    { "id": "3", "title": "Resource Allocation", "desc": "Dynamic budget and personnel distribution across projects", "type": "Agent" },
    { "id": "4", "title": "Risk Mitigation", "desc": "Continuous modeling of geopolitical and market risks", "type": "API" },
    { "id": "5", "title": "Predictive KPIs", "desc": "Forecasting future performance metrics based on current trends", "type": "Agent" },
    { "id": "6", "title": "Reporting Automation", "desc": "Natural language generation of executive summaries", "type": "API" }
  ],
  "Financial Ops": [
    { "id": "1", "title": "Algorithmic Trading", "desc": "High-frequency trade execution based on market data", "type": "Agent" },
    { "id": "2", "title": "Liquidity Management", "desc": "Dynamic treasury management and fund allocation", "type": "API" },
    { "id": "3", "title": "KYC/AML Compliance", "desc": "Automated background checks and transaction monitoring", "type": "Agent" },
    { "id": "4", "title": "Fraud Prevention", "desc": "Real-time transaction scoring to block anomalies", "type": "API" },
    { "id": "5", "title": "Portfolio Rebalancing", "desc": "Robo-advisory for automatic asset reallocation", "type": "Agent" },
    { "id": "6", "title": "Credit Risk Scoring", "desc": "AI models for instant credit approval processing", "type": "API" }
  ],
  "Learning": [
    { "id": "1", "title": "Personalized Curriculum", "desc": "Adapts learning materials based on student progress", "type": "Agent" },
    { "id": "2", "title": "Automated Grading", "desc": "NLP-based evaluation of free-text student responses", "type": "API" },
    { "id": "3", "title": "Engagement Tracker", "desc": "Analyzes participation metrics to flag at-risk students", "type": "API" },
    { "id": "4", "title": "Virtual Tutoring Bot", "desc": "24/7 conversational agent for subject matter assistance", "type": "Agent" },
    { "id": "5", "title": "Enrollment Processing", "desc": "Streamlining admissions via intelligent document parsing", "type": "API" },
    { "id": "6", "title": "Plagiarism Detection", "desc": "Cross-referencing submissions against global databases", "type": "Agent" }
  ],
  "Factory Processes": [
    { "id": "1", "title": "Predictive Diagnosis", "desc": "Vibration analysis for early machine failure detection", "type": "Agent" },
    { "id": "2", "title": "Quality Control", "desc": "High-speed camera analysis of defects on assembly line", "type": "Agent" },
    { "id": "3", "title": "Setup Configuration", "desc": "Dynamic recalibration of CNC machines between batches", "type": "API" },
    { "id": "4", "title": "Supply Chain Sync", "desc": "Real-time inventory ordering integration", "type": "API" },
    { "id": "5", "title": "Collaborative Robotics", "desc": "AI-driven task sharing with human workers", "type": "Agent" },
    { "id": "6", "title": "Energy Optimization", "desc": "Microsecond adjustments to power draw", "type": "Agent" }
  ],
  "Food & Beverage": [
    { "id": "1", "title": "Supply Chain Traceability", "desc": "Ledger-verified sourcing from farm to table", "type": "API" },
    { "id": "2", "title": "Quality Assurance", "desc": "Vision systems inspecting produce freshness", "type": "Agent" },
    { "id": "3", "title": "Demand Sync Ordering", "desc": "Predictive restocking based on shelf depletion rates", "type": "API" },
    { "id": "4", "title": "Recipe Engine", "desc": "AI balancing cost and nutritional parameters", "type": "Agent" },
    { "id": "5", "title": "Robotic Assembly", "desc": "High-speed automated food packaging and sorting", "type": "Agent" },
    { "id": "6", "title": "Cold Chain Monitoring", "desc": "Real-time temperature alerts across distribution", "type": "API" }
  ],
  "Shipping & Freight": [
    { "id": "1", "title": "Transport Optimizer", "desc": "Dynamic routing based on shipping routes", "type": "API" },
    { "id": "2", "title": "Vessel Management", "desc": "IoT data collecting tracking information", "type": "Agent" },
    { "id": "3", "title": "Capacity Analytics", "desc": "AI predicting load capacity utilization", "type": "API" },
    { "id": "4", "title": "Automated Check-ins", "desc": "Managing warehouse unloading schedules", "type": "Agent" },
    { "id": "5", "title": "Variable Load Pricing", "desc": "Real-time pricing for freight exchanges", "type": "API" },
    { "id": "6", "title": "Port Operations", "desc": "NLP classification of port clearances", "type": "Agent" }
  ],
  "Construction": [
    { "id": "1", "title": "Site Surveying", "desc": "Automated topography mapping analysis", "type": "Agent" },
    { "id": "2", "title": "BIM Reviewer", "desc": "Identifying structural compliance and integrity", "type": "API" },
    { "id": "3", "title": "Material Tracking", "desc": "IoT-based location and utilization tracking", "type": "API" },
    { "id": "4", "title": "Generative Design", "desc": "Algorithmically optimizing structural elements", "type": "Agent" },
    { "id": "5", "title": "Supply Synchronization", "desc": "JIT delivery scheduling based on project phase", "type": "API" },
    { "id": "6", "title": "Safety Monitor", "desc": "Computer vision flagging potential hazards", "type": "Agent" }
  ],
  "Healthcare": [
    { "id": "1", "title": "Imaging Diagnostic", "desc": "AI processing of imaging for anomaly detection", "type": "Agent" },
    { "id": "2", "title": "EHR Extraction", "desc": "NLP for pulling structured data from notes", "type": "API" },
    { "id": "3", "title": "Patient Triage", "desc": "Symptom and automated routing to departments", "type": "Agent" },
    { "id": "4", "title": "Clinical Trial Match", "desc": "Finding eligible matches based on criteria", "type": "API" },
    { "id": "5", "title": "Drug Analytics", "desc": "Predicting interactions to discover variations", "type": "Agent" },
    { "id": "6", "title": "Prescription Renewals", "desc": "Reviewing data for safe authorizations", "type": "Agent" }
  ],
  "Real Estate": [
    { "id": "1", "title": "Valuation Model", "desc": "Dynamic pricing based on hyper-local data", "type": "API" },
    { "id": "2", "title": "Smart Leasing", "desc": "Automated execution for rental tasks", "type": "Agent" },
    { "id": "3", "title": "Virtual Staging", "desc": "Design rendering for vacant units", "type": "API" },
    { "id": "4", "title": "Property Maintenance", "desc": "IoT sensors identifying potential system issues", "type": "Agent" },
    { "id": "5", "title": "Lead Qualifying Bot", "desc": "Conversational interactions with prospects", "type": "Agent" },
    { "id": "6", "title": "Risk Analytics", "desc": "Assessing market risk across portfolios", "type": "API" }
  ],
  "Energy Grid": [
    { "id": "1", "title": "Demand Response", "desc": "Automated load balancing during consumption peaks", "type": "Agent" },
    { "id": "2", "title": "Renewable Forecaster", "desc": "Predicting generation output changes", "type": "API" },
    { "id": "3", "title": "Grid Anomaly Check", "desc": "Identifying micro-fluctuations in load distribution", "type": "Agent" },
    { "id": "4", "title": "Meter Processing", "desc": "High-throughput parsing of distributed consumption data", "type": "API" },
    { "id": "5", "title": "Node Distribution", "desc": "Evaluating power delivery allocations", "type": "Agent" },
    { "id": "6", "title": "Predictive Faults", "desc": "Acoustic and thermal anomaly tracking", "type": "API" }
  ],
  "Agriculture": [
    { "id": "1", "title": "Irrigation Control", "desc": "Automated distribution based on moisture limits", "type": "Agent" },
    { "id": "2", "title": "Disease Identifier", "desc": "Vision detection distinguishing crop anomalies", "type": "Agent" },
    { "id": "3", "title": "Yield Processor", "desc": "Forecasting harvest volume based on input variables", "type": "API" },
    { "id": "4", "title": "Autonomous Coordination", "desc": "Guidance integration without operator input", "type": "Agent" },
    { "id": "5", "title": "Harvest Logistics", "desc": "Data ledger updating status to distribution", "type": "API" },
    { "id": "6", "title": "Sorting Classification", "desc": "Vision pipeline reviewing product quality", "type": "Agent" }
  ],
  "Retail & Commerce": [
    { "id": "1", "title": "Pricing Engine", "desc": "Algorithmic adjustments responding to market state", "type": "API" },
    { "id": "2", "title": "Recommendation Node", "desc": "Real-time filtering determining relevancy", "type": "Agent" },
    { "id": "3", "title": "Inventory Restocking", "desc": "Predictive planning matching physical capacity", "type": "API" },
    { "id": "4", "title": "Virtual Fulfillment", "desc": "Warehouse sorting routing management", "type": "Agent" },
    { "id": "5", "title": "Customer Intent", "desc": "NLP evaluation of engagement feedback", "type": "API" },
    { "id": "6", "title": "Checkout Processing", "desc": "Autonomous detection confirming item tracking", "type": "Agent" }
  ],
  "Automotive": [
    { "id": "1", "title": "Autonomous Pathways", "desc": "Neural calculation determining safe trajectory", "type": "Agent" },
    { "id": "2", "title": "OTA Orchestrator", "desc": "Automated deployments pushing to target networks", "type": "API" },
    { "id": "3", "title": "Component Forecast", "desc": "Predictive models estimating system degradation", "type": "API" },
    { "id": "4", "title": "Assembly Vision", "desc": "High-fidelity scan detecting visual anomalies", "type": "Agent" },
    { "id": "5", "title": "Telemetry Integration", "desc": "High-throughput stream collecting operational packets", "type": "API" },
    { "id": "6", "title": "Fatigue Analytics", "desc": "Infrared processing interpreting driver states", "type": "Agent" }
  ],
  "Entertainment": [
    { "id": "1", "title": "Render Balancing", "desc": "Dynamic scaling shifting resources as needed", "type": "API" },
    { "id": "2", "title": "Viewer Trend Analysis", "desc": "Evaluating metrics projecting potential popularity", "type": "Agent" },
    { "id": "3", "title": "Media Indexing", "desc": "Metadata extraction evaluating property rights", "type": "Agent" },
    { "id": "4", "title": "Synthesis Node", "desc": "Voice transformation applied for localizations", "type": "API" },
    { "id": "5", "title": "Content Reviewer", "desc": "Scan pipeline filtering invalid assets over time", "type": "Agent" },
    { "id": "6", "title": "Curation Engine", "desc": "Feed algorithm establishing user preferences", "type": "API" }
  ],
  "Telecomm": [
    { "id": "1", "title": "Traffic Shaper", "desc": "Dynamic resolution ensuring bandwidth stability", "type": "Agent" },
    { "id": "2", "title": "Tower Maintenance", "desc": "IoT diagnostics testing critical hardware integrity", "type": "API" },
    { "id": "3", "title": "Provisioning Engine", "desc": "Zero-touch pipeline establishing connections", "type": "API" },
    { "id": "4", "title": "Filter Diagnostics", "desc": "NLP screening incoming queries avoiding issues", "type": "Agent" },
    { "id": "5", "title": "Allocation Nodes", "desc": "Coordinating frequency exchanges actively", "type": "Agent" },
    { "id": "6", "title": "Churn Analyzer", "desc": "Model highlighting behavioral shifts proactively", "type": "API" }
  ],
  "Pharma": [
    { "id": "1", "title": "Discovery Processing", "desc": "Predicting interactions to advance evaluations", "type": "Agent" },
    { "id": "2", "title": "Trial Integration", "desc": "Searching for valid combinations securely", "type": "API" },
    { "id": "3", "title": "Sequencing Engine", "desc": "Data pipeline isolating relevant structures", "type": "API" },
    { "id": "4", "title": "Regulatory Review", "desc": "Formatting documents ensuring compliance formatting", "type": "Agent" },
    { "id": "5", "title": "Quality Vision", "desc": "Visual verification identifying physical inconsistencies", "type": "Agent" },
    { "id": "6", "title": "Supply Diagnostics", "desc": "Tracking logs to protect sensitive cargo safely", "type": "API" }
  ],
  "Aerospace": [
    { "id": "1", "title": "Telemetry Analysis", "desc": "Real-time detection filtering signal noise", "type": "Agent" },
    { "id": "2", "title": "Engine Diagnostics", "desc": "Forecasting mechanical wear based on conditions", "type": "API" },
    { "id": "3", "title": "Trajectory Control", "desc": "Adjusting variables finding optimal pathways", "type": "Agent" },
    { "id": "4", "title": "Constellation Mapping", "desc": "Autonomous spatial coordination reducing risk", "type": "Agent" },
    { "id": "5", "title": "Traffic Flow Manager", "desc": "Data aggregation organizing safe airspace usage", "type": "API" },
    { "id": "6", "title": "Material Modeling", "desc": "Simulations indicating potential stress fractures", "type": "API" }
  ],
  "Social Management": [
    { "id": "1", "title": "Moderation Filter", "desc": "Processing input avoiding prohibited content distribution", "type": "Agent" },
    { "id": "2", "title": "Trend Processing", "desc": "Analysis of data metrics revealing user patterns", "type": "API" },
    { "id": "3", "title": "Identity Verification", "desc": "Confirmation comparing data against known ledgers", "type": "API" },
    { "id": "4", "title": "Content Distributor", "desc": "Injecting diversified viewpoints actively to profiles", "type": "Agent" },
    { "id": "5", "title": "Behavior Identifier", "desc": "Heuristics evaluating user intent effectively", "type": "Agent" },
    { "id": "6", "title": "Match Recommendation", "desc": "Connecting variables revealing similar interests", "type": "API" }
  ],
  "Cyber Security": [
    { "id": "1", "title": "Threat Detection", "desc": "Behavioral analytics targeting unknown anomalies", "type": "Agent" },
    { "id": "2", "title": "Incident Responder", "desc": "Autonomous execution protecting central infrastructure", "type": "Agent" },
    { "id": "3", "title": "Simulation Module", "desc": "Generating environments to assess internal training", "type": "API" },
    { "id": "4", "title": "Penetration Tester", "desc": "Red-team protocols validating security walls", "type": "Agent" },
    { "id": "5", "title": "Log Analyzer", "desc": "High-throughput system sorting critical alerts", "type": "API" },
    { "id": "6", "title": "Access Management", "desc": "Dynamic scaling limiting credential levels securely", "type": "API" }
  ],
  "Legal Discovery": [
    { "id": "1", "title": "Lifecycle Automator", "desc": "Generation of legal documents securely verifying format", "type": "Agent" },
    { "id": "2", "title": "E-Discovery NLP", "desc": "Locating relevant phrases efficiently indexing archives", "type": "API" },
    { "id": "3", "title": "Regulatory Alert", "desc": "Status updates mapping changes seamlessly over time", "type": "Agent" },
    { "id": "4", "title": "Redaction Engine", "desc": "Evaluating files to mask sensitive PII effectively", "type": "Agent" },
    { "id": "5", "title": "Diligence Scraper", "desc": "Scanning directories isolating liability clauses", "type": "API" },
    { "id": "6", "title": "Citation Assistant", "desc": "Semantic queries indexing historical rulings correctly", "type": "Agent" }
  ],
  "Public Sector": [
    { "id": "1", "title": "Traffic Orchestrator", "desc": "Dynamic signal adjustments resolving city congestion", "type": "Agent" },
    { "id": "2", "title": "Audit Processing", "desc": "Identifying document deviations efficiently", "type": "API" },
    { "id": "3", "title": "Transit Routing", "desc": "Calculations reorganizing paths based on demand data", "type": "API" },
    { "id": "4", "title": "Emergency Dispatch", "desc": "Pathfinding algorithms directing responders safely", "type": "Agent" },
    { "id": "5", "title": "Defect Vision", "desc": "Visual processing locating structural degradation", "type": "Agent" },
    { "id": "6", "title": "Permit Verifier", "desc": "Evaluating structural proposals against zoning rules", "type": "API" }
  ],
  "Mining & Resources": [
    { "id": "1", "title": "Haulage Autonomy", "desc": "Self-driving navigation routing ore effectively", "type": "Agent" },
    { "id": "2", "title": "Strata Calculation", "desc": "Interpreting subterranean data discovering points", "type": "API" },
    { "id": "3", "title": "Equipment Diagnostic", "desc": "Sensor compilation predicting likely component loss", "type": "API" },
    { "id": "4", "title": "Ventilation Scaling", "desc": "Dynamic airflow adjustments based on activity", "type": "Agent" },
    { "id": "5", "title": "Structure Integrity", "desc": "Data integration verifying structural endurance", "type": "Agent" },
    { "id": "6", "title": "Grade Processing", "desc": "Visual detection confirming material extraction levels", "type": "API" }
  ]
};
