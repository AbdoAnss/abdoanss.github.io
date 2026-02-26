'use client'
import { motion } from 'motion/react'
import { XIcon } from 'lucide-react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import {
  PROJECTS,
  WORK_EXPERIENCE,
  BLOG_POSTS,
  EMAIL,
  SOCIAL_LINKS,
  EDUCATION,
} from './data'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

type ProjectVideoProps = {
  src?: string
}

function ProjectVideo({ src }: ProjectVideoProps) {
  // kept for backward compatibility but no longer used for display
  return null
}

type ProjectImageProps = {
  src?: string
  alt?: string
}

function ProjectImage({ src, alt }: ProjectImageProps) {
  const fallback = '/cover.jpg'

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <img
          src={src ?? fallback}
          alt={alt ?? 'project image'}
          className="aspect-video w-full cursor-zoom-in rounded-xl object-cover"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <img
            src={src ?? fallback}
            alt={alt ?? 'project image'}
            className="aspect-video h-[50vh] w-full rounded-xl object-cover md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
        >
          <path
            d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
    </Magnetic>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bonjour 👋, je m'appelle <span className="font-semibold text-zinc-900 dark:text-zinc-100">Abdessamad</span>.
              Étudiant en génie logiciel à l'<span className="font-semibold text-zinc-900 dark:text-zinc-100">Université de Bretagne Occidentale</span> à Brest
              et élève ingénieur à l'<span className="font-semibold text-zinc-900 dark:text-zinc-100">Institut National des Postes et Télécoms</span> de Rabat
              dans le cadre d'une <a href="https://fr.wiktionary.org/wiki/double_diplomation" target="_blank" rel="noopener noreferrer" className="underline decoration-zinc-400 hover:decoration-zinc-600 dark:decoration-zinc-500 dark:hover:decoration-zinc-300 transition-colors">double diplomation</a>.
            </p>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Passionné par l'algorithmique et les mathématiques, je développe principalement en <span className="font-semibold text-zinc-900 dark:text-zinc-100">Java</span>,
              avec une attirance particulière pour <span className="font-semibold text-zinc-900 dark:text-zinc-100">Golang</span> et <span className="font-semibold text-zinc-900 dark:text-zinc-100">Rust</span>.
              J'ai travaillé sur des projets variés, allant du développement web à l'ingénierie des données. J'aime découvrir et apprendre de nouvelles choses.
            </p>
          </div>
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQH2Ubxv12p7Uw/profile-displayphoto-crop_800_800/B4EZyXIFMlJ0AI-/0/1772062009124?e=1773878400&v=beta&t=5d6M7ob7pfaP6b5ZUhG7421sT-2e05Jni4hoAaFB6b8"
            alt="my linkedin profile picture"
            className="h-40 w-40 shrink-0 rounded-full object-cover ring-2 ring-zinc-400 shadow-sm dark:ring-zinc-800"
          />
        </div>

      </motion.section>


      {/* Education */}
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Education</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {EDUCATION.map((edu) => (
              <div
                key={edu.id}
                className="-mx-3 rounded-xl px-3 py-3"
                data-id={edu.id}
              >
                <div className="flex w-full flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-normal dark:text-zinc-100">
                      {edu.degree}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {edu.institution}
                    </p>
                    {edu.description && (
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 text-right text-zinc-600 dark:text-zinc-400">
                    {edu.start} - {edu.end}
                  </p>
                </div>
              </div>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>


      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Expérience professionnelle</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {WORK_EXPERIENCE.map((job) => (
              <Link
                key={job.id}
                className="-mx-3 rounded-xl px-3 py-3"
                href={job.link}
                data-id={job.id}
              >
                <div className="flex w-full flex-row items-start justify-between gap-7">
                  <div className="flex-1">
                    <h4 className="font-normal dark:text-zinc-100">
                      {job.title}
                    </h4>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {job.company}
                    </p>
                    {job.description && (
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {job.description}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 text-right text-zinc-600 dark:text-zinc-400">
                    {job.start} - {job.end}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Projets sélectionnés</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <ProjectImage src={project.image} alt={project.name} />
              </div>
              <div className="px-1">
                <Link
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 dark:bg-zinc-50 transition-all duration-200 group-hover:max-w-full"></span>
                </Link>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                {project.skills && project.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>



      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-3 text-lg font-medium">Blog</h3>
        <div className="flex flex-col space-y-0">
          <AnimatedBackground
            enableHover
            className="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/80"
            transition={{
              type: 'spring',
              bounce: 0,
              duration: 0.2,
            }}
          >
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.uid}
                className="-mx-3 rounded-xl px-3 py-3"
                href={post.link}
                data-id={post.uid}
              >
                <div className="flex flex-col space-y-1">
                  <h4 className="font-normal dark:text-zinc-100">
                    {post.title}
                  </h4>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </AnimatedBackground>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">Contact</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          Feel free to contact me at{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
