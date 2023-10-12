import BarChart from './BarChart'

const SecteurProjet = ({ data }: any) => {
  return (
    <div>
      <BarChart data={data} title="Secteur de Travail" group="secteur_projet" />
    </div>
  )
}

export default SecteurProjet
