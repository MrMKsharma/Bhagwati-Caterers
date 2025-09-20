import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'service'
  siteName?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  canonical?: string
  noindex?: boolean
  nofollow?: boolean
}

export default function SEOHead({
  title = "Bhagwati Caterers - Premium Catering Services",
  description = "Professional catering services for weddings, corporate events, parties and all special occasions. Delicious food, exceptional service, and memorable experiences.",
  keywords = "catering, wedding catering, corporate catering, event catering, food service, party catering, professional catering, bhagwati caterers",
  image = "/images/og-image.jpg",
  url = "",
  type = "website",
  siteName = "Bhagwati Caterers",
  author = "Bhagwati Caterers",
  publishedTime,
  modifiedTime,
  canonical,
  noindex = false,
  nofollow = false
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bhagwati-caterers.com"
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
  const canonicalUrl = canonical || fullUrl

  // Generate robots content
  const robotsContent = []
  if (noindex) robotsContent.push('noindex')
  if (nofollow) robotsContent.push('nofollow')
  if (robotsContent.length === 0) robotsContent.push('index', 'follow')

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Additional OG tags for articles */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bhagwaticaterers" />
      <meta name="twitter:creator" content="@bhagwaticaterers" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Business-specific meta tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="California" />
      <meta name="geo.position" content="34.0522;-118.2437" />
      <meta name="ICBM" content="34.0522, -118.2437" />
      
      {/* Contact information */}
      <meta name="contact" content="info@bhagwati-caterers.com" />
      <meta name="copyright" content="Bhagwati Caterers" />
      
      {/* Schema.org markup */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={fullImageUrl} />
    </Head>
  )
}

// Specialized SEO components for different page types
interface ServicePageSEOProps extends Omit<SEOProps, 'type'> {
  serviceName: string
  servicePrice?: string
}

export function ServicePageSEO({ 
  serviceName, 
  servicePrice, 
  ...props 
}: ServicePageSEOProps) {
  const title = `${serviceName} - Bhagwati Caterers`
  const description = `Professional ${serviceName.toLowerCase()} services. ${props.description || 'Contact us for a custom quote and exceptional service.'}`
  
  return (
    <SEOHead
      {...props}
      title={title}
      description={description}
      type="service"
      keywords={`${serviceName.toLowerCase()}, ${props.keywords || 'catering, professional service, bhagwati caterers'}`}
    />
  )
}

interface MenuPageSEOProps extends Omit<SEOProps, 'type'> {
  menuCategory?: string
}

export function MenuPageSEO({ 
  menuCategory, 
  ...props 
}: MenuPageSEOProps) {
  const title = menuCategory 
    ? `${menuCategory} Menu - Bhagwati Caterers`
    : 'Catering Menu - Bhagwati Caterers'
  const description = menuCategory
    ? `Explore our ${menuCategory.toLowerCase()} menu items. ${props.description || 'Premium quality ingredients and exceptional flavors.'}`
    : props.description || 'Browse our complete catering menu featuring premium dishes for all occasions.'
  
  return (
    <SEOHead
      {...props}
      title={title}
      description={description}
      type="website"
      keywords={`menu, ${menuCategory ? menuCategory.toLowerCase() + ', ' : ''}catering menu, food, ${props.keywords || 'bhagwati caterers'}`}
    />
  )
}

interface GalleryPageSEOProps extends Omit<SEOProps, 'type'> {
  albumName?: string
}

export function GalleryPageSEO({ 
  albumName, 
  ...props 
}: GalleryPageSEOProps) {
  const title = albumName 
    ? `${albumName} Gallery - Bhagwati Caterers`
    : 'Photo Gallery - Bhagwati Caterers'
  const description = albumName
    ? `View our ${albumName.toLowerCase()} photo gallery. ${props.description || 'See our exceptional catering services in action.'}`
    : props.description || 'Browse our photo gallery showcasing beautiful events and delicious food presentations.'
  
  return (
    <SEOHead
      {...props}
      title={title}
      description={description}
      type="website"
      keywords={`gallery, photos, ${albumName ? albumName.toLowerCase() + ', ' : ''}events, ${props.keywords || 'catering photos, bhagwati caterers'}`}
    />
  )
}