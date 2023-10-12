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

const BarChart = ({ data, title, group }: any) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  })
  const [chartOptions, setChartOptions] = useState({})

  // Group pdp by group
  const groupCounts = data.reduce(
    (counts: { [key: string]: number }, data: any) => {
      counts[data[group]] = (counts[data[group]] || 0) + 1
      return counts
    },
    {},
  )

  useEffect(() => {
    setChartData({
      labels: Object.keys(groupCounts),
      datasets: [
        {
          label: 'Pdp',
          data: Object.values(groupCounts),
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
          text: title,
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

  return <Bar data={chartData} options={chartOptions} />
}

export default BarChart
