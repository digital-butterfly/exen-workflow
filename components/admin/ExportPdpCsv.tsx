'use client'

import { faTable } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSVLink } from 'react-csv'

const ExportPdpCsv = ({ data }: any) => {
  console.log(data)
  const filteredData = data.map((item: any) => {
    const {
      id,
      irchad_id,
      nom,
      prenom,
      sexe,
      date_naissance,
      num_cin,
      tel,
      email,
      type_form_juridique,
      date_form_juridique,
      region,
      commune,
      province,
      nom_projet,
      secteur_projet,
      experience_1,
      experience_2,
    } = item
    const formattedDateNaissance = new Date(date_naissance).toLocaleDateString(
      'en-US',
    )
    const formattedDateFormJuridique = new Date(
      date_form_juridique,
    ).toLocaleDateString('en-US')

    return {
      id,
      irchad_id,
      nom,
      prenom,
      sexe,
      date_naissance: formattedDateNaissance,
      num_cin,
      tel,
      email,
      type_form_juridique,
      date_form_juridique: formattedDateFormJuridique,
      region,
      commune,
      province,
      nom_projet,
      secteur_projet,
      experience_1,
      experience_2,
    }
  })

  console.log(filteredData)
  return (
    <CSVLink
      className="mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      data={filteredData}
    >
      <FontAwesomeIcon
        icon={faTable}
        className="mr-2"
        style={{ width: '1rem', display: 'inline' }}
      />
      Exporter
    </CSVLink>
  )
}

export default ExportPdpCsv
