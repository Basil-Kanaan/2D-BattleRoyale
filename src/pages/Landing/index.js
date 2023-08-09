import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function Landing() {
    const classes = useStyles();

    return (
        <div>
            <section id={"hero"} className={classes.hero}>
                <Typography variant="h1" className={classes.slogan}>
                    <b>PRESS PLAY TO BEGIN!</b>
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<PlayArrowIcon/>}
                    onClick={() => {
                        window.location.href = '/2D-BattleRoyale/app/play';
                    }}
                    className={classes.playButton}
                >
                    Play
                </Button>
            </section>

            <section id={"about"} className={classes.about}>
                <div className={classes.aboutContent}>
                    <div className={classes.aboutText}>
                        <Typography variant="h3" className={classes.abouth1}>
                            <b>About Battle Royale</b>
                        </Typography>

                        <Typography variant="h5" className={classes.aboutmsg}>
                            Battle Royale is a fun single player game that you can run in your browser.<br/><br/>
                            This game includes AI, obstacles, and a whole world to move around in.<br/><br/>
                            You need to survive as long as you can without dying, killing AI to win.
                            How long can you survive? <br/><br/>
                        </Typography>
                    </div>
                    <div className={classes.aboutImage}>
                        <img
                            src={'https://ychef.files.bbci.co.uk/976x549/p091j3dx.jpg'}
                            className={classes.subimage}
                         alt={"gamer behind computer image"}/>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Landing;
