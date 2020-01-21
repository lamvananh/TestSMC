import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import styled from 'styled-components';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCurrentUser, makeSelectError } from './selectors';
import { login } from './actions';
import BackgroundImage from '../../images/login_background.jpg';
// import BackgroundImage from "../../../app/images/Canhquan.svg";
import Logo from '../../images/logo_color.png';

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 14px;
`;
const key = 'login';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://smartcity.vn/">
        Smart City
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function LogIn({ onClickLogin, currentUser, error }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {});
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <React.Fragment>
      <div
        style={{
          zIndex: 1,
          position: 'fixed',
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundImage: `url(${BackgroundImage})`,
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
        }}
      />
      <Container className="login-container" component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={Logo} alt="logo" style={{ height: '75px' }} />
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
          {/* <Typography component="h1" variant="h5">
            Đăng nhập
        </Typography> */}
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Tên tài khoản"
              name="username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Ghi nhớ tài khoản"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => onClickLogin({ userName, password })}
            >
              Đăng nhập
            </Button>
            {/* <ErrorMessage>ERROR:{currentUser.error}</ErrorMessage> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item />
            </Grid>
          </form>
        </div>
        <Box mt={8}>{/* <Copyright /> */}</Box>
      </Container>
    </React.Fragment>
  );
}

LogIn.propTypes = {
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  onClickLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onClickLogin: evt => {
      dispatch(login(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LogIn);
