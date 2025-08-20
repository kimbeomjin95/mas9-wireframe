export function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const isUserAgentMobile = regex.test(navigator.userAgent)

  const isSmallScreen =
    typeof window !== 'undefined' && window.innerWidth <= 768

  return isUserAgentMobile || isSmallScreen
}

export function isTablet() {
  const regex = /Tablet|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return regex.test(navigator.userAgent)
}