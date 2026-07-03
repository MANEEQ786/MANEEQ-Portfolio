"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Slide-in right-side panel that shows the full write-up for a service when its
// "Read More" (or title) is clicked in the Service section. The triggers live in
// the server-rendered markup and dispatch a window event; this drawer listens.

type Section = { heading: string; body: string };
type Service = { title: string; subtitle: string; intro: string; sections: Section[] };

export const SERVICES: Record<string, Service> = {
  mvp: {
    title: "MVP Development",
    subtitle: "Turn Your Vision Into a Market-Validated Product",
    intro:
      "Bringing a new idea to life can be challenging, especially when resources, time, and market uncertainty are major concerns. Our MVP (Minimum Viable Product) Development service is designed to help startups, entrepreneurs, and businesses transform innovative concepts into functional digital products that can be tested and validated in the real world. Rather than investing heavily in a full-featured solution from the beginning, we focus on building a streamlined version of your product that delivers core value to users while minimizing risk and development costs.",
    sections: [
      {
        heading: "From Concept To Launch",
        body:
          "Our process begins with understanding your business goals, target audience, and market opportunities. Through strategic discovery workshops and product planning sessions, we identify the most critical features required to validate your idea. We then create user-centric designs, intuitive interfaces, and scalable technical architectures that support future growth. By prioritizing functionality that directly addresses user needs, we help businesses launch faster and gain valuable market feedback early in the product lifecycle.",
      },
      {
        heading: "Rapid Development With Scalability In Mind",
        body:
          "Speed is important, but sustainability is equally critical. Our development team leverages modern technologies and agile methodologies to deliver high-quality MVPs without compromising future scalability. Every solution is built with clean architecture, secure infrastructure, and flexible frameworks that allow new features and capabilities to be added seamlessly as your product evolves. This ensures that your MVP serves as a strong foundation for long-term business growth rather than a temporary prototype.",
      },
      {
        heading: "Data-Driven Product Improvement",
        body:
          "Launching an MVP is only the beginning of the journey. Once your product is live, we help you analyze user behavior, collect customer feedback, and identify opportunities for improvement. Through analytics, performance monitoring, and iterative development cycles, we continuously refine the product based on real-world insights. This approach enables businesses to make informed decisions, improve user satisfaction, and invest resources where they create the greatest impact.",
      },
      {
        heading: "Why Partner With Us",
        body:
          "We understand the unique challenges faced by startups and growing businesses. Our team combines technical expertise, product strategy, and industry experience to deliver MVPs that are not only functional but also positioned for success. Whether you're seeking investor validation, early customer acquisition, or proof of concept, we provide the tools and expertise needed to move from idea to execution with confidence.",
      },
    ],
  },
  saas: {
    title: "SaaS Platforms",
    subtitle: "Building Software Products Designed For Growth",
    intro:
      "Software-as-a-Service has become one of the most successful and scalable business models in the digital economy. Our SaaS Platform Development service helps businesses create powerful cloud-based applications that generate recurring revenue, improve operational efficiency, and deliver exceptional customer experiences. From startup founders launching innovative products to established enterprises modernizing legacy systems, we develop SaaS solutions tailored to specific business goals and market demands.",
    sections: [
      {
        heading: "End-To-End SaaS Product Development",
        body:
          "Creating a successful SaaS platform requires much more than writing code. We provide comprehensive product development services that cover strategy, architecture, design, development, testing, deployment, and ongoing support. Our team works closely with stakeholders to understand business workflows, customer requirements, and scalability expectations before building a platform that aligns with long-term objectives.",
      },
      {
        heading: "Designed For Scalability And Performance",
        body:
          "As your user base grows, your software must be capable of handling increasing demands without sacrificing performance. We build SaaS applications using modern cloud-native technologies, scalable infrastructures, and optimized database architectures that ensure reliability and efficiency at every stage of growth. Whether serving hundreds or millions of users, our platforms are engineered to deliver consistent performance, security, and uptime.",
      },
      {
        heading: "Subscription Management And Business Automation",
        body:
          "A successful SaaS business relies on streamlined operations and efficient revenue management. Our solutions include subscription management systems, recurring billing, payment gateway integrations, customer portals, analytics dashboards, and administrative tools that simplify business operations. By automating critical processes, we help organizations reduce manual workloads, improve customer satisfaction, and focus on strategic growth initiatives.",
      },
      {
        heading: "Security And Compliance",
        body:
          "Trust is a fundamental component of every SaaS product. We implement industry-standard security practices, data protection measures, authentication systems, and compliance frameworks to ensure your platform remains secure and reliable. From user data protection to secure payment processing, every aspect of the application is developed with security as a top priority.",
      },
      {
        heading: "Why Businesses Choose Our SaaS Expertise",
        body:
          "Our team combines technical excellence with business understanding to create SaaS products that deliver measurable results. We focus on building solutions that are easy to use, simple to manage, and capable of supporting long-term growth. By partnering with us, businesses gain a technology partner dedicated to helping them build sustainable and profitable software products.",
      },
    ],
  },
  hr: {
    title: "Agentic AI Ecosystem",
    subtitle: "Revolutionizing Human Resources Through Artificial Intelligence",
    intro:
      "Human Resources departments are under increasing pressure to attract top talent, improve employee engagement, streamline operations, and make data-driven decisions. Our Agentic AI Ecosystem solutions help organizations modernize their HR processes through intelligent automation, predictive analytics, and machine learning technologies. By leveraging the power of artificial intelligence, we enable HR teams to operate more efficiently while delivering better experiences for both candidates and employees.",
    sections: [
      {
        heading: "Smarter Recruitment And Talent Acquisition",
        body:
          "Finding the right candidate is one of the most time-consuming challenges for HR professionals. Our AI-powered recruitment solutions automate candidate screening, resume analysis, skill matching, and applicant ranking, allowing hiring teams to focus on the most qualified candidates. By reducing manual effort and improving decision-making accuracy, organizations can significantly shorten hiring cycles while enhancing the quality of their recruitment outcomes.",
      },
      {
        heading: "Intelligent Employee Onboarding",
        body:
          "A successful onboarding experience plays a critical role in employee retention and productivity. Our AI-driven onboarding solutions provide personalized learning paths, automated documentation management, virtual assistants, and interactive guidance systems that help new employees integrate quickly into the organization. These tools ensure consistency, reduce administrative burden, and create a positive first impression for new team members.",
      },
      {
        heading: "Workforce Analytics And Employee Engagement",
        body:
          "Understanding employee performance and satisfaction is essential for long-term organizational success. We develop advanced analytics platforms that help businesses monitor workforce trends, track engagement levels, identify performance patterns, and predict retention risks. Through real-time insights and intelligent reporting, HR leaders can make proactive decisions that improve employee satisfaction and organizational effectiveness.",
      },
      {
        heading: "AI-Powered HR Assistants",
        body:
          "Our intelligent HR assistants provide employees with instant access to company policies, benefits information, leave management, onboarding resources, and frequently asked questions. Available around the clock, these AI-powered systems improve accessibility, reduce support workloads, and ensure employees receive timely assistance whenever needed.",
      },
      {
        heading: "Driving The Future Of Human Capital Management",
        body:
          "Artificial intelligence is reshaping how organizations manage and develop talent. By combining cutting-edge technology with practical HR expertise, we create solutions that increase efficiency, reduce operational costs, and empower businesses to make smarter workforce decisions. Our goal is to help organizations build stronger teams through innovation, automation, and data-driven insights.",
      },
    ],
  },
  team: {
    title: "Team Building",
    subtitle: "Building High-Performance Teams That Drive Business Success",
    intro:
      "The success of any technology company depends on the quality of its people. Our Team Building service helps organizations identify, recruit, and integrate exceptional engineering talent capable of contributing to business growth from day one. Whether you are scaling a startup, expanding an existing development team, or launching a new product initiative, we provide access to highly skilled professionals who align with your technical requirements and organizational culture.",
    sections: [
      {
        heading: "Talent Acquisition Beyond Traditional Recruitment",
        body:
          "Hiring technical professionals requires a deep understanding of both technology and business needs. Our recruitment specialists work closely with engineering leaders and stakeholders to define role requirements, evaluate candidate capabilities, and identify professionals who possess the skills necessary to succeed. This strategic approach ensures that every hire contributes meaningful value to the organization.",
      },
      {
        heading: "Rigorous Technical Evaluation",
        body:
          "Finding talent is only part of the process. We conduct comprehensive technical assessments, coding evaluations, architecture reviews, and problem-solving exercises to verify candidate expertise before introducing them to clients. This thorough evaluation process helps organizations reduce hiring risks and maintain high standards of quality across their teams.",
      },
      {
        heading: "Team Augmentation And Dedicated Development Teams",
        body:
          "Businesses often need flexible staffing solutions to meet changing project demands. Our team augmentation services provide access to experienced developers, designers, DevOps engineers, AI specialists, QA professionals, and project managers who can seamlessly integrate into existing teams. For organizations seeking a more comprehensive solution, we also build dedicated development teams focused exclusively on achieving project objectives.",
      },
      {
        heading: "Onboarding And Team Integration",
        body:
          "Successful hiring extends beyond recruitment. We assist organizations with onboarding strategies, team integration processes, communication frameworks, and productivity optimization to ensure new team members become effective contributors as quickly as possible. Our support helps businesses maintain momentum while fostering collaboration and long-term success.",
      },
      {
        heading: "Creating Sustainable Growth Through Exceptional Talent",
        body:
          "Technology evolves rapidly, but great teams remain the foundation of every successful business. By helping organizations attract, evaluate, and retain top-tier professionals, we empower them to accelerate innovation, improve operational efficiency, and achieve their strategic goals. Our commitment is to build teams that not only meet today's challenges but also support tomorrow's growth opportunities.",
      },
    ],
  },
};

const OPEN_EVENT = "open-service-panel";

// Trigger rendered in place of the original "Read More" / title link. Keeps the
// theme's anchor styling (so the look is unchanged) but opens the drawer.
export function ServiceTrigger({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
      }}
    >
      {children}
    </a>
  );
}

export default function ServiceDrawer() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onOpen = (e: Event) => setOpenId((e as CustomEvent).detail as string);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  // Lock body scroll + close on Escape while the panel is open.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openId]);

  if (!mounted) return null;

  const service = openId ? SERVICES[openId] : null;
  const open = !!service;

  return createPortal(
    <>
      {/* Dim overlay */}
      <div
        onClick={() => setOpenId(null)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity 0.35s ease, visibility 0.35s ease",
          zIndex: 99998,
        }}
      />

      {/* Sliding panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={service?.title}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(540px, 100%)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          background: "linear-gradient(155deg, #06231a 0%, #0c6b40 45%, #28E98C 100%)",
          color: "#fff",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            padding: "28px 32px 18px",
            flexShrink: 0,
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "26px", fontWeight: 700, lineHeight: 1.2, color: "#fff" }}>{service?.title}</h3>
          </div>
          <button
            type="button"
            onClick={() => setOpenId(null)}
            aria-label="Close"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "#fff",
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "18px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", padding: "0 32px 40px", flex: 1, minHeight: 0 }}>
          {service && (
            <>
              <p style={{ fontSize: "17px", fontWeight: 600, margin: "0 0 18px", color: "#e8fff4" }}>
                {service.subtitle}
              </p>
              <p style={{ fontSize: "14.5px", lineHeight: 1.7, margin: "0 0 8px", color: "rgba(255,255,255,0.82)" }}>
                {service.intro}
              </p>
              {service.sections.map((s) => (
                <div key={s.heading} style={{ marginTop: "26px" }}>
                  <h4 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 10px", color: "#fff" }}>{s.heading}</h4>
                  <p style={{ fontSize: "14.5px", lineHeight: 1.7, margin: 0, color: "rgba(255,255,255,0.82)" }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </aside>
    </>,
    document.body
  );
}
