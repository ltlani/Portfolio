"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react"
import Header from "@/components/header"
import portfolioImage from "./portfolio.png"
import verbaDashboardImage from "./verba-dashboard.png"
import verbaGallery1 from "./verba-gallery1.png"
import verbaGallery2 from "./verba-gallery2.png"
import verbaGallery4 from "./verba-gallery4.png"
import verbaGallery5 from "./verba-gallery5.png"
import verbaGallery6 from "./verba-gallery6.png"
import verbaGallery7 from "./verba-gallery7.png"
import verbaGallery8 from "./verba-gallery8.png"

type Section = "education" | "projects" | "future"
type View = "home" | "experiences"
type Project = {
  title: string
  description: string
  modalDescription?: string
  tech: string[]
  image: string
  gallery?: string[]
  link?: string
}

const verbaGalleryImages = [
  verbaDashboardImage.src,
  verbaGallery1.src,
  verbaGallery2.src,
  verbaGallery4.src,
  verbaGallery5.src,
  verbaGallery6.src,
  verbaGallery7.src,
  verbaGallery8.src,
]

const educationContent = [
  {
    title: "VWO 4 (Pre-university education)",
    institution: "Het Amsterdams Lyceum",
    period: "Current",
    description:
      "Studying at one of Amsterdam's leading secondary schools while building products and learning software development",
  },
]

const projectsContent: Project[] = [
  {
    title: "Verba",
    description:
      "AI character creation platform that lets users design and connect conversational AIs to Discord, Twitter/X, Bluesky, and soon WhatsApp. Handling everything from backend infrastructure to UI design and deployment.",
    modalDescription:
      "Verba is an AI character creation platform for designing conversational agents and connecting them to social and messaging platforms from one dashboard.",
    tech: ["Node.js", "AI/LLM Integration", "Discord API", "Twitter API", "Docker", "And More.."],
    image: verbaDashboardImage.src,
    gallery: verbaGalleryImages,
    link: "verba.ink",
  },
  {
    title: "Portfolio Website",
    description:
      "Fully AI-assisted and customized portfolio website showcasing projects, skills, and personal growth as a young developer exploring AI and product design.",
    modalDescription:
      "A customized portfolio built to present projects, technical interests, and personal growth in one visual web experience.",
    tech: ["React", "Next.js", "Tailwind CSS", "WebGL"],
    image: portfolioImage.src,
  },
]

const futureContent = [
  {
    title: "Build Innovative AI Systems",
    description: "Creating AI systems that make technology more natural, accessible, and creative for everyone",
    status: "In Progress",
  },
  {
    title: "Grow Verba into a Global Platform",
    description:
      "Expanding Verba's reach and capabilities to become a leading AI character creation platform worldwide",
    status: "Active",
  },
  {
    title: "Found or Join AI-Focused Tech Company",
    description:
      "Leading projects that push the limits of what AI can do, focusing on machine learning, software architecture, and business development",
    status: "Long-term Goal",
  },
]

const homeProjects = projectsContent.map((project) => ({
  title: project.title,
  description:
    project.title === "Verba"
      ? "AI character creation platform with Discord, Twitter/X, and Bluesky integration"
      : "Fully AI-assisted portfolio showcasing projects and skills",
  tech: project.tech.slice(0, 3),
  image: project.image,
}))

function getProjectImages(project: Project) {
  return project.gallery?.length ? project.gallery : [project.image]
}

export default function Portfolio() {
  const [currentView, setCurrentView] = useState<View>("home")
  const [activeSection, setActiveSection] = useState<Section>("education")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const experiencesScrollRef = useRef<HTMLElement | null>(null)

  // Reset scroll position and disable/enable body scroll when switching views
  useEffect(() => {
    window.scrollTo(0, 0)
    if (currentView === "home") {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
    }
  }, [currentView])

  useEffect(() => {
    if (currentView !== "experiences") {
      return
    }

    window.scrollTo(0, 0)
    experiencesScrollRef.current?.scrollTo({ top: 0, left: 0 })
  }, [activeSection, currentView])

  const selectedProject = selectedProjectIndex === null ? null : projectsContent[selectedProjectIndex] ?? null
  const selectedProjectImages = selectedProject ? getProjectImages(selectedProject) : []
  const activeProjectImage = selectedProjectImages[activeGalleryIndex] ?? selectedProject?.image

  useEffect(() => {
    if (!selectedProject) {
      return
    }

    const imageCount = selectedProjectImages.length
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProjectIndex(null)
        return
      }

      if (imageCount < 2) {
        return
      }

      if (event.key === "ArrowRight") {
        setActiveGalleryIndex((current) => (current + 1) % imageCount)
      }

      if (event.key === "ArrowLeft") {
        setActiveGalleryIndex((current) => (current - 1 + imageCount) % imageCount)
      }
    }

    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedProject, selectedProjectImages.length])

  const openProjectModal = (index: number) => {
    setSelectedProjectIndex(index)
    setActiveGalleryIndex(0)
  }

  const stepProjectImage = (direction: 1 | -1) => {
    if (selectedProjectImages.length < 2) {
      return
    }

    setActiveGalleryIndex(
      (current) => (current + direction + selectedProjectImages.length) % selectedProjectImages.length,
    )
  }

  return (
    <>
      <Header />

      {/* Home View */}
      <main
        className={`absolute inset-0 z-20 flex items-center justify-center px-4 md:px-8 py-16 md:py-24 lg:py-32 pb-24 md:pb-40 overflow-hidden transition-all duration-700 ${
          currentView === "home" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        <div
          className={`max-w-4xl w-full text-center transition-all duration-700 ${showProjects ? "mt-12 md:mt-20" : ""}`}
        >
          <div
            className={`transition-all duration-700 ${showProjects ? "opacity-0 scale-95 -translate-y-8 pointer-events-none absolute" : "opacity-100 scale-100 translate-y-0"}`}
          >
            <div
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 md:mb-6 relative"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
              <span className="text-white/90 text-[10px] md:text-xs font-light relative z-10">
                16-year-old developer from Amsterdam
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight font-light text-white mb-4 md:mb-6 px-2">
              <span className="font-medium italic instrument"></span> Developer
              <br />
              <span className="font-light tracking-tight text-white">& Entrepreneur</span>
            </h1>

            <p className="text-xs md:text-sm font-light text-white/70 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
              Building innovative AI systems and digital products. Founder of Verba, an AI character creation platform.
              Passionate about merging creativity with technology through web apps, automation, and conversational AI.
            </p>

            <div className="flex items-center justify-center gap-2 mb-6 md:mb-8 flex-wrap px-4">
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm text-white/80 text-[10px] md:text-xs font-light border border-white/10">
                JavaScript
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm text-white/80 text-[10px] md:text-xs font-light border border-white/10">
                TypeScript
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm text-white/80 text-[10px] md:text-xs font-light border border-white/10">
                Python
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm text-white/80 text-[10px] md:text-xs font-light border border-white/10">
                React
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm text-white/80 text-[10px] md:text-xs font-light border border-white/10">
                Node.js
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 backdrop-blur-sm text-white/80 text-[10px] md:text-xs font-light border border-white/10">
                AI/LLM
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap px-4">
              <button
                onClick={() => setCurrentView("experiences")}
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer inline-block"
              >
                Experiences
              </button>
              <a
                href="https://www.linkedin.com/in/ouadielaachkar/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer inline-block"
              >
                Get in Touch
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 max-w-2xl mx-auto px-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-1 md:mb-2">2+</div>
                <div className="text-[10px] md:text-xs font-light text-white/60">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-1 md:mb-2">16</div>
                <div className="text-[10px] md:text-xs font-light text-white/60">Years Old</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-1 md:mb-2">VWO 4</div>
                <div className="text-[10px] md:text-xs font-light text-white/60">Student</div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 ${showProjects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none absolute"}`}
          >
            <div className="flex items-center justify-between mb-6 md:mb-8 px-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">Featured Work</h2>
              <button
                onClick={() => setShowProjects(false)}
                className="px-4 md:px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-light transition-all duration-200 hover:bg-white/10 hover:border-white/30 cursor-pointer"
              >
                ← Back
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 px-4">
              {homeProjects.map((project, index) => (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => openProjectModal(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      openProjectModal(index)
                    }
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-left transition-all duration-300 hover:bg-white/10 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 cursor-pointer"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: showProjects ? "slideInUp 0.6s ease-out forwards" : "none",
                  }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-light text-white mb-2">{project.title}</h3>
                    <p className="text-xs font-light text-white/60 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs font-light border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Experiences View */}
      <main
        ref={experiencesScrollRef}
        className={`absolute inset-0 z-20 flex items-start justify-center overflow-y-auto px-3 sm:px-4 md:px-8 pt-24 sm:pt-28 md:pt-[22vh] lg:pt-[clamp(10rem,26vh,17rem)] pb-16 sm:pb-20 lg:pb-24 transition-all duration-700 ${
          currentView === "experiences" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:items-start">
          <div className="lg:hidden mb-2 sm:mb-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-light text-xs sm:text-sm flex items-center justify-between transition-all duration-200 active:bg-white/10"
            >
              <span className="truncate">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</span>
              <svg
                className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ml-2 transition-transform duration-300 ${mobileMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <aside
            className={`overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? "max-h-[500px] opacity-100 mb-4" : "max-h-0 opacity-0 mb-0"
            } lg:max-h-none lg:opacity-100 lg:block w-full lg:w-64 flex-shrink-0 lg:mb-0 lg:self-start`}
          >
            <div className="lg:sticky lg:top-24 rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 md:p-6">
              <div className="absolute top-0 left-3 sm:left-4 right-3 sm:right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />

              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-3 sm:mb-4 md:mb-6">Experiences</h2>

              <nav className="space-y-1.5 sm:space-y-2">
                <button
                  onClick={() => {
                    setActiveSection("education")
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-light transition-all duration-200 active:scale-[0.98] ${
                    activeSection === "education"
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-white/60 active:text-white/80 active:bg-white/5"
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => {
                    setActiveSection("projects")
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-light transition-all duration-200 active:scale-[0.98] ${
                    activeSection === "projects"
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-white/60 active:text-white/80 active:bg-white/5"
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => {
                    setActiveSection("future")
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-light transition-all duration-200 active:scale-[0.98] ${
                    activeSection === "future"
                      ? "bg-white/10 text-white border border-white/20"
                      : "text-white/60 active:text-white/80 active:bg-white/5"
                  }`}
                >
                  Future
                </button>
              </nav>

              <button
                onClick={() => setCurrentView("home")}
                className="mt-3 sm:mt-4 md:mt-6 block w-full text-center px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white/80 text-[10px] sm:text-xs font-light transition-all duration-200 active:bg-white/10 active:border-white/30 active:scale-[0.98]"
              >
                Back to Home
              </button>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 min-w-0 lg:self-start">
            {/* Education Section */}
            {activeSection === "education" && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 md:mb-8">Education</h1>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  {educationContent.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-6 md:p-8 transition-all duration-300 active:bg-white/10 active:border-white/20"
                    >
                      <div className="absolute top-0 left-3 sm:left-4 md:left-8 right-3 sm:right-4 md:right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-1 sm:mb-2 break-words">{item.title}</h3>
                          <p className="text-xs sm:text-sm font-light text-white/70 break-words">{item.institution}</p>
                        </div>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 text-white/60 text-[10px] sm:text-xs font-light border border-white/10 self-start whitespace-nowrap">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-light text-white/60 leading-relaxed break-words">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Section */}
            {activeSection === "projects" && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 md:mb-8 lg:mt-0">Projects</h1>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  {projectsContent.map((project, index) => (
                    <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      onClick={() => openProjectModal(index)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          openProjectModal(index)
                        }
                      }}
                      className="group rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden text-left transition-all duration-300 hover:bg-white/10 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:bg-white/10 active:border-white/20 cursor-pointer"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-active:scale-105"
                        />
                      </div>
                      <div className="p-3 sm:p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-2">
                          <h3 className="text-base sm:text-lg md:text-xl font-light text-white break-words">{project.title}</h3>
                          {project.link && (
                            <a
                              href={`https://${project.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              onKeyDown={(event) => event.stopPropagation()}
                              className="text-[10px] sm:text-xs font-light text-white/60 active:text-white/90 transition-colors whitespace-nowrap"
                            >
                              {project.link} →
                            </a>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm md:text-sm font-light text-white/60 mb-3 sm:mb-4 leading-relaxed break-words">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.tech.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 text-white/70 text-[9px] sm:text-[10px] md:text-xs font-light border border-white/10 break-words"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            )}

            {/* Future Section */}
            {activeSection === "future" && (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 md:mb-8 lg:mt-0">Future</h1>
                <div className="space-y-3 sm:space-y-4 md:space-y-6">
                  {futureContent.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-4 sm:p-6 md:p-8 transition-all duration-300 active:bg-white/10 active:border-white/20"
                  >
                    <div className="absolute top-0 left-3 sm:left-4 md:left-8 right-3 sm:right-4 md:right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-1 sm:mb-2 break-words flex-1">{item.title}</h3>
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-500/20 text-purple-300 text-[10px] sm:text-xs font-light border border-purple-400/30 self-start whitespace-nowrap">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-light text-white/60 leading-relaxed break-words">{item.description}</p>
                  </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {selectedProject && activeProjectImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-3 py-6 backdrop-blur-md sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelectedProjectIndex(null)}
        >
          <div
            className="relative isolate flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/35 backdrop-blur-2xl sm:rounded-2xl md:rounded-3xl lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.10] via-white/[0.025] to-transparent" />
            <div className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent sm:left-8 sm:right-8" />

            <button
              type="button"
              onClick={() => setSelectedProjectIndex(null)}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/80 shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-white/[0.14] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Close project details"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative min-h-[260px] overflow-hidden border-b border-white/10 bg-black/[0.12] sm:min-h-[360px] lg:min-h-[620px] lg:border-b-0 lg:border-r">
              <img
                src={activeProjectImage}
                alt={`${selectedProject.title} preview ${activeGalleryIndex + 1}`}
                className="h-full max-h-[58vh] min-h-[260px] w-full object-contain sm:min-h-[360px] lg:max-h-none lg:min-h-[620px]"
              />

              {selectedProjectImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => stepProjectImage(-1)}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/80 shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-white/[0.14] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="Previous project image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepProjectImage(1)}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-white/80 shadow-lg shadow-black/20 backdrop-blur-md transition hover:bg-white/[0.14] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="Next project image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            <div className="relative flex min-h-0 flex-col gap-5 overflow-y-auto bg-white/[0.025] p-5 sm:p-6 lg:p-8">
              <div className="pr-10">
                <p className="mb-2 text-[10px] font-light uppercase tracking-[0.24em] text-white/40">
                  Project
                </p>
                <h2 id="project-modal-title" className="text-2xl font-light text-white sm:text-3xl">
                  {selectedProject.title}
                </h2>
              </div>

              <p className="text-sm font-light leading-relaxed text-white/68">
                {selectedProject.modalDescription ?? selectedProject.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] font-light text-white/70 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {selectedProject.link && (
                <a
                  href={`https://${selectedProject.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-2 text-xs font-light text-white/80 shadow-sm shadow-black/10 backdrop-blur-sm transition hover:bg-white/[0.14] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {selectedProject.link}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              <div className="mt-auto">
                {selectedProjectImages.length > 1 && (
                  <div className="mb-3 flex items-center justify-between text-[11px] font-light text-white/45">
                    <span>Gallery</span>
                    <span>
                      {activeGalleryIndex + 1} / {selectedProjectImages.length}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4">
                  {selectedProjectImages.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveGalleryIndex(index)}
                      className={`aspect-video overflow-hidden rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                        index === activeGalleryIndex
                          ? "border-white/55 bg-white/[0.12]"
                          : "border-white/10 bg-white/[0.05] opacity-70 hover:bg-white/[0.08] hover:opacity-100"
                      }`}
                      aria-label={`Show ${selectedProject.title} image ${index + 1}`}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
