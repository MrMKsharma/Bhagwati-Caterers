import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany()
    console.log('Testimonials found:', testimonials.length)
    console.log(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkTestimonials()