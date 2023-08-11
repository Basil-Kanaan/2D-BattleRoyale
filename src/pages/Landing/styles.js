import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    hero: {
        minHeight: '60vh',
        padding: theme.spacing(20), // Increase padding for larger button
        backgroundImage: 'url(https://wallpapercave.com/wp/wp6308454.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Text color
        position: 'relative', // Ensure relative positioning
    },
    playButtonContainer: {
        display: 'flex',
        alignItems: 'center', // Center vertically
    },
    playButton: {
        marginLeft: theme.spacing(2), // Add spacing between text and button
        fontSize: '2rem', // Increase button font size
        padding: theme.spacing(2.5, 5), // Increase padding for larger button
    },
    navtitle: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: '5%',
    },

    navbuttons: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },

    slogan: {
        fontFamily: "'Press Start 2P', cursive",
        fontWeight: 'bold', // Make text bold
        fontSize: '6rem', // Increase text font size
        color: '#FFFFFF', // White text color
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)', // Add text shadow
        textAlign: 'center', // Center text
        marginBottom: theme.spacing(2), // Add spacing at the bottom
    },

    about: {
        padding: theme.spacing(2), // Add padding to the whole about section
    },
    aboutContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: theme.spacing(2), // Add padding to the content container
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            textAlign: 'center',
        },
    },
    aboutText: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2), // Adjust the padding around text
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1), // Adjust the padding on small screens
        },
    },
    aboutImage: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    subimage: {
        maxWidth: '100%', // Ensure image scales to container
        maxHeight: '100%', // Ensure image scales to container
    },
}));

export default useStyles;
