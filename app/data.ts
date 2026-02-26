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
      "Conception et développement d'une architecture microservices pour la gestion des produits et des commandes. Utilisation de gRPC pour une communication synchrone performante entre les services. Intégration d'Apache Kafka pour la communication asynchrone basée sur les événements, améliorant la résilience et la scalabilité du système.",
    link: '/projects/grpc-kafka-springboot',
    image:
      'https://blog.postman.com/wp-content/uploads/2023/11/gRPC-vs-REST-1.jpg',
    skills: ['Spring Boot', 'gRPC', 'Kafka', 'Microservices', 'Java'],
    id: 'project-grpc-kafka-microservices',
  },
  {
    name: 'Client Go — API Fantasy Premier League',
    description:
      "Projet personnel de développement d'un client Go pour consommer l'API publique Fantasy Premier League. Désérialisation JSON vers des types Go fortement typés, système de cache avec TTL configurable, tests unitaires et gestion d'erreurs explicite.",
    link: 'https://github.com/abdoanss',
    image: 'https://cdn.azilen.com/wp-content/uploads/2023/09/banner_web-2.jpg',
    skills: ['Go', 'REST API', 'Caching', 'Unit Testing'],
    id: 'project-go-fpl-client',
  },
  {
    name: 'Automatisation DevOps & GitOps',
    description:
      "Projet académique de mise en place d'une chaîne DevOps complète pour le déploiement de microservices. Pipelines GitLab CI/CD avec SAST, DAST, SCA et gestion des secrets via Vault. Déploiement GitOps sur Kubernetes avec ArgoCD et monitoring Prometheus/Grafana.",
    link: 'https://github.com/abdoanss',
    image: 'https://gainanov.pro/eng-blog/assets/images/gitlab-ci/gitlab-ci-devops.png',
    skills: ['GitLab CI/CD', 'Kubernetes', 'ArgoCD', 'Prometheus', 'Grafana', 'Vault'],
    id: 'project-devops-gitops',
  },
  {
    name: 'Pipeline ELT Fantasy Premier League',
    description:
      "Projet personnel d'ingénierie des données autour de l'API Fantasy Premier League. Pipeline temps réel bout-en-bout : producteur Kafka → Spark Streaming → PostgreSQL, avec traitement PySpark et dashboard de visualisation.",
    link: 'https://github.com/abdoanss',
    image: 'https://rivery.io/wp-content/uploads/2020/05/ETL-Process-for-linkedin3-1024x535.png',
    skills: ['Kafka', 'Spark Streaming', 'PySpark', 'PostgreSQL'],
    id: 'project-elt-fpl-pipeline',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Institut Universitaire Européen de la Mer (IUEM)',
    title: 'Stagiaire Ingénieur Logiciel',
    start: '09/2025',
    end: '01/2026',
    description: 'Migration de l\'interface graphique de PyCoast de Bokeh vers Panel. Conception et prototypage de la nouvelle interface en collaboration avec les chercheurs. Adaptation du pipeline CI/CD GitLab.',
    link: '/work/iuem',
    id: 'work-iuem',
  },
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
    title: 'Celery, le GIL et l\'asynchronisme en Python — retour d\'expérience',
    description: 'Plongée technique dans Celery, les décorateurs Python, le GIL et la distinction sync/async, illustrée par mon stage chez CIEMS où j\'ai orchestré des tâches de fond sur un moteur de recommandation.',
    link: '/blog/celery-python-async-taches-de-fond',
    uid: 'blog-2',
  },
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
