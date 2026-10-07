import { useState, useEffect, useRef } from "react"

interface Question {
  cat: string
  q: string
  o: string[]
  a: number
  exp: string
}

const examData: Question[] = [
  {
    cat: "Agile Foundations",
    q: "1. What is the primary goal of Agile?",
    o: [
      "Deliver comprehensive documentation",
      "Deliver customer value continuously",
      "Eliminate all project risks",
      "Reduce staffing costs",
    ],
    a: 1,
    exp: "Agile focuses on delivering valuable increments to customers continuously, adapting to feedback rather than rigidly following plans.",
  },
  {
    cat: "Agile Foundations",
    q: "2. Which Agile Manifesto value is correct?",
    o: [
      "Processes over people",
      "Documentation over working software",
      "Customer collaboration over contract negotiation",
      "Following a plan over responding to change",
    ],
    a: 2,
    exp: "The Agile Manifesto explicitly prioritizes 'Customer collaboration over contract negotiation'.",
  },
  {
    cat: "Agile Foundations",
    q: "3. Agile teams are expected to:",
    o: [
      "Wait for management approval for all decisions",
      "Be self-organizing and cross-functional",
      "Specialize in only one skill area",
      "Avoid customer interaction",
    ],
    a: 1,
    exp: "Agile teams organize their own work and possess cross-functional disciplines to deliver increments end-to-end.",
  },
  {
    cat: "Agile Foundations",
    q: "4. Which framework uses time-boxed iterations called Sprints?",
    o: ["Kanban", "Waterfall", "Scrum", "Lean"],
    a: 2,
    exp: "Scrum prescribes fixed-length iterations of 1-4 weeks known as Sprints.",
  },
  {
    cat: "Agile Foundations",
    q: "5. What is an Agile Retrospective used for?",
    o: [
      "Budget planning",
      "Performance evaluation",
      "Continuous improvement",
      "Stakeholder reporting",
    ],
    a: 2,
    exp: "Retrospectives are inspect-and-adapt checkpoints for the team to continuously improve ways of working.",
  },
  {
    cat: "Agile Foundations",
    q: "6. Agile projects prioritize:",
    o: [
      "Fixed scope",
      "Fixed requirements",
      "Adaptability to change",
      "Long planning phases",
    ],
    a: 2,
    exp: "Agile emphasizes responding to change over following a rigid, predetermined scope.",
  },
  {
    cat: "Agile Foundations",
    q: "7. True or False: Agile teams deliver value incrementally.",
    o: ["True", "False"],
    a: 0,
    exp: "True. Work is delivered in smaller functional pieces rather than waiting for a single monolithic release.",
  },
  {
    cat: "Agile Foundations",
    q: "8. Which Agile principle emphasizes delivering working solutions frequently?",
    o: [
      "Simplicity",
      "Technical excellence",
      "Frequent delivery of valuable products",
      "Centralized control",
    ],
    a: 2,
    exp: "Principle 3 stresses delivering working software frequently, with a preference to the shorter timescale.",
  },
  {
    cat: "Kanban for Operations",
    q: "9. What is the purpose of a Kanban board?",
    o: [
      "Document project requirements",
      "Visualize work and workflow",
      "Store team metrics only",
      "Track budgets",
    ],
    a: 1,
    exp: "Kanban boards make active work items and flow stages visible to prevent bottlenecks.",
  },
  {
    cat: "Kanban for Operations",
    q: "10. What does WIP stand for?",
    o: [
      "Workflow Integration Process",
      "Work In Production",
      "Work In Progress",
      "Work Inspection Points",
    ],
    a: 2,
    exp: "WIP stands for Work In Progress (items started but not yet completed).",
  },
  {
    cat: "Kanban for Operations",
    q: "11. Why are WIP limits important?",
    o: [
      "Increase multitasking",
      "Identify bottlenecks and improve flow",
      "Delay work intentionally",
      "Reduce visibility",
    ],
    a: 1,
    exp: "WIP limits optimize throughput, curb context switching, and immediately highlight bottlenecks.",
  },
  {
    cat: "Kanban for Operations",
    q: "12. A task stays in 'In Progress' for several days while others move quickly. What should the team do?",
    o: [
      "Ignore it until completion",
      "Identify the bottleneck and remove blockers",
      "Add more tasks",
      "Close the task",
    ],
    a: 1,
    exp: "Agile teams swarm on blocked or aging items to resolve the impediment.",
  },
  {
    cat: "Kanban for Operations",
    q: "13. True or False: Kanban requires fixed-length iterations.",
    o: ["True", "False"],
    a: 1,
    exp: "False. Kanban is a continuous flow system without mandatory time-boxed sprints.",
  },
  {
    cat: "Stakeholder Management",
    q: "14. Who is considered a stakeholder?",
    o: [
      "Only project sponsors",
      "Anyone affected by project outcomes",
      "Only project managers",
      "Only customers",
    ],
    a: 1,
    exp: "Stakeholders include anyone who can affect or is affected by the initiative.",
  },
  {
    cat: "Stakeholder Management",
    q: "15. High influence and high interest stakeholders should be:",
    o: [
      "Monitored minimally",
      "Managed closely",
      "Ignored until project completion",
      "Contacted only during issues",
    ],
    a: 1,
    exp: "Under the power/interest grid, high power + high interest stakeholders must be managed closely.",
  },
  {
    cat: "Stakeholder Management",
    q: "16. The primary purpose of stakeholder analysis is to:",
    o: [
      "Reduce project cost",
      "Understand stakeholder needs and influence",
      "Eliminate project risks",
      "Replace project governance",
    ],
    a: 1,
    exp: "It maps expectations, influence, and engagement strategies across project actors.",
  },
  {
    cat: "Stakeholder Management",
    q: "17. A stakeholder opposes a new process because they believe it will increase workload. What should you do first?",
    o: [
      "Escalate immediately",
      "Ignore concerns",
      "Understand their perspective and address concerns",
      "Continue implementation without discussion",
    ],
    a: 2,
    exp: "Collaborative engagement begins with listening to root concerns and addressing perceived friction.",
  },
  {
    cat: "Stakeholder Management",
    q: "18. True or False: Effective stakeholder engagement improves project success.",
    o: ["True", "False"],
    a: 0,
    exp: "True. Early and frequent collaboration prevents misalignment and change resistance.",
  },
  {
    cat: "BDD & Cucumber",
    q: "19. What does BDD stand for?",
    o: [
      "Business Development Design",
      "Behavior-Driven Development",
      "Basic Development Delivery",
      "Build-Deploy-Debug",
    ],
    a: 1,
    exp: "BDD stands for Behavior-Driven Development.",
  },
  {
    cat: "BDD & Cucumber",
    q: "20. Which language is commonly used for Cucumber feature files?",
    o: ["XML", "JavaScript", "Gherkin", "SQL"],
    a: 2,
    exp: "Cucumber scenarios are written in Gherkin (Given, When, Then syntax).",
  },
  {
    cat: "BDD & Cucumber",
    q: "21. Which format is correct in a Cucumber scenario?",
    o: [
      "If / Then / When",
      "When / Then / Given",
      "Given / When / Then",
      "Test / Execute / Verify",
    ],
    a: 2,
    exp: "Gherkin format follows Given (preconditions), When (action), Then (expected outcome).",
  },
  {
    cat: "BDD & Cucumber",
    q: "22. What is the benefit of BDD?",
    o: [
      "Eliminates testing needs",
      "Improves collaboration between business and technical teams",
      "Replaces Agile methodology",
      "Reduces stakeholder involvement",
    ],
    a: 1,
    exp: "BDD builds a shared language between technical and non-technical stakeholders.",
  },
  {
    cat: "DevOps & CI/CD",
    q: "23. What is the primary objective of DevOps?",
    o: [
      "Separate development and operations responsibilities",
      "Improve collaboration and delivery speed",
      "Increase approval layers",
      "Eliminate automation",
    ],
    a: 1,
    exp: "DevOps aligns development and operations to shorten lead time and increase delivery reliability.",
  },
  {
    cat: "DevOps & CI/CD",
    q: "24. CI stands for:",
    o: [
      "Continuous Integration",
      "Continuous Inspection",
      "Centralized Integration",
      "Coordinated Implementation",
    ],
    a: 0,
    exp: "CI stands for Continuous Integration (merging and automatically testing code frequently).",
  },
  {
    cat: "DevOps & CI/CD",
    q: "25. CD refers to:",
    o: [
      "Continuous Deployment/Delivery",
      "Central Development",
      "Code Duplication",
      "Configuration Design",
    ],
    a: 0,
    exp: "CD refers to Continuous Delivery or Continuous Deployment.",
  },
  {
    cat: "DevOps & CI/CD",
    q: "26. Which is a major DevOps benefit?",
    o: [
      "Longer release cycles",
      "Increased manual work",
      "Faster feedback and delivery",
      "Reduced collaboration",
    ],
    a: 2,
    exp: "DevOps practices accelerate feedback loops and delivery speed via automation.",
  },
  {
    cat: "Scaling & Agile Mindset",
    q: "27. What challenge does Scaling Agile address?",
    o: [
      "Managing Agile across multiple teams",
      "Individual performance reviews",
      "Budget estimation only",
      "Vendor selection",
    ],
    a: 0,
    exp: "Scaling frameworks coordinate dependencies, release trains, and portfolio goals across multiple teams.",
  },
  {
    cat: "Scaling & Agile Mindset",
    q: "28. A strong Agile culture encourages:",
    o: [
      "Blame when failures occur",
      "Learning and continuous improvement",
      "Avoiding experimentation",
      "Limiting collaboration",
    ],
    a: 1,
    exp: "Psychological safety, learning loops, and continuous improvement are foundational to an Agile culture.",
  },
  {
    cat: "Scaling & Agile Mindset",
    q: "29. According to Agile Mindset & Culture, learning from failure means:",
    o: [
      "Accepting poor performance without action",
      "Identifying lessons to improve future outcomes",
      "Avoiding accountability",
      "Repeating the same approach",
    ],
    a: 1,
    exp: "Failure is treated as empirical data to adjust and refine future deliverables.",
  },
  {
    cat: "Scaling & Agile Mindset",
    q: "30. Scenario: A team delivered a feature that did not meet customer expectations. What is the most Agile response?",
    o: [
      "Blame the developer",
      "Freeze future changes",
      "Gather feedback, inspect results, and adapt",
      "Restart the project",
    ],
    a: 2,
    exp: "Empirical process control relies on Transparency, Inspection, and Adaptation based on customer feedback.",
  },
  {
    cat: "Bonus Situational",
    q: "31. Your team is midway through a Sprint when a stakeholder requests a high-priority feature. What should happen first?",
    o: [
      "Add it immediately",
      "Evaluate impact with Product Owner and team",
      "Remove testing tasks",
      "Extend the Sprint",
    ],
    a: 1,
    exp: "Mid-sprint scope changes must be assessed against the Sprint Goal with the Product Owner.",
  },
  {
    cat: "Bonus Situational",
    q: "32. A Kanban board shows many items waiting for review. This indicates:",
    o: [
      "Team productivity is increasing",
      "A bottleneck exists in the review stage",
      "WIP limits are too high automatically",
      "Project completion is near",
    ],
    a: 1,
    exp: "Accumulation in a queue stage confirms a capacity bottleneck in that downstream step.",
  },
  {
    cat: "Bonus Situational",
    q: "33. DevOps culture is primarily built on:",
    o: [
      "Automation, collaboration, and continuous improvement",
      "Documentation and governance only",
      "Separate functional silos",
      "Release approvals",
    ],
    a: 0,
    exp: "Culture, Automation, Measurement, and Sharing (CAMS) drive DevOps maturity.",
  },
  {
    cat: "Bonus Situational",
    q: "34. The Agile mindset values experimentation because:",
    o: [
      "Every experiment succeeds",
      "Innovation comes through validated learning",
      "It eliminates risk entirely",
      "It prevents customer feedback",
    ],
    a: 1,
    exp: "Small, fast-feedback experiments generate validated learning with low financial waste.",
  },
  {
    cat: "Bonus Situational",
    q: "35. During a retrospective, the team identifies recurring testing delays. What should be the outcome?",
    o: [
      "Record it and move on",
      "Assign blame",
      "Create improvement actions for the next iteration",
      "Stop retrospectives",
    ],
    a: 2,
    exp: "Retrospectives must culminate in tangible, assigned action items incorporated into future sprints.",
  },
]

const TOTAL_DURATION = 45 * 60
const CORE_COUNT = 30
const PASS_THRESHOLD = 24

interface SubmissionPayload {
  timestamp: string
  fullName: string
  email: string
  coreScore: number
  totalScore: number
  percentage: number
  status: "PASSED" | "FAILED"
}

export default function App() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION)
  const [timerExpired, setTimerExpired] = useState(false)

  const [fullName, setFullName] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (submitted) return
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval)
          setTimerExpired(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [submitted])

  useEffect(() => {
    if (timerExpired && !submitted) {
      handleSubmit(true)
    }
  }, [timerExpired])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / examData.length) * 100)

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
  }

  // Results computation
  let coreScore = 0
  let totalScore = 0
  const domainStats: Record<string, { total: number correct: number }> = {}

  examData.forEach((item, idx) => {
    if (!domainStats[item.cat]) domainStats[item.cat] = { total: 0, correct: 0 }
    domainStats[item.cat].total++
    if (answers[idx] === item.a) {
      if (idx < CORE_COUNT) coreScore++
      totalScore++
      domainStats[item.cat].correct++
    }
  })

  const corePercentage = Math.round((coreScore / CORE_COUNT) * 100)
  const passed = coreScore >= PASS_THRESHOLD

  // Added: Async fetch API method
  const sendToExcelAPI = async (submissionPayload: SubmissionPayload) => {
    // PASTE YOUR POWER AUTOMATE HTTP POST URL HERE:
    const API_ENDPOINT =
      "https://defaulte0793d390939496db129198edd916f.eb.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/e9390dd279404f8097256335b97027a2/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8Nj9rjetdcP8R53SWBPV_rjT-X2hANePbI7OUykLhds"

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionPayload),
      })

      if (response.ok) {
        console.log("Submission successfully registered in Excel!")
      } else {
        console.error(
          "Endpoint responded with error status:",
          response.statusText,
        )
      }
    } catch (error) {
      console.error("Network interface error sending metrics:", error)
    }
  }

  const handleSubmit = async (force = false) => {
    if (!fullName.trim() || !email.trim()) {
      alert(
        "Please enter both your Full Name and Email Address before submitting your answers.",
      )
      return
    }

    if (!force && answeredCount < examData.length) {
      if (
        !window.confirm(
          `You have only answered ${answeredCount} of ${examData.length} questions. Do you still want to finalize and grade the exam?`,
        )
      )
        return
    }

    setSubmitted(true)

    const payload: SubmissionPayload = {
      timestamp: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim(),
      coreScore: coreScore,
      totalScore: totalScore,
      percentage: corePercentage,
      status: passed ? "PASSED" : "FAILED",
    }

    // Execute API Dispatch
    await sendToExcelAPI(payload)

    setTimeout(
      () => resultsRef.current?.scrollIntoView({ behavior: "smooth" }),
      100,
    )
  }

  const handleReset = () => {
    if (
      !window.confirm(
        "Are you sure you want to reset the assessment? All selections will be erased.",
      )
    )
      return
    setAnswers({})
    setSubmitted(false)
    setTimeLeft(TOTAL_DURATION)
    setTimerExpired(false)
    setFullName("")
    setEmail("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isWarning = timeLeft <= 300 && !submitted

  return (
    <div
      style={{
        backgroundColor: "var(--color-neutral-100)",
        minHeight: "100vh",
        paddingBottom: 80,
      }}
    >
      {/* Nav */}
      <nav
        style={{
          backgroundColor: "var(--color-neutral-500)",
          height: 64,
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          paddingLeft: 40,
          paddingRight: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            Agile Training Group
          </span>
          <span
            className="ads-eyebrow"
            style={{ color: "var(--color-brand-200)" }}
          >
            Credential Assessment
          </span>
        </div>
      </nav>

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "24px 20px" }}>
        {/* Sticky Header Card */}
        <header
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-neutral-200)",
            padding: "20px 24px",
            marginBottom: 24,
            position: "sticky",
            top: 64,
            zIndex: 50,
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h1
                className="ads-h3"
                style={{ color: "var(--color-neutral-500)", marginBottom: 4 }}
              >
                Mock Assessment: Agile Foundation Professional
              </h1>
              <p
                className="ads-body-sm"
                style={{ color: "var(--color-neutral-400)" }}
              >
                30 Core Questions + 5 Bonus &nbsp;•&nbsp; Pass Target: 80%
                (24/30)
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: isWarning
                  ? "var(--color-critical-100)"
                  : "var(--color-neutral-100)",
                border: `1px solid ${
                  isWarning
                    ? "var(--color-critical-300)"
                    : "var(--color-neutral-200)"
                }`,
                padding: "6px 16px",
                height: 40,
              }}
            >
              <span style={{ fontSize: 16 }}>⏱</span>
              <span
                className="ads-label"
                style={{
                  color: isWarning
                    ? "var(--color-critical-300)"
                    : "var(--color-neutral-500)",
                  fontSize: 16,
                }}
              >
                {timerExpired ? "Time Expired" : formatTime(timeLeft)}
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div
            style={{
              backgroundColor: "var(--color-neutral-200)",
              height: 4,
              marginTop: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--color-brand-300)",
                height: "100%",
                width: `${progress}%`,
                transition: "width 0.2s cubic-bezier(0.85,0,0,1)",
              }}
            />
          </div>
          <p
            className="ads-caption"
            style={{ color: "var(--color-neutral-300)", marginTop: 6 }}
          >
            {answeredCount} of {examData.length} answered
          </p>
        </header>

        {/* Candidate Info Card */}
        <div
          style={{
            backgroundColor: "var(--color-white)",
            border: "1px solid var(--color-neutral-200)",
            padding: "20px 24px",
            marginBottom: 12,
          }}
        >
          <p
            className="ads-widget-title"
            style={{ color: "var(--color-neutral-500)", marginBottom: 14 }}
          >
            Candidate Information
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              disabled={submitted}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{
                flex: "1 1 200px",
                minWidth: "200px",
                padding: "10px 14px",
                border: "1px solid var(--color-neutral-200)",
                outline: "none",
                fontFamily: "inherit",
                fontSize: 14,
                backgroundColor: submitted
                  ? "var(--color-neutral-100)"
                  : "transparent",
              }}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              disabled={submitted}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: "1 1 200px",
                minWidth: "200px",
                padding: "10px 14px",
                border: "1px solid var(--color-neutral-200)",
                outline: "none",
                fontFamily: "inherit",
                fontSize: 14,
                backgroundColor: submitted
                  ? "var(--color-neutral-100)"
                  : "transparent",
              }}
            />
          </div>
        </div>

        {/* Results Panel */}
        {submitted && (
          <div
            ref={resultsRef}
            style={{
              backgroundColor: "var(--color-white)",
              border: `2px solid ${
                passed
                  ? "var(--color-success-300)"
                  : "var(--color-critical-300)"
              }`,
              padding: "var(--space-8) var(--space-6)",
              marginBottom: 28,
              boxShadow:
                "0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.30)",
            }}
          >
            {/* Accent bar */}
            <div
              style={{
                height: 4,
                backgroundColor: "var(--color-brand-300)",
                marginBottom: 24,
                marginLeft: -24,
                marginRight: -24,
                marginTop: -32,
                width: "calc(100% + 48px)",
              }}
            />
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 18px",
                  marginBottom: 12,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  backgroundColor: passed
                    ? "var(--color-success-100)"
                    : "var(--color-critical-100)",
                  color: passed
                    ? "var(--color-success-400)"
                    : "var(--color-critical-400)",
                }}
              >
                {passed
                  ? "Pass · Credential Benchmark Met"
                  : "Did Not Meet Benchmark (Target: 80%)"}
              </div>
              <div
                className="ads-h1"
                style={{ color: "var(--color-neutral-500)", marginBottom: 8 }}
              >
                {coreScore} / {CORE_COUNT}{" "}
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: 28,
                    color: "var(--color-neutral-300)",
                  }}
                >
                  ({corePercentage}%)
                </span>
              </div>
              <p
                className="ads-body-sm"
                style={{ color: "var(--color-neutral-400)" }}
              >
                Total Score across all 35 items: {totalScore}/35 (
                {Math.round((totalScore / 35) * 100)}%). Benchmark criteria
                requires 24/30 on Core Questions 1–30.
              </p>
            </div>
            <h3
              className="ads-widget-title"
              style={{ color: "var(--color-neutral-500)", marginBottom: 12 }}
            >
              Domain Performance Breakdown
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  {["Knowledge Area", "Correct", "Accuracy"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--color-neutral-400)",
                        borderBottom: "1px solid var(--color-neutral-200)",
                        backgroundColor: "var(--color-neutral-100)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(domainStats).map(([cat, stats], i, arr) => {
                  const pct = Math.round((stats.correct / stats.total) * 100)
                  const color =
                    pct >= 80
                      ? "var(--color-success-300)"
                      : pct < 60
                        ? "var(--color-critical-300)"
                        : "var(--color-neutral-500)"
                  return (
                    <tr key={cat}>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom:
                            i < arr.length - 1
                              ? "1px solid var(--color-neutral-200)"
                              : "none",
                          color: "var(--color-neutral-500)",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {cat}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom:
                            i < arr.length - 1
                              ? "1px solid var(--color-neutral-200)"
                              : "none",
                          color: "var(--color-neutral-500)",
                          fontSize: 14,
                        }}
                      >
                        {stats.correct} / {stats.total}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          borderBottom:
                            i < arr.length - 1
                              ? "1px solid var(--color-neutral-200)"
                              : "none",
                          color,
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {pct}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p
              className="ads-caption"
              style={{
                color: "var(--color-neutral-300)",
                marginTop: 20,
                textAlign: "center",
              }}
            >
              Scroll down to review the correct solutions and rationales for
              each item.
            </p>
          </div>
        )}

        {/* Questions */}
        {examData.map((item, idx) => {
          const selected = answers[idx]
          const isAnswered = selected !== undefined
          const isBonus = idx >= CORE_COUNT
          return (
            <div
              key={idx}
              style={{
                backgroundColor: "var(--color-white)",
                border: `1px solid ${
                  !isAnswered && !submitted
                    ? "var(--color-neutral-200)"
                    : "var(--color-neutral-200)"
                }`,
                borderLeft: isBonus
                  ? "4px solid var(--color-brand-200)"
                  : "4px solid transparent",
                padding: "20px 24px",
                marginBottom: 12,
                transition: "border-color 0.15s cubic-bezier(0.85,0,0,1)",
                outline:
                  !isAnswered && submitted
                    ? "2px solid var(--color-warning-300)"
                    : "none",
              }}
            >
              <div
                className="ads-eyebrow"
                style={{ color: "var(--color-brand-300)", marginBottom: 6 }}
              >
                {item.cat} &nbsp;·&nbsp; Question {idx + 1} of {examData.length}
                {isBonus && (
                  <span
                    style={{ marginLeft: 8, color: "var(--color-brand-400)" }}
                  >
                    ★ Bonus
                  </span>
                )}
              </div>
              <p
                className="ads-widget-title"
                style={{ color: "var(--color-neutral-500)", marginBottom: 14 }}
              >
                {item.q}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {item.o.map((opt, optIdx) => {
                  const isSelected = selected === optIdx
                  const isCorrect = submitted && optIdx === item.a
                  const isWrong = submitted && isSelected && optIdx !== item.a
                  let bg = "transparent"
                  let borderColor = "var(--color-neutral-200)"
                  let textColor = "var(--color-neutral-500)"
                  if (!submitted && isSelected) {
                    bg = "var(--color-brand-100)"
                    borderColor = "var(--color-brand-300)"
                  } else if (isCorrect) {
                    bg = "var(--color-success-100)"
                    borderColor = "var(--color-success-300)"
                    textColor = "var(--color-success-400)"
                  } else if (isWrong) {
                    bg = "var(--color-critical-100)"
                    borderColor = "var(--color-critical-300)"
                    textColor = "var(--color-critical-400)"
                  }
                  return (
                    <label
                      key={optIdx}
                      onClick={() => handleSelect(idx, optIdx)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "10px 14px",
                        border: `1px solid ${borderColor}`,
                        backgroundColor: bg,
                        cursor: submitted ? "default" : "pointer",
                        transition: "all 0.15s cubic-bezier(0.85,0,0,1)",
                      }}
                    >
                      <input
                        type="radio"
                        name={`q-${idx}`}
                        value={optIdx}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleSelect(idx, optIdx)}
                        style={{
                          marginTop: 2,
                          accentColor: "var(--color-brand-300)",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        className="ads-body-sm"
                        style={{
                          color: textColor,
                          fontWeight: isCorrect ? 600 : 400,
                        }}
                      >
                        {opt}
                      </span>
                      {isCorrect && submitted && (
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 14,
                            color: "var(--color-success-300)",
                          }}
                        >
                          ✓
                        </span>
                      )}
                      {isWrong && (
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 14,
                            color: "var(--color-critical-300)",
                          }}
                        >
                          ✗
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>
              {/* Explanation */}
              {submitted && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "12px 16px",
                    backgroundColor: "var(--color-neutral-100)",
                    borderLeft: "4px solid var(--color-brand-300)",
                    fontSize: 13,
                    color: "var(--color-neutral-400)",
                    lineHeight: 1.5,
                  }}
                >
                  <strong
                    style={{
                      color: "var(--color-neutral-500)",
                      fontWeight: 600,
                    }}
                  >
                    Rationale:{" "}
                  </strong>
                  {item.exp}
                </div>
              )}
            </div>
          )
        })}

        {/* Footer Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button
            onClick={() => handleSubmit(false)}
            disabled={submitted}
            style={{
              flex: 2,
              height: 52,
              backgroundColor: submitted
                ? "var(--color-neutral-200)"
                : "var(--color-brand-300)",
              color: submitted ? "var(--color-neutral-400)" : "#fff",
              border: "none",
              fontSize: 18,
              fontWeight: 600,
              cursor: submitted ? "not-allowed" : "pointer",
              letterSpacing: "-0.01em",
              fontFamily: "var(--font-brand)",
              transition: "background-color 0.15s cubic-bezier(0.85,0,0,1)",
            }}
            onMouseEnter={(e) =>
              !submitted &&
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "var(--color-brand-400)")
            }
            onMouseLeave={(e) =>
              !submitted &&
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "var(--color-brand-300)")
            }
          >
            {submitted ? "Assessment Submitted" : "Submit & View Results"}
          </button>
          <button
            onClick={handleReset}
            style={{
              flex: 1,
              height: 52,
              backgroundColor: "var(--color-white)",
              color: "var(--color-neutral-500)",
              border: "1px solid var(--color-neutral-200)",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-brand)",
              transition: "background-color 0.15s cubic-bezier(0.85,0,0,1)",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "var(--color-neutral-100)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "var(--color-white)")
            }
          >
            Reset Exam
          </button>
        </div>

        {/* Footer */}
        <footer
          style={{
            marginTop: 48,
            borderTop: "1px solid var(--color-neutral-200)",
            paddingTop: 24,
            textAlign: "center",
          }}
        >
          <p
            className="ads-caption"
            style={{ color: "var(--color-neutral-400)" }}
          >
            Agile Training Group · Credential Mock Exam · © 2026
          </p>
        </footer>
      </div>
    </div>
  )
}
