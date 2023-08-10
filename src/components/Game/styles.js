import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    content: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    gameView: {
        alignSelf: "center",
        border: "1px solid black"
    },
}));
