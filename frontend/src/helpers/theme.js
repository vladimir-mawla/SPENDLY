import { createTheme } from "@mui/material/styles"
import { blue, red, orange, yellow, green } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: '#1b5e20',
    },
    secondary: {
      main: blue[900],
      main: '#2e7d32',
    },
    danger: {
      main: red[900],
      main: '#2e7d32',
    },
    background: {
      main: '#c0ca33',
      darker: "#9B9393",
    },
    light: {
      main: "white",
      contrastText: "#23242A",
      darker: "#9B9393",
    },
    green: {
      main : green[400],
    },
    orange: {
      main: orange[400],
    },
    yellow: {
      main: yellow[400],
    },

  },
})

theme.components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "15px",
        textTransform: "none",
      },
      containedPrimary: {
          textTransform: "none",
      },
    },
    defaultProps: {
      disableFocusRipple: false,
      fullWidth: true,
      size: "large",
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: "#fff",
        border: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      },
      arrow: {
        color: theme.palette.primary.main,
      },
    },
    defaultProps: {
      arrow: true,
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontSize: "1.1rem",
      },
    },
    defaultProps: {
      shrink: true,
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '15px'
      }
    },
    defaultProps: {
      notched: true
    }
  },
  MuiInput: {
    styleOverrides: {
      root: {
        top: theme.spacing(2),
        border: `1px solid ${theme.palette.background.main[900]}`,
        outline: `1px solid transparent`,
        padding: theme.spacing(1),
        "&$focused": {
          border: `1px solid ${theme.palette.primary.main}`,
          outline: `1px solid ${theme.palette.primary.main}`,
        },
      },
    },
    defaultProps: {},
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        margin: '20px 0',
      }
    },
    defaultProps: {
      variant: 'middle'
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        padding: '5px',
        backgroundColor: theme.palette.background.main,
        color: "white"
      }
    },
    defaultProps: {
      square: true,
      elevation: 0
    }
  },
  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.primary.main,
        color: "white"
      }
    },
    defaultProps: {}
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: theme.palette.primary.main
      }
    }
  }
  ,MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: theme.palette.light.main,
        color: theme.palette.light.contrastText
      }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: 'white',
        color: theme.palette.background.darker,
        borderRadius: '15px',
      }
    },
    defaultProps: {
      raised: true
    }
  },
}

export default theme
