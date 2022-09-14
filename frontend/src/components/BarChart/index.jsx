import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { useTheme } from "@mui/styles"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = (props) => {
  const theme = useTheme()

  const { title, dataSets } = props

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        padding: {
          top: 10,
          bottom: 10,
        },
        font: {
          size: 18,
          weight: "bold",
        },
        align: "center",
        color: theme.palette.background.main,
        fullSize: true,
      },
    },
  }

  if (dataSets) {
    const data = {
      labels: [],
      datasets: [
        {
          label: "Amount",
          data: [],
          backgroundColor: theme.palette.primary.main,
        },
      ],
    }

    dataSets.forEach((set) => {
      data.labels.push(set._id)
      data.datasets[0].data.push(set.total)
    })

    return <Bar options={options} data={data} />
  }
  return null
}

export default BarChart
