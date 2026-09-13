import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import svgPaths from "@/components/svg-6elc3cwcuu";

type SkillCategoryId =
  | "finance"
  | "technical"
  | "research"
  | "communication"
  | "other";
type BootPhase = "idle" | "powering-on" | "booting" | "revealing" | "done";

// ===== SITE / BRAND SETTINGS =====
// Edit displayName, subtitle, bootPortfolioName, bootIconImage, bootIconAlt.
const PORTFOLIO_DATA = {
  site: {
    displayName: "Charles Davis",
    subtitle: "Financial Services",
    bootPortfolioName: "CHARLES DAVIS PORTFOLIO",
    bootIconImage: "../assets/images/boot/bootlogo.jpg",
    bootIconAlt: "Portfolio icon",
  },

  // ===== ABOUT ME =====
  // Edit name, focus, roleSubtitle, profileImage, profileImageAlt,
  // introduction, interests, location.
  aboutMe: {
    name: "Charles Davis",
    focus: "Financial Services",
    roleSubtitle: "Student · Oxford, UK",
    profileImage: "../assets/images/aboutme/profile.jpg",
    profileImageAlt: "Charles Davis profile photo",
    introduction: `I'm a student driven by curiosity and a passion 
      for tackling challenging problems by turning ideas into useful, 
      real-world projects. When I'm not working on finance-focused 
      work, you can usually find me brewing a great cup of coffee. `,
    interests: "Coffee, Tennis, Jazz, Watch making, Piano, Guitar, Cornet",
    location: "Oxford, UK",
  },

  // ===== PROJECTS =====
  // Each project has a unique id. Copy a complete object to add another project.
  // id must remain unique. title appears in the menu and detail page.
  // Edit image paths only inside each object (previewImage, detailImage).
  // Set linkUrl: "" to hide the link button.
  projects: [
    {
      id: "proj-4",
      title: "Shell / Kosmos Energy M&A Pitch",
      category: "M&A / Corporate Finance",
      date: "Apr 2026",
      summary: `Comprehensive pitch and valuation deck for Shell's proposed 100% acquisition of Kosmos Energy.`,
      objective: `Analyzed potential acquisition targets for Shell with an explicit focus on LNG-exposed markets in West Africa, 
        addresssing the strategic need to strengthen deepwater/LNG positioning where Shell had limited presence.`,
      role: "M&A Analyst / Pitch Team Leader",
      approach: `Screened targets across LNG-exposed markets | Selected Kosmos Energy as key opportunity | 
        Built DCF valuation & WACC models | Conducted Comparable Company Analysis | 
        Calculated synergy ramps & pro forma EPS accretion | Modeled 35% cash / 40% debt / 25% equity financing mix`,
      tools: "Excel · Powerpoint · Teams · Python",
      output: `100% share acquisition pitch at $3.20/share ($1.52bn equity value) | +33.1% Year 1 pro forma EPS accretion | 
        $169m/yr net synergies by Year 3 | Complete presentation deck covering strategic rationale, valuation, and transaction terms`,
      skills:
        "DCF Modeling · Valuation · Comparable Company Analysis · Quantitative Screening · Presentation & Pitching · Cross-Functional Collaboration",
      linkLabel: "View Project",
      linkUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7442609267691409408/",
      keywords:
        "M&A valuation DCF comparable company analysis pitch deck energy corporate finance Shell Kosmos Energy leverage synergies LNG exposed markets",
      previewImage: "../assets/images/projects/m&a2026preview.jpg",
      previewImageAlt: "M&A 2026 preview",
      detailImage1: "../assets/images/projects/m&a2026detailed1.jpg",
      detailImage1Alt: "M&A 2026 detailed image 1",
      detailImage2: "../assets/images/projects/m&a2026detailed2.jpg",
      detailImage2Alt: "M&A 2026 detailed image 2",
      detailImage3: "../assets/images/projects/m&a2026detailed3.jpg",
      detailImage3Alt: "M&A 2026 detailed image 3",
      imageBg: "#dde6f8",
      imageAccent: "#1a5faa",
    },
    {
      id: "proj-3",
      title: "Hack London 2026 - Organise My Career",
      category: "Fintech & Software Engineering",
      date: "Feb 2026",
      summary:
        "Mobile and desktop application built in 25 hours during Hack London to generate personalized career roadmaps and daily actionable tasks.",
      objective: `Addressed Knowunity's hackathon prompt by engineering an end-to-end career guidance platform designed to map out structured progression 
        routes and daily micro-habits for ambitious students and professionals.`,
      role: "Full-Stack Developer / Hackathon Co-Leader",
      approach: `Engineered 25-question career diagnostic quiz | Architected custom roadmap generation logic based on user background and targets | 
        Integrated cross-platform UI with dual Python & PHP backend architecture | Designed interactive dashboard featuring checkable milestones and integrated calendar task tracking`,
      tools: "Flutter · Dart · Python · PHP · Git",
      output: `Fully deployable cross-platform app delivered in 25-hour timeframe | 
        Built complete career diagnostic engine, interactive dashboard, roadmap tracker, and daily task calendar | Tested and validated with peer feedback at Hack London`,
      skills:
        "Full-Stack Development · Mobile & Desktop Architecture · Rapid Prototyping · Algorithmic Roadmapping · User Experience Design · Team Collaboration",
      linkLabel: "View Project",
      linkUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7434300770025586688/",
      keywords:
        "Hackathon Hack London Flutter Dart Python PHP career roadmap software engineering full stack cross platform Knowunity UCL King's College London",
      previewImage: "../assets/images/projects/hacklondon2026preview.jpg",
      previewImageAlt: "Hack London 2026 preview",
      detailImage1: "../assets/images/projects/hacklondon2026detailed1.jpg",
      detailImage1Alt: "Hack London 2026 detailed image 1",
      detailImage2: "../assets/images/projects/hacklondon2026detailed2.jpg",
      detailImage2Alt: "Hack London 2026 detailed image 2",
      detailImage3: "../assets/images/projects/hacklondon2026detailed3.jpg",
      detailImage3Alt: "Hack London 2026 detailed image 3",
      imageBg: "#eaf2f8",
      imageAccent: "#2b5c8f",
    },
  ],

  // ===== EXPERIENCE =====
  // Each experience item has a unique id. Copy a complete object to add another.
  // id must remain unique. menuTitle is shown in the menu and breadcrumb.
  // Edit image paths only inside each object (previewImage, detailImage).
  // Set linkUrl: "" to hide the link button.
  experience: [
    {
      id: "exp-3",
      menuTitle: "PwC Valuations Intern",
      organisation: "PwC",
      roleTitle: "Valuations Intern",
      dates: "Aug 2026",
      location: "London, UK",
      overview: `A placement with the London Valuations team, specialising in derivatives and private credit valuation, 
        additionally working with EURI (Energy Utilities Research & Infrastructure) Valuations team.`,
      responsibilities: `DCF Modelling for private credit agreements | Derivatives valuation and client comparison | Sensitivity analysis |
        Market research and report writing | Lease schedule validation`,
      achievements: `Built a DCF model for a €49m, 7-year EUR junior facility agreement |
        Valued 3 GBP-collateralised itnerest rate swaps with a notional value of £50m and an aggregate valuation of £11m |
        Traced and corrected a £300k lease schedule discrepancy across right-of-use assets, lease liabilities and prepayments |
        Performed interest-rate and inflation sensitivity analysis for a £5bn equity value infrastructure client`,
      relevance: `Demonstrates advanced hands-on experience with industry level financial modeling, financial techniques, and 
        complex transaction analysis within a Big 4 environmnet. Highlights strong analytical precision and modelling 
        rigourousness for multi-million pound client engagements`,
      skills: `Financial Modeling · Valuation · Derivatives · Private Credit · Market Research · DCF · Sensitivity Analysis`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "pwc valuation private credit intern finance analysis london modeling ",
      previewImage: "../assets/images/experience/pwcpreview.jpg",
      previewImageAlt: "",
      detailImage: "../assets/images/experience/pwcdetailed.jpg",
      detailImageAlt: "",
      imageBg: "#f8ead8",
      imageAccent: "#aa6010",
    },
    {
      id: "exp-2",
      menuTitle: "IEUK Internship Experience",
      organisation: "Bright Network",
      roleTitle: "Internship Experience UK (Finance)",
      dates: "Jun 2026",
      location: "Remote, UK",
      overview: `A finance and consulting project focused on evaluating an AI-driven credit decisioning system for a UK unsecured personal 
        loan lender, featuring industry insights from Bank of America, Deloitte, and Smith & Williamson.`,
      responsibilities: `Financial Viability Analysis | AI vs. Legacy Model Comparison | Regulatory & Compliance Research | 
        Risk Identification & Mitigation | Peer Review & Feedback`,
      achievements: `Evaluated financial viability of an AI lending model using scenario and sensitivity analysis across approval rates, default rates, and loan book growth |
        Compared a £225m AI-generated loan book against a £190m legacy model to quantify incremental growth and profitability |
        Researched FCA and GDPR compliance standards for AI credit decisioning to ensure regulatory alignment |
        Identified key model risks including explainability, bias, data privacy, and regulatory breach risks`,
      relevance: `Demonstrates practical exposure to retail lending, credit risk analysis, and regulatory compliance. 
        Combines hands-on financial evaluation with commercial awareness gained from leading global financial institutions and Big 4 firms.`,
      skills: `Financial Analysis · Sensitivity Analysis · Credit Risk · AI Decisioning · Regulatory Compliance · FCA · GDPR · Banking`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "bright network ieuk credit risk ai lending financial analysis fca compliance fintech remote bank of america deloitte",
      previewImage: "../assets/images/experience/IEUKpreview.jpg",
      previewImageAlt: "",
      detailImage: "../assets/images/experience/IEUKdetailed.jpg",
      detailImageAlt: "",
      imageBg: "#f8f0d8",
      imageAccent: "#8a7010",
    },
    {
      id: "exp-1",
      menuTitle: "UBS Business Insight",
      organisation: "UBS",
      roleTitle: "Business Insight Programme Participant",
      dates: "Mar 2026",
      location: "Remote, UK",
      overview: `A six-session selective insight programme exploring division operations across UBS, focusing on market analysis, 
        multi-division synergy, and high-net-worth portfolio management strategies.`,
      responsibilities: `Division Overview & Operations Analysis | Market Indicator Interpretation | Multi-Division Cross-Collaboration | 
        Group Portfolio Management Assessment`,
      achievements: `Completed an intensive 6-session programme covering Global Markets, Investment Banking, Research, Wealth Management, Asset Management, and Group Functions |
        Developed a detailed strategic allocation and management assessment for a £100m Ultra-High-Net-Worth (UHNW) client portfolio in a team environment |
        Analysed how UBS Global Research analysts evaluate macroeconomic market indicators to build actionable investment outlooks`,
      relevance: `Demonstrates broad commercial understanding of front-office divisions within a premier global bulge-bracket bank, 
        alongside hands-on exposure to asset allocation strategy and UHNW wealth management dynamics.`,
      skills: `Wealth Management · Asset Management · Global Markets · Investment Banking · Market Analysis · Portfolio Allocation`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "ubs wealth management asset management global markets investment banking research portfolio uhnw london finance",
      previewImage: "../assets/images/experience/ubspreview.jpg",
      previewImageAlt: "",
      detailImage: "../assets/images/experience/ubsdetailed.jpg",
      detailImageAlt: "",
      imageBg: "#f8f0d8",
      imageAccent: "#8a7010",
    },
    {
      id: "exp-6",
      menuTitle: "Millets Farm Staff",
      organisation: "Millets Farm Centre",
      roleTitle: "Customer Service & Operations Assistant",
      dates: "Jul 2023 - Jan 2025",
      location: "Oxfordshire, UK",
      overview: `A high-volume customer-facing role managing daily operations, event hosting, and leisure activities while 
        training personnel and driving setup efficiency improvements.`,
      responsibilities: `Staff Training & Process Optimization | High-Volume Customer Service | Event & Party Management | 
        Multi-Facility Kiosk Operations | Admissions & Inventory Oversight`,
      achievements: `Trained 4 new team members and streamlined facility setup protocols, directly reducing operational changeover times |
        Delivered customer service to 500+ daily visitors across varied facilities including admissions, mini-golf, event hosting, and seasonal farm operations |
        Earned repeated management recognition for operational efficiency, leadership, and service excellence`,
      relevance: `Highlights foundational transferable skills for fast-paced professional environments, including team leadership, 
        operational process optimization, adaptability, and high-volume stakeholder communication.`,
      skills: `Operations Management · Process Improvement · Team Training · Customer Service · Event Management · Communication`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "millets farm operations leadership staff training customer service process improvement team management",
      previewImage: "../assets/images/experience/milletspreview.jpg",
      previewImageAlt: "",
      detailImage: "../assets/images/experience/milletsdetailed.jpg",
      detailImageAlt: "",
      imageBg: "#f8f0d8",
      imageAccent: "#8a7010",
    },
    {
      id: "exp-7",
      menuTitle: "NERC Consultancy Intern",
      organisation: "NERC",
      roleTitle: "Consultancy Intern",
      dates: "Aug 2024 - Sep 2024",
      location: "Swindon, UK",
      overview: `A strategic consulting engagement focused on designing and implementing a quantitative project evaluation 
        framework to allocate £37m in capital expenditure across net-zero carbon infrastructure projects.`,
      responsibilities: `Capital Allocation Framework Design | Weighted Scoring Methodology | Financial & Impact Modeling | 
        Strategic Project Evaluation | Stakeholder Presentation`,
      achievements: `Developed, refined, and presented an investment assessment framework to screen and shortlist 160 net-zero carbon projects competing for a £37m funding pool |
        Designed and automated a proportional scoring and ranking model in Excel evaluating carbon benefit, cost efficiency, delivery certainty, innovation, and scalability |
        Co-authored project selection principles and weighted scoring methodologies aligned with NERC's strategic carbon pathway objectives`,
      relevance: `Demonstrates quantitative framework development, capital budgeting, and structured decision-making skills 
        directly transferable to ESG investing, private equity, infrastructure finance, and corporate strategy.`,
      skills: `Capital Allocation · Financial Modeling · ESG Investing · Project Evaluation · Excel Automation · Strategic Consulting · Data Analysis`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "nerc consultancy capital allocation net zero ESG investment framework quantitative modeling swindon finance",
      previewImage: "../assets/images/experience/nercpreview.jpg",
      previewImageAlt: "NERC Consultancy Internship Preview",
      detailImage: "../assets/images/experience/nercdetailed.jpg",
      detailImageAlt: "NERC Consultancy Project Details",
      imageBg: "#e8f4f8",
      imageAccent: "#006680",
    },
    {
      id: "exp-8",
      menuTitle: "UKCEH Insight Week",
      organisation: "UKCEH",
      roleTitle: "Digital & Data Insight Participant",
      dates: "Aug 2024",
      location: "Wallingford, UK",
      overview: `An immersive insight week working alongside the digital transformation team to review large-scale environmental 
        databases, assess cloud migration strategies, and study enterprise project management frameworks.`,
      responsibilities: `Database Evaluation & UX Optimization | Cloud Migration Strategy Discussions | Program Management & Risk Review | 
        Financial Reporting Cycle Analysis`,
      achievements: `Evaluated a legacy hydrology database spanning nearly 300 years of historical data to recommend UX and accessibility enhancements for public representation |
        Collaborated with the Head of Digital to analyze strategic execution plans for data cleaning, cloud migration, and open data delivery |
        Participated in integrated program management and change control meetings to examine large-scale delivery methodologies and risk frameworks`,
      relevance: `Highlights data architecture awareness, digital strategy, and exposure to institutional risk management and 
        financial reporting cycles—key foundations for fintech, technology coverage in investment banking, and quantitative analysis.`,
      skills: `Data Analytics · Digital Strategy · UX Optimization · Risk Management · Project Management · Change Control · Financial Reporting`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "ukceh insight digital strategy database analytics cloud migration risk management wallingford data finance",
      previewImage: "../assets/images/experience/ukcehpreview.jpg",
      previewImageAlt: "UKCEH Insight Week Preview",
      detailImage: "../assets/images/experience/ukcehdetailed.jpg",
      detailImageAlt: "UKCEH Insight Project Details",
      imageBg: "#e3f2fd",
      imageAccent: "#1565c0",
    },
    {
      id: "exp-9",
      menuTitle: "McLaren Racing Insight",
      organisation: "McLaren Racing",
      roleTitle: "Aerodynamics Insight Participant",
      dates: "Jul 2024 - Aug 2024",
      location: "Woking, UK",
      overview: `An engineering insight placement at McLaren Technology Centre, focused on aerodynamic optimization, 
        high-frequency big data analytics, mechanical assembly reconfigurations, and Formula 1 track telemetry evaluation.`,
      responsibilities: `Big Data Aerodynamic Analysis | Wind-Tunnel Model Reconfiguration | CFD Plane & Telemetry Debriefs | 
        Cross-Functional Engineering Collaboration`,
      achievements: `Processed and analyzed 500m+ wind-tunnel pressure-sensor data points in Python to isolate aerodynamic drag and downforce optimization opportunities |
        Reconfigured the 60%-scale 2025 F1 car model's suspension assembly and brake-drum shrouds for high-velocity wind-tunnel testing protocols |
        Participated in the Hungarian Grand Prix post-race data debrief, synthesizing CFD pressure planes, track photography, and telemetry to evaluate track-specific aerodynamic performance`,
      relevance: `Demonstrates elite quantitative rigour, big data processing capacity, and rapid-cycle technical optimization within a 
        world-class high-performance engineering environment—directly applicable to quantitative finance, risk modeling, and trading.`,
      skills: `Data Analytics · Quantitative Analysis · Data Processing · Telemetry Analysis · Technical Problem Solving · CFD Modeling · High-Performance Engineering`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "mclaren racing formula 1 analytics big data aerodynamics quantitative analysis engineering telemetry woking",
      previewImage: "../assets/images/experience/mclarenpreview.jpg",
      previewImageAlt: "McLaren Racing Insight Preview",
      detailImage: "../assets/images/experience/mclarendetailed.jpg",
      detailImageAlt: "McLaren Racing Project Details",
      imageBg: "#fff3e0",
      imageAccent: "#ff6d00",
    },
    {
      id: "exp-10",
      menuTitle: "Createc Research Intern",
      organisation: "Createc",
      roleTitle: "Research Intern",
      dates: "Jul 2024",
      location: "Oxford, UK",
      overview: `A technology research and strategic bidding internship focused on evaluating precision agriculture robotics, nuclear 
        decommissioning innovations, and automated infrastructure maintenance solutions.`,
      responsibilities: `Precision Agriculture Technology Research | Commercial Bid Presentations | Cost-Benefit & Impact Analysis | 
        Robotics & Infrastructure Strategy Discussions`,
      achievements: `Researched precision agriculture robotics and sensor technologies to reduce field fertilizer usage by 50%, evaluating fleet control, nutrient detection, and trade-offs |
        Presented 2 targeted fertilization methodologies during a commercial bid meeting, conducting comparative financial cost and environmental impact assessments |
        Evaluated strategic engineering roadmaps with senior teams for nuclear decommissioning projects, automated overhead roadlight repairs, and degradation analytics`,
      relevance: `Demonstrates commercial feasibility analysis, clean-tech evaluation, and technology due diligence—core capabilities 
        for sustainable finance, ESG investing, tech investment banking coverage, and venture capital.`,
      skills: `Technology Research · Commercial Bidding · Financial Evaluation · Cost-Benefit Analysis · ESG & CleanTech · Strategic Planning`,
      linkLabel: "",
      linkUrl: "",
      keywords:
        "createc research intern precision robotics cleantech due diligence nuclear decommissioning commercial bid oxford",
      previewImage: "../assets/images/experience/createcpreview.jpg",
      previewImageAlt: "Createc Research Internship Preview",
      detailImage: "../assets/images/experience/createcdetailed.jpg",
      detailImageAlt: "Createc Research Project Details",
      imageBg: "#e8f5e9",
      imageAccent: "#2e7d32",
    },
  ],

  // ===== EDUCATION =====
  // Each education item has a unique id. Edit fields directly.
  // endDateLabel: use "Expected Graduation" for in-progress, "End Date" for completed.
  education: [
    {
      id: "edu-undergrad",
      menuTitle: "MEng Computer Science",
      institution: "The University of Warwick",
      qualification: "MEng Computer Science",
      grade: "2:1",
      startDate: "Oct 2025",
      endDate: "Jul 2029",
      endDateLabel: "Expected Graduation",
      modules:
        "Foundations of Finance, Principles of Finance 1, Principles of Finance 2, Mathematical Analysis 1, Introduction to Probability",
      activities:
        "Warwick Finance Society, Warwick Hedge Fund Society, Statistics Society",
      highlights: "1st Year: 69%",
      previewMeta: "Degree · In progress",
      previewImage: "../assets/images/education/uniofwarwick.jpg",
      previewImageAlt: "The University of Warwick",
      detailImage: "../assets/images/education/uniofwarwickdetailed.jpg",
      detailImageAlt: "",
      imageBg: "#dde6f8",
    },
    {
      id: "edu-alevels",
      menuTitle: "A Levels",
      institution: "The Henry Box Sixth Form",
      qualification: "A Levels",
      grade: "A*A*A*A*",
      startDate: "Sep 2023",
      endDate: "Jun 2025",
      endDateLabel: "End Date",
      modules: "Further Mathematics, Mathematics, Physics, Computer Science",
      activities:
        "School events pianist, GCSE Mathematics & Music tutor, EPQ on Machine Learning, Student Robotics",
      highlights: "Received Further Mathematics Award",
      previewMeta: "A*A*A*A* · 2023–2025",
      previewImage: "../assets/images/education/thehenryboxschool.jpg",
      previewImageAlt: "The Henry Box Sixth Form",
      detailImage: "../assets/images/education/thehenryboxschooldetailed.jpg",
      detailImageAlt: "",
      imageBg: "#d8f8eb",
    },
  ],

  // ===== SKILLS =====
  // Edit category summary text and skill descriptions.
  // skillIds: order determines display order within the category screen.
  // Each skill's projectIds and experienceIds link to the ids above.
  // Displayed project/experience names are derived automatically from those ids.
  skills: {
    categories: [
      {
        id: "finance" as SkillCategoryId,
        name: "Finance & Analysis",
        icon: "linechart",
        bg: "#d8f0e8",
        stroke: "#1a8a5f",
        summary:
          "[Short description of your finance and analysis capabilities — e.g., quantitative modelling, valuation, and market analysis. Replace before publishing.]",
        skillIds: [
          "fin-modelling",
          "fin-dcf",
          "fin-comps",
          "fin-statements",
          "fin-forecasting",
          "fin-marketresearch",
        ],
        iconImage: "/images/skills/finance-icon.png",
        iconAlt: "Finance & Analysis",
      },
      {
        id: "technical" as SkillCategoryId,
        name: "Technical Tools",
        icon: "tool",
        bg: "#dde6f8",
        stroke: "#1a5faa",
        summary:
          "[Short description of your technical toolkit — e.g., Excel, Python, SQL, and data platforms. Replace before publishing.]",
        skillIds: [
          "tech-excel",
          "tech-ppt",
          "tech-python",
          "tech-sql",
          "tech-bi",
          "tech-other",
        ],
        iconImage: "/images/skills/technical-icon.png",
        iconAlt: "Technical Tools",
      },
      {
        id: "research" as SkillCategoryId,
        name: "Research & Data",
        icon: "barchart",
        bg: "#e8ddf8",
        stroke: "#5a1aaa",
        summary:
          "[Short description of your research and data skills — e.g., qualitative and quantitative research, data visualisation. Replace before publishing.]",
        skillIds: [
          "res-data",
          "res-industry",
          "res-company",
          "res-dataviz",
          "res-writing",
        ],
        iconImage: "/images/skills/research-icon.png",
        iconAlt: "Research & Data",
      },
      {
        id: "communication" as SkillCategoryId,
        name: "Communication",
        icon: "speech",
        bg: "#f8ddf0",
        stroke: "#aa1a7a",
        summary:
          "[Short description of your communication skills — e.g., clear written and verbal communication with stakeholders. Replace before publishing.]",
        skillIds: [
          "com-presdesign",
          "com-written",
          "com-stakeholder",
          "com-team",
        ],
        iconImage: "/images/skills/communication-icon.png",
        iconAlt: "Communication",
      },
      {
        id: "other" as SkillCategoryId,
        name: "Other Skills",
        icon: "star",
        bg: "#f8f0d8",
        stroke: "#8a7010",
        summary:
          "[Short description of additional skills — e.g., project management, problem solving, and attention to detail. Replace before publishing.]",
        skillIds: ["oth-projmgmt", "oth-problem", "oth-detail", "oth-other"],
        iconImage: "/images/skills/other-skills-icon.png",
        iconAlt: "Other Skills",
      },
    ],
    // Each skill item has a stable id, description, and linked project/experience ids.
    // Displayed names are derived automatically — do not duplicate titles here.
    items: [
      // Finance & Analysis
      {
        id: "fin-modelling",
        name: "Financial Modelling",
        description:
          "[One-sentence description — e.g., 'Built integrated 3-statement models to support investment analysis. Replace before publishing.']",
        projectIds: ["proj-1", "proj-2"],
        experienceIds: ["exp-1"],
        icon: "linechart",
        bg: "#d8f0e8",
        stroke: "#1a8a5f",
        iconImage: "/images/skills/financial-modelling-icon.png",
        iconAlt: "Financial Modelling",
      },
      {
        id: "fin-dcf",
        name: "DCF Valuation",
        description:
          "[One-sentence description — e.g., 'Applied discounted cash flow analysis to value companies using comparable assumptions. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-1"],
        icon: "linechart",
        bg: "#d8f0e8",
        stroke: "#1a8a5f",
        iconImage: "/images/skills/dcf-valuation-icon.png",
        iconAlt: "DCF Valuation",
      },
      {
        id: "fin-comps",
        name: "Comparable Company Analysis",
        description:
          "[One-sentence description — e.g., 'Conducted comparable company analysis using relevant industry multiples. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-2"],
        icon: "barchart",
        bg: "#d8f0e8",
        stroke: "#1a8a5f",
        iconImage: "/images/skills/comparable-company-analysis-icon.png",
        iconAlt: "Comparable Company Analysis",
      },
      {
        id: "fin-statements",
        name: "Financial Statement Analysis",
        description:
          "[One-sentence description — e.g., 'Analysed income statements, balance sheets, and cash flows to assess financial health. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-1"],
        icon: "scroll",
        bg: "#d8f0e8",
        stroke: "#1a8a5f",
        iconImage: "/images/skills/financial-statement-analysis-icon.png",
        iconAlt: "Financial Statement Analysis",
      },
      {
        id: "fin-forecasting",
        name: "Forecasting & Scenario Analysis",
        description:
          "[One-sentence description — e.g., 'Built scenario analysis models to evaluate performance under different assumptions. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-2"],
        icon: "linechart",
        bg: "#d8f0e8",
        stroke: "#1a8a5f",
        iconImage: "/images/skills/forecasting-scenario-analysis-icon.png",
        iconAlt: "Forecasting & Scenario Analysis",
      },
      {
        id: "fin-marketresearch",
        name: "Market Research",
        description:
          "[One-sentence description — e.g., 'Conducted primary and secondary market research to identify trends and opportunities. Replace before publishing.']",
        projectIds: ["proj-3"],
        experienceIds: ["exp-3"],
        icon: "search",
        bg: "#d8f0e8",
        stroke: "#1a8a5f",
        iconImage: "/images/skills/market-research-icon.png",
        iconAlt: "Market Research",
      },
      // Technical Tools
      {
        id: "tech-excel",
        name: "Microsoft Excel",
        description:
          "[One-sentence description — e.g., 'Used advanced Excel for modelling, data analysis, and dynamic dashboards. Replace before publishing.']",
        projectIds: ["proj-1", "proj-2"],
        experienceIds: ["exp-1"],
        icon: "tool",
        bg: "#dde6f8",
        stroke: "#1a5faa",
        iconImage: "/images/skills/excel-icon.png",
        iconAlt: "Microsoft Excel",
      },
      {
        id: "tech-ppt",
        name: "PowerPoint",
        description:
          "[One-sentence description — e.g., 'Created clear and professional presentation decks for stakeholder and client use. Replace before publishing.']",
        projectIds: ["proj-3"],
        experienceIds: ["exp-2"],
        icon: "pen",
        bg: "#dde6f8",
        stroke: "#1a5faa",
        iconImage: "/images/skills/powerpoint-icon.png",
        iconAlt: "PowerPoint",
      },
      {
        id: "tech-python",
        name: "Python",
        description:
          "[One-sentence description — e.g., 'Used Python for data cleaning, analysis, and visualisation tasks. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-1"],
        icon: "tool",
        bg: "#dde6f8",
        stroke: "#1a5faa",
        iconImage: "/images/skills/python-icon.png",
        iconAlt: "Python",
      },
      {
        id: "tech-sql",
        name: "SQL",
        description:
          "[One-sentence description — e.g., 'Wrote SQL queries to extract and analyse structured datasets. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-1"],
        icon: "tool",
        bg: "#dde6f8",
        stroke: "#1a5faa",
        iconImage: "/images/skills/sql-icon.png",
        iconAlt: "SQL",
      },
      {
        id: "tech-bi",
        name: "Power BI / Tableau",
        description:
          "[One-sentence description — e.g., 'Built interactive dashboards to communicate key metrics and findings. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-2"],
        icon: "barchart",
        bg: "#dde6f8",
        stroke: "#1a5faa",
        iconImage: "/images/skills/power-bi-tableau-icon.png",
        iconAlt: "Power BI / Tableau",
      },
      {
        id: "tech-other",
        name: "Other Tool",
        description:
          "[One-sentence description — replace with a real tool and description before publishing.]",
        projectIds: ["proj-3"],
        experienceIds: ["exp-3"],
        icon: "tool",
        bg: "#dde6f8",
        stroke: "#1a5faa",
        iconImage: "/images/skills/other-tool-icon.png",
        iconAlt: "Other Tool",
      },
      // Research & Data
      {
        id: "res-data",
        name: "Data Analysis",
        description:
          "[One-sentence description — e.g., 'Analysed quantitative datasets to draw actionable conclusions. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-1"],
        icon: "barchart",
        bg: "#e8ddf8",
        stroke: "#5a1aaa",
        iconImage: "/images/skills/data-analysis-icon.png",
        iconAlt: "Data Analysis",
      },
      {
        id: "res-industry",
        name: "Industry Research",
        description:
          "[One-sentence description — e.g., 'Conducted industry research to identify competitive dynamics and market opportunities. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-2"],
        icon: "search",
        bg: "#e8ddf8",
        stroke: "#5a1aaa",
        iconImage: "/images/skills/industry-research-icon.png",
        iconAlt: "Industry Research",
      },
      {
        id: "res-company",
        name: "Company Research",
        description:
          "[One-sentence description — e.g., 'Researched company fundamentals, business models, and performance drivers. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-1"],
        icon: "folder",
        bg: "#e8ddf8",
        stroke: "#5a1aaa",
        iconImage: "/images/skills/company-research-icon.png",
        iconAlt: "Company Research",
      },
      {
        id: "res-dataviz",
        name: "Data Visualisation",
        description:
          "[One-sentence description — e.g., 'Visualised complex data in clear, accessible charts and dashboards. Replace before publishing.']",
        projectIds: ["proj-3"],
        experienceIds: ["exp-2"],
        icon: "linechart",
        bg: "#e8ddf8",
        stroke: "#5a1aaa",
        iconImage: "/images/skills/data-visualisation-icon.png",
        iconAlt: "Data Visualisation",
      },
      {
        id: "res-writing",
        name: "Report Writing",
        description:
          "[One-sentence description — e.g., 'Produced structured written reports summarising research findings for stakeholders. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-3"],
        icon: "scroll",
        bg: "#e8ddf8",
        stroke: "#5a1aaa",
        iconImage: "/images/skills/report-writing-icon.png",
        iconAlt: "Report Writing",
      },
      // Communication
      {
        id: "com-presdesign",
        name: "Presentation Design",
        description:
          "[One-sentence description — e.g., 'Designed compelling presentation slides for client and stakeholder briefings. Replace before publishing.']",
        projectIds: ["proj-3"],
        experienceIds: ["exp-1"],
        icon: "pen",
        bg: "#f8ddf0",
        stroke: "#aa1a7a",
        iconImage: "/images/skills/presentation-design-icon.png",
        iconAlt: "Presentation Design",
      },
      {
        id: "com-written",
        name: "Written Communication",
        description:
          "[One-sentence description — e.g., 'Produced clear written documents including reports, memos, and briefs. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-2"],
        icon: "scroll",
        bg: "#f8ddf0",
        stroke: "#aa1a7a",
        iconImage: "/images/skills/written-communication-icon.png",
        iconAlt: "Written Communication",
      },
      {
        id: "com-stakeholder",
        name: "Stakeholder Communication",
        description:
          "[One-sentence description — e.g., 'Communicated findings and recommendations clearly to stakeholders at different levels. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-1"],
        icon: "speech",
        bg: "#f8ddf0",
        stroke: "#aa1a7a",
        iconImage: "/images/skills/stakeholder-communication-icon.png",
        iconAlt: "Stakeholder Communication",
      },
      {
        id: "com-team",
        name: "Team Collaboration",
        description:
          "[One-sentence description — e.g., 'Worked effectively within cross-functional teams on joint projects and deliverables. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-3"],
        icon: "speech",
        bg: "#f8ddf0",
        stroke: "#aa1a7a",
        iconImage: "/images/skills/team-collaboration-icon.png",
        iconAlt: "Team Collaboration",
      },
      // Other Skills
      {
        id: "oth-projmgmt",
        name: "Project Management",
        description:
          "[One-sentence description — e.g., 'Planned and managed project tasks to deliver on time and within scope. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-2"],
        icon: "tool",
        bg: "#f8f0d8",
        stroke: "#8a7010",
        iconImage: "/images/skills/project-management-icon.png",
        iconAlt: "Project Management",
      },
      {
        id: "oth-problem",
        name: "Problem Solving",
        description:
          "[One-sentence description — e.g., 'Applied structured thinking to identify root causes and develop workable solutions. Replace before publishing.']",
        projectIds: ["proj-2"],
        experienceIds: ["exp-1"],
        icon: "star",
        bg: "#f8f0d8",
        stroke: "#8a7010",
        iconImage: "/images/skills/problem-solving-icon.png",
        iconAlt: "Problem Solving",
      },
      {
        id: "oth-detail",
        name: "Attention to Detail",
        description:
          "[One-sentence description — e.g., 'Reviewed outputs carefully to ensure accuracy and quality across all deliverables. Replace before publishing.']",
        projectIds: ["proj-1"],
        experienceIds: ["exp-3"],
        icon: "badge",
        bg: "#f8f0d8",
        stroke: "#8a7010",
        iconImage: "/images/skills/attention-to-detail-icon.png",
        iconAlt: "Attention to Detail",
      },
      {
        id: "oth-other",
        name: "Other Skill",
        description:
          "[One-sentence description — replace with a real skill and description before publishing.]",
        projectIds: ["proj-3"],
        experienceIds: ["exp-2"],
        icon: "star",
        bg: "#f8f0d8",
        stroke: "#8a7010",
        iconImage: "/images/skills/other-skill-icon.png",
        iconAlt: "Other Skill",
      },
    ],
  },

  // ===== CERTIFICATIONS =====
  // Each certification has a unique id. Copy a complete object to add another.
  // id must remain unique. title appears in the menu and preview panel.
  // Edit image paths only inside each object.
  // Set linkUrl: "" to hide the credential link.
  certifications: [
    {
      id: "cert-citi",
      title: "Citi - Wealth Job Simulation",
      body: "Forage",
      date: "Jun 2026",
      linkLabel: "View Certificate",
      linkUrl: "",
      image: "../assets/images/certifications/citi.jpg",
      imageAlt: "",
      bg: "#f8ead8",
      stroke: "#c9a227",
    },
    {
      id: "cert-brightnetwork",
      title: "IEUK 2026: Finance Internship Experience",
      body: "Bright Network",
      date: "Jun 2026",
      linkLabel: "View Certificate",
      linkUrl: "",
      image: "../assets/images/certifications/brightnetwork.jpg",
      imageAlt: "",
      bg: "#eeeef8",
      stroke: "#6a6a8a",
    },
    {
      id: "cert-jpmorganchase",
      title: "JPMorganChase - IB Job Simulation",
      body: "Forage",
      date: "Jun 2026",
      linkLabel: "View Certificate",
      linkUrl: "",
      image: "../assets/images/certifications/jpmorganchase.jpg",
      imageAlt: "",
      bg: "#f8e8e0",
      stroke: "#c47a45",
    },
    {
      id: "cert-umushroom",
      title: "UK Umushroom Investment Competition - University Top 10",
      body: "UMushroom",
      date: "Dec 2025",
      linkLabel: "View Certificate",
      linkUrl: "",
      image: "../assets/images/certifications/umushroom.jpg",
      imageAlt: "",
      bg: "#eeeef8",
      stroke: "#6a6a8a",
    },
    {
      id: "cert-amplifyme",
      title: "AmplifyME Finance Accelerator",
      body: "AmplifyME",
      date: "Oct 2025",
      linkLabel: "View Certificate",
      linkUrl: "",
      image: "../assets/images/certifications/amplifyme.jpg",
      imageAlt: "",
      bg: "#eeeef8",
      stroke: "#6a6a8a",
    },
  ],

  // ===== MUSIC TRACKS =====
  // Each track has a unique numeric id. Copy a complete object to add another track.
  // id must remain unique. title appears in Songs list and Now Playing.
  // Edit audioSrc and coverImage paths only here.
  tracks: [
    {
      id: 0,
      title: "Snowing in April",
      artist: "Merlyn White-Aldworth",
      album: "Snowing in April",
      duration: "[1:36]",
      audioSrc: "../assets/music/SnowingInApril-MerlynJamesWhite-Aldworth.mp3",
      coverImage: "../assets/images/music/SnowingInApril.jpg",
      coverAlt: "",
      audioCredit: "SoundCloud @Merlynfry",
      imageBg: "#1a1c2a",
      imageAccent: "#7b93d8",
    },
    {
      id: 1,
      title: "Riding The Subway",
      artist: "Merlyn White-Aldworth",
      album: "Riding The Subway",
      duration: "[1:24]",
      audioSrc: "../assets/music/RidingTheSubway-MerlynJamesWhite-Aldworth.mp3",
      coverImage: "../assets/images/music/RidingTheSubway.jpg",
      coverAlt: "",
      audioCredit: "SoundCloud @Merlynfry",
      imageBg: "#1a1c2a",
      imageAccent: "#7b93d8",
    },
  ],

  // ===== CV =====
  // Edit heading, description, lastUpdated, downloadLabel, pdfPath.
  cv: {
    heading: "Charles Davis — CV",
    description:
      "Here's a high-level insight into where I've been and what I've built so far. Feel free to download a copy of my CV for the full breakdown.",
    lastUpdated: "August - 2026",
    downloadLabel: "Download CV",
    pdfPath: "../assets/cv/CV-Charles-Davis.pdf",
  },

  // ===== CONTACT =====
  // Edit each field. Set github: "" to show "Coming Soon" label.
  contact: {
    heading: "Get in Touch",
    invitation:
      "I'm always happy to connect about finance, my career and academics, or new opportunities.",
    email: "charles@charleshdavis.com",
    linkedin: "https://www.linkedin.com/in/charles-henry-davis",
    linkedinDisplay: "www.linkedin.com/in/charles-henry-davis",
    phone: "+44 7342 180054",
    phoneHref: "tel:+447342180054",
    github: "",
    githubDisplay: "Coming Soon",
    location: "Oxford, UK",
  },

  // ===== HELP TEXT =====
  // Edit helpTitle, intro, returnHint, and controls entries.
  // Each controls entry is [heading, description].
  help: {
    title: "iPod Portfolio Help",
    intro: "How to navigate this portfolio",
    returnHint: "Press MENU or Escape to return to your previous screen.",
    controls: [
      [
        "Scroll Wheel · Arrow Keys",
        "Drag up or down on the Click Wheel ring, use the mouse wheel / trackpad on the wheel, or arrow key up/down. Each drag step or keystroke moves one item in the list, or scrolls content on a reading page.",
      ],
      [
        "Centre Select · Enter · Space",
        "Press the centre button of the Click Wheel, or press Enter or Space on a keyboard. Opens the highlighted menu item or confirms a selection.",
      ],
      [
        "MENU · Escape",
        "Press the MENU label at the top of the Click Wheel, or press Escape on a keyboard. Returns to the previous screen.",
      ],
      [
        "Previous (|◀◀)",
        "Press the left arrow on the Click Wheel. Restarts the current track if more than a few seconds have played; otherwise goes to the previous track.",
      ],
      [
        "Next (▶▶|)",
        "Press the right arrow on the Click Wheel. Advances to the next track.",
      ],
      [
        "Play / Pause (▶⏸)",
        "Press the bottom of the Click Wheel. Starts or pauses audio playback.",
      ],
      [
        "Mute / Unmute",
        "Click the volume icon in the top-right corner of the page. Audio starts muted.",
      ],
      [
        "Help button",
        "Click the Help button in the top-right corner to open this screen from anywhere. Press MENU or Escape to return to wherever you were.",
      ],
      [
        "Search",
        "Open Projects or Experience from the Main Menu. Select 'Search Projects' or 'Search Experience' at the top of each list. Type to filter results live.",
      ],
    ] as [string, string][],
  },

  // ===== UI LABELS / FALLBACK TEXT =====
  // Edit loading labels, error messages, and fallback text shown in the UI.
  ui: {
    bootLoadingLabels: [
      "Loading portfolio…",
      "Preparing projects…",
      "Ready",
    ] as [string, string, string],
    imageLoadingLabel: "Loading artwork…",
    imageUnavailableLabel: "Image unavailable",
    musicUnavailableError:
      "Audio file not found — edit audioSrc in PORTFOLIO_DATA.tracks.",
    musicNoFileError:
      "No audio file — add the path to each track in PORTFOLIO_DATA.tracks.",
  },
};

// ── Derived constants — do not edit below this line ──────────────────────────
// All display data is derived from PORTFOLIO_DATA above.

// Track type
interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  audioSrc: string;
  coverImage: string;
  coverAlt: string;
  audioCredit: string;
  imageBg: string;
  imageAccent: string;
}
const TRACKS: Track[] = PORTFOLIO_DATA.tracks;

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "–:––";
  const m = Math.floor(s / 60);
  return `${m}:${Math.floor(s % 60)
    .toString()
    .padStart(2, "0")}`;
}

// ── Menu data — derived from PORTFOLIO_DATA ───────────────────────────────────

type SubmenuId =
  | "Music"
  | "Projects"
  | "Experience"
  | "Education"
  | "Skills"
  | "Certifications";

const MAIN_MENU = [
  "Music",
  "Projects",
  "Experience",
  "About Me",
  "Education",
  // "Skills",
  "Certifications",
  "CV",
  "Contact",
  "Help",
];

const SUBMENUS: Record<SubmenuId, string[]> = {
  Music: ["Now Playing", "Songs", "About the Music"],
  Projects: ["Search Projects", ...PORTFOLIO_DATA.projects.map((p) => p.title)],
  Experience: [
    "Search Experience",
    ...PORTFOLIO_DATA.experience.map((e) => e.menuTitle),
  ],
  Education: PORTFOLIO_DATA.education.map((e) => e.menuTitle),
  Skills: PORTFOLIO_DATA.skills.categories.map((c) => c.name),
  Certifications: PORTFOLIO_DATA.certifications.map((c) => c.title),
};

const SUBMENU_IDS = new Set<string>(Object.keys(SUBMENUS));
const clamp = (i: number, max: number) => Math.max(0, Math.min(max, i));

// ── Skills data — derived from PORTFOLIO_DATA ─────────────────────────────────

interface SkillCategory {
  id: SkillCategoryId;
  name: string;
  icon: string;
  bg: string;
  stroke: string;
  summary: string;
  count: string;
  iconImage: string;
  iconAlt: string;
}
interface SkillItem {
  id: string;
  name: string;
  description: string;
  projects: string;
  experience: string;
  icon: string;
  bg: string;
  stroke: string;
  iconImage: string;
  iconAlt: string;
}

const SKILL_CATEGORIES: SkillCategory[] = PORTFOLIO_DATA.skills.categories.map(
  (cat) => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon,
    bg: cat.bg,
    stroke: cat.stroke,
    summary: cat.summary,
    count: `${cat.skillIds.length} skill${
      cat.skillIds.length !== 1 ? "s" : ""
    }`,
    iconImage: cat.iconImage,
    iconAlt: cat.iconAlt,
  }),
);

const SKILL_ITEMS: Record<SkillCategoryId, SkillItem[]> = (() => {
  const result: Partial<Record<SkillCategoryId, SkillItem[]>> = {};
  for (const cat of PORTFOLIO_DATA.skills.categories) {
    result[cat.id] = cat.skillIds.map((sid) => {
      const item = PORTFOLIO_DATA.skills.items.find((i) => i.id === sid)!;
      const projectNames = item.projectIds
        .map(
          (pid) =>
            PORTFOLIO_DATA.projects.find((p) => p.id === pid)?.title ?? pid,
        )
        .join(", ");
      const expNames = item.experienceIds
        .map(
          (eid) =>
            PORTFOLIO_DATA.experience.find((e) => e.id === eid)?.menuTitle ??
            eid,
        )
        .join(", ");
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        projects: projectNames,
        experience: expNames,
        icon: item.icon,
        bg: item.bg,
        stroke: item.stroke,
        iconImage: item.iconImage,
        iconAlt: item.iconAlt,
      };
    });
  }
  return result as Record<SkillCategoryId, SkillItem[]>;
})();

// ── Certifications — derived from PORTFOLIO_DATA ──────────────────────────────

interface CertificationData {
  bg: string;
  stroke: string;
  title: string;
  body: string;
  date: string;
  linkLabel: string;
  linkUrl: string;
  image: string;
  imageAlt: string;
}
const CERTIFICATION_DATA: CertificationData[] = PORTFOLIO_DATA.certifications;
const CERT_BY_TITLE: Record<string, CertificationData> = {};
CERTIFICATION_DATA.forEach((c) => {
  CERT_BY_TITLE[c.title] = c;
});

// ── Search data — derived from PORTFOLIO_DATA ─────────────────────────────────

interface SearchItem {
  title: string;
  meta: string;
  keywords: string;
}

const PROJECT_SEARCH_ITEMS: SearchItem[] = PORTFOLIO_DATA.projects.map((p) => ({
  title: p.title,
  meta: `${p.category} · ${p.date}`,
  keywords: p.keywords,
}));
const EXPERIENCE_SEARCH_ITEMS: SearchItem[] = PORTFOLIO_DATA.experience.map(
  (e) => ({
    title: e.menuTitle,
    meta: `${e.organisation} · ${e.roleTitle} · ${e.dates}`,
    keywords: e.keywords,
  }),
);
function itemMatchesQuery(item: SearchItem, q: string): boolean {
  return (
    item.title.toLowerCase().includes(q) ||
    item.meta.toLowerCase().includes(q) ||
    item.keywords.includes(q)
  );
}

// Lookup maps for detail screens and previews
const PROJECT_BY_TITLE: Record<string, (typeof PORTFOLIO_DATA.projects)[0]> =
  {};
PORTFOLIO_DATA.projects.forEach((p) => {
  PROJECT_BY_TITLE[p.title] = p;
});

const EXPERIENCE_BY_TITLE: Record<
  string,
  (typeof PORTFOLIO_DATA.experience)[0]
> = {};
PORTFOLIO_DATA.experience.forEach((e) => {
  EXPERIENCE_BY_TITLE[e.menuTitle] = e;
});

const EDUCATION_BY_TITLE: Record<string, (typeof PORTFOLIO_DATA.education)[0]> =
  {};
PORTFOLIO_DATA.education.forEach((e) => {
  EDUCATION_BY_TITLE[e.menuTitle] = e;
});

const SKILL_CATEGORY_BY_NAME: Record<string, SkillCategory> = {};
SKILL_CATEGORIES.forEach((c) => {
  SKILL_CATEGORY_BY_NAME[c.name] = c;
});

// ── View type ─────────────────────────────────────────────────────────────────

type View =
  | { kind: "mainMenu" }
  | { kind: "submenu"; id: SubmenuId }
  | { kind: "search"; parentId: SubmenuId }
  | {
      kind: "detail";
      title: string;
      parentKind: "mainMenu" | "submenu";
      parentId?: SubmenuId;
    }
  | { kind: "skillsCategory"; categoryId: SkillCategoryId };

// ── Utility item previews (icon-only fallback for action/info rows) ───────────

interface ItemPreview {
  bg: string;
  stroke: string;
  icon: string;
  title: string;
  meta: string;
}

const ITEM_PREVIEWS: Record<string, ItemPreview> = {
  "Now Playing": {
    bg: "#1a1c2a",
    stroke: "#7b93d8",
    icon: "music",
    title: "Now Playing",
    meta: "Current track",
  },
  Songs: {
    bg: "#1a2a1c",
    stroke: "#6dd87b",
    icon: "musiclist",
    title: "Songs",
    meta: `${TRACKS.length} tracks`,
  },
  "About the Music": {
    bg: "#f0f0f5",
    stroke: "#6e6e73",
    icon: "info",
    title: "About the Music",
    meta: "Section info",
  },
  "Search Projects": {
    bg: "#dff0f5",
    stroke: "#1a7a9a",
    icon: "search",
    title: "Search Projects",
    meta: "Find by keyword",
  },
  "Search Experience": {
    bg: "#dff0f5",
    stroke: "#1a7a9a",
    icon: "search",
    title: "Search Experience",
    meta: "Find by keyword",
  },
};

// ── SVG hardware icons ────────────────────────────────────────────────────────

function ChevronRight({ stroke = "#A2A4AA" }: { stroke?: string }) {
  return (
    <div className="h-[9px] relative shrink-0 w-[6px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="9"
        preserveAspectRatio="none"
        viewBox="0 0 6 9"
        width="6"
      >
        <path
          d={svgPaths.p3ecf2a80}
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
function PlayStatusIcon() {
  return (
    <svg fill="none" height="10" viewBox="0 0 10 10" width="10">
      <path
        d={svgPaths.p1a323b00}
        stroke="#666666"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg fill="none" height="10" viewBox="0 0 18 10" width="18">
      <path d={svgPaths.p36d6f200} fill="#4CD964" />
    </svg>
  );
}
// Authentic iPod Classic-style filled playback symbols
// Previous: vertical bar + two left-pointing filled triangles  |◀◀
function RewindIcon() {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
    >
      {/* vertical bar */}
      <rect x="0" y="0" width="2" height="12" fill="#8A8D96" />
      {/* first left triangle */}
      <polygon points="9,0 2,6 9,12" fill="#8A8D96" />
      {/* second left triangle */}
      <polygon points="16,0 9,6 16,12" fill="#8A8D96" />
    </svg>
  );
}
// Next: two right-pointing filled triangles + vertical bar  ▶▶|
function FastForwardIcon() {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
    >
      {/* first right triangle */}
      <polygon points="4,0 11,6 4,12" fill="#8A8D96" />
      {/* second right triangle */}
      <polygon points="11,0 18,6 11,12" fill="#8A8D96" />
      {/* vertical bar */}
      <rect x="18" y="0" width="2" height="12" fill="#8A8D96" />
    </svg>
  );
}
// Play/Pause: filled right triangle + two filled vertical pause bars  ▶❚❚
function PlayCircleIcon() {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
    >
      {/* play triangle */}
      <polygon points="2,0 8,6 2,12" fill="#8A8D96" />
      {/* pause bar 1 */}
      <rect x="11" y="0" width="2" height="12" fill="#8A8D96" />
      {/* pause bar 2 */}
      <rect x="16" y="0" width="2" height="12" fill="#8A8D96" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
      <g clipPath="url(#clipH)">
        <path
          d={svgPaths.p2ddf3d80}
          stroke="#6E6E73"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clipH">
          <rect fill="white" height="14" width="14" />
        </clipPath>
      </defs>
    </svg>
  );
}

// Volume icons for the external mute toggle
function VolumeOffIcon() {
  return (
    <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
      <path
        d="M2 5h3l4-3v10l-4-3H2V5z"
        stroke="#6E6E73"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="5"
        x2="13"
        y2="9"
        stroke="#6E6E73"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <line
        x1="13"
        y1="5"
        x2="10"
        y2="9"
        stroke="#6E6E73"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
function VolumeOnIcon() {
  return (
    <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
      <path
        d="M2 5h3l4-3v10l-4-3H2V5z"
        stroke="#1472ff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10.5 4.5a4 4 0 010 5"
        stroke="#1472ff"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ── Placeholder illustration icons ────────────────────────────────────────────

function PlaceholderIcon({ type, stroke }: { type: string; stroke: string }) {
  const s = {
    fill: "none" as const,
    stroke,
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "music":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <path d="M16 30V14l16-4v16" {...s} />
          <circle cx="12" cy="30" r="4" {...s} />
          <circle cx="28" cy="26" r="4" {...s} />
        </svg>
      );
    case "musiclist":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <line x1="5" y1="14" x2="26" y2="14" {...s} />
          <line x1="5" y1="21" x2="26" y2="21" {...s} />
          <line x1="5" y1="28" x2="18" y2="28" {...s} />
          <path d="M30 22V14l7-2" {...s} />
          <circle cx="30" cy="27" r="5" {...s} />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <circle cx="20" cy="20" r="14" {...s} />
          <line x1="20" y1="19" x2="20" y2="29" {...s} />
          <circle cx="20" cy="13" r="1.5" fill={stroke} stroke="none" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <circle cx="17" cy="17" r="9" {...s} />
          <line x1="23" y1="23" x2="33" y2="33" {...s} />
        </svg>
      );
    case "folder":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <path d="M4 15h32v17a2 2 0 01-2 2H6a2 2 0 01-2-2V15z" {...s} />
          <path d="M4 15v-3a2 2 0 012-2h9l3 5" {...s} />
        </svg>
      );
    case "barchart":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <rect x="5" y="22" width="8" height="12" rx="1" {...s} />
          <rect x="16" y="14" width="8" height="20" rx="1" {...s} />
          <rect x="27" y="8" width="8" height="26" rx="1" {...s} />
        </svg>
      );
    case "pen":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <path d="M28 5l7 7-20 20-9 2 2-9z" {...s} />
          <line x1="24" y1="9" x2="31" y2="16" {...s} />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <rect x="3" y="14" width="34" height="22" rx="2" {...s} />
          <path d="M15 14v-3a2 2 0 012-2h6a2 2 0 012 2v3" {...s} />
          <line x1="3" y1="24" x2="37" y2="24" {...s} />
        </svg>
      );
    case "gradcap":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <polygon points="20,7 38,17 20,27 2,17" {...s} />
          <path d="M9 22v8" {...s} />
          <path d="M30 22v5a10 4 0 01-20 0v-5" {...s} />
        </svg>
      );
    case "scroll":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <rect x="8" y="7" width="24" height="30" rx="3" {...s} />
          <line x1="14" y1="15" x2="26" y2="15" {...s} />
          <line x1="14" y1="21" x2="26" y2="21" {...s} />
          <line x1="14" y1="27" x2="21" y2="27" {...s} />
        </svg>
      );
    case "linechart":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <polyline points="4,32 12,22 20,26 28,14 36,8" {...s} />
          <line x1="4" y1="35" x2="36" y2="35" {...s} />
          <line x1="4" y1="8" x2="4" y2="35" {...s} />
        </svg>
      );
    case "tool":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <path
            d="M32 8a7 7 0 00-9 10L10 31a5 5 0 007 7l13-13a7 7 0 008-9l-5 5-5-5 5-5z"
            {...s}
          />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <path d="M20 8v26" {...{ ...s, strokeWidth: 2 }} />
          <path d="M4 10h16v26H6a2 2 0 01-2-2V12a2 2 0 012-2z" {...s} />
          <path d="M36 10H20v26h14a2 2 0 002-2V12a2 2 0 00-2-2z" {...s} />
        </svg>
      );
    case "speech":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <path
            d="M5 8h30a2 2 0 012 2v15a2 2 0 01-2 2H14l-9 7v-7a2 2 0 01-2-2V10a2 2 0 012-2z"
            {...s}
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <polygon
            points="20,4 24.7,14.9 36.6,15.6 27.4,24 30.5,35.6 20,29 9.5,35.6 12.6,24 3.4,15.6 15.3,14.9"
            {...s}
          />
        </svg>
      );
    case "badge":
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <circle cx="20" cy="15" r="9" {...s} />
          <path d="M14 23l-5 13M26 23l5 13" {...s} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
          <rect x="8" y="8" width="24" height="24" rx="4" {...s} />
        </svg>
      );
  }
}

// ── Music screens ─────────────────────────────────────────────────────────────

interface NowPlayingProps {
  track: Track;
  isPlaying: boolean;
  isMuted: boolean;
  elapsed: number;
  duration: number;
  error: string | null;
}

function NowPlayingScreen({
  track,
  isPlaying,
  isMuted,
  elapsed,
  duration,
  error,
}: NowPlayingProps) {
  const progress = duration > 0 ? Math.min(1, elapsed / duration) : 0;
  const statusLabel = isPlaying ? "▶ Playing" : "⏸ Paused";

  return (
    <div className="w-full bg-white flex flex-col min-h-full">
      {/* Breadcrumb */}
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          Music · Now Playing
        </p>
      </div>

      {/* Album art placeholder */}
      <div className="relative w-full h-[70px] shrink-0 overflow-hidden bg-[#e8e8ea]">
        <ImageCover src={track.coverImage} alt={track.coverAlt} eager />
      </div>

      {/* Track title + artist */}
      <div className="px-[8px] pt-[5px] pb-[2px]">
        <p className="font-['Inter'] font-bold text-[11px] text-black leading-[1.3]">
          {track.title}
        </p>
        <p className="font-['Inter'] text-[9px] text-[#555] mt-[1px]">
          {track.artist} · {track.audioCredit}
        </p>
      </div>

      {/* Status + track number */}
      <div className="px-[8px] py-[2px] flex items-center justify-between">
        <p className="font-['Inter'] text-[8px] text-[#8a8d96]">
          {statusLabel}
          {isMuted ? " · Muted" : ""}
        </p>
        <p className="font-['Inter'] text-[8px] text-[#8a8d96]">
          {track.id + 1} of {TRACKS.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="px-[8px] py-[4px]">
        <div className="w-full h-[3px] bg-[#ebebed] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1472ff] rounded-full"
            style={{
              width: `${progress * 100}%`,
              transition: "width 250ms linear",
            }}
          />
        </div>
        <div className="flex justify-between mt-[2px]">
          <p className="font-['Inter'] text-[8px] text-[#8a8d96] tabular-nums">
            {formatTime(elapsed)}
          </p>
          <p className="font-['Inter'] text-[8px] text-[#8a8d96] tabular-nums">
            {duration > 0 ? formatTime(duration) : track.duration}
          </p>
        </div>
      </div>

      {/* Error message (shown when audio file is missing) */}
      {error && (
        <>
          <div className="border-t border-[#ebebed] mx-[8px]" />
          <div className="px-[8px] py-[3px]">
            <p className="font-['Inter'] text-[8px] text-[#cc3333] leading-[1.4]">
              {error}
            </p>
          </div>
        </>
      )}

      {/* Instruction — pinned to bottom */}
      <div className="flex-1" />
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[4px]">
        <p className="font-['Inter'] text-[8px] text-[#8a8d96] italic leading-[1.4]">
          Use iPod controls to play, pause, or change track.
        </p>
      </div>
      <div className="h-[4px] shrink-0" />
    </div>
  );
}

interface SongsScreenProps {
  selectedIdx: number; // current keyboard/wheel highlight
  currentTrackIdx: number; // which track is Now Playing
  isPlaying: boolean;
  onHighlight: (idx: number) => void; // move highlight without activating
  onActivate: (idx: number) => void; // select + play (navigate to Now Playing)
}

function SongsScreen({
  selectedIdx,
  currentTrackIdx,
  isPlaying,
  onHighlight,
  onActivate,
}: SongsScreenProps) {
  const selectedBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    selectedBtnRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIdx]);

  const previewTrack = TRACKS[selectedIdx];

  return (
    <div className="flex flex-1 min-h-0 w-full overflow-hidden">
      {/* Track list */}
      <div className="relative w-[146px] shrink-0 h-full">
        <div className="flex flex-col py-[4px] overflow-y-auto ipod-scroll h-full">
          {TRACKS.map((t, i) => {
            const highlighted = i === selectedIdx;
            const nowPlaying = i === currentTrackIdx && isPlaying;
            return (
              <button
                key={t.id}
                ref={highlighted ? selectedBtnRef : null}
                onClick={() => onActivate(i)}
                onFocus={() => onHighlight(i)}
                tabIndex={0}
                className={[
                  "flex items-center gap-[4px] px-[8px] py-[2px] w-full text-left shrink-0 outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#1472ff] focus-visible:ring-inset",
                  highlighted ? "bg-[#1472ff]" : "hover:bg-[#e8f0ff]",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-['Inter'] text-[10px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
                    highlighted
                      ? "font-bold text-white"
                      : nowPlaying
                        ? "font-medium text-[#1472ff]"
                        : "font-medium text-black",
                  ].join(" ")}
                >
                  {t.title}
                </span>
                {nowPlaying && (
                  <span
                    className={[
                      "text-[8px] shrink-0",
                      highlighted ? "text-white" : "text-[#1472ff]",
                    ].join(" ")}
                  >
                    ▶
                  </span>
                )}
                {!nowPlaying && (
                  <ChevronRight stroke={highlighted ? "white" : "#A2A4AA"} />
                )}
              </button>
            );
          })}
        </div>
        <div
          aria-hidden
          className="absolute border-[#d1d3d6] border-r border-solid inset-0 pointer-events-none"
        />
      </div>

      {/* Track preview */}
      <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[10px] items-center justify-center min-w-0 p-[10px] overflow-hidden">
        <div className="relative rounded-[6px] size-[90px] shrink-0 overflow-hidden bg-[#e8e8ea]">
          <ImageCover
            src={previewTrack.coverImage}
            alt={previewTrack.coverAlt}
            eager
          />
        </div>
        <div className="flex flex-col gap-[2px] items-center text-center">
          <p className="font-['Inter'] font-bold text-[10px] text-black">
            {previewTrack.title}
          </p>
          <p className="font-['Inter'] text-[8px] text-[#666]">
            {previewTrack.artist}
          </p>
          <p className="font-['Inter'] text-[7px] text-[#aaa] mt-[1px]">
            {previewTrack.duration}
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutMusicScreen() {
  return (
    <div className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          Music · About the Music
        </p>
      </div>
      <div className="px-[8px] pt-[6px] pb-[4px]">
        <p className="font-['Inter'] font-bold text-[11px] text-black">
          About the Music
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Overview
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          The current selection of music is temporary (CC BY-SA 3.0 Licensed,
          with CC0 Licensed Covers). I plan to record and combine tracks played
          by myself on the Piano, Cornet, Guitar, Drums, and hopefully Double
          Bass in the future; forming a solo quartet/quintet of sorts. The page
          will be updated when there are a minimum of two of these recordings.
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          My Music
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          Classically trained Jazz Pianist · Classically trained Jazz Cornetist
          · Self-taught Guitarist · Self-taught Drummer
        </p>
      </div>
      <div className="h-[8px] shrink-0" />
    </div>
  );
}

// ── About Me screen ───────────────────────────────────────────────────────────

function AboutMeScreen() {
  const am = PORTFOLIO_DATA.aboutMe;
  return (
    <div className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          About Me
        </p>
      </div>
      {/* Two-column profile header */}
      <div className="flex flex-row items-start gap-[8px] px-[8px] pt-[8px] pb-[7px] shrink-0">
        {/* Left: name + role text */}
        <div className="flex flex-col justify-center flex-1 min-w-0 gap-[2px] pt-[1px]">
          <p className="font-['Inter'] font-bold text-[12px] text-black leading-[1.2]">
            {am.name}
          </p>
          <p className="font-['Inter'] text-[9px] text-[#444] leading-[1.3]">
            {am.focus}
          </p>
          <p className="font-['Inter'] text-[8px] text-[#8a8d96] leading-[1.3] mt-[1px]">
            {am.roleSubtitle}
          </p>
        </div>
        {/* Right: square profile photo */}
        <div
          className="relative shrink-0 rounded-[5px] overflow-hidden bg-[#e8eaf0]"
          style={{ width: 108, height: 108 }}
        >
          <ImageCover src={am.profileImage} alt={am.profileImageAlt} eager />
        </div>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Introduction
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          {am.introduction}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Current Interests
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          {am.interests}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Location
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">
          {am.location}
        </p>
      </div>
      <div className="h-[8px] shrink-0" />
    </div>
  );
}

// ── Education detail screen ────────────────────────────────────────────────────

function EducationDetailScreen({ menuTitle }: { menuTitle: string }) {
  const d = EDUCATION_BY_TITLE[menuTitle]!;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const showHint = useScrollHint(rootRef);
  return (
    <div ref={rootRef} className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          Education · {d.menuTitle}
        </p>
      </div>
      <div
        className="relative w-full h-[70px] shrink-0 overflow-hidden"
        style={{ backgroundColor: d.imageBg }}
      >
        <ImageCover src={d.detailImage} alt={d.detailImageAlt} />
      </div>
      <div className="px-[8px] pt-[5px] pb-[2px]">
        <p className="font-['Inter'] font-bold text-[12px] text-black">
          {d.menuTitle}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
          Institution
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">
          {d.institution}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px] flex gap-[14px]">
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            Qualification
          </p>
          <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">
            {d.qualification}
          </p>
        </div>
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            Grade
          </p>
          <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">{d.grade}</p>
        </div>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px] flex gap-[14px]">
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            Start Date
          </p>
          <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">
            {d.startDate}
          </p>
        </div>
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            {d.endDateLabel}
          </p>
          <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">
            {d.endDate}
          </p>
        </div>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Modules / Subjects
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          {d.modules}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Activities / Societies
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          {d.activities}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Key Highlights
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          {d.highlights}
        </p>
      </div>
      <div className="h-[20px] shrink-0" />
      <div
        aria-hidden
        className="sticky bottom-0 w-full flex items-end justify-center pb-[3px] pt-[10px] pointer-events-none"
        style={{
          background: "linear-gradient(to top, white 55%, transparent)",
          opacity: showHint ? 1 : 0,
          transition: "opacity 180ms ease",
        }}
      >
        <span className="font-['Inter'] text-[8px] text-[#bbb]">
          ↓ Scroll for more
        </span>
      </div>
    </div>
  );
}

// ── Skills category screen ────────────────────────────────────────────────────

function SkillPreviewPanel({
  skill,
  bg,
  stroke,
}: {
  skill: SkillItem;
  bg: string;
  stroke: string;
}) {
  return (
    <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[10px] overflow-hidden">
      <div className="relative rounded-[6px] size-[72px] shrink-0 overflow-hidden bg-[#f0f0f2]">
        <ImageContain src={skill.iconImage} alt={skill.iconAlt} />
      </div>
      <div className="flex flex-col gap-[3px] w-full">
        <p className="font-['Inter'] font-bold text-[10px] text-black text-center leading-[1.3]">
          {skill.name}
        </p>
        <p className="font-['Inter'] text-[8px] text-[#555] text-center leading-[1.4]">
          {skill.description}
        </p>
        <div className="border-t border-[#ebebed] mt-[4px] mb-[2px]" />
        <p className="font-['Inter'] text-[7px] font-bold text-[#8a8d96] uppercase tracking-[0.05em]">
          Projects
        </p>
        <p className="font-['Inter'] text-[8px] text-[#444] leading-[1.4]">
          {skill.projects}
        </p>
        <p className="font-['Inter'] text-[7px] font-bold text-[#8a8d96] uppercase tracking-[0.05em] mt-[2px]">
          Experience
        </p>
        <p className="font-['Inter'] text-[8px] text-[#444] leading-[1.4]">
          {skill.experience}
        </p>
      </div>
    </div>
  );
}

interface SkillCategoryScreenProps {
  categoryId: SkillCategoryId;
  items: SkillItem[];
  selectedIdx: number;
  onHighlight: (idx: number) => void;
}

// Individual skill rows have no chevron or confirmation icon — they are terminal preview-only items
function SkillCategoryScreen({
  categoryId,
  items,
  selectedIdx,
  onHighlight,
}: SkillCategoryScreenProps) {
  const cat = SKILL_CATEGORIES.find((c) => c.id === categoryId)!;
  const selectedBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    selectedBtnRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIdx]);
  const skill = items[selectedIdx];
  return (
    <div className="flex flex-1 min-h-0 w-full overflow-hidden">
      <div className="relative w-[146px] shrink-0 h-full">
        <div className="flex flex-col py-[4px] overflow-y-auto ipod-scroll h-full">
          {items.map((item, i) => {
            const highlighted = i === selectedIdx;
            return (
              <button
                key={item.id}
                ref={highlighted ? selectedBtnRef : null}
                onClick={() => onHighlight(i)}
                onFocus={() => onHighlight(i)}
                tabIndex={0}
                className={[
                  "flex items-center px-[8px] py-[2px] w-full text-left shrink-0 outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#1472ff] focus-visible:ring-inset",
                  highlighted ? "bg-[#1472ff]" : "hover:bg-[#e8f0ff]",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-['Inter'] text-[10px] flex-1 overflow-hidden text-ellipsis whitespace-nowrap",
                    highlighted
                      ? "font-bold text-white"
                      : "font-medium text-black",
                  ].join(" ")}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
        <div
          aria-hidden
          className="absolute border-[#d1d3d6] border-r border-solid inset-0 pointer-events-none"
        />
      </div>
      <SkillPreviewPanel skill={skill} bg={cat.bg} stroke={cat.stroke} />
    </div>
  );
}

// ── Certification preview panel ───────────────────────────────────────────────

function CertPreviewPanel({ data }: { data: CertificationData }) {
  return (
    <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[10px] overflow-hidden">
      <div className="relative rounded-[6px] size-[80px] shrink-0 overflow-hidden bg-[#f0f0f2]">
        <ImageContain src={data.image} alt={data.imageAlt} />
      </div>
      <div className="flex flex-col gap-[2px] w-full">
        <p className="font-['Inter'] font-bold text-[10px] text-black text-center leading-[1.3]">
          {data.title}
        </p>
        <p className="font-['Inter'] text-[8px] text-[#555] text-center">
          {data.body}
        </p>
        <p className="font-['Inter'] text-[7px] text-[#8a8d96] text-center">
          {data.date}
        </p>
        {data.linkUrl && (
          <p className="font-['Inter'] text-[7px] text-[#1472ff] text-center mt-[2px] leading-[1.4] break-all">
            {data.linkLabel}
          </p>
        )}
      </div>
    </div>
  );
}

// ── CV screen ─────────────────────────────────────────────────────────────────

function CVScreen() {
  const cv = PORTFOLIO_DATA.cv;
  return (
    <div className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          CV
        </p>
      </div>
      <div className="px-[8px] pt-[6px] pb-[2px]">
        <p className="font-['Inter'] font-bold text-[12px] text-black">
          {cv.heading}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
          Description
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          {cv.description}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
          Last Updated
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">
          {cv.lastUpdated}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[10px]">
        <a
          href={cv.pdfPath}
          download
          aria-label={cv.downloadLabel}
          className="flex items-center justify-center gap-[5px] w-full font-['Inter'] font-bold text-[11px] text-white bg-[#1472ff] rounded-[5px] px-[8px] py-[7px] outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] focus-visible:ring-offset-2 hover:bg-[#0a5fcc] transition-colors select-none"
        >
          <span>⬇</span>
          <span>{cv.downloadLabel}</span>
        </a>
      </div>
      <div className="h-[8px] shrink-0" />
    </div>
  );
}

// ── Contact screen ────────────────────────────────────────────────────────────

function ContactScreen() {
  const c = PORTFOLIO_DATA.contact;
  return (
    <div className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          Contact
        </p>
      </div>
      <div className="px-[8px] pt-[6px] pb-[2px]">
        <p className="font-['Inter'] font-bold text-[12px] text-black">
          {c.heading}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
          {c.invitation}
        </p>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[4px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[3px]">
          Professional Email
        </p>
        <a
          href={`mailto:${c.email}`}
          className="block font-['Inter'] text-[10px] text-[#1472ff] underline outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
        >
          {c.email}
        </a>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[4px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[3px]">
          LinkedIn
        </p>
        <a
          href={c.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-['Inter'] text-[10px] text-[#1472ff] underline outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
        >
          {c.linkedinDisplay}
        </a>
      </div>
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[4px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
          Location
        </p>
        <p className="font-['Inter'] text-[10px] text-[#1a1a1c]">
          {c.location}
        </p>
      </div>
      {c.phone && (
        <>
          <div className="border-t border-[#ebebed] mx-[8px]" />
          <div className="px-[8px] py-[4px]">
            <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[3px]">
              Phone
            </p>
            <a
              href={c.phoneHref}
              className="block font-['Inter'] text-[10px] text-[#1472ff] underline outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
            >
              {c.phone}
            </a>
          </div>
        </>
      )}
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[4px]">
        <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[3px]">
          GitHub
        </p>
        <a
          href={c.github}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-['Inter'] text-[10px] text-[#1472ff] underline outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
        >
          {c.githubDisplay}
        </a>
      </div>
      <div className="h-[8px] shrink-0" />
    </div>
  );
}

// ── Help screen ───────────────────────────────────────────────────────────────

function HelpScreen() {
  const h = PORTFOLIO_DATA.help;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const showHint = useScrollHint(rootRef);
  return (
    <div ref={rootRef} className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          Quick Start Guide
        </p>
      </div>
      <div className="px-[8px] pt-[5px] pb-[2px]">
        <p className="font-['Inter'] font-bold text-[12px] text-black">
          {h.title}
        </p>
        <p className="font-['Inter'] text-[9px] text-[#666] mt-[1px]">
          {h.intro}
        </p>
      </div>
      {h.controls.map(([title, text]) => (
        <div key={title}>
          <div className="border-t border-[#ebebed] mx-[8px]" />
          <div className="px-[8px] py-[4px]">
            <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
              {title}
            </p>
            <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
              {text}
            </p>
          </div>
        </div>
      ))}
      <div className="border-t border-[#ebebed] mx-[8px]" />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[8px] text-[#8a8d96] italic text-center">
          {h.returnHint}
        </p>
      </div>
      <div className="h-[20px] shrink-0" />
      <div
        aria-hidden
        className="sticky bottom-0 w-full flex items-end justify-center pb-[3px] pt-[10px] pointer-events-none"
        style={{
          background: "linear-gradient(to top, white 55%, transparent)",
          opacity: showHint ? 1 : 0,
          transition: "opacity 180ms ease",
        }}
      >
        <span className="font-['Inter'] text-[8px] text-[#bbb]">
          ↓ Scroll for more
        </span>
      </div>
    </div>
  );
}

// ── Search screen ─────────────────────────────────────────────────────────────

interface SearchScreenHandle {
  moveSelection: (delta: number) => void;
  activateSelection: () => void;
}
interface SearchScreenProps {
  parentId: SubmenuId;
  onSelectResult: (title: string) => void;
  onClose: () => void;
}

const SearchScreen = forwardRef<SearchScreenHandle, SearchScreenProps>(
  function SearchScreen({ parentId, onSelectResult, onClose }, ref) {
    const [query, setQuery] = useState("");
    const [selIndex, setSelIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const allItems =
      parentId === "Projects" ? PROJECT_SEARCH_ITEMS : EXPERIENCE_SEARCH_ITEMS;
    const nounSingular =
      parentId === "Projects" ? "project" : "experience item";
    const nounPlural =
      parentId === "Projects" ? "projects" : "experience items";
    const placeholder =
      parentId === "Projects" ? "Search projects…" : "Search experience…";
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return q
        ? allItems.filter((item) => itemMatchesQuery(item, q))
        : allItems;
    }, [query, allItems]);
    const filteredRef = useRef(filtered);
    filteredRef.current = filtered;
    const selIndexRef = useRef(selIndex);
    selIndexRef.current = selIndex;
    const onSelectResultRef = useRef(onSelectResult);
    onSelectResultRef.current = onSelectResult;
    useEffect(() => {
      setSelIndex(-1);
    }, [filtered]);
    useEffect(() => {
      if (selIndex === -1) {
        inputRef.current?.focus();
      } else {
        const btn = resultButtonRefs.current[selIndex];
        if (btn) {
          btn.focus();
          btn.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
      }
    }, [selIndex]);
    useImperativeHandle(
      ref,
      () => ({
        moveSelection(delta) {
          const maxIdx = filteredRef.current.length - 1;
          setSelIndex((prev) => {
            const next = prev + delta;
            if (next < -1) return -1;
            if (maxIdx < 0) return -1;
            if (next > maxIdx) return maxIdx;
            return next;
          });
        },
        activateSelection() {
          const idx = selIndexRef.current;
          const f = filteredRef.current;
          if (idx >= 0 && idx < f.length)
            onSelectResultRef.current(f[idx].title);
        },
      }),
      [],
    );
    const countText = query.trim()
      ? `${filtered.length} ${
          filtered.length === 1 ? nounSingular : nounPlural
        } found`
      : `${allItems.length} ${nounPlural}`;
    return (
      <div className="w-full h-full flex flex-col bg-white">
        <div className="shrink-0 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] pt-[4px] pb-[5px] flex flex-col gap-[4px]">
          <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96] leading-none">
            {parentId} · Search
          </p>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label={`Search ${parentId.toLowerCase()}`}
            onFocus={() => setSelIndex(-1)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                onClose();
                return;
              }
              if (e.key === "ArrowDown" || e.key === "Enter") {
                e.preventDefault();
                if (filteredRef.current.length > 0) setSelIndex(0);
                return;
              }
            }}
            className={[
              "w-full font-['Inter'] text-[10px] text-black placeholder-[#b0b0b5] bg-white rounded-[3px] px-[5px] py-[2px] outline-none border",
              selIndex === -1
                ? "border-[#1472ff] ring-1 ring-[#1472ff]"
                : "border-[#d0d0d5]",
            ].join(" ")}
          />
        </div>
        <div className="shrink-0 px-[8px] py-[2px] border-b border-[#ebebed] bg-[#fafafa]">
          <p className="font-['Inter'] text-[8px] text-[#8a8d96]">
            {countText}
          </p>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto ipod-scroll">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-[4px] px-[14px] text-center">
              <p className="font-['Inter'] text-[10px] font-semibold text-black">
                No {nounPlural} found.
              </p>
              <p className="font-['Inter'] text-[9px] text-[#8a8d96]">
                Try a different search.
              </p>
            </div>
          ) : (
            filtered.map((item, i) => {
              const active = i === selIndex;
              return (
                <button
                  key={item.title}
                  ref={(el) => {
                    resultButtonRefs.current[i] = el;
                  }}
                  onClick={() => {
                    setSelIndex(i);
                    onSelectResult(item.title);
                  }}
                  onFocus={() => setSelIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown")
                      e.preventDefault();
                  }}
                  tabIndex={0}
                  aria-label={item.title}
                  aria-selected={active}
                  className={[
                    "flex flex-col w-full text-left px-[8px] py-[5px] border-b border-[#ebebed] outline-none shrink-0",
                    active ? "bg-[#1472ff]" : "hover:bg-[#e8f0ff]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-['Inter'] text-[10px] font-semibold leading-[1.4]",
                      active ? "text-white" : "text-black",
                    ].join(" ")}
                  >
                    {item.title}
                  </span>
                  <span
                    className={[
                      "font-['Inter'] text-[8px] leading-[1.4]",
                      active
                        ? "text-[rgba(255,255,255,0.8)]"
                        : "text-[#8a8d96]",
                    ].join(" ")}
                  >
                    {item.meta}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    );
  },
);

// ── Shared detail-page primitives ─────────────────────────────────────────────

function Divider() {
  return <div className="border-t border-[#ebebed] mx-[8px]" />;
}
function DetailSection({ label, text }: { label: string; text: string }) {
  return (
    <div className="px-[8px] py-[5px]">
      <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[2px]">
        {label}
      </p>
      <p className="font-['Inter'] text-[10px] text-[#1a1a1c] leading-[1.5]">
        {text}
      </p>
    </div>
  );
}
function useScrollHint(rootRef: React.RefObject<HTMLDivElement | null>) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = rootRef.current?.parentElement;
    if (!el) return;
    const check = () => {
      const hasMore = el.scrollHeight > el.clientHeight + 4;
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 16;
      setShow(hasMore && !nearBottom);
    };
    const t = setTimeout(check, 60);
    el.addEventListener("scroll", check, { passive: true });
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", check);
    };
  }, [rootRef]);
  return show;
}

function ProjectDetailScreen({ title }: { title: string }) {
  const d = PROJECT_BY_TITLE[title] ?? PORTFOLIO_DATA.projects[0];
  const rootRef = useRef<HTMLDivElement | null>(null);
  const showHint = useScrollHint(rootRef);
  return (
    <div ref={rootRef} className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          Projects · {d.title}
        </p>
      </div>
      <div className="flex flex-col gap-[2px]">
        <div
          className="relative w-full h-[76px] shrink-0 overflow-hidden"
          style={{ backgroundColor: d.imageBg }}
        >
          <ImageCover
            src={d.detailImage1 ?? ""}
            alt={d.detailImage1Alt ?? ""}
          />
        </div>
        <div className="flex gap-[2px]">
          <div
            className="relative w-1/2 h-[76px] shrink-0 overflow-hidden"
            style={{ backgroundColor: d.imageBg }}
          >
            <ImageCover
              src={d.detailImage2 ?? ""}
              alt={d.detailImage2Alt ?? ""}
            />
          </div>
          <div
            className="relative w-1/2 h-[76px] shrink-0 overflow-hidden"
            style={{ backgroundColor: d.imageBg }}
          >
            <ImageCover
              src={d.detailImage3 ?? ""}
              alt={d.detailImage3Alt ?? ""}
            />
          </div>
        </div>
      </div>
      <div className="px-[8px] pt-[6px] pb-[4px]">
        <p className="font-['Inter'] font-bold text-[12px] text-black">
          {d.title}
        </p>
      </div>
      <Divider />
      <div className="px-[8px] py-[5px] flex gap-[16px]">
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            Category
          </p>
          <p className="font-['Inter'] text-[10px] text-black">{d.category}</p>
        </div>
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            Date
          </p>
          <p className="font-['Inter'] text-[10px] text-black">{d.date}</p>
        </div>
      </div>
      <Divider />
      <div className="px-[8px] py-[5px]">
        <p className="font-['Inter'] text-[10px] text-[#555] italic">
          {d.summary}
        </p>
      </div>
      <Divider />
      <DetailSection label="Objective / Context" text={d.objective} />
      <Divider />
      <DetailSection label="My Role" text={d.role} />
      <Divider />
      <DetailSection label="Approach / Methodology" text={d.approach} />
      <Divider />
      <DetailSection label="Tools Used" text={d.tools} />
      <Divider />
      <DetailSection label="Key Output / Result" text={d.output} />
      <Divider />
      <DetailSection label="Skills Demonstrated" text={d.skills} />
      {d.linkUrl && (
        <>
          <Divider />
          <div className="px-[8px] py-[5px]">
            <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[4px]">
              Related Link
            </p>
            <a
              href={d.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full font-['Inter'] text-[10px] text-[#1472ff] border border-[#1472ff] rounded-[3px] px-[6px] py-[3px] outline-none"
            >
              {d.linkLabel}
            </a>
          </div>
        </>
      )}
      <div className="h-[20px] shrink-0" />
      <div
        aria-hidden
        className="sticky bottom-0 w-full flex items-end justify-center pb-[3px] pt-[10px] pointer-events-none"
        style={{
          background: "linear-gradient(to top, white 55%, transparent)",
          opacity: showHint ? 1 : 0,
          transition: "opacity 180ms ease",
        }}
      >
        <span className="font-['Inter'] text-[8px] text-[#bbb]">
          ↓ Scroll for more
        </span>
      </div>
    </div>
  );
}

function ExperienceDetailScreen({ title }: { title: string }) {
  const d = EXPERIENCE_BY_TITLE[title] ?? PORTFOLIO_DATA.experience[0];
  const rootRef = useRef<HTMLDivElement | null>(null);
  const showHint = useScrollHint(rootRef);
  return (
    <div ref={rootRef} className="w-full bg-white flex flex-col min-h-full">
      <div className="sticky top-0 z-10 bg-[#f5f5f7] border-b border-[#dcdde0] px-[8px] py-[3px] shrink-0">
        <p className="font-['Inter'] text-[9px] font-medium text-[#8a8d96]">
          Experience · {d.menuTitle}
        </p>
      </div>
      <div
        className="relative w-full h-[76px] shrink-0 overflow-hidden"
        style={{ backgroundColor: d.imageBg }}
      >
        <ImageCover src={d.detailImage} alt={d.detailImageAlt} />
      </div>
      <div className="px-[8px] pt-[6px] pb-[4px]">
        <p className="font-['Inter'] font-bold text-[12px] text-black">
          {d.organisation}
        </p>
        <p className="font-['Inter'] text-[10px] text-[#444] mt-[1px]">
          {d.roleTitle}
        </p>
      </div>
      <Divider />
      <div className="px-[8px] py-[5px] flex gap-[16px]">
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            Dates
          </p>
          <p className="font-['Inter'] text-[10px] text-black">{d.dates}</p>
        </div>
        <div>
          <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[1px]">
            Location
          </p>
          <p className="font-['Inter'] text-[10px] text-black">{d.location}</p>
        </div>
      </div>
      <Divider />
      <DetailSection label="Short Overview" text={d.overview} />
      <Divider />
      <DetailSection label="Responsibilities" text={d.responsibilities} />
      <Divider />
      <DetailSection label="Achievements" text={d.achievements} />
      <Divider />
      <DetailSection
        label="Finance / Analytical Relevance"
        text={d.relevance}
      />
      <Divider />
      <DetailSection label="Skills Demonstrated" text={d.skills} />
      {d.linkUrl && (
        <>
          <Divider />
          <div className="px-[8px] py-[5px]">
            <p className="font-['Inter'] text-[8px] font-bold text-[#8a8d96] uppercase tracking-[0.06em] mb-[4px]">
              Related Link
            </p>
            <a
              href={d.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full font-['Inter'] text-[10px] text-[#1472ff] border border-[#1472ff] rounded-[3px] px-[6px] py-[3px] outline-none"
            >
              {d.linkLabel}
            </a>
          </div>
        </>
      )}
      <div className="h-[20px] shrink-0" />
      <div
        aria-hidden
        className="sticky bottom-0 w-full flex items-end justify-center pb-[3px] pt-[10px] pointer-events-none"
        style={{
          background: "linear-gradient(to top, white 55%, transparent)",
          opacity: showHint ? 1 : 0,
          transition: "opacity 180ms ease",
        }}
      >
        <span className="font-['Inter'] text-[8px] text-[#bbb]">
          ↓ Scroll for more
        </span>
      </div>
    </div>
  );
}

function DetailScreen({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white p-[12px] gap-[6px] min-h-full">
      <p className="font-['Inter'] font-bold text-[11px] text-black text-center">
        {title}
      </p>
      <p className="font-['Inter'] font-normal text-[#666] text-[9px] text-center">
        Content coming soon
      </p>
    </div>
  );
}

// ── iPod screen chrome ────────────────────────────────────────────────────────

// Small filled play/pause indicator — matches iPod Click Wheel symbol style
function PlayPauseIndicator({ isPlaying }: { isPlaying: boolean }) {
  return isPlaying ? (
    // Filled play triangle
    <svg
      width="7"
      height="9"
      viewBox="0 0 7 9"
      fill="none"
      aria-label="Paused"
      aria-hidden="true"
    >
      <polygon points="0,0 7,4.5 0,9" fill="#555" />
    </svg>
  ) : (
    // Two filled pause bars
    <svg
      width="7"
      height="9"
      viewBox="0 0 7 9"
      fill="none"
      aria-label="Playing"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="2.5" height="9" fill="#555" />
      <rect x="4" y="0" width="2.5" height="9" fill="#555" />
    </svg>
  );
}

function StatusBar({
  isPlaying,
  title,
}: {
  isPlaying: boolean;
  title: string;
}) {
  return (
    <div className="bg-gradient-to-b from-white to-[#ebebec] h-[22px] flex items-center justify-between px-[10px] relative shrink-0 w-full">
      <div
        aria-hidden
        className="absolute border-[#bfc1c5] border-b border-solid inset-0 pointer-events-none"
      />
      <PlayPauseIndicator isPlaying={isPlaying} />
      <p className="font-['Inter'] font-bold text-[11px] text-black text-center truncate px-[4px]">
        {title}
      </p>
      <BatteryIcon />
    </div>
  );
}

interface SplitScreenProps {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  renderPreview: () => React.ReactNode;
  terminalItems?: ReadonlySet<string>; // items that do not open a submenu/detail — no chevron shown
}
function SplitScreen({
  items,
  selectedIndex,
  onSelect,
  renderPreview,
  terminalItems,
}: SplitScreenProps) {
  const selectedBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    selectedBtnRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex]);
  return (
    <div className="flex flex-1 min-h-0 w-full overflow-hidden">
      <div className="relative w-[146px] shrink-0 h-full">
        <div className="flex flex-col py-[4px] overflow-y-auto ipod-scroll h-full">
          {items.map((item, i) => {
            const active = i === selectedIndex;
            return (
              <button
                key={item}
                ref={active ? selectedBtnRef : null}
                role="menuitem"
                aria-label={item}
                aria-current={active ? "true" : undefined}
                onClick={() => onSelect(i)}
                className={[
                  "flex items-center justify-between px-[8px] py-[2px] w-full text-left shrink-0 outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#1472ff] focus-visible:ring-inset",
                  active ? "bg-[#1472ff]" : "hover:bg-[#e8f0ff]",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-['Inter'] text-[11px] overflow-hidden text-ellipsis whitespace-nowrap",
                    active ? "font-bold text-white" : "font-medium text-black",
                  ].join(" ")}
                >
                  {item}
                </span>
                {!terminalItems?.has(item) && (
                  <ChevronRight stroke={active ? "white" : "#A2A4AA"} />
                )}
              </button>
            );
          })}
        </div>
        <div
          aria-hidden
          className="absolute border-[#d1d3d6] border-r border-solid inset-0 pointer-events-none"
        />
      </div>
      {renderPreview()}
    </div>
  );
}

const CERT_TERMINAL_ITEMS: ReadonlySet<string> = new Set(
  PORTFOLIO_DATA.certifications.map((c) => c.title),
);

// ── Image helpers ─────────────────────────────────────────────────────────────

// ── Shared image component ────────────────────────────────────────────────────

const IMG_PLACEHOLDER_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <rect
      x="1"
      y="2"
      width="12"
      height="10"
      rx="1.5"
      stroke="#c8c8cc"
      strokeWidth="1.2"
    />
    <circle cx="4.5" cy="5.5" r="1" fill="#c8c8cc" />
    <path
      d="M1.5 10l3-3 2 2 2-2.5L12.5 10"
      stroke="#c8c8cc"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

const IMG_UNAVAIL_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <rect
      x="1"
      y="2"
      width="12"
      height="10"
      rx="1.5"
      stroke="#c0c0c4"
      strokeWidth="1.2"
      strokeDasharray="2 1.5"
    />
    <line
      x1="4"
      y1="4"
      x2="10"
      y2="10"
      stroke="#c0c0c4"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

function IpodImage({
  src,
  alt,
  fit,
  eager,
}: {
  src: string;
  alt: string;
  fit: "cover" | "contain";
  eager?: boolean;
}) {
  const alreadyLoaded = useMemo(() => {
    if (!src) return false;
    const img = new window.Image();
    img.src = src;
    return img.complete && img.naturalWidth > 0;
  }, [src]);

  const [loaded, setLoaded] = useState(alreadyLoaded);
  const [err, setErr] = useState(false);

  // Reset when src changes
  useEffect(() => {
    if (!src) {
      setLoaded(false);
      setErr(false);
      return;
    }
    const img = new window.Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
      setErr(false);
    } else {
      setLoaded(false);
      setErr(false);
    }
  }, [src]);

  if (!src || err) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-[3px] px-[4px]"
        style={{ background: "rgba(240,240,242,0.9)" }}
      >
        {IMG_UNAVAIL_ICON}
        <p className="font-['Inter'] text-[6px] text-[#b0b0b4] text-center leading-[1.4]">
          Image unavailable
        </p>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-[3px] px-[4px]"
          style={{ background: "#f0f0f2" }}
        >
          {IMG_PLACEHOLDER_ICON}
          <p
            className="font-['Inter'] text-[6px] text-[#b8b8bc] text-center leading-[1.4]"
            style={{ opacity: 0, animation: "ipodImgLabel 0ms 300ms forwards" }}
          >
            Loading artwork…
          </p>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        className="absolute inset-0 w-full h-full object-center"
        style={{
          objectFit: fit,
          opacity: loaded ? 1 : 0,
          transition: loaded ? "opacity 180ms ease-out" : "none",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setErr(true)}
      />
    </>
  );
}

function ImageCover({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  return <IpodImage src={src} alt={alt} fit="cover" eager={eager} />;
}

function ImageContain({
  src,
  alt,
  eager,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  return <IpodImage src={src} alt={alt} fit="contain" eager={eager} />;
}

function TrackArtPreview({ track }: { track: Track }) {
  return (
    <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[12px] overflow-hidden">
      <div className="relative rounded-[6px] size-[80px] shrink-0 overflow-hidden bg-[#e8e8ea]">
        <ImageCover src={track.coverImage} alt={track.coverAlt} eager />
      </div>
      <div className="flex flex-col gap-[2px] items-center text-center">
        <p className="font-['Inter'] font-bold text-[10px] text-black text-center leading-[1.3]">
          {track.title}
        </p>
        <p className="font-['Inter'] font-normal text-[#666] text-[8px] text-center">
          {track.artist}
        </p>
      </div>
    </div>
  );
}
function MainMenuPreview({ track }: { track: Track }) {
  return <TrackArtPreview track={track} />;
}
function SubMenuPreview({
  itemName,
  currentTrack,
  songsTrack,
}: {
  itemName: string;
  currentTrack?: Track;
  songsTrack?: Track;
}) {
  // Now Playing: show live current track art
  if (itemName === "Now Playing" && currentTrack)
    return <TrackArtPreview track={currentTrack} />;

  // Songs: show highlighted track's cover art
  if (itemName === "Songs" && songsTrack)
    return (
      <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[12px] overflow-hidden">
        <div className="relative rounded-[6px] size-[80px] shrink-0 overflow-hidden bg-[#e8e8ea]">
          <ImageCover
            src={songsTrack.coverImage}
            alt={songsTrack.coverAlt}
            eager
          />
        </div>
        <div className="flex flex-col gap-[2px] items-center text-center">
          <p className="font-['Inter'] font-bold text-[10px] text-black text-center leading-[1.3]">
            {songsTrack.title}
          </p>
          <p className="font-['Inter'] font-normal text-[#666] text-[8px] text-center">
            {songsTrack.artist}
          </p>
          <p className="font-['Inter'] text-[#999] text-[8px] text-center mt-[1px]">
            {songsTrack.duration}
          </p>
        </div>
      </div>
    );

  // Skill categories: image + name/summary/count
  const skillCat = SKILL_CATEGORY_BY_NAME[itemName];
  if (skillCat) {
    return (
      <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[12px] overflow-hidden">
        <div className="relative rounded-[6px] size-[80px] shrink-0 overflow-hidden bg-[#f0f0f2]">
          <ImageContain src={skillCat.iconImage} alt={skillCat.iconAlt} />
        </div>
        <div className="flex flex-col gap-[3px] items-center text-center">
          <p className="font-['Inter'] font-bold text-[11px] text-black text-center">
            {skillCat.name}
          </p>
          <p className="font-['Inter'] text-[8px] text-[#666] text-center leading-[1.4]">
            {skillCat.summary}
          </p>
          <p className="font-['Inter'] text-[8px] text-[#999] text-center">
            {skillCat.count}
          </p>
        </div>
      </div>
    );
  }

  // Certifications: credential preview panel
  const cert = CERT_BY_TITLE[itemName];
  if (cert) return <CertPreviewPanel data={cert} />;

  // Projects: 80px square preview image + title/category
  const proj = PROJECT_BY_TITLE[itemName];
  if (proj) {
    return (
      <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[12px] overflow-hidden">
        <div className="relative rounded-[6px] size-[80px] shrink-0 overflow-hidden bg-[#f0f0f2]">
          <ImageCover src={proj.previewImage} alt={proj.previewImageAlt} />
        </div>
        <div className="flex flex-col gap-[2px] items-center text-center">
          <p className="font-['Inter'] font-bold text-[11px] text-black text-center">
            {proj.title}
          </p>
          <p className="font-['Inter'] font-normal text-[#666] text-[9px] text-center">
            {proj.category}
          </p>
        </div>
      </div>
    );
  }

  // Experience: 80px square contain image + title/role
  const exp = EXPERIENCE_BY_TITLE[itemName];
  if (exp) {
    return (
      <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[12px] overflow-hidden">
        <div className="relative rounded-[6px] size-[80px] shrink-0 overflow-hidden bg-[#f0f0f2]">
          <ImageContain src={exp.previewImage} alt={exp.previewImageAlt} />
        </div>
        <div className="flex flex-col gap-[2px] items-center text-center">
          <p className="font-['Inter'] font-bold text-[10px] text-black text-center leading-[1.3]">
            {exp.menuTitle}
          </p>
          <p className="font-['Inter'] font-normal text-[#666] text-[8px] text-center">
            {exp.roleTitle}
          </p>
        </div>
      </div>
    );
  }

  // Education: 80px square contain image + title/meta
  const edu = EDUCATION_BY_TITLE[itemName];
  if (edu) {
    return (
      <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[8px] items-center justify-center min-w-0 p-[12px] overflow-hidden">
        <div className="relative rounded-[6px] size-[80px] shrink-0 overflow-hidden bg-[#f0f0f2]">
          <ImageContain src={edu.previewImage} alt={edu.previewImageAlt} />
        </div>
        <div className="flex flex-col gap-[2px] items-center text-center">
          <p className="font-['Inter'] font-bold text-[10px] text-black text-center leading-[1.3]">
            {edu.menuTitle}
          </p>
          <p className="font-['Inter'] font-normal text-[#666] text-[8px] text-center">
            {edu.previewMeta}
          </p>
        </div>
      </div>
    );
  }

  // Utility/action items: icon-only fallback
  const data = ITEM_PREVIEWS[itemName];
  if (!data) return <div className="flex flex-1 bg-[#f8f9fa]" />;
  return (
    <div className="bg-[#f8f9fa] flex flex-1 flex-col gap-[12px] items-center justify-center min-w-0 p-[12px] overflow-hidden">
      <div
        className="flex items-center justify-center rounded-[6px] size-[80px] shrink-0"
        style={{ backgroundColor: data.bg }}
      >
        <PlaceholderIcon type={data.icon} stroke={data.stroke} />
      </div>
      <div className="flex flex-col gap-[2px] items-center text-center">
        <p className="font-['Inter'] font-bold text-[11px] text-black text-center">
          {data.title}
        </p>
        <p className="font-['Inter'] font-normal text-[#666] text-[9px] text-center">
          {data.meta}
        </p>
      </div>
    </div>
  );
}

// ── iPod hardware ─────────────────────────────────────────────────────────────

interface IpodProps {
  screenContent: React.ReactNode;
  contentScrollable: boolean;
  viewKey: string;
  contentScrollRef: React.RefObject<HTMLDivElement | null>;
  isPlaying: boolean;
  title: string;
  bootPhase: BootPhase;
  bootReducedMotion: boolean;
  bootLabel: string;
  onActivate: () => void;
  onMenu: () => void;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onScrollDelta: (delta: number) => void;
  onBootStart: () => void;
}

function Ipod({
  screenContent,
  contentScrollable,
  viewKey,
  contentScrollRef,
  isPlaying,
  title,
  bootPhase,
  bootReducedMotion,
  bootLabel,
  onActivate,
  onMenu,
  onPlayPause,
  onPrev,
  onNext,
  onScrollDelta,
  onBootStart,
}: IpodProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragAccum = useRef(0);
  const DRAG_STEP = 12;

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      onScrollDelta(e.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onScrollDelta]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (bootPhase !== "done") return;
      dragStartY.current = e.clientY;
      dragAccum.current = 0;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [bootPhase],
  );
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartY.current === null) return;
      dragAccum.current += e.clientY - dragStartY.current;
      dragStartY.current = e.clientY;
      const steps = Math.trunc(dragAccum.current / DRAG_STEP);
      if (steps !== 0) {
        dragAccum.current -= steps * DRAG_STEP;
        onScrollDelta(steps > 0 ? 1 : -1);
      }
    },
    [onScrollDelta],
  );
  const handlePointerUp = useCallback(() => {
    dragStartY.current = null;
    dragAccum.current = 0;
  }, []);

  return (
    <div className="h-[530px] relative rounded-[28px] shrink-0 w-[320px]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-[28px]"
        style={{
          backgroundImage:
            "linear-gradient(100.27deg, rgb(237,238,240) 11.538%, rgb(216,218,223) 42.308%, rgb(200,202,208) 65.385%, rgb(184,187,195) 88.462%)",
        }}
      />
      <div className="flex flex-col gap-[28px] items-center overflow-clip pb-[32px] pt-[20px] px-[20px] relative rounded-[inherit] size-full">
        {/* Screen bezel */}
        <div className="h-[234px] relative rounded-[8px] shrink-0 w-full">
          <div
            aria-hidden
            className="absolute bg-[#1a1a1c] inset-0 pointer-events-none rounded-[8px]"
          />
          <div className="flex flex-col items-start overflow-clip p-[7px] relative rounded-[inherit] size-full">
            <div className="bg-white flex flex-1 flex-col items-start min-h-0 overflow-hidden relative rounded-[3px] w-full">
              <StatusBar isPlaying={isPlaying} title={title} />
              <div
                ref={contentScrollable ? contentScrollRef : null}
                key={viewKey}
                className={[
                  "flex flex-1 min-h-0 w-full",
                  contentScrollable
                    ? "overflow-y-auto ipod-scroll"
                    : "overflow-hidden",
                ].join(" ")}
                style={{ animation: "fadeIn 120ms ease-out" }}
              >
                {screenContent}
              </div>

              {/* ── Boot overlay — covers entire screen area until revealing phase ── */}
              {(bootPhase === "idle" ||
                bootPhase === "powering-on" ||
                bootPhase === "booting") && (
                <div className="absolute inset-0 z-50 rounded-[3px] overflow-hidden">
                  {/* Solid black base */}
                  <div className="absolute inset-0 bg-black" />

                  {/* Idle start prompt */}
                  {bootPhase === "idle" && (
                    <button
                      className="absolute inset-0 flex flex-col items-center justify-center outline-none cursor-pointer"
                      onClick={onBootStart}
                      aria-label="Start portfolio"
                    >
                      {/* Start input indicator text */}
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "7.5px",
                          letterSpacing: "0.14em",
                          color: "#8a8d96",
                          textAlign: "center",
                        }}
                      >
                        PRESS CENTRE BUTTON
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 400,
                          fontSize: "6.5px",
                          letterSpacing: "0.07em",
                          color: "#4a4d50",
                          textAlign: "center",
                          marginTop: 5,
                        }}
                      >
                        OR PRESS ENTER
                      </p>
                    </button>
                  )}

                  {/* Power-on: warm-white circle expands from centre (0.62 s) */}
                  {bootPhase === "powering-on" && (
                    <div
                      className="absolute inset-0"
                      style={
                        bootReducedMotion
                          ? {
                              background: "#fffef8",
                              animation: "fadeIn 50ms ease-out forwards",
                            }
                          : {
                              background:
                                "radial-gradient(circle at 50% 46%, #fffef8 0%, #fafaf6 50%, #f0f0ee 100%)",
                              clipPath: "circle(0px at 50% 46%)",
                              animation:
                                "ipodPowerOn 620ms cubic-bezier(0.22,0.8,0.28,1) forwards",
                            }
                      }
                    />
                  )}

                  {/* Boot screen */}
                  {bootPhase === "booting" && (
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{
                        background: "#fffef8",
                        gap: 9,
                        animation: "fadeIn 100ms ease-out",
                      }}
                    >
                      {/* Name */}
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 700,
                          fontSize: "7px",
                          letterSpacing: "0.18em",
                          color: "#1a1a1c",
                          textAlign: "center",
                        }}
                      >
                        {PORTFOLIO_DATA.site.bootPortfolioName}
                      </p>
                      {/* Status label + loading bar */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "6.5px",
                            letterSpacing: "0.05em",
                            color: "#8a8d96",
                            transition: "opacity 200ms ease",
                          }}
                        >
                          {bootLabel}
                        </p>
                        <div
                          style={{
                            width: 84,
                            height: 3,
                            background: "#e0e0e2",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              background: "#1a1a1c",
                              borderRadius: 2,
                              animation: bootReducedMotion
                                ? "none"
                                : "ipodLoadBar 2450ms linear forwards",
                              width: bootReducedMotion ? "100%" : undefined,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_6px_0px_rgba(0,0,0,0.5)]" />
          <div
            aria-hidden
            className="absolute border border-[rgba(0,0,0,0.25)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2)]"
          />
        </div>

        {/* Click wheel */}
        <div
          ref={wheelRef}
          className="relative rounded-[105px] shrink-0 size-[210px] cursor-ns-resize select-none"
          aria-label="Click wheel"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none rounded-[105px]"
            style={{
              backgroundImage:
                "linear-gradient(120.96deg, rgb(250,250,250) 18.75%, rgb(240,240,242) 50%, rgb(230,231,234) 81.25%)",
            }}
          />

          <button
            aria-label="Menu"
            onClick={(e) => {
              e.stopPropagation();
              if (bootPhase === "done") onMenu();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute -translate-x-1/2 left-1/2 top-[18px] z-10 outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
          >
            <span className="font-['Inter'] font-bold text-[10px] text-[#8a8d96] leading-none">
              MENU
            </span>
          </button>
          <button
            aria-label="Previous track"
            onClick={(e) => {
              e.stopPropagation();
              if (bootPhase === "done") onPrev();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute -translate-y-1/2 left-[18px] top-1/2 z-10 outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
          >
            <RewindIcon />
          </button>
          <button
            aria-label="Next track"
            onClick={(e) => {
              e.stopPropagation();
              if (bootPhase === "done") onNext();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute -translate-y-1/2 right-[18px] top-1/2 z-10 outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
          >
            <FastForwardIcon />
          </button>
          <button
            aria-label="Play or pause"
            onClick={(e) => {
              e.stopPropagation();
              if (bootPhase === "done") onPlayPause();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="absolute -translate-x-1/2 bottom-[18px] left-1/2 z-10 outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm"
          >
            <PlayCircleIcon />
          </button>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <button
              aria-label="Select"
              onClick={(e) => {
                e.stopPropagation();
                if (bootPhase === "idle") onBootStart();
                else if (bootPhase === "done") onActivate();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="pointer-events-auto relative rounded-[39px] size-[78px] outline-none focus-visible:ring-2 focus-visible:ring-[#1472ff] focus-visible:ring-offset-2"
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-[39px]"
                style={{
                  backgroundImage:
                    "linear-gradient(120.96deg, rgb(220,221,225) 18.75%, rgb(200,202,208) 50%, rgb(186,188,195) 81.25%)",
                }}
              />
              <div
                aria-hidden
                className="absolute border border-[#b8bac1] border-solid inset-0 rounded-[39px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.09)]"
              />
              <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.7)]" />
            </button>
          </div>

          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_3px_0px_rgba(255,255,255,0.6)]" />
          <div
            aria-hidden
            className="absolute border border-[#d8d9de] border-solid inset-0 pointer-events-none rounded-[105px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.06)]"
          />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_-1px_-1px_2px_0px_rgba(0,0,0,0.1),inset_1px_2px_3px_0px_rgba(255,255,255,0.96)]" />
      <div
        aria-hidden
        className="absolute border border-[#a8abb4] border-solid inset-0 pointer-events-none rounded-[28px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08),0px_20px_60px_0px_rgba(0,0,0,0.13)]"
      />
    </div>
  );
}

// ── Corner navigation ─────────────────────────────────────────────────────────

function CornerNavigation({
  isMuted,
  onToggleMute,
  onHelp,
  volume,
  onVolumeChange,
}: {
  isMuted: boolean;
  onToggleMute: () => void;
  onHelp: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
}) {
  return (
    <div className="absolute flex gap-[20px] items-center right-[32px] top-[32px]">
      <button
        onClick={onHelp}
        aria-label="Open Help screen"
        title="Open the Help screen inside the iPod"
        className="flex gap-[6px] items-center shrink-0 opacity-60 outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm transition-opacity"
      >
        <HelpIcon />
        <p className="font-['Inter'] font-medium text-[11px] text-[#6e6e73] whitespace-nowrap">
          Help
        </p>
      </button>
      {/* Mute/unmute toggle + inline volume slider */}
      <div className="flex gap-[6px] items-center">
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={
            isMuted
              ? "Audio muted — click to unmute"
              : "Audio on — click to mute"
          }
          className="flex gap-[5px] items-center shrink-0 outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#1472ff] rounded-sm transition-opacity"
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          <p
            className={[
              "font-['Inter'] font-medium text-[11px] whitespace-nowrap",
              isMuted ? "text-[#6e6e73] opacity-60" : "text-[#1472ff]",
            ].join(" ")}
          >
            {isMuted ? "Muted" : ""}
          </p>
        </button>
        {/* Inline volume slider — only visible when unmuted */}
        {!isMuted && (
          <label className="flex items-center" style={{ lineHeight: 0 }}>
            <span className="sr-only">Volume</span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(volume * 100)}
              onChange={(e) => onVolumeChange(Number(e.target.value) / 100)}
              aria-label="Volume"
              className="volume-slider"
              style={{
                width: 68,
                height: 3,
                accentColor: "#1472ff",
                cursor: "pointer",
                outline: "none",
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────

export default function App() {
  // ── Boot state ────────────────────────────────────────────────────────────
  const [bootPhase, setBootPhase] = useState<BootPhase>("idle");
  const [bootReducedMotion, setBootReducedMotion] = useState(false);
  const [bootLabel, setBootLabel] = useState(
    PORTFOLIO_DATA.ui.bootLoadingLabels[0],
  );
  const bootPhaseRef = useRef<BootPhase>("idle");
  useEffect(() => {
    bootPhaseRef.current = bootPhase;
  }, [bootPhase]);

  // ── Navigation state ──────────────────────────────────────────────────────
  const [view, setView] = useState<View>({ kind: "mainMenu" });
  const [mainMenuIndex, setMainMenuIndex] = useState(0);
  const [submenuIndices, setSubmenuIndices] = useState<Record<string, number>>(
    {},
  );
  const [songsSelectedIdx, setSongsSelectedIdx] = useState(0);
  const [skillItemIndices, setSkillItemIndices] = useState<
    Partial<Record<SkillCategoryId, number>>
  >({});
  const contentScrollRef = useRef<HTMLDivElement | null>(null);
  const searchControlRef = useRef<SearchScreenHandle | null>(null);

  const [preHelpView, setPreHelpView] = useState<View | null>(null);
  const preHelpViewRef = useRef<View | null>(null);

  const viewRef = useRef<View>(view);
  const mainMenuIndexRef = useRef(mainMenuIndex);
  const submenuIndicesRef = useRef(submenuIndices);
  const songsSelectedIdxRef = useRef(songsSelectedIdx);
  const skillItemIndicesRef = useRef(skillItemIndices);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);
  useEffect(() => {
    mainMenuIndexRef.current = mainMenuIndex;
  }, [mainMenuIndex]);
  useEffect(() => {
    submenuIndicesRef.current = submenuIndices;
  }, [submenuIndices]);
  useEffect(() => {
    songsSelectedIdxRef.current = songsSelectedIdx;
  }, [songsSelectedIdx]);
  useEffect(() => {
    skillItemIndicesRef.current = skillItemIndices;
  }, [skillItemIndices]);
  useEffect(() => {
    preHelpViewRef.current = preHelpView;
  }, [preHelpView]);

  // ── Audio state ───────────────────────────────────────────────────────────
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // starts unmuted at 50 %
  const [volume, setVolume] = useState(0.5); // 0–1; preserved across mute
  const [audioElapsed, setAudioElapsed] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const currentTrackIdxRef = useRef(0);
  const isMutedRef = useRef(false);
  const volumeRef = useRef(0.5);
  // Forward ref so onEnded (captured at mount) can call the stable loadAndMaybePlay
  const loadAndMaybePlayRef = useRef<
    (idx: number, shouldPlay: boolean) => void
  >(() => {});
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    currentTrackIdxRef.current = currentTrackIdx;
  }, [currentTrackIdx]);
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);
  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Create the shared audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    audio.muted = false;
    audio.volume = 0.5;
    audio.preload = "none";
    audioRef.current = audio;

    const onTimeUpdate = () => setAudioElapsed(audio.currentTime);
    const onDurationChange = () => {
      if (isFinite(audio.duration)) setAudioDuration(audio.duration);
    };
    const onEnded = () => {
      // Auto-advance to next track, wrapping from last back to first
      const nextIdx = (currentTrackIdxRef.current + 1) % TRACKS.length;
      loadAndMaybePlayRef.current(nextIdx, true);
    };
    const onError = () => {
      if (
        audio.networkState !== 3 /* NETWORK_NO_SOURCE */ &&
        audio.src &&
        audio.src !== location.href
      ) {
        setAudioError(PORTFOLIO_DATA.ui.musicUnavailableError);
        setIsPlaying(false);
        isPlayingRef.current = false;
      }
    };
    const onCanPlay = () => setAudioError(null);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("canplay", onCanPlay);
      audioRef.current = null;
    };
  }, []);

  // Load a track and optionally start playing. All reads go through refs/constants.
  const loadAndMaybePlay = useCallback((idx: number, shouldPlay: boolean) => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = TRACKS[clamp(idx, TRACKS.length - 1)];
    setCurrentTrackIdx(track.id);
    currentTrackIdxRef.current = track.id;
    setSongsSelectedIdx(track.id);
    setAudioElapsed(0);
    setAudioDuration(0);
    setAudioError(null);
    audio.pause();

    if (!track.audioSrc) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (shouldPlay) setAudioError(PORTFOLIO_DATA.ui.musicNoFileError);
      return;
    }

    audio.src = track.audioSrc;
    audio.load();
    audio.currentTime = 0;

    if (shouldPlay) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
          setAudioError(null);
        })
        .catch(() => {
          setAudioError(PORTFOLIO_DATA.ui.musicUnavailableError);
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
    } else {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  }, []);
  // Keep the forward ref current so onEnded always calls the latest version
  loadAndMaybePlayRef.current = loadAndMaybePlay;

  // Physical Click Wheel controls
  const handlePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      const track = TRACKS[currentTrackIdxRef.current];
      if (!track.audioSrc) {
        setAudioError(PORTFOLIO_DATA.ui.musicNoFileError);
        return;
      }
      // Load source if it isn't already loaded for this track
      const expected = new URL(track.audioSrc, location.href).href;
      if (audio.src !== expected) {
        audio.src = track.audioSrc;
        audio.load();
      }
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
          setAudioError(null);
        })
        .catch(() => {
          setAudioError(PORTFOLIO_DATA.ui.musicUnavailableError);
          setIsPlaying(false);
          isPlayingRef.current = false;
        });
    }
  }, []);

  const handlePrev = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime > 3) {
      // More than 3 s in — restart the current track instead of going back
      audio.currentTime = 0;
      setAudioElapsed(0);
    } else {
      // Wrap: Previous on track 0 goes to last track
      const prevIdx =
        (currentTrackIdxRef.current - 1 + TRACKS.length) % TRACKS.length;
      loadAndMaybePlay(prevIdx, isPlayingRef.current);
    }
  }, [loadAndMaybePlay]);

  const handleNext = useCallback(() => {
    // Wrap: Next on last track goes to first track
    const nextIdx = (currentTrackIdxRef.current + 1) % TRACKS.length;
    loadAndMaybePlay(nextIdx, isPlayingRef.current);
  }, [loadAndMaybePlay]);

  const startBoot = useCallback(() => {
    if (bootPhaseRef.current !== "idle") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setBootReducedMotion(reduced);
    setBootPhase("powering-on");
    if (reduced) {
      // Skip both reveal animations; brief boot then instant transition
      setTimeout(() => {
        setBootPhase("booting");
        setBootLabel(PORTFOLIO_DATA.ui.bootLoadingLabels[2]);
        setTimeout(() => {
          setBootPhase("revealing");
          setTimeout(() => setBootPhase("done"), 100);
        }, 700);
      }, 20);
    } else {
      // Full cinematic sequence — total ~4 s after activation
      setTimeout(() => {
        setBootPhase("booting");
        setBootLabel(PORTFOLIO_DATA.ui.bootLoadingLabels[0]);
        setTimeout(
          () => setBootLabel(PORTFOLIO_DATA.ui.bootLoadingLabels[1]),
          950,
        );
        setTimeout(
          () => setBootLabel(PORTFOLIO_DATA.ui.bootLoadingLabels[2]),
          2050,
        );
        setTimeout(() => {
          setBootPhase("revealing");
          setTimeout(() => setBootPhase("done"), 870);
        }, 2550);
      }, 620);
    }
  }, []);

  const handleToggleMute = useCallback(() => {
    setIsMuted((m) => !m);
    // No autoplay on unmute — playback only starts via Play/Pause button
  }, []);

  const handleVolumeChange = useCallback((v: number) => {
    setVolume(v);
    // Adjusting volume does not start playback
  }, []);

  const handleHelpButton = useCallback(() => {
    const current = viewRef.current;
    // Don't re-open Help if already on Help
    if (current.kind === "detail" && current.title === "Help") return;
    setPreHelpView(current);
    setView({ kind: "detail", title: "Help", parentKind: "mainMenu" });
  }, []);

  // Select a song (from Songs screen click or Center Select) → make current + navigate to Now Playing
  const handleSongActivate = useCallback(
    (idx: number) => {
      loadAndMaybePlay(idx, isPlayingRef.current);
      setView({
        kind: "detail",
        title: "Now Playing",
        parentKind: "submenu",
        parentId: "Music",
      });
    },
    [loadAndMaybePlay],
  );

  // ── Navigation ────────────────────────────────────────────────────────────

  const activate = useCallback(() => {
    const v = viewRef.current;
    if (v.kind === "mainMenu") {
      const item = MAIN_MENU[mainMenuIndexRef.current];
      if (SUBMENU_IDS.has(item))
        setView({ kind: "submenu", id: item as SubmenuId });
      else setView({ kind: "detail", title: item, parentKind: "mainMenu" });
    } else if (v.kind === "submenu") {
      const idx = submenuIndicesRef.current[v.id] ?? 0;
      const item = SUBMENUS[v.id][idx];
      if (item === "Search Projects" || item === "Search Experience") {
        setView({ kind: "search", parentId: v.id });
      } else if (v.id === "Skills") {
        // Skills categories open a second-level skill screen
        const cat = SKILL_CATEGORY_BY_NAME[item];
        if (cat) setView({ kind: "skillsCategory", categoryId: cat.id });
      } else if (v.id === "Certifications") {
        // Certifications are terminal — no navigation
      } else {
        setView({
          kind: "detail",
          title: item,
          parentKind: "submenu",
          parentId: v.id,
        });
      }
    } else if (v.kind === "skillsCategory") {
      // Individual skills are terminal — no navigation, no confirmation
    } else if (v.kind === "search") {
      searchControlRef.current?.activateSelection();
    } else if (
      v.kind === "detail" &&
      v.title === "Songs" &&
      v.parentId === "Music"
    ) {
      handleSongActivate(songsSelectedIdxRef.current);
    }
  }, [handleSongActivate]);

  const goBack = useCallback(() => {
    const v = viewRef.current;
    // If Help was opened via external button, restore the previous screen
    if (
      v.kind === "detail" &&
      v.title === "Help" &&
      preHelpViewRef.current !== null
    ) {
      const saved = preHelpViewRef.current;
      setPreHelpView(null);
      setView(saved);
      return;
    }
    if (v.kind === "submenu") {
      setView({ kind: "mainMenu" });
    } else if (v.kind === "search") {
      setView({ kind: "submenu", id: v.parentId });
    } else if (v.kind === "skillsCategory") {
      setView({ kind: "submenu", id: "Skills" });
    } else if (v.kind === "detail") {
      if (v.parentKind === "submenu" && v.parentId)
        setView({ kind: "submenu", id: v.parentId });
      else setView({ kind: "mainMenu" });
    }
  }, []);

  const handleScrollDelta = useCallback((delta: number) => {
    const v = viewRef.current;
    if (v.kind === "mainMenu") {
      setMainMenuIndex((i) => clamp(i + delta, MAIN_MENU.length - 1));
    } else if (v.kind === "submenu") {
      const max = SUBMENUS[v.id].length - 1;
      const id = v.id;
      setSubmenuIndices((prev) => ({
        ...prev,
        [id]: clamp((prev[id] ?? 0) + delta, max),
      }));
    } else if (v.kind === "search") {
      searchControlRef.current?.moveSelection(delta);
    } else if (v.kind === "skillsCategory") {
      const max = SKILL_ITEMS[v.categoryId].length - 1;
      const id = v.categoryId;
      setSkillItemIndices((prev) => ({
        ...prev,
        [id]: clamp((prev[id] ?? 0) + delta, max),
      }));
    } else if (
      v.kind === "detail" &&
      v.title === "Songs" &&
      v.parentId === "Music"
    ) {
      setSongsSelectedIdx((prev) => clamp(prev + delta, TRACKS.length - 1));
    } else {
      contentScrollRef.current?.scrollBy({
        top: delta * 30,
        behavior: "smooth",
      });
    }
  }, []);

  const handleRowSelect = useCallback((index: number) => {
    const v = viewRef.current;
    if (v.kind === "mainMenu") setMainMenuIndex(index);
    else if (v.kind === "submenu") {
      const id = v.id;
      setSubmenuIndices((prev) => ({ ...prev, [id]: index }));
    }
  }, []);

  // Global keyboard handler — registered once, reads live state through refs
  useEffect(() => {
    const SCROLL_PX = 30;
    const handler = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
      )
        return;

      // ── Boot guard ──────────────────────────────────────────────────────
      const bp = bootPhaseRef.current;
      if (bp === "idle") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          startBoot();
        }
        return;
      }
      if (bp !== "done") return;

      const v = viewRef.current;

      // ── Search view ─────────────────────────────────────────────────────
      if (v.kind === "search") {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          searchControlRef.current?.moveSelection(-1);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          searchControlRef.current?.moveSelection(1);
        } else if (e.key === "Escape") {
          e.preventDefault();
          setView({ kind: "submenu", id: v.parentId });
        }
        // Enter: button handles natively via onClick
        return;
      }

      // ── Skills category view ────────────────────────────────────────────
      if (v.kind === "skillsCategory") {
        const intercepted = ["ArrowUp", "ArrowDown", "Enter", " ", "Escape"];
        if (!intercepted.includes(e.key)) return;
        e.preventDefault();
        const max = SKILL_ITEMS[v.categoryId].length - 1;
        const id = v.categoryId;
        if (e.key === "ArrowUp")
          setSkillItemIndices((p) => ({
            ...p,
            [id]: clamp((p[id] ?? 0) - 1, max),
          }));
        if (e.key === "ArrowDown")
          setSkillItemIndices((p) => ({
            ...p,
            [id]: clamp((p[id] ?? 0) + 1, max),
          }));
        // Enter/Space on individual skills: no action (terminal items)
        if (e.key === "Escape") setView({ kind: "submenu", id: "Skills" });
        return;
      }

      // ── Songs view ──────────────────────────────────────────────────────
      const isSongsView =
        v.kind === "detail" && v.title === "Songs" && v.parentId === "Music";
      if (isSongsView) {
        const intercepted = ["ArrowUp", "ArrowDown", "Enter", " ", "Escape"];
        if (!intercepted.includes(e.key)) return;
        e.preventDefault();
        if (e.key === "ArrowUp")
          setSongsSelectedIdx((prev) => clamp(prev - 1, TRACKS.length - 1));
        if (e.key === "ArrowDown")
          setSongsSelectedIdx((prev) => clamp(prev + 1, TRACKS.length - 1));
        if (e.key === "Enter" || e.key === " ") {
          loadAndMaybePlay(songsSelectedIdxRef.current, isPlayingRef.current);
          setView({
            kind: "detail",
            title: "Now Playing",
            parentKind: "submenu",
            parentId: "Music",
          });
        }
        if (e.key === "Escape") setView({ kind: "submenu", id: "Music" });
        return;
      }

      // ── All other views ─────────────────────────────────────────────────
      const intercepted = ["ArrowUp", "ArrowDown", "Enter", " ", "Escape"];
      if (!intercepted.includes(e.key)) return;
      e.preventDefault();

      if (v.kind === "mainMenu") {
        if (e.key === "ArrowUp")
          setMainMenuIndex((i) => clamp(i - 1, MAIN_MENU.length - 1));
        if (e.key === "ArrowDown")
          setMainMenuIndex((i) => clamp(i + 1, MAIN_MENU.length - 1));
        if (e.key === "Enter" || e.key === " ") {
          const item = MAIN_MENU[mainMenuIndexRef.current];
          if (SUBMENU_IDS.has(item))
            setView({ kind: "submenu", id: item as SubmenuId });
          else setView({ kind: "detail", title: item, parentKind: "mainMenu" });
        }
      } else if (v.kind === "submenu") {
        const max = SUBMENUS[v.id].length - 1;
        const id = v.id;
        if (e.key === "ArrowUp")
          setSubmenuIndices((p) => ({
            ...p,
            [id]: clamp((p[id] ?? 0) - 1, max),
          }));
        if (e.key === "ArrowDown")
          setSubmenuIndices((p) => ({
            ...p,
            [id]: clamp((p[id] ?? 0) + 1, max),
          }));
        if (e.key === "Enter" || e.key === " ") {
          const idx = submenuIndicesRef.current[id] ?? 0;
          const item = SUBMENUS[id as SubmenuId][idx];
          if (item === "Search Projects" || item === "Search Experience") {
            setView({ kind: "search", parentId: id as SubmenuId });
          } else if (id === "Skills") {
            const cat = SKILL_CATEGORY_BY_NAME[item];
            if (cat) setView({ kind: "skillsCategory", categoryId: cat.id });
          } else if (id === "Certifications") {
            // Certifications are terminal — no navigation
          } else {
            setView({
              kind: "detail",
              title: item,
              parentKind: "submenu",
              parentId: id as SubmenuId,
            });
          }
        }
        if (e.key === "Escape") setView({ kind: "mainMenu" });
      } else {
        // Other detail views (Now Playing, About the Music, Project detail, etc.)
        if (e.key === "ArrowUp")
          contentScrollRef.current?.scrollBy({
            top: -SCROLL_PX,
            behavior: "smooth",
          });
        if (e.key === "ArrowDown")
          contentScrollRef.current?.scrollBy({
            top: SCROLL_PX,
            behavior: "smooth",
          });
        if (e.key === "Escape") {
          if (
            v.kind === "detail" &&
            v.title === "Help" &&
            preHelpViewRef.current !== null
          ) {
            const saved = preHelpViewRef.current;
            setPreHelpView(null);
            setView(saved);
          } else if (
            v.kind === "detail" &&
            v.parentKind === "submenu" &&
            v.parentId
          ) {
            setView({ kind: "submenu", id: v.parentId });
          } else {
            setView({ kind: "mainMenu" });
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [loadAndMaybePlay, startBoot]);

  // ── Resolve screen content ────────────────────────────────────────────────

  let isScrollableView = false;
  let screenContent: React.ReactNode;
  let viewKey: string;

  // Derive a concise screen title for the status bar
  const screenTitle = (() => {
    const v = view;
    if (v.kind === "mainMenu") return "Home";
    if (v.kind === "submenu") return v.id;
    if (v.kind === "search") return `Search ${v.parentId}`;
    if (v.kind === "skillsCategory") {
      return (
        SKILL_CATEGORIES.find((c) => c.id === v.categoryId)?.name ?? "Skills"
      );
    }
    if (v.kind === "detail") {
      const { title } = v;
      if (title === "Now Playing") return "Now Playing";
      if (title === "Songs") return "Songs";
      if (title === "About the Music") return "About the Music";
      if (title === "About Me") return "About Me";
      if (title === "MEng Computer Science") return "MEng Computer Science";
      if (title === "A Levels") return "A Levels";
      if (title === "CV") return "CV";
      if (title === "Contact") return "Contact";
      if (title === "Help") return "Help";
      return title; // Project Template 1, Experience Template 1, etc.
    }
    return "iPod";
  })();

  if (view.kind === "mainMenu") {
    viewKey = "mainMenu";
    screenContent = (
      <SplitScreen
        items={MAIN_MENU}
        selectedIndex={mainMenuIndex}
        onSelect={handleRowSelect}
        renderPreview={() => (
          <MainMenuPreview track={TRACKS[currentTrackIdx]} />
        )}
      />
    );
  } else if (view.kind === "submenu") {
    const { id } = view;
    const items = SUBMENUS[id];
    const idx = submenuIndices[id] ?? 0;
    viewKey = `submenu-${id}`;
    screenContent = (
      <SplitScreen
        items={items}
        selectedIndex={idx}
        onSelect={handleRowSelect}
        renderPreview={() => (
          <SubMenuPreview
            itemName={items[idx]}
            currentTrack={TRACKS[currentTrackIdx]}
            songsTrack={TRACKS[songsSelectedIdx]}
          />
        )}
        terminalItems={
          id === "Certifications" ? CERT_TERMINAL_ITEMS : undefined
        }
      />
    );
  } else if (view.kind === "search") {
    const { parentId } = view;
    viewKey = `search-${parentId}`;
    screenContent = (
      <SearchScreen
        ref={searchControlRef}
        parentId={parentId}
        onSelectResult={(title) =>
          setView({ kind: "detail", title, parentKind: "submenu", parentId })
        }
        onClose={() => setView({ kind: "submenu", id: parentId })}
      />
    );
  } else if (view.kind === "skillsCategory") {
    const { categoryId } = view;
    const catItems = SKILL_ITEMS[categoryId];
    const selIdx = skillItemIndices[categoryId] ?? 0;
    viewKey = `skillsCat-${categoryId}`;
    screenContent = (
      <SkillCategoryScreen
        categoryId={categoryId}
        items={catItems}
        selectedIdx={selIdx}
        onHighlight={(idx) =>
          setSkillItemIndices((prev) => ({ ...prev, [categoryId]: idx }))
        }
      />
    );
  } else {
    // detail
    const { title, parentId } = view;
    const isSongs = title === "Songs" && parentId === "Music";
    isScrollableView = !isSongs;

    if (parentId === "Music" && title === "Now Playing") {
      viewKey = "nowPlaying";
      screenContent = (
        <NowPlayingScreen
          track={TRACKS[currentTrackIdx]}
          isPlaying={isPlaying}
          isMuted={isMuted}
          elapsed={audioElapsed}
          duration={audioDuration}
          error={audioError}
        />
      );
    } else if (parentId === "Music" && title === "Songs") {
      viewKey = "songs";
      screenContent = (
        <SongsScreen
          selectedIdx={songsSelectedIdx}
          currentTrackIdx={currentTrackIdx}
          isPlaying={isPlaying}
          onHighlight={setSongsSelectedIdx}
          onActivate={handleSongActivate}
        />
      );
    } else if (parentId === "Music" && title === "About the Music") {
      viewKey = "aboutMusic";
      screenContent = <AboutMusicScreen />;
    } else if (parentId === "Projects" && PROJECT_BY_TITLE[title]) {
      viewKey = `projectDetail-${title}`;
      screenContent = <ProjectDetailScreen title={title} />;
    } else if (parentId === "Experience" && EXPERIENCE_BY_TITLE[title]) {
      viewKey = `experienceDetail-${title}`;
      screenContent = <ExperienceDetailScreen title={title} />;
    } else if (title === "About Me") {
      viewKey = "aboutMe";
      screenContent = <AboutMeScreen />;
    } else if (EDUCATION_BY_TITLE[title]) {
      viewKey = `education-${title}`;
      screenContent = <EducationDetailScreen menuTitle={title} />;
    } else if (title === "CV") {
      viewKey = "cv";
      screenContent = <CVScreen />;
    } else if (title === "Contact") {
      viewKey = "contact";
      screenContent = <ContactScreen />;
    } else if (title === "Help") {
      viewKey = "help";
      screenContent = <HelpScreen />;
    } else {
      viewKey = `detail-${title}`;
      screenContent = <DetailScreen title={title} />;
    }
  }

  // Cream layer clip-path for the page-reveal phase
  const creamClipPath = (() => {
    if (bootPhase === "done") return "none";
    if (bootPhase === "revealing") return undefined; // animation handles it
    return "circle(0px at 50% 50%)";
  })();

  return (
    <div
      className="flex items-center justify-center relative size-full"
      style={{ background: "#1b1713" }}
      role="application"
      aria-label="iPod Portfolio"
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ipodImgLabel { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ipodPowerOn {
          from { clip-path: circle(0px at 50% 46%); }
          to   { clip-path: circle(200px at 50% 46%); }
        }
        @keyframes ipodLoadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes ipodIdlePulse {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.85; }
        }
        @keyframes ipodReveal {
          from { clip-path: circle(0px at 50% 50%); }
          to   { clip-path: circle(150vmax at 50% 50%); }
        }
      `}</style>

      {/* Cream background — hidden during boot, revealed with circular clip-path */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "#f4f0ea",
          zIndex: 0,
          clipPath: creamClipPath,
          animation:
            bootPhase === "revealing"
              ? bootReducedMotion
                ? "fadeIn 180ms ease-out both"
                : "ipodReveal 850ms cubic-bezier(0.35,0,0.15,1) forwards"
              : "none",
        }}
      />

      {/* iPod — centred, above cream layer */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Ipod
          screenContent={screenContent}
          contentScrollable={isScrollableView}
          viewKey={viewKey}
          contentScrollRef={contentScrollRef}
          isPlaying={isPlaying}
          title={screenTitle}
          bootPhase={bootPhase}
          bootReducedMotion={bootReducedMotion}
          bootLabel={bootLabel}
          onActivate={activate}
          onMenu={goBack}
          onPlayPause={handlePlayPause}
          onPrev={handlePrev}
          onNext={handleNext}
          onScrollDelta={handleScrollDelta}
          onBootStart={startBoot}
        />
      </div>

      {/* External controls — non-interactive fade-in wrapper during reveal only */}
      {bootPhase === "revealing" && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "none",
            animation: "fadeIn 500ms ease-out 500ms both",
          }}
        >
          <CornerNavigation
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onHelp={handleHelpButton}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        </div>
      )}
      {/* After reveal: render directly — no full-viewport wrapper */}
      {bootPhase === "done" && (
        <CornerNavigation
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onHelp={handleHelpButton}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      )}
    </div>
  );
}
