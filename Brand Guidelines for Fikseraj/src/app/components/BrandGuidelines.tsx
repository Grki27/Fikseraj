import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  ThumbsUp, 
  Plus,
  Leaf,
  Car,
  Droplet,
  HelpCircle,
  Wrench,
  AlertCircle
} from "lucide-react";
import logoImage from "figma:asset/d7066550992ab6e3f9e4b47b3c5e87bc0e39b1b2.png";

export function BrandGuidelines() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0066CC] to-[#0052A3] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={logoImage} alt="Fikseraj Logo" className="w-48 h-auto" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl text-center mx-auto">
            Brand Guidelines & Design System
          </p>
          <p className="text-white/80 mt-2 text-center">
            Citizen-powered city improvement platform for Zagreb
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Brand Identity
          </h2>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <p className="text-foreground/80 mb-4">
              <strong className="text-foreground">
                Fikseraj
              </strong>{" "}
              (meaning "Fix it" in Croatian) is Zagreb's
              community-driven platform for reporting and
              resolving city issues. Our design system reflects
              the city's modern public transport identity while
              maintaining a friendly, accessible approach.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-accent rounded-xl p-4">
                <h4 className="font-semibold mb-2">Mission</h4>
                <p className="text-sm text-foreground/70">
                  Empower citizens to improve their city through
                  collective action and transparency
                </p>
              </div>
              <div className="bg-accent rounded-xl p-4">
                <h4 className="font-semibold mb-2">Vision</h4>
                <p className="text-sm text-foreground/70">
                  A responsive, citizen-first Zagreb where every
                  voice matters
                </p>
              </div>
              <div className="bg-accent rounded-xl p-4">
                <h4 className="font-semibold mb-2">Values</h4>
                <p className="text-sm text-foreground/70">
                  Transparency, Community, Action, Accessibility
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Color Palette
          </h2>
          <p className="text-foreground/70 mb-6">
            Inspired by Zagreb's public transport system (ZET),
            featuring the iconic Zagreb blue with thoughtful
            accent colors for status and actions.
          </p>

          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Primary Colors
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-[#0066CC] h-32"></div>
                <div className="p-4">
                  <h4 className="font-semibold">Zagreb Blue</h4>
                  <p className="text-sm text-foreground/70 mb-2">
                    Primary brand color
                  </p>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    #0066CC
                  </code>
                  <p className="text-xs text-foreground/50 mt-2">
                    Use for: Primary buttons, links, key UI
                    elements, map markers
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-[#E63946] h-32"></div>
                <div className="p-4">
                  <h4 className="font-semibold">Zagreb Red</h4>
                  <p className="text-sm text-foreground/70 mb-2">
                    Secondary accent color
                  </p>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    #E63946
                  </code>
                  <p className="text-xs text-foreground/50 mt-2">
                    Use for: Important actions, urgent issues,
                    delete buttons
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Status Colors
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-[#10B981] h-24"></div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm">
                    Success
                  </h4>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    #10B981
                  </code>
                  <p className="text-xs text-foreground/50 mt-2">
                    Resolved issues
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-[#F59E0B] h-24"></div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm">
                    Warning
                  </h4>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    #F59E0B
                  </code>
                  <p className="text-xs text-foreground/50 mt-2">
                    In progress
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-[#3B82F6] h-24"></div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm">
                    Info
                  </h4>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    #3B82F6
                  </code>
                  <p className="text-xs text-foreground/50 mt-2">
                    Information
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="bg-[#6B7280] h-24"></div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm">
                    Muted
                  </h4>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    #6B7280
                  </code>
                  <p className="text-xs text-foreground/50 mt-2">
                    Submitted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Neutral Colors */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Neutral Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="bg-[#F8F9FB] h-16 rounded-lg mb-2 border"></div>
                <p className="text-sm font-medium">
                  Background
                </p>
                <code className="text-xs">#F8F9FB</code>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="bg-[#FFFFFF] h-16 rounded-lg mb-2 border"></div>
                <p className="text-sm font-medium">Card</p>
                <code className="text-xs">#FFFFFF</code>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="bg-[#E5E7EB] h-16 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">Border</p>
                <code className="text-xs">#E5E7EB</code>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="bg-[#6B7280] h-16 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">
                  Muted Text
                </p>
                <code className="text-xs">#6B7280</code>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 text-center">
                <div className="bg-[#1A1D2E] h-16 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">
                  Foreground
                </p>
                <code className="text-xs">#1A1D2E</code>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Typography
          </h2>
          <p className="text-foreground/70 mb-6">
            We use <strong>Inter</strong> for its excellent
            readability and modern, friendly appearance.
          </p>

          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-foreground/50 mb-1">
                  Heading 1 - Semibold 600
                </p>
                <h1>The quick brown fox jumps</h1>
              </div>
              <div>
                <p className="text-sm text-foreground/50 mb-1">
                  Heading 2 - Semibold 600
                </p>
                <h2>The quick brown fox jumps over</h2>
              </div>
              <div>
                <p className="text-sm text-foreground/50 mb-1">
                  Heading 3 - Semibold 600
                </p>
                <h3>The quick brown fox jumps over the lazy</h3>
              </div>
              <div>
                <p className="text-sm text-foreground/50 mb-1">
                  Body - Regular 400
                </p>
                <p>
                  The quick brown fox jumps over the lazy dog.
                  This is body text used for descriptions and
                  content.
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/50 mb-1">
                  Small - Regular 400
                </p>
                <p className="text-sm">
                  The quick brown fox jumps over the lazy dog.
                  Used for captions and metadata.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-card rounded-xl border border-border p-4">
              <p className="font-bold text-2xl mb-1">700</p>
              <p className="text-sm text-foreground/70">Bold</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <p className="font-semibold text-2xl mb-1">600</p>
              <p className="text-sm text-foreground/70">
                Semibold
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <p className="font-medium text-2xl mb-1">500</p>
              <p className="text-sm text-foreground/70">
                Medium
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4">
              <p className="font-normal text-2xl mb-1">400</p>
              <p className="text-sm text-foreground/70">
                Regular
              </p>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Border Radius
          </h2>
          <p className="text-foreground/70 mb-6">
            No sharp edges - we use generous rounded corners to
            create a friendly, approachable feel.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border border-border p-6 text-center">
              <div className="bg-primary h-20 rounded-2xl mb-3"></div>
              <p className="font-medium">XL - 1.25rem</p>
              <p className="text-sm text-foreground/70">
                Cards, containers
              </p>
            </div>
            <div className="bg-card border border-border p-6 text-center">
              <div className="bg-primary h-20 rounded-xl mb-3"></div>
              <p className="font-medium">LG - 1rem</p>
              <p className="text-sm text-foreground/70">
                Buttons, inputs
              </p>
            </div>
            <div className="bg-card border border-border p-6 text-center">
              <div className="bg-primary h-20 rounded-lg mb-3"></div>
              <p className="font-medium">MD - 0.875rem</p>
              <p className="text-sm text-foreground/70">
                Badges, tags
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Buttons
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-4">
                Primary Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-[#0052A3] transition-colors">
                  Report Issue
                </button>
                <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-[#0052A3] transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Problem
                </button>
                <button className="w-full bg-primary/10 text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary/20 transition-colors">
                  View on Map
                </button>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-4">
                Secondary Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full border-2 border-border text-foreground px-6 py-3 rounded-xl font-medium hover:bg-accent transition-colors">
                  Cancel
                </button>
                <button className="w-full bg-success text-success-foreground px-6 py-3 rounded-xl font-medium hover:bg-success/90 transition-colors flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Mark as Resolved
                </button>
                <button className="w-full bg-muted text-foreground px-6 py-3 rounded-xl font-medium hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
                  <ThumbsUp className="w-5 h-5" />
                  Upvote (24)
                </button>
              </div>
            </div>
          </div>

          {/* FAB */}
          <div className="mt-6 bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">
              Floating Action Button (FAB)
            </h3>
            <p className="text-sm text-foreground/70 mb-4">
              Primary action for adding new issues
            </p>
            <div className="flex items-center gap-4">
              <button className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Plus className="w-6 h-6" />
              </button>
              <button className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <Plus className="w-7 h-7" />
              </button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">Cards</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Issue Card */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-muted to-muted/50"></div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    Promet
                  </span>
                  <span className="bg-warning/10 text-warning px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />U obradi
                  </span>
                </div>
                <h3 className="font-semibold mb-2">
                  Oštećeni tramvajski tračnici
                </h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Tračnici na Savskoj cesti su oštećeni i
                  stvaraju buku...
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Savska cesta 23
                  </span>
                  <span className="text-primary font-medium flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    47
                  </span>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-semibold mb-4">
                Status Indicators
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-foreground/60" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Submitted
                    </p>
                    <p className="text-xs text-foreground/60">
                      Waiting for review
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-xl">
                  <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      In Progress
                    </p>
                    <p className="text-xs text-foreground/60">
                      Sent to authorities
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-xl">
                  <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      Resolved
                    </p>
                    <p className="text-xs text-foreground/60">
                      Issue has been fixed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Icons & Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Icons & Categories
          </h2>
          <p className="text-foreground/70 mb-6">
            Each category has a unique color to ensure quick
            visual recognition
          </p>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-16 h-16 bg-[#F59E0B]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Car className="w-8 h-8 text-[#F59E0B]" />
              </div>
              <h4 className="font-semibold mb-1">Promet</h4>
              <p className="text-sm text-foreground/60 mb-2">
                Traffic issues
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                #F59E0B
              </code>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Droplet className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <h4 className="font-semibold mb-1">Komunalni</h4>
              <p className="text-sm text-foreground/60 mb-2">
                Utilities
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                #3B82F6
              </code>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-16 h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-8 h-8 text-[#10B981]" />
              </div>
              <h4 className="font-semibold mb-1">Okoliš</h4>
              <p className="text-sm text-foreground/60 mb-2">
                Environment
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                #10B981
              </code>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className="w-16 h-16 bg-[#8B5CF6]/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-8 h-8 text-[#8B5CF6]" />
              </div>
              <h4 className="font-semibold mb-1">Ostalo</h4>
              <p className="text-sm text-foreground/60 mb-2">
                Other
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                #8B5CF6
              </code>
            </div>
          </div>

          {/* Category Color Guide */}
          <div className="mt-6 bg-card rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">
              Category Color System
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-3">
                  Color Assignments:
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#F59E0B]"></div>
                    <span className="text-foreground/70">
                      Promet - Amber (traffic signals)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#3B82F6]"></div>
                    <span className="text-foreground/70">
                      Komunalni - Blue (water/utilities)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#10B981]"></div>
                    <span className="text-foreground/70">
                      Okoliš - Green (environment)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#8B5CF6]"></div>
                    <span className="text-foreground/70">
                      Ostalo - Purple (general)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-3">
                  Usage Guidelines:
                </h4>
                <ul className="space-y-2 text-sm text-foreground/70 list-disc list-inside">
                  <li>
                    Use category colors consistently across all
                    interfaces
                  </li>
                  <li>
                    Apply to map markers, badges, and filters
                  </li>
                  <li>
                    Maintain 10% opacity backgrounds for badges
                  </li>
                  <li>
                    Always pair with category icon for clarity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Spacing System
          </h2>
          <p className="text-foreground/70 mb-6">
            Consistent spacing creates rhythm and hierarchy
          </p>

          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="space-y-4">
              {[
                { size: "0.25rem", name: "1", px: "4px" },
                { size: "0.5rem", name: "2", px: "8px" },
                { size: "0.75rem", name: "3", px: "12px" },
                { size: "1rem", name: "4", px: "16px" },
                { size: "1.5rem", name: "6", px: "24px" },
                { size: "2rem", name: "8", px: "32px" },
                { size: "3rem", name: "12", px: "48px" },
              ].map((space) => (
                <div
                  key={space.name}
                  className="flex items-center gap-4"
                >
                  <div className="w-16 text-sm font-medium text-foreground/60">
                    {space.name}
                  </div>
                  <div
                    className="bg-primary h-8 rounded"
                    style={{ width: space.size }}
                  ></div>
                  <div className="text-sm text-foreground/60">
                    {space.size} ({space.px})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Design Principles
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">1</span>
                </div>
                Accessible & Inclusive
              </h3>
              <p className="text-sm text-foreground/70">
                Everyone should be able to report issues. High
                contrast, clear typography, and intuitive
                navigation.
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">2</span>
                </div>
                Mobile-First
              </h3>
              <p className="text-sm text-foreground/70">
                Citizens report on the go. Design for
                thumb-friendly interactions and fast loading.
              </p>
            </div>

            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 border border-success/20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">3</span>
                </div>
                Clear Feedback
              </h3>
              <p className="text-sm text-foreground/70">
                Status indicators must be immediately
                recognizable. Use color, icons, and text
                together.
              </p>
            </div>

            <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-2xl p-6 border border-warning/20">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">4</span>
                </div>
                Trust & Transparency
              </h3>
              <p className="text-sm text-foreground/70">
                Show progress clearly. Citizens need to see
                their voice matters and actions are taken.
              </p>
            </div>
          </div>
        </section>

        {/* Logo & Symbol */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Logo & Symbol
          </h2>
          <p className="text-foreground/70 mb-6">
            The Fikseraj logo features a location pin with an exclamation mark on a folded map, 
            symbolizing urgent community issues that need attention at specific locations.
          </p>

          {/* Main Logo Display */}
          <div className="bg-white rounded-2xl border border-border p-12 mb-8 text-center">
            <img src={logoImage} alt="Fikseraj Logo" className="w-64 h-auto mx-auto" />
          </div>

          {/* Logo Variations */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Light Background */}
            <div className="bg-white rounded-2xl border border-border p-8">
              <h3 className="font-semibold mb-4">Light Background</h3>
              <div className="flex items-center justify-center mb-4 p-8 bg-gray-50 rounded-xl">
                <img src={logoImage} alt="Fikseraj Logo" className="w-48 h-auto" />
              </div>
              <p className="text-sm text-foreground/60 text-center">
                Primary usage for light surfaces and white backgrounds
              </p>
            </div>

            {/* Dark Background */}
            <div className="bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-2xl p-8">
              <h3 className="font-semibold mb-4 text-white">Dark Background</h3>
              <div className="flex items-center justify-center mb-4 p-8 bg-white/10 rounded-xl">
                <img src={logoImage} alt="Fikseraj Logo" className="w-48 h-auto" />
              </div>
              <p className="text-sm text-white/80 text-center">
                For use on dark blue or colored backgrounds
              </p>
            </div>
          </div>

          {/* Logo Elements */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <h3 className="font-semibold mb-4">Logo Elements</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-10 h-10 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Location Pin</h4>
                <p className="text-xs text-foreground/60">
                  With exclamation mark indicating urgency and importance
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h4 className="font-semibold text-sm mb-1">Folded Map</h4>
                <p className="text-xs text-foreground/60">
                  Represents navigation and city-wide perspective
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-4xl font-bold text-primary">Aa</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">Typography</h4>
                <p className="text-xs text-foreground/60">
                  Clean, bold, and easily readable brand name
                </p>
              </div>
            </div>
          </div>

          {/* Clear Space */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <h3 className="font-semibold mb-4">Clear Space</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Always maintain adequate clear space around the logo. Minimum clear space should be equal to the height of the location pin icon.
            </p>
            <div className="bg-muted/30 rounded-xl p-8 inline-block">
              <div className="border-2 border-dashed border-primary/30 p-8">
                <img src={logoImage} alt="Fikseraj Logo" className="w-40 h-auto" />
              </div>
            </div>
          </div>

          {/* Size Guidelines */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-6">
            <h3 className="font-semibold mb-4">Size Guidelines</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={logoImage} alt="Fikseraj Logo" className="w-32 h-auto" />
                <div>
                  <p className="font-medium text-sm">Small - 120-150px width</p>
                  <p className="text-xs text-foreground/60">For mobile apps, small web elements</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={logoImage} alt="Fikseraj Logo" className="w-48 h-auto" />
                <div>
                  <p className="font-medium text-sm">Medium - 180-240px width</p>
                  <p className="text-xs text-foreground/60">Standard web usage, headers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img src={logoImage} alt="Fikseraj Logo" className="w-64 h-auto" />
                <div>
                  <p className="font-medium text-sm">Large - 240px+ width</p>
                  <p className="text-xs text-foreground/60">Print materials, presentations, hero sections</p>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Guidelines */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-success/10 border border-success/20 rounded-xl p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Do
              </h4>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Always maintain aspect ratio when resizing</li>
                <li>• Use on clean, solid backgrounds</li>
                <li>• Ensure adequate contrast for visibility</li>
                <li>• Keep logo clearly visible and unobstructed</li>
                <li>• Use provided logo files for consistency</li>
              </ul>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                Don't
              </h4>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Don't change logo colors or add effects</li>
                <li>• Don't rotate, skew, or distort the logo</li>
                <li>• Don't place on busy or low-contrast backgrounds</li>
                <li>• Don't separate or rearrange logo elements</li>
                <li>• Don't recreate or modify the logo</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4">
            Do's and Don'ts
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4 text-success flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Do's
              </h3>
              <div className="space-y-3">
                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✓ Use generous rounded corners (1rem
                    minimum)
                  </p>
                </div>
                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✓ Maintain consistent spacing throughout
                  </p>
                </div>
                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✓ Use status colors with icons for clarity
                  </p>
                </div>
                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✓ Keep touch targets minimum 44x44px
                  </p>
                </div>
                <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✓ Test with color blindness simulators
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-destructive flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Don'ts
              </h3>
              <div className="space-y-3">
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✗ Don't use sharp corners or angles
                  </p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✗ Don't use colors outside the palette
                  </p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✗ Don't rely only on color to convey status
                  </p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✗ Don't place small text on low contrast
                    backgrounds
                  </p>
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
                  <p className="text-sm">
                    ✗ Don't modify the logo proportions or
                    colors
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
          <h3 className="font-semibold mb-3">
            Questions or Feedback?
          </h3>
          <p className="text-foreground/70 mb-4">
            These guidelines are living documents. If you have
            suggestions for improvements or need clarification,
            please reach out to the design team.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-[#0052A3] transition-colors">
            Contact Design Team
          </button>
        </section>
      </div>
    </div>
  );
}