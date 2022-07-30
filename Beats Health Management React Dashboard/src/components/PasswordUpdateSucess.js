import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import logo from '../img/beats-health.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(0),
            color: theme.palette.text.secondary,
        },
    }),
);

const UpdateSucess = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} justify="center" alignItems="center"  >

            <Grid container className="h100" justify="center" alignItems="center">

                <Box component="div" className="signin h100" >
                    <Box component="div" className="mainlogo">
                        <img src={logo} alt="Logo" />
                    </Box>
                    <Box component="div" boxShadow={3} className="signinbox" >


                        <Box component="div" className="signinbox-in">

                            <h6 className="btitle">Password updated successfully.</h6>
                            <CheckCircleIcon className="thankyouicon" />

                            <Grid container className="pb30 pt30 mt30">
                                <Grid item xs={12} sm={12} md={12}>
                                    <a href="/SignIn" className="btn-primary" >Continue</a>
                                </Grid>
                            </Grid>

                          
                        </Box>

                         
                    </Box>

                </Box>


            </Grid>
        </div>


    );
}


export default UpdateSucess;
