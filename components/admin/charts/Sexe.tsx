import PieChart from './PieChart'

const Sexe = ({ pdp }: any) => {
  return (
    <div>
      <PieChart data={pdp} title="Sexes" group="sexe" />
    </div>
  )
}

export default Sexe
