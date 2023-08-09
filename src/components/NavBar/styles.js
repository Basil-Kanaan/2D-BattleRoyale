import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app: {
        color: '#FBFAF8',
        backgroundColor: '#0A122A',
        paddingTop: '0.5%',
        paddingBottom: '0.5%',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
    },
    tabs: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end', // Align tabs to the right
    },
}));

export default useStyles;
