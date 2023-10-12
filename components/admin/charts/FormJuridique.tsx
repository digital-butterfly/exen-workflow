import BarChart from './BarChart'

const FormJuridique = ({ data }: any) => {
  return (
    <div>
      <BarChart
        data={data}
        title="Form Juridiques"
        group="type_form_juridique"
      />
    </div>
  )
}

export default FormJuridique
