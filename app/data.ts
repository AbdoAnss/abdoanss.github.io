type Project = {
  name: string
  description: string
  link: string
  video?: string
  image?: string
  skills: string[]
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
    name: 'Store en ligne avec Next.js et Prisma',
    description:
      'Application web moderne pour la gestion et la présentation d’une collection de produits, développée avec Next.js et Prisma. Fonctionnalités avancées de gestion, interface réactive et intégration PostgreSQL.',
    link: '/projects/prisma-next-store',
    image:
      'https://cdn.prod.website-files.com/610bb663a35dd3364ddbf08c/633d7a26d52a3258d9815a89_nextjs-prisma-header-min.png',
    skills: ['React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    id: 'project-next-prisma-store',
  },
  {
    name: 'Architecture microservices avec gRPC et Kafka',
    description:
      "Conception et développement d'une architecture microservices pour la gestion des produits et des commandes. Utilisation de gRPC pour une communication synchrone performante entre les services. Intégration d’Apache Kafka pour la communication asynchrone basée sur les événements, améliorant la résilience et la scalabilité du système.",
    link: '/projects/grpc-kafka-springboot',
    image:
      'https://blog.postman.com/wp-content/uploads/2023/11/gRPC-vs-REST-1.jpg',
    skills: ['Spring Boot', 'gRPC', 'Kafka', 'Microservices', 'Java'],
    id: 'project-grpc-kafka-microservices',
  }
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
    link: 'https://twitter.com/itsabdoanss',
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
