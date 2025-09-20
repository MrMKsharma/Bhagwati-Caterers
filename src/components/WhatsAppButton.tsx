import { Sparkles } from 'lucide-react'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

const WhatsAppButton = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919057264895'
  const message = encodeURIComponent('नमस्कार! मला आपल्या भोजन सेवांबद्दल चौकशी करायची आहे.')

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
      aria-label="WhatsApp वर चॅट करा"
    >
      <WhatsAppIcon className="h-6 w-6 group-hover:animate-bounce" />
      <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-ping" />
    </button>
  )
}

export default WhatsAppButton