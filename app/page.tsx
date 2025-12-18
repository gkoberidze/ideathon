'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  mockTutors,
  Tutor,
  SUBJECTS,
  subjectLabels,
  subjectKeyFor,
  ALL_SUBJECTS,
  type SubjectKey,
  type AllSubjects,
} from '@/lib/data'
import TutorCard from '@/components/TutorCard'
import TutorModal from '@/components/TutorModal'
import Chatbot from '@/components/Chatbot'
import { useI18n } from '@/lib/i18n'

type ExpFilter = 'all' | '1-3' | '4-6' | '7-10'
type SubjectFilter = AllSubjects | SubjectKey

export default function Home() {
  const { lang, t } = useI18n()
  const subjectLabelFor = (key: SubjectKey) => subjectLabels[lang][key]
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors)
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>(ALL_SUBJECTS)
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 80])
  const [experienceFilter, setExperienceFilter] = useState<ExpFilter>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const subjectOptions: SubjectFilter[] = [ALL_SUBJECTS, ...SUBJECTS]
  const featuredSubjects = SUBJECTS
  const expOptions: { key: ExpFilter; label: string }[] = [
    { key: 'all', label: t.filters?.any ?? 'All' },
    { key: '1-3', label: t.filters?.exp13 ?? '1-3 years' },
    { key: '4-6', label: t.filters?.exp46 ?? '4-6 years' },
    { key: '7-10', label: t.filters?.exp710 ?? '7-10 years' },
  ]

  useEffect(() => {
    filterTutors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectFilter, priceRange, experienceFilter])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isModalOpen])

  const filterTutors = () => {
    let filtered = [...mockTutors]

    if (subjectFilter !== ALL_SUBJECTS) {
      filtered = filtered.filter((t) => subjectKeyFor(t.id) === subjectFilter)
    }

    filtered = filtered.filter((t) => t.price >= priceRange[0] && t.price <= priceRange[1])

    if (experienceFilter !== 'all') {
      if (experienceFilter === '1-3') {
        filtered = filtered.filter((t) => t.experience >= 1 && t.experience <= 3)
      } else if (experienceFilter === '4-6') {
        filtered = filtered.filter((t) => t.experience >= 4 && t.experience <= 6)
      } else if (experienceFilter === '7-10') {
        filtered = filtered.filter((t) => t.experience >= 7 && t.experience <= 10)
      }
    }

    setTutors(filtered)
  }

  const handleContactClick = (tutor: Tutor) => {
    setSelectedTutor(tutor)
    setIsModalOpen(true)
    setShowSuccessMessage(false)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTutor(null)
    setShowSuccessMessage(false)
  }

  const handleSendContactMessage = () => {
    setShowSuccessMessage(true)
    setTimeout(() => {
      setShowSuccessMessage(false)
      setIsModalOpen(false)
      setSelectedTutor(null)
    }, 2000)
  }

  const selectedSubjectLabel =
    subjectFilter === ALL_SUBJECTS ? (t.filters?.any ?? 'All') : subjectLabelFor(subjectFilter)
  const heroBadge = (t.heroBadge ?? '').trim()

  const heroStats = [
    {
      label: t.heroStats?.matches ?? 'Successful matches',
      value: '6.2K+',
      detail: t.heroStats?.matchesDetail ?? 'Connections completed this year',
    },
    {
      label: t.heroStats?.tutors ?? 'Tutors onboard',
      value: '980+',
      detail: t.heroStats?.tutorsDetail ?? 'Vetted professionals',
    },
    {
      label: t.heroStats?.response ?? 'Avg. response time',
      value: '~12m',
      detail: t.heroStats?.responseDetail ?? 'Live concierge support',
    },
  ]

  const highlightCards = [
    {
      icon: '🤖',
      title: t.highlight?.cards?.[0]?.title ?? 'Smart matching & scoring',
      description:
        t.highlight?.cards?.[0]?.desc ??
        'We evaluate 12+ data points to pair students with tutors that fit their pace, goals, and culture.',
    },
    {
      icon: '📊',
      title: t.highlight?.cards?.[1]?.title ?? 'Transparent performance dashboard',
      description:
        t.highlight?.cards?.[1]?.desc ??
        'Live pulse on availability, pricing trends, and satisfaction so hackathon judges see real traction.',
    },
    {
      icon: '🛠️',
      title: t.highlight?.cards?.[2]?.title ?? 'Built-in monetization levers',
      description:
        t.highlight?.cards?.[2]?.desc ??
        'Premium call-to-actions, subscriptions, and upsells are wired in from day one.',
    },
  ]

  const journeySteps = [
    {
      badge: t.steps?.items?.[0]?.badge ?? '45 sec setup',
      title: t.steps?.items?.[0]?.title ?? 'Share your learning goal',
      description:
        t.steps?.items?.[0]?.desc ??
        'Tell us the subject, ambition, and timeline. We turn it into a precise search signal.',
    },
    {
      badge: t.steps?.items?.[1]?.badge ?? 'Auto-matched',
      title: t.steps?.items?.[1]?.title ?? 'Match with curated tutors',
      description:
        t.steps?.items?.[1]?.desc ??
        'Filters, badges, and live availability highlight mentors that fit both budget and experience.',
    },
    {
      badge: t.steps?.items?.[2]?.badge ?? 'Done in minutes',
      title: t.steps?.items?.[2]?.title ?? 'Book & stay engaged',
      description:
        t.steps?.items?.[2]?.desc ??
        'Contact instantly, subscribe for VIP follow-ups, and keep momentum via the AI assistant.',
    },
  ]

  const testimonials = [
    {
      quote:
        t.testimonials?.items?.[0]?.quote ??
        '“We sourced a senior programming mentor mid-hackathon. The response time and clarity sold the judges.”',
      name: t.testimonials?.items?.[0]?.name ?? 'ნინო მ.',
      role: t.testimonials?.items?.[0]?.role ?? 'Parent & mentor scout, Tbilisi',
    },
    {
      quote:
        t.testimonials?.items?.[1]?.quote ??
        '“Filters feel like product analytics. I can prove how we shortlist tutors with data, not guesses.”',
      name: t.testimonials?.items?.[1]?.name ?? 'გიორგი ლ.',
      role: t.testimonials?.items?.[1]?.role ?? 'Startup founder, Batumi',
    },
    {
      quote:
        t.testimonials?.items?.[2]?.quote ??
        '“Judges loved the glass dashboard vibe. Everything screams premium but is still simple to use.”',
      name: t.testimonials?.items?.[2]?.name ?? 'Salome B.',
      role: t.testimonials?.items?.[2]?.role ?? 'Design lead, Kutaisi',
    },
  ]

  const trustBadges: string[] = t.trustBadges ?? [
    'BTU Innovations',
    'IliaUni Labs',
    'SkillWill',
    'Bank of Georgia Academy',
    'TBC Concept',
  ]

  return (
    <div className="relative min-h-screen overflow-visible">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-rose-50 to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-pink-200/60 blur-[140px] dark:bg-pink-900/40" />
      <div className="absolute -bottom-16 left-0 h-72 w-72 rounded-full bg-blue-200/60 blur-[140px] dark:bg-blue-900/30" />

      <div className="relative z-10 space-y-24 pb-24">
        {/* Hero */}
        <section className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <div className="space-y-8">
              {heroBadge && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 px-4 py-1 text-sm font-medium text-gray-900 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#7b2ff7] to-[#f107a3]" />
                  {heroBadge}
                </span>
              )}
              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                  {t.heroTitle}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-200">
                  {t.heroTagline ?? t.heroSubtitle}
                </p>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  {t.heroSubtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register?role=tutor"
                  className="flex-1 rounded-2xl bg-gradient-to-r from-[#7b2ff7] via-[#f107a3] to-[#ff6ec4] px-8 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-pink-200/40 transition-transform hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {t.joinBtn}
                </Link>
                <Link
                  href="/register?role=student"
                  className="flex-1 rounded-2xl border border-gray-200/70 bg-white/80 px-8 py-4 text-center text-lg font-semibold text-gray-900 backdrop-blur transition hover:-translate-y-0.5 hover:border-gray-300 dark:bg-white/10 dark:text-white dark:border-white/20"
                >
                  {t.joinStudentBtn ?? 'Join as a student'}
                </Link>
                <a
                  href="#learn-more"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-4 text-sm font-semibold text-gray-600 underline-offset-4 transition hover:text-gray-900 dark:text-gray-200"
                >
                  {t.learnBtn}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/50 bg-white/80 p-5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-gray-900/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{t.filters?.title ?? 'Filters'}</p>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedSubjectLabel}</h3>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/40 dark:text-blue-200">
                    ₾{priceRange[0]} - ₾{priceRange[1]}
                  </span>
                </div>
                <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center justify-between rounded-2xl border border-gray-100/70 px-4 py-3 dark:border-white/10">
                    <span>{t.filters?.subject ?? 'Subject'}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedSubjectLabel}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-gray-100/70 px-4 py-3 dark:border-white/10">
                    <span>{t.filters?.pricePrefix ?? 'Price range'}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₾{priceRange[0]} - ₾{priceRange[1]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-gray-100/70 px-4 py-3 dark:border-white/10">
                    <span>{t.filters?.experience ?? 'Experience'}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{experienceFilter}</span>
                  </div>
                </div>
                <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                  {t.filtersLead ?? 'Precision filters keep demos slick—change a field and the grid reacts instantly.'}
                </p>
              </div>

              <div className="absolute -right-6 top-8 hidden w-48 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-4 text-white shadow-xl lg:block">
                <p className="text-sm opacity-80">{t.heroStats?.response ?? 'Avg. response time'}</p>
                <p className="text-3xl font-bold mt-1">~12m</p>
                {heroBadge && (
                  <p className="mt-4 text-xs uppercase tracking-wide opacity-80">
                    {heroBadge}
                  </p>
                )}
              </div>

              <div className="absolute -left-10 -bottom-10 hidden w-40 rounded-3xl border border-white/60 bg-white/80 p-4 text-sm shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5 lg:block">
                <p className="font-semibold text-gray-900 dark:text-white">{t.chatbot?.title ?? 'Assistant'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">AI agent live 24/7</p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-gray-300">
              {t.subjectScrollerTitle ?? 'Trending subjects'}
            </p>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {[ALL_SUBJECTS, ...featuredSubjects].map((subject) => {
                const isAll = subject === ALL_SUBJECTS
                const isActive = subjectFilter === subject
                const label = isAll ? (t.filters?.any ?? 'All') : subjectLabelFor(subject as SubjectKey)
                return (
                  <button
                    key={label}
                    onClick={() => setSubjectFilter(subject)}
                    className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'border-transparent bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] text-white shadow-lg'
                        : 'border-gray-200/70 bg-white/80 text-gray-700 hover:border-gray-300 dark:bg-white/5 dark:text-gray-200 dark:border-white/10'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trusted */}
        <section className="mt-4">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/60 bg-white/70 px-6 py-5 text-sm font-medium text-gray-500 shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
                  {t.trustedBy ?? 'Trusted by teams across Georgia'}
                </span>
                <div className="flex flex-1 flex-wrap items-center justify-end gap-3 text-gray-700 dark:text-gray-200">
                  {trustBadges.map((badge) => (
                    <span key={badge} className="rounded-full border border-gray-200/70 px-4 py-1 text-xs uppercase tracking-wide dark:border-white/20">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why section */}
        <section id="learn-more" className="pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">01</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {t.highlight?.title ?? 'Why EduConnect wins hackathons'}
              </h2>
              <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                {t.highlight?.subtitle ?? 'Polished gradients, instant insights, and monetization hooks build trust at first glance.'}
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {highlightCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl shadow-pink-100/30 backdrop-blur hover:-translate-y-1 hover:shadow-2xl transition dark:border-white/10 dark:bg-white/5"
                >
                  <div className="text-3xl">{card.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl bg-gradient-to-br from-[#7b2ff7] to-[#f107a3] p-8 text-white shadow-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">02</p>
              <h2 className="mt-4 text-3xl font-bold">{t.steps?.title ?? 'How it works'}</h2>
              <p className="mt-2 text-white/80">
                {t.steps?.subtitle ?? 'Show the flow like a product tour and keep judges oriented.'}
              </p>
              <div className="mt-10 rounded-2xl bg-white/15 p-5 text-sm leading-relaxed text-white/90">
                {t.steps?.cta ?? 'Demo-ready UX with AI chat, premium upsells, and verifiable data.'}
              </div>
            </div>
            <div className="space-y-6">
              {journeySteps.map((step, idx) => (
                <div
                  key={step.title}
                  className="flex flex-col gap-3 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
                    <span className="font-semibold">0{idx + 1}</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-200">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters & tutors */}
        <section id="search" className="pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">03</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {t.tutors?.heading ?? 'Find the best tutors'}
              </h2>
              <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                {t.filtersLead ?? 'Stack beautiful controls with real data so everyone feels the product is already live.'}
              </p>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{t.filters?.title ?? 'Filters'}</p>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedSubjectLabel}</h3>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 dark:bg-blue-900/40 dark:text-blue-200">
                    {t.filters?.pricePrefix ?? 'Price range'}: ₾{priceRange[0]} - ₾{priceRange[1]}
                  </span>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700 dark:bg-purple-900/40 dark:text-purple-200">
                    {t.filters?.experience ?? 'Experience'}: {experienceFilter}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t.filters?.subject ?? 'Subject'}
                  </label>
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value as SubjectFilter)}
                    className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-[#7b2ff7] focus:ring-2 focus:ring-[#7b2ff7] dark:border-white/10 dark:bg-gray-900 dark:text-white"
                  >
                    {subjectOptions.map((s) => (
                      <option key={s} value={s}>
                        {s === ALL_SUBJECTS ? (t.filters?.any ?? 'All') : subjectLabelFor(s as SubjectKey)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {(t.filters?.pricePrefix ?? 'Price range') + `: ₾${priceRange[0]} - ₾${priceRange[1]}`}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="20"
                      max="80"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = Number(e.target.value)
                        setPriceRange([newMin, Math.max(newMin, priceRange[1])])
                      }}
                      className="w-full h-2 rounded-lg bg-gradient-to-r from-blue-200 to-purple-200 accent-[#7b2ff7]"
                    />
                    <input
                      type="range"
                      min="20"
                      max="80"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = Number(e.target.value)
                        setPriceRange([Math.min(newMax, priceRange[0]), newMax])
                      }}
                      className="w-full h-2 rounded-lg bg-gradient-to-r from-purple-200 to-pink-200 accent-[#f107a3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    {t.filters?.experience ?? 'Experience'}
                  </label>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value as ExpFilter)}
                    className="w-full rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-[#f107a3] focus:ring-2 focus:ring-[#f107a3] dark:border-white/10 dark:bg-gray-900 dark:text-white"
                  >
                    {expOptions.map(({ key, label }) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] bg-clip-text text-transparent">
                    {t.tutors?.heading ?? 'Find the best tutors'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t.tutors?.subheading ?? 'Every card is animated to feel alive during demos.'}
                  </p>
                </div>
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-100">
                  {typeof t.tutors?.count === 'function' ? t.tutors.count(tutors.length) : `${tutors.length}`}
                </span>
              </div>

              {tutors.length === 0 ? (
                <div className="text-center py-16 bg-white/80 backdrop-blur rounded-3xl shadow-lg border border-white/60 dark:border-white/10 dark:bg-white/5">
                  <p className="text-gray-500 text-lg">
                    {t.tutors?.empty ?? 'No results found. Try different filters.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tutors.map((tutor, index) => (
                    <TutorCard key={tutor.id} tutor={tutor} index={index} onContactClick={handleContactClick} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-purple-900 to-black p-10 text-white shadow-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">04</p>
              <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{t.testimonials?.title ?? 'Proof people feel'}</h2>
                  <p className="mt-2 text-white/80">
                    {t.testimonials?.subtitle ?? 'Short quotes and roles show traction during your pitch.'}
                  </p>
                </div>
                <Link
                  href="/register?role=tutor"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
                >
                  {t.cta?.secondary ?? 'Talk to us'}
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                    <p className="text-sm leading-relaxed text-white/90">{testimonial.quote}</p>
                    <div className="mt-4">
                      <p className="text-base font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs uppercase tracking-wide text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot & CTA */}
        <section className="pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <Chatbot />
            <div className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/5">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">05</p>
              <h3 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{t.cta?.title ?? 'Launch your pilot in minutes'}</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {t.cta?.subtitle ?? 'Share access with judges, onboard tutors, or open the student waitlist instantly.'}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register?role=student"
                  className="flex-1 rounded-2xl bg-gradient-to-r from-[#7b2ff7] to-[#f107a3] px-6 py-3 text-center font-semibold text-white shadow-lg hover:-translate-y-0.5 transition"
                >
                  {t.cta?.primary ?? 'Start matching'}
                </Link>
                <a
                  href="mailto:hello@educonnect.ge"
                  className="flex-1 rounded-2xl border border-gray-200 bg-white/70 px-6 py-3 text-center font-semibold text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-100"
                >
                  {t.cta?.secondary ?? 'Book a live demo'}
                </a>
              </div>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                {t.cta?.footnote ?? 'No waitlists. Everything you see is live and clickable.'}
              </p>
            </div>
          </div>
        </section>
      </div>

      <TutorModal
        tutor={selectedTutor}
        isOpen={isModalOpen}
        showSuccessMessage={showSuccessMessage}
        onClose={handleCloseModal}
        onSendMessage={handleSendContactMessage}
      />
    </div>
  )
}
