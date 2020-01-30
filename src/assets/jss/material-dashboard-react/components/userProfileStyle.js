import { whiteColor } from 'assets/jss/material-dashboard-react.js';

const userProfileStyle = {
  cardUser: {
    marginBottom: '0px',
    marginTop: '10px',
  },
  cardUserAvatarOpen: {
    marginTop: '10px',
    cursor: 'pointer',
  },
  cardUserAvatarClose: {
    //margin: '5px 0px 5px 0px',
    cursor: 'pointer',
    position: 'relative',
    right: '5px',
  },
  cardUserBody: {},
  listItemIconOpen: {
    paddingLeft: '15px',
  },
  listItemIconClose: {
    paddingLeft: '0px',
  },
  logo: {
    display: 'flex',
    fontSize: '25px',
    fontWeight: 'bold',
    alignItems: 'center',
    flex: '1',
  },
  logoImage: {
    display: 'inline-flex',
  },
  '@keyframes rotate-logo': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  '@media (prefers-reduced-motion: no-preference)': {
    image: {
      animation: '$rotate-logo infinite 20s linear',
    },
  },
  image: {
    maxWidth: '80px',
    maxHeight: '60px',
  },
  logoText: {
    color: whiteColor,
  },
};

export default userProfileStyle;
