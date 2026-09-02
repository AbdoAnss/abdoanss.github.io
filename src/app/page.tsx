import { Container } from '@/components/layout/Container'
import { HomeContact } from '@/components/pages/home/HomeContact'
import { HomeEducation } from '@/components/pages/home/HomeEducation'
import { HomeExperience } from '@/components/pages/home/HomeExperience'
import { HomeHero } from '@/components/pages/home/HomeHero'
import { HomePosts } from '@/components/pages/home/HomePosts'
import { HomeProjects } from '@/components/pages/home/HomeProjects'
import { HomeSocials } from '@/components/pages/home/HomeSocials'
import { HomeTechStack } from '@/components/pages/home/HomeTechStack'
import links from '@/data/links.json'
import siteMetadata from '@/data/metadata.json'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const siteUrl = 'https://abdoanss.github.io'

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: siteMetadata.name,
    identifier: siteUrl,
    description: siteMetadata.description,
    url: siteUrl,
    email: links.email,
    homeLocation: {
      '@type': 'Place',
      name: 'Paris, France',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Paris',
        addressCountry: 'FR',
      },
    },
    sameAs: [
      links.social.github,
      links.social.linkedin,
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />

      <Container className="space-y-12">
        <HomeHero />
        <HomeTechStack />
        <HomeExperience />
        <HomeEducation />
        <HomeProjects />
        <HomePosts />
        <HomeSocials />
        <HomeContact />
      </Container>
    </>
  )
}
