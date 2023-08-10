import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    hero: {
        height: '90vh',
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
        height: '80vh',
    },
    aboutContent: {
        display: 'flex', // Use flexbox layout
        flexDirection: 'column', // Stack content vertically
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        height: '100%', // Stretch container vertically
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column', // Stack content vertically on small screens
            textAlign: 'center', // Center content horizontally on small screens
        },
    },
    aboutText: {
        flex: 1, // Equal distribution of space
        display: 'flex', // Use flexbox layout
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        padding: theme.spacing(10, 5, 5, 5), // Add spacing around text
        textAlign: 'center'
    },
    aboutImage: {
        flex: 1, // Equal distribution of space
        display: 'flex', // Use flexbox layout for image
        justifyContent: 'center', // Center image horizontally
        alignItems: 'center', // Center image vertically
        padding: theme.spacing(2), // Add padding to image container
    },
    subimage: {
        maxWidth: '100%', // Ensure image scales to container
        maxHeight: '100%', // Ensure image scales to container
    },
}));

export default useStyles;
