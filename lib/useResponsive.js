import { useState, useEffect } from 'react'

export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState('desktop')
  const [isFolded, setIsFolded] = useState(false)
  const [isPortrait, setIsPortrait] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Detect orientation
      setIsPortrait(height >= width)
      
      // Detect foldable device state
      if (window.visualViewport) {
        const vvWidth = window.visualViewport.width
        const wWidth = window.innerWidth
        setIsFolded(vvWidth < wWidth * 0.8) // If viewport is significantly smaller, likely folded
      }
      
      // Determine screen size with extended breakpoints
      if (width < 320) {
        setScreenSize('xs')
      } else if (width < 480) {
        setScreenSize('sm')
      } else if (width < 640) {
        setScreenSize('md')
      } else if (width < 1024) {
        setScreenSize('lg')
      } else if (width < 1440) {
        setScreenSize('xl')
      } else {
        setScreenSize('2xl')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    window.addEventListener('orientationchange', checkScreenSize)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      window.removeEventListener('orientationchange', checkScreenSize)
    }
  }, [])

  const getResponsive = (xs, sm, md, lg, xl, xl2) => {
    const values = { xs, sm, md, lg, xl, xl2 }
    return values[screenSize] || xl2
  }

  return { screenSize, isFolded, isPortrait, getResponsive }
}
