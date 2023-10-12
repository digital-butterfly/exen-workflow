'use client'
import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const State = ({ data }: any) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  })
  const [chartOptions, setChartOptions] = useState({})

  // Group pdp by etat
  const etatCounts = data.reduce(
    (counts: { [key: string]: number }, data: any) => {
      const etat =
        data.etat == 'valid'
          ? 'validé'
          : data.etat == 'refused'
          ? 'retour pour modification'
          : data.etat == 'tenu_commite'
          ? 'tenu comité'
          : data.etat
      counts[etat] = (counts[etat] || 0) + 1
      return counts
    },
    {},
  )

  useEffect(() => {
    setChartData({
      labels: ['Validé', 'Retour pour modif', 'Tenu comité'],
      datasets: [
        {
          label: 'Pdp',
          data: [
            etatCounts['validé'],
            etatCounts['retour pour modification'],
            etatCounts['tenu comité'],
          ],
          backgroundColor: '#009fe150',
        },
      ],
    })

    setChartOptions({
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Representation des PDP par état',
          font: {
            size: 20,
          },
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        y: {
          ticks: {
            font: {
              size: 16,
            },
          },
        },
        x: {
          ticks: {
            font: {
              size: 16,
            },
          },
        },
      },
    })
  }, [])

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default State
