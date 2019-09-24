import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    button : {
        width : "50%"
    },

    navBtn: {
        "& button" : {
            margin : "10px",
            justifyContent : "center",
            alignItems : "center"
        }
    }
}));


const PaletteMetaForm = props => {

    useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
        props.palettes.every((palette) => 
            value.toLowerCase() !== palette.paletteName.toLowerCase()
        ), [])
    });

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [curPaletteName, updatePaletteName] = React.useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    function handlePaletteChange(e){
        updatePaletteName(e.target.value);
    }

    function addNewPalette(){
        let newName = curPaletteName;
        const newPalette = {
            paletteName : newName,
            id : newName.toLowerCase().replace(/ /g, "-"),
            colors : props.colors
        }
  
        props.savePalette(newPalette);
        props.history.push("/");
    }
  
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <ValidatorForm onSubmit={addNewPalette}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's unique!
            </DialogContentText>
            
                <TextValidator
                fullWidth
                label="Palette Name"
                value={curPaletteName}
                onChange={handlePaletteChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter palette name", "Name already used"]}
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <div className={classes.navBtn}>
                    <Button variant="contained" 
                    color="secondary" 
                    className={classes.button}
                    type="submit">
                        Add new palette
                    </Button>
            </div>
          </DialogActions>
          </ValidatorForm>
        </Dialog>
    );
  }

export default withRouter(PaletteMetaForm);