import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import logodb from '../img/Beats-health-logo.png';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LeftsideMenu from './LeftsideMenu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const [open] = React.useState(false);

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* <AppBar
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
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <img src={logodb} className="dblogo" alt="Beats Logo" />
                    {/*  <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
                </div>

                <LeftsideMenu/>
                {/*    <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
            </Drawer>
            <main id="maindiv" className={classes.content}>
                

                <div className={classes.root}>
                 
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={9} >
                            <h5 className="btitle">I want to...</h5>
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <a href="MyDetails" style={{textDecoration:'none'}}><p>Click here to update my profile</p></a>
                        </Grid>
                        <Grid item xs={6} sm={3} >
                            <Paper className="pad20 txt-center bx-shadow dbbox">
                            <a href="ManualOnboarding" style={{textDecoration:'none'}}>
                                <svg width="84" height="68" viewBox="0 0 92 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M58.5001 34C67.7084 34 75.1667 26.5417 75.1667 17.3334C75.1667 8.12502 67.7084 0.666687 58.5001 0.666687C49.2917 0.666687 41.8334 8.12502 41.8334 17.3334C41.8334 26.5417 49.2917 34 58.5001 34ZM58.5001 9.00002C63.0834 9.00002 66.8334 12.75 66.8334 17.3334C66.8334 21.9167 63.0834 25.6667 58.5001 25.6667C53.9167 25.6667 50.1667 21.9167 50.1667 17.3334C50.1667 12.75 53.9167 9.00002 58.5001 9.00002ZM58.5001 42.3333C47.3751 42.3333 25.1667 47.9167 25.1667 59V67.3333H91.8334V59C91.8334 47.9167 69.6251 42.3333 58.5001 42.3333ZM33.5001 59C34.4167 56 47.2917 50.6667 58.5001 50.6667C69.7501 50.6667 82.6667 56.0417 83.5001 59H33.5001ZM21.0001 46.5V34H33.5001V25.6667H21.0001V13.1667H12.6667V25.6667H0.166748V34H12.6667V46.5H21.0001Z" fill="#C72C35"/>
                                </svg>

                                 <p className = "title1" > {
                                         process.env.REACT_APP_REGION == 'INDIA' ? "New Patient Registration" : "Patient Registration  (Manual)  " } </p>
 
                                </a>
                            </Paper>
                        </Grid>
                        {process.env.REACT_APP_REGION == 'US' &&
                        <Grid item xs={6} sm={3} >
                            <Paper className="pad20 txt-center bx-shadow dbbox">
                            <a href="Remoteonboarding" style={{textDecoration:'none'}}>
                                <svg width="84" height="68" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 42.5V30H33.3333V21.6666H20.8333V9.16665H12.5V21.6666H0V30H12.5V42.5H20.8333ZM50 37.2916C40.25 37.2916 20.8333 42.1666 20.8333 51.875V59.1666H79.1667V51.875C79.1667 42.1666 59.75 37.2916 50 37.2916ZM30.5833 50.8333C34.0833 48.4166 42.5417 45.625 50 45.625C57.4583 45.625 65.9167 48.4166 69.4167 50.8333H30.5833ZM50 30C58.0417 30 64.5833 23.4583 64.5833 15.4166C64.5833 7.37498 58.0417 0.833313 50 0.833313C41.9583 0.833313 35.4167 7.37498 35.4167 15.4166C35.4167 23.4583 41.9583 30 50 30ZM50 9.16665C53.4583 9.16665 56.25 11.9583 56.25 15.4166C56.25 18.875 53.4583 21.6666 50 21.6666C46.5417 21.6666 43.75 18.875 43.75 15.4166C43.75 11.9583 46.5417 9.16665 50 9.16665ZM70.8333 30C78.875 30 85.4167 23.4583 85.4167 15.4166C85.4167 7.37498 78.875 0.833313 70.8333 0.833313C69.8333 0.833313 68.8333 0.916647 67.875 1.12498C71.0417 5.04165 72.9167 9.99998 72.9167 15.4166C72.9167 20.8333 70.9583 25.75 67.7917 29.6666C68.7917 29.875 69.7917 30 70.8333 30ZM80.5 38.4167C84.6667 41.7917 87.5 46.2083 87.5 51.875V59.1666H100V51.875C100 44.8333 89.8333 40.375 80.5 38.4167Z" fill="#C72C35"/>
                                </svg>

                                <p className="title1"> Patient Registration Remote </p>
 
                            </a>
                            </Paper>
                        </Grid>
                        }
                        {process.env.REACT_APP_REGION == 'INDIA' &&

                        <Grid item xs={6} sm={3} >
                            <Paper className="pad20 txt-center bx-shadow dbbox">
                            <a href = "MonitoringDashboard" style = {  { textDecoration: 'none' } } >
                               <svg  width="84"   height="76"   viewBox="0 0 84 76"  fill="none"   xmlns="http://www.w3.org/2000/svg"  >
                                    <path
                                    d="M33.6667 34C42.875 34 50.3333 26.5417 50.3333 17.3334C50.3333 8.12502 42.875 0.666687 33.6667 0.666687C24.4583 0.666687 17 8.12502 17 17.3334C17 26.5417 24.4583 34 33.6667 34ZM33.6667 9.00002C38.25 9.00002 42 12.75 42 17.3334C42 21.9167 38.25 25.6667 33.6667 25.6667C29.0833 25.6667 25.3333 21.9167 25.3333 17.3334C25.3333 12.75 29.0833 9.00002 33.6667 9.00002Z"
                                    fill="#C72C35"
                                    />
                                    <path
                                    d="M8.66658 59.0001C9.58325 56.0001 22.4583 50.6668 33.6666 50.6668C33.6666 47.7501 34.2083 44.9585 35.1249 42.3751C23.7499 41.9585 0.333252 47.6251 0.333252 59.0001V67.3335H40.0833C37.9166 64.9168 36.2083 62.1251 35.1249 59.0001H8.66658Z"
                                    fill="#C72C35"
                                    />
                                    <path
                                    d="M72.9583 59.0833C74.4583 56.625 75.3333 53.75 75.3333 50.6667C75.3333 41.4583 67.875 34 58.6667 34C49.4583 34 42 41.4583 42 50.6667C42 59.875 49.4583 67.3333 58.6667 67.3333C61.75 67.3333 64.625 66.4167 67.0833 64.9583C70.9583 68.8333 73.8333 71.7083 77.7917 75.6667L83.6667 69.7917C77.4167 63.5417 80.375 66.4583 72.9583 59.0833ZM58.6667 59C54.0833 59 50.3333 55.25 50.3333 50.6667C50.3333 46.0833 54.0833 42.3333 58.6667 42.3333C63.25 42.3333 67 46.0833 67 50.6667C67 55.25 63.25 59 58.6667 59Z"
                                    fill="#C72C35"
                                    />
                                </svg>

                                <p className="title1"> Search Existing Patient  </p>
 
                            </a>
                            </Paper>
                        </Grid>

                        }

                        <Grid item xs={6} sm={3}  >
                            <Paper className="pad20 txt-center bx-shadow dbbox">
                            <a href="MonitoringDashboard" style={{textDecoration:'none'}}>
                                <svg width="84" height="68" viewBox="0 0 84 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M75.3333 16.6667H8.66659C4.08325 16.6667 0.333252 20.4167 0.333252 25V75C0.333252 79.5833 4.08325 83.3333 8.66659 83.3333H75.3333C79.9166 83.3333 83.6666 79.5833 83.6666 75V25C83.6666 20.4167 79.9166 16.6667 75.3333 16.6667ZM75.3333 75H8.66659V25H75.3333V75ZM8.66659 0H75.3333V8.33333H8.66659V0ZM8.66659 91.6667H75.3333V100H8.66659V91.6667ZM41.9999 50C47.7499 50 52.4166 45.3333 52.4166 39.5833C52.4166 33.8333 47.7499 29.1667 41.9999 29.1667C36.2499 29.1667 31.5833 33.8333 31.5833 39.5833C31.5833 45.3333 36.2499 50 41.9999 50ZM41.9999 35.4167C44.2916 35.4167 46.1666 37.2917 46.1666 39.5833C46.1666 41.875 44.2916 43.75 41.9999 43.75C39.7083 43.75 37.8333 41.875 37.8333 39.5833C37.8333 37.2917 39.7083 35.4167 41.9999 35.4167ZM62.8333 66.625C62.8333 57.9167 49.0416 54.1667 41.9999 54.1667C34.9583 54.1667 21.1666 57.9167 21.1666 66.625V70.8333H62.8333V66.625ZM28.7083 64.5833C31.2499 62.4167 37.1666 60.4167 41.9999 60.4167C46.8749 60.4167 52.7916 62.4167 55.3333 64.5833H28.7083Z" fill="#C72C35"/>
                                </svg>
                                         <p className="title1">{process.env.REACT_APP_REGION == 'INDIA' ? "Patient Scheduling Dashboard" : "Monitor Eligibility Dashboard"} </p>
 
                            </a>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            </main>
        </div>
    );
}
