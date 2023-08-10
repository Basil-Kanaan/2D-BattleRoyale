import React, {useEffect, useRef, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {useHistory} from 'react-router-dom';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './styles'; // Import styles from styles.js

export default function AppNavbar({selectedTab, setSelectedTab}) {
    const classes = useStyles();
    const history = useHistory();
    const [disableSpaceScrolling, setDisableSpaceScrolling] = useState(false);
    const appBarRef = useRef(null);
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    useEffect(() => {
        const handleKeydown = (event) => {
            if (disableSpaceScrolling && event.key === ' ') {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [disableSpaceScrolling]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);

        // Enable/disable spacebar scrolling based on the tab clicked
        if (newValue === 0) {
            setDisableSpaceScrolling(true);
            // Scroll to the top of the AppBar (play tab)
            if (appBarRef.current) {
                appBarRef.current.scrollIntoView({behavior: 'smooth'});
            }
        } else {
            setDisableSpaceScrolling(false);
        }
    };

    const handlePlay = () => {
        setSelectedTab(1); // Set the selected tab to "Play" (index 1)
        history.push('/2D-BattleRoyale/play');
    };

    const handleInstructions = () => {
        setSelectedTab(2);
        history.push('/2D-BattleRoyale/instructions');
    };

    const handleStats = () => {
        setSelectedTab(3);
        history.push('/2D-BattleRoyale/stats');
    };

    const handleHome = () => {
        setSelectedTab(0);
        history.push('/2D-BattleRoyale/');
    };

    return (
        <AppBar className={classes.app}>
            <Toolbar className={classes.nav}>
                <div onClick={handleHome} className={classes.iconClickable}>
                    {/* Make "Battle Royale" clickable */}
                    <Typography variant="h6" className={classes.icon}>
                        Battle Royale
                    </Typography>
                </div>
                {isSmallScreen ? (
                    // Render a mobile-friendly version for small screens
                    <Tabs value={selectedTab} onChange={handleTabChange} centered>
                        <Tab label={<HomeIcon/>} onClick={handleHome}/>
                        <Tab label={<PlayArrowIcon/>} onClick={handlePlay}/>
                        <Tab label={<FileCopyIcon/>} onClick={handleInstructions}/>
                        <Tab label={<EqualizerIcon/>} onClick={handleStats}/>
                    </Tabs>
                ) : (
                    // Render the regular tabs for larger screens
                    <Tabs
                        className={classes.tabs}
                        value={selectedTab}
                        onChange={handleTabChange}
                        centered
                    >
                        <Tab label="Home" onClick={handleHome} icon={<HomeIcon/>}/>
                        <Tab label="Play" onClick={handlePlay} icon={<PlayArrowIcon/>}/>
                        <Tab
                            label="Instructions"
                            onClick={handleInstructions}
                            icon={<FileCopyIcon/>}
                        />
                        {/*<Tab label="Stats" onClick={handleStats} icon={<EqualizerIcon/>}/>*/}
                    </Tabs>
                )}
            </Toolbar>
        </AppBar>
    );
}
