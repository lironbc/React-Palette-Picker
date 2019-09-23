import React, {useEffect} from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import DraggableColorBox from './DraggableColorBox';
import DraggableColorList from './DraggableColorList';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import arrayMove from 'array-move';


const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height : "calc(100vh - 64px)",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const NewPaletteForm = props => {
    const MAX_NUM_COLORS = 20;

    useEffect( () =>
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
        colors.every((item) => 
            value.toLowerCase() !== item.name.toLowerCase() 
        ), []),

    ValidatorForm.addValidationRule('isColorUnique', (value) =>
    colors.every((item) => 
        curColor !== item.color
    ), []),

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
    props.palettes.every((palette) => 
        value.toLowerCase() !== palette.paletteName.toLowerCase()
    ), []),

    ValidatorForm.addValidationRule('isNotEmpty', () =>
    props.palettes.every(palette => palette.colors.length !== 0), [])
        
    );

  const classes = useStyles();
//   const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [curColor, setColor] = React.useState('teal');
  const [colors, updateColors] = React.useState(props.palettes[0].colors);
  const [curName, updateName] = React.useState('');
  const [curPaletteName, updatePaletteName] = React.useState('');

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function setNewColor(newColor){
      setColor(newColor.hex);
  }

  function clearPalette(){
    updateColors([]);
  }

  function addingNewColor(){
      const newColor = {color : curColor, name : curName}
      updateColors([...colors, newColor]);
      updateName('');
  }

  function handleChange(e){
      updateName(e.target.value);
  }

  function handlePaletteChange(e){
      updatePaletteName(e.target.value);
  }

  function addNewPalette(){
      let newName = curPaletteName;
      const newPalette = {
          paletteName : newName,
          id : newName.toLowerCase().replace(/ /g, "-"),
          colors : colors
      }

      props.savePalette(newPalette);
      props.history.push("/");
  }

  function removeColor(name){
      let newColors = colors.filter((color) => color.name !== name);
      updateColors(newColors);
  }

  function addRandomColor(){
      updateColors([...colors, pickRandomColor()])
  }

  function pickRandomColor(){
      let arrayToPick = Math.floor(Math.random() * props.palettes.length);
      let array = props.palettes[arrayToPick].colors;
      const colorPicked = array[Math.floor(Math.random() * array.length)];
      console.log(colorPicked);
      return colorPicked;
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    let newColors = (colors) => arrayMove(colors, oldIndex, newIndex);
    updateColors(newColors);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
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
            Persistent drawer
          </Typography>

            <ValidatorForm onSubmit={addNewPalette}>
                <TextValidator 
                label="Palette Name"
                value={curPaletteName}
                onChange={handlePaletteChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter palette name", "Name already used"]}
                />

                    <Link to="/">
                        <Button variant="contained" 
                    color="primary" 
                    className={classes.button}>
                            Go Back
                        </Button>
                    </Link>

                    <Button variant="contained" 
                    color="secondary" 
                    className={classes.button}
                    type="submit">
                        Add new palette
                    </Button>
            </ValidatorForm>


        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <List>
            <Typography variant="h4">Design Your Palette</Typography>

            <Button variant="contained" 
            color="secondary" 
            className={classes.button}
            onClick={clearPalette}>
                Clear Palette
            </Button>

            <Button variant="contained" 
            color="primary" 
            className={classes.button}
            onClick={addRandomColor}
            disabled={colors.length >= MAX_NUM_COLORS}>
                Random Color
            </Button>

            <ChromePicker color={curColor} 
            onChangeComplete={setNewColor}/>

            <ValidatorForm onSubmit={addingNewColor}>
                <TextValidator 
                value={curName} 
                onChange={handleChange}
                validators={['required',
                 'isColorNameUnique', 
                 'isColorUnique', 
                 'isNotEmpty']}
                errorMessages={['This field is required', 
                'Color name must be unique', 
                'Color already used!',
                'Palette must not be empty!']}/>

                <Button variant="contained" 
                color='primary'
                className={classes.button}
                style={colors.length >= MAX_NUM_COLORS ? 
                    {backgroundColor : "rgba(0,0,0,.5)"} :
                    {backgroundColor : curColor} }
                type="submit"
                disabled={colors.length >= MAX_NUM_COLORS}
                >
                    {colors.length >= MAX_NUM_COLORS ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>


        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >

        <div className={classes.drawerHeader} />

        <DraggableColorList
        colors={colors}
        removeColor={removeColor}
        axis="xy"
        onSortEnd={onSortEnd} />

      </main>
    </div>
  );
}

export default NewPaletteForm;