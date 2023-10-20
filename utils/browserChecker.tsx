'use client'

const BrowserChecker = () => {
  var sBrowser,
    sUsrAg = navigator.userAgent

  let alertShown = false

  if (sUsrAg.indexOf('Firefox') > -1) {
    sBrowser = 'Mozilla Firefox'
    if (!alertShown) {
      alertShown = true
      alert(
        'Veuillez utilizer Google Chrome ou Edge pour meilleur performance.',
      )
    }
  } else if (sUsrAg.indexOf('Edge') > -1) {
    sBrowser = 'Microsoft Edge'
    if (!alertShown) {
      alertShown = true
      alert(
        'Veuillez utilizer Google Chrome ou Edge pour meilleur performance.',
      )
    }
  } else if (sUsrAg.indexOf('Chrome') > -1) {
    sBrowser = 'Google Chrome or Chromium'
  } else {
    sBrowser = 'unknown'
    if (!alertShown) {
      alertShown = true
      alert(
        'Veuillez utilizer Google Chrome ou Edge pour meilleur performance.',
      )
    }
  }

  return null
}

export default BrowserChecker
