import { Box, makeStyles, Theme, lighten, useMediaQuery, useTheme } from '@material-ui/core'
import { Wifi, SignalCellular3, PlusBoxOutline, HeartOutline, SendOutline, MessageOutline, BookmarkOutline, AccountCircleOutline, DotsHorizontal } from 'mdi-material-ui'

import { offwhite, olive } from '../../../styles/theme'
import { useStore } from './useStore'

const useStyles = makeStyles((theme: Theme) => ({
    phone: {
        display: 'inline-block',
        background: lighten(olive, 0.6),
        padding: theme.spacing(10, 2),
        borderRadius: '50px',
    },
    screen: {
        width: '375px',
        height: '667px',
        background: offwhite,
        overflow: 'hidden'
    },
    transparent: {
        opacity: '25%',
        userSelect: 'none',
    },
    image: {
        width: '100%',
    }
}))

export const Preview = () => {
    const classes = useStyles()
    const store = useStore()

    const theme = useTheme()
    const isTinyScreen = useMediaQuery(theme.breakpoints.down('xs'));

    if (isTinyScreen) {
        return (
            <Box marginY={3}>
                <img className={classes.image} src={store.url} />
            </Box>
        )
    }

    return (
        <Box marginY={3}>
            <div className={classes.phone}>
                <div className={classes.screen}>
                    <Box p={1} className={classes.transparent} display="flex" dir="row" justifyContent="space-between">
                        <Box>11:11</Box>
                        <Box display="flex" alignItems="center">
                            <Wifi fontSize="small" />
                            <Box marginLeft={1} display="flex" alignItems="center">
                                <SignalCellular3 fontSize="small" />
                            </Box>
                        </Box>
                    </Box>
                    <Box paddingX={1} paddingBottom={2} paddingTop={1} className={classes.transparent} display="flex" dir="row" justifyContent="space-between">
                        <Box fontSize={20} fontStyle="italic">Gram</Box>
                        <Box display="flex" alignItems="center">
                            <PlusBoxOutline />
                            <Box marginLeft={2} display="flex" alignItems="center">
                                <HeartOutline />
                            </Box>
                            <Box marginLeft={2} display="flex" alignItems="center">
                                <SendOutline />
                            </Box>
                        </Box>
                    </Box>
                    <Box paddingX={1} paddingBottom={1} className={classes.transparent} display="flex" dir="row" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <AccountCircleOutline />
                            &nbsp;you
                        </Box>
                        <Box display="flex" alignItems="center">
                            <DotsHorizontal />
                        </Box>
                    </Box>
                    <img className={classes.image} src={store.url} />
                    <Box padding={1} className={classes.transparent} display="flex" dir="row" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <HeartOutline />
                            <Box marginLeft={2} display="flex" alignItems="center">
                                <MessageOutline />
                            </Box>
                            <Box marginLeft={2} display="flex" alignItems="center">
                                <SendOutline />
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <BookmarkOutline />
                        </Box>
                    </Box>
                    <Box paddingX={1} className={classes.transparent} display="flex" dir="row" justifyContent="space-between">
                        1,492 likes
                    </Box>
                    <Box padding={1} className={classes.transparent}>
                        <span style={{ fontWeight: 'bold' }}>you</span>&nbsp;New bike day! Finally finished my new build... 😅
                    </Box>
                    <Box padding={1} className={classes.transparent}>
                        View all 109 comments
                    </Box>
                    <Box padding={1} className={classes.transparent}>
                        <span style={{ fontWeight: 'bold' }}>friend</span>&nbsp;Nice.
                    </Box>
                </div>
            </div>
        </Box>
    )
}