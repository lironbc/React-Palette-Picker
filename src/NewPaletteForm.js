import React, {useEffect} from 'react';
import clsx from 'clsx';
import DraggableColorBox from './DraggableColorBox';
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
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


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

export default function NewPaletteForm() {

    useEffect( () =>
    ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
        colors.every((item) => 
            value.toLowerCase() !== item.name.toLowerCase() 
        ), []),

    ValidatorForm.addValidationRule('isColorUnique', (value) =>
    colors.every((item) => 
        curColor !== item.color
    ), [])
        
    );

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [curColor, setColor] = React.useState('teal');
  const [colors, addNewColor] = React.useState([]);
  const [curName, updateName] = React.useState('');

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function setNewColor(newColor){
      setColor(newColor.hex);
  }

  function addingNewColor(){
      const newColor = {color : curColor, name : curName}
      addNewColor([...colors, newColor]);
      updateName('');
  }

  function handleChange(e){
      updateName(e.target.value);
  }



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
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
            <Typography variant="h4">Design Your Palette</Typography>

            <Button variant="contained" color="secondary" className={classes.button}>
                Clear Palette
            </Button>

            <Button variant="contained" color="primary" className={classes.button}>
                Random Color
            </Button>

            <ChromePicker color={curColor} 
            onChangeComplete={setNewColor}/>

            <ValidatorForm onSubmit={addingNewColor}>
                <TextValidator 
                value={curName} 
                onChange={handleChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['This field is required', 
                'Color name must be unique', 
                'Color already used!']}/>

                <Button variant="contained" 
                color='primary'
                className={classes.button}
                style={{backgroundColor : curColor}}
                type="submit"
                >
                    Add Color
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
        {colors.map(color => <DraggableColorBox color={color.color} key={color.name} />)}
      </main>
    </div>
  );
}