'use client'
import { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJs, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJs.register(Title, Tooltip, Legend, ArcElement)

const PieChart = ({ data, title, group }: any) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  })

  const [chartOptions, setChartOptions] = useState({})

  // Group pdp by group
  const filteredData = data.filter(
    (d: any) => d[group] !== undefined && d[group] !== null && d[group] !== '',
  )
  const groupCounts = filteredData.reduce(
    (counts: { [key: string]: number }, data: any) => {
      counts[data[group]] = (counts[data[group]] || 0) + 1
      return counts
    },
    {},
  )

  console.log(groupCounts)

  useEffect(() => {
    const keys = Object.keys(groupCounts)
    const colors = ['#009fe1aa', '#FF6384aa']
    const backgroundColor = keys.map(
      (key, index) => colors[index % colors.length],
    )

    setChartData({
      labels: keys,
      datasets: [
        {
          data: Object.values(groupCounts),
          backgroundColor,
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
    })
  }, [])

  return (
    <div>
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}

export default PieChart
