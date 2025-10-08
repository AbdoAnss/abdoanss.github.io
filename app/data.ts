type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  description?: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

type Education = {
  institution: string
  degree: string
  description?: string
  start: string
  end: string
  id: string
}


export const EDUCATION: Education[] = [
  {
    institution: 'Université de Bretagne Occidentale',
    degree: 'Master Informatique, Parcours ILIADE',
    description: 'Ingénierie du Logiciel, Applications aux Données Environnementales. Systèmes cyber-physiques, systèmes multi-agents, Big Data, Java, JEE, Python.',
    start: '09/2025',
    end: 'Présent',
    id: 'edu1',
  },
  {
    institution: 'Institut National des Postes et Télécoms',
    degree: "Diplôme d'Ingénieur d'État en Informatique",
    description: "Formation d'ingénieur avec focus sur les architectures logicielles, le développement web et mobile, les bases de données, et les microservices. Projets réalisés en Java, Python, C/C++, JavaScript, Next.js.",
    start: '09/2022',
    end: '2026',
    id: 'edu2',
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'Motion Primitives Pro',
    description:
      'Advanced components and templates to craft beautiful websites.',
    link: 'https://pro.motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0',
    id: 'project1',
  },
  {
    name: 'Motion Primitives',
    description: 'UI kit to make beautiful, animated interfaces.',
    link: 'https://motion-primitives.com/',
    video:
      'https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'INPT',
    title: 'Stage de recherche',
    start: '06/2025',
    end: '08/2025',
    description: 'Next.js, React flow, PostgreSQL, Microservices, Docker, Typescript, Neo4j, openAI API.',
    link: '/work/inpt',
    id: 'work1',
  },
  {
    company: 'CIEMS Group',
    title: 'Stage de développement web',
    start: '06/2024',
    end: '08/2024',
    description: 'Django, Python, HTML, CSS, JavaScript, Bootstrap, PostgreSQL, ML, Data Analysis.',
    link: '/work/ciems',
    id: 'work2',
  }
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Mon experience avec le certification OCP Java SE 11',
    description: 'Retour d\'experience sur ma preparation et mon passage de la certification OCP Java SE 11.',
    link: '/blog/mon-experience-avec-le-certification-ocp-java-se-11',
    uid: 'blog-1',
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/abdoanss',
  },
  {
    label: 'Twitter',
    link: 'https://twitter.com/abdoanss',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/abdoanss',
  },
  {
    label: 'Instagram',
    link: 'https://www.instagram.com/abdo_anss',
  },
]

export const EMAIL = 'abdessamad.anssem@gmail.com'
