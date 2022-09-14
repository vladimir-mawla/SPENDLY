import { Fab } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Navbar from "../../components/Home/Navbar"
import Footer from "../../components/Home/Footer"
import Ngos from "../../components/Home/Ngos"
import Stats from "../../components/Home/Stats"
import Welcome from "../../components/Home/Welcome"
import ScrollTop from "../../components/ScrollTop"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPublic } from "../../features/stats/statsSlice"

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPublic())
  }, [])

  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.stats
  )

  return (
    <>
      <Navbar />
      <Welcome />
      <Stats data={data} />
      <Ngos data={data} />
      <Footer />
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}
export default Home
