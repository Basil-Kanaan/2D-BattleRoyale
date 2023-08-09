import React from "react";
import {Container, Grid, Paper, Typography} from "@material-ui/core";
import useStyles from "./styles";

export default function Instructions() {
    const classes = useStyles();

    return (
        <Container maxWidth="md" className={classes.root}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Paper className={classes.card} variant="outlined">
                        <Typography className={classes.cardTitle} variant="h6">
                            Instructions
                        </Typography>

                        <ul>
                            <li>Move using WASD keys.</li>
                            <li>Aim and shoot with the cursor and left-click.</li>
                            <li>Collect ammo packs to reload.</li>
                            <li>Quadrants represent different terrains with effects:
                                <ul>
                                    <li className={classes.purpleText}>Nether (Purple): Higher damage for all players.
                                    </li>
                                    <li className={classes.blueText}>Ice (Blue): Faster movement speed.</li>
                                    <li className={classes.yellowText}>Sand (Yellow): Slower movement.</li>
                                    <li className={classes.greenText}>Grass (Green): Normal movement.</li>
                                </ul>
                            </li>
                            <li>Battle AI opponents to score points.</li>
                            <li>Use various gun types:
                                <ul>
                                    <li className={classes.gunTypeText}>Cannon: Powerful single shots.</li>
                                    <li className={classes.gunTypeText}>Pistol: Fast and accurate shots.</li>
                                    <li className={classes.gunTypeText}>Shotgun: Spreads damage over an area.</li>
                                </ul>
                            </li>
                            <li>Switch guns quickly with the space bar.</li>
                            <li>Adjust difficulty settings to change the challenge.</li>
                            <li>Restart the game by clicking "Play Again."</li>
                            <li>Survive as long as possible!</li>
                        </ul>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
