import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles';
import Grid from '@material-ui/core/Grid';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AppNavbar from "../../components/NavBar";

function Landing() {
    const classes = useStyles();
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();

    return (
        <div>
            <AppNavbar/>

            <div className={classes.root}>
                <Typography variant="h1" className={classes.slogan}>
                    <b>Press Play to Begin!</b>
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => {
                        window.location.href = '/app/play';
                    }}
                    className={classes.playButton}
                >
                    Play
                </Button>
            </div>

            <div ref={myRef} id="About" className={classes.about}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h3" className={classes.abouth1}>
                            <b>About Battle Royale</b>
                        </Typography>

                        <Typography variant="h5" className={classes.aboutmsg}>
                            Battle Royale is a fun single player game that you can run in your browser.<br/><br/>
                            This game includes AI, obstacles, and a whole world to move around in.<br/><br/>
                            You need to survive as long as you can without dying, killing AI to win.
                            How long can you survive? <br/><br/>
                        </Typography>


                    </Grid>
                    <Grid item xs={6}>

                        <img
                            src={'https://ychef.files.bbci.co.uk/976x549/p091j3dx.jpg'}
                            className={classes.subimage}/>

                    </Grid>
                </Grid>

            </div>
        </div>
    );
}

export default (Landing);