const ShowPdpInfo = ({ pdp }: any) => {
  const info = [
    { nom: 'Référence Irchad', value: pdp?.irchad_id },
    { nom: 'Nom', value: pdp?.nom },
    { nom: 'Prénom', value: pdp?.prenom },
    { nom: 'Sexe', value: pdp?.sexe },
    {
      nom: 'Date de naissance',
      value: pdp?.date_naissance.toISOString().substring(0, 10),
    },
    { nom: 'CIN', value: pdp?.num_cin },
    { nom: 'Telephone', value: pdp?.tel },
    { nom: 'Email', value: pdp?.email },
    { nom: 'Type de form juridique', value: pdp?.type_form_juridique },
    {
      nom: 'Date de form juridique',
      value: pdp?.date_form_juridique.toISOString().substring(0, 10),
    },
    { nom: 'Region', value: pdp?.region },
    { nom: 'Province', value: pdp?.province },
    { nom: 'Commune', value: pdp?.commune },
    { nom: 'Nom du projet', value: pdp?.nom_projet },
    { nom: 'Secteur du projet', value: pdp?.secteur_projet },
    {
      nom: 'Experience 1',
      value: pdp?.experience_1 ? pdp?.experience_1 : '---',
    },
    {
      nom: 'Experience 2',
      value: pdp?.experience_2 ? pdp?.experience_2 : '---',
    },
  ]
  return (
    <div className="grid grid-cols-4 gap-10">
      {info.map(e => (
        <div className="grid grid-cols-2 gap-6 text-lg" key={e.nom}>
          <span className="block text-gray-500">{e.nom}</span>
          <span className="text-gray-900">{e?.value}</span>
        </div>
      ))}
    </div>
  )
}

export default ShowPdpInfo
