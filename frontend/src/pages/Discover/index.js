import { Typography } from "@mui/material"
import DiscoverTable from "../../components/DiscoverTable"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getDiscoverUsers } from "../../features/stats/statsSlice"

const Discover = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDiscoverUsers())
  }, [])

  const { data } = useSelector((state) => state.stats)

  if (!data[0]) {
    return null
  }
  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Discover
      </Typography>

      <DiscoverTable rows={data}></DiscoverTable>
    </>
  )
}

export default Discover
