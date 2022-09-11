
import { Zoom, useScrollTrigger, Box } from "@mui/material"
import PropTypes from "prop-types"


function ScrollTop(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100
    });
  
    const handleClick = event => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      )
  
      if (anchor) {
        anchor.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }
  
    return (
      <Zoom in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          {children}
        </Box>
      </Zoom>
    )
  }
  
  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired
  };

export default ScrollTop