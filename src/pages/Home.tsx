import { AnimatePresence, motion } from 'framer-motion'

import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { TechGraph } from '@/components/sections/TechGraph'

export const Home = () => (
  <AnimatePresence mode="wait">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero />
      <About />
      <TechGraph />
      <Projects />
      <Experience />
      <Contact />
    </motion.div>
  </AnimatePresence>
)
