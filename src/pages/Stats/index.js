import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// styles
import useStyles from "./styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// components

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function createData(name, score) {
    return {name, score};
}


const rows = [
    createData('Player1', 159),
    createData('Player2', 237),
    createData('Player3', 262),
];

export default function Stats() {
    var classes = useStyles();
    const [list, setList] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className={classes.cardGrid}>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Login successful
                </Alert>
            </Snackbar>

            <TableContainer className={classes.usercontainer} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>User</TableCell>
                            <TableCell className={classes.head} align="center">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.user}</TableCell>
                                <TableCell>{item.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>

            </TableContainer>
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>Top 10 Leaderboard</TableCell>
                            <TableCell className={classes.head} align="center">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
