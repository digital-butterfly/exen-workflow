import { secteurs, secteursGlobal } from './formOptionsInfo'

const findSecteurGlobalBySecteurProjet = (secteur: string) => {
  for (let key in secteurs) {
    if (secteurs[key].includes(secteur)) {
      const result = secteursGlobal.find(
        sector =>
          sector.toLowerCase().replace(/\s/g, '') ===
          key.toLowerCase().replace(/\s/g, ''),
      )
      return result
    }
  }
}

export default findSecteurGlobalBySecteurProjet
