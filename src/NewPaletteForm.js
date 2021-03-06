import React, { useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";
import DraggableColorList from "./DraggableColorList";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import arrayMove from "array-move";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import sizes from "./sizes";
import seedColors from "./seedColors";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    textDecoration: "none",
    textDecorationStyle: "none"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
    [sizes.down("sm")]: {
      height: "60px"
    },

    [sizes.down("xs")]: {
      height: "50px"
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: 0,
    height: "100vh",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  navBtn: {
    marginRight: "1rem",
    "& button": {
      margin: "0 0.5rem",
      justifyContent: "center",
      alignItems: "center"
    }
  },

  container: {
    width: "90%",
    height: "80%",
    display: "flex",
    // marginTop : "1rem",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  chromePicker: {
    width: "100% !important",
    marginTop: ".5rem"
  },

  addButton: {
    width: "100%",
    padding: ".2rem",
    marginTop: ".2rem",
    fontSize: "1rem"
  },

  colorInput: {
    width: "100%",
    height: "70px"
  },

  buttons: {
    width: "100%",
    marginTop: "1rem"
  },

  button: {
    width: "40%"
  },

  link: {
    textDecoration: "none"
  }
}));

const NewPaletteForm = props => {
  const MAX_NUM_COLORS = 20;

  useEffect(
    () =>
      ValidatorForm.addValidationRule(
        "isColorNameUnique",
        value =>
          colors.every(item => value.toLowerCase() !== item.name.toLowerCase()),
        []
      ),

    ValidatorForm.addValidationRule(
      "isColorUnique",
      value => colors.every(item => curColor !== item.color),
      []
    ),

    ValidatorForm.addValidationRule(
      "isNotEmpty",
      () => props.palettes.every(palette => palette.colors.length !== 0),
      []
    )
  );

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [curColor, setColor] = React.useState("teal");
  const [colors, updateColors] = React.useState(seedColors[0].colors);
  const [curName, updateName] = React.useState("");
  const [showing, showForm] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function setNewColor(newColor) {
    setColor(newColor.hex);
  }

  function clearPalette() {
    updateColors([]);
  }

  function addingNewColor() {
    const newColor = { color: curColor, name: curName };
    updateColors([...colors, newColor]);
    updateName("");
  }

  function handleChange(e) {
    updateName(e.target.value);
  }

  function removeColor(name) {
    let newColors = colors.filter(color => color.name !== name);
    updateColors(newColors);
  }

  function addRandomColor() {
    updateColors([...colors, pickRandomColor()]);
  }

  function show() {
    showForm(true);
  }
  function hide() {
    showForm(false);
  }

  function pickRandomColor() {
    let arrayToPick = Math.floor(Math.random() * seedColors.length);
    let array = seedColors[arrayToPick].colors;
    let isDuplicateColor = true;
    let colorPicked;
    while (isDuplicateColor) {
      colorPicked = array[Math.floor(Math.random() * array.length)];
      isDuplicateColor = colors.some(color => color.name === colorPicked.name);
    }
    return colorPicked;
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newColors = colors => arrayMove(colors, oldIndex, newIndex);
    updateColors(newColors);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtn}>
          <Link to="/" className={classes.link}>
            <Button
              variant="contained"
              color="secondary"
              className={[classes.button, classes.goBack].join(" ")}
            >
              Back
            </Button>
          </Link>
          <Button variant="contained" color="primary" onClick={show}>
            Save
          </Button>
        </div>
      </AppBar>

      {showing && (
        <PaletteMetaForm
          savePalette={props.savePalette}
          open={showing}
          hide={hide}
          colors={colors}
          palettes={props.palettes}
        />
      )}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <div className={classes.container}>
          <List>
            <Typography variant="h4">Design Your Palette</Typography>

            <span className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={clearPalette}
              >
                Clear Palette
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={addRandomColor}
                disabled={colors.length >= MAX_NUM_COLORS}
              >
                Random Color
              </Button>
            </span>

            <ChromePicker
              className={classes.chromePicker}
              color={curColor}
              onChangeComplete={setNewColor}
            />

            <ValidatorForm onSubmit={addingNewColor} instantValidate={false}>
              <TextValidator
                value={curName}
                variant="filled"
                margin="normal"
                label="Color name"
                onChange={handleChange}
                className={classes.colorInput}
                validators={[
                  "required",
                  "isColorNameUnique",
                  "isColorUnique",
                  "isNotEmpty"
                ]}
                errorMessages={[
                  "This field is required",
                  "Color name must be unique",
                  "Color already used!",
                  "Palette must not be empty!"
                ]}
              />

              <Button
                variant="contained"
                color="primary"
                className={classes.addButton}
                style={
                  colors.length >= MAX_NUM_COLORS
                    ? { backgroundColor: "rgba(0,0,0,.5)" }
                    : { backgroundColor: curColor }
                }
                type="submit"
                disabled={colors.length >= MAX_NUM_COLORS}
              >
                {colors.length >= MAX_NUM_COLORS ? "Palette Full" : "Add Color"}
              </Button>
            </ValidatorForm>
          </List>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />

        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </main>
    </div>
  );
};

export default NewPaletteForm;
