'use client'

const RegionalGraphics = () => {

  // Hindu gods and symbols for decorative elements
  const decorativeElements = [
    { symbol: 'ॐ', position: 'top-left', size: 'text-4xl' },
    { symbol: 'ॐ', position: 'top-right', size: 'text-4xl' },
    { symbol: 'ॐ', position: 'bottom-left', size: 'text-4xl' },
    { symbol: 'ॐ', position: 'bottom-right', size: 'text-4xl' },
    { symbol: 'ळ', position: 'middle-left', size: 'text-6xl' },
    { symbol: 'क्ष', position: 'middle-right', size: 'text-6xl' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {decorativeElements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.size} text-orange-200 opacity-20 animate-bounce-subtle ${
            element.position.includes('top') ? 'top-10' : 
            element.position.includes('bottom') ? 'bottom-10' : 'top-1/2'
          } ${
            element.position.includes('left') ? 'left-10' : 
            element.position.includes('right') ? 'right-10' : 'left-1/4'
          } ${
            element.position.includes('middle') && element.position.includes('right') ? 'left-3/4' : ''
          }`}
          style={{ animationDelay: `${index * 0.5}s` }}
        >
          {element.symbol}
        </div>
      ))}
      
      {/* Floating leaves for vegetarian theme */}
      {[...Array(5)].map((_, index) => (
        <div
          key={`leaf-${index}`}
          className={`absolute text-green-300 opacity-30 ${
            index % 2 === 0 ? 'text-2xl animate-float1' : 'text-3xl animate-float2'
          }`}
          style={{
            top: `${20 + index * 15}%`,
            left: `${10 + index * 15}%`,
            animationDelay: `${index * 1}s`
          }}
        >
          ♣
        </div>
      ))}
      

    </div>
  )
}

export default RegionalGraphics