let width = '70%';

const styles = {
  card: {
    color: 'black',
    position: 'absolute',
    border: '2px solid black',
    borderRadius: '15px',
    height: '90%',
    zIndex: '2',
    backgroundColor: 'white',
    fontSize: '18px',
    padding: '20px',
    bottom: '40px',
  },
  taskCard: {
    left: '0px',
    width: '69%',
    right: '0px',
    animationName: '$openTaskCard',
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,
  },
  button: {
    border: 'none',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '10px',
    cursor: 'pointer',
  },
  buttonClose: {
    right: '10px',
  },
  buttonSave: {
    right: '60px',
  },
  title: {
    fontWeight: 'bold',
  },
  bigTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
  },
  jobCardLongAfter: {
    right: '0px',
    width: width,
    animationName: '$openJobCard',
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,
  },
  jobCardLongBefore: {
    right: '0px',
    width: '30%',
    animationName: '$openJobCard',
    animationDuration: '300ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,
  },
  jobCardSmall: {
    right: '0px',
    width: '30%',
    animationName: '$miniJobCard',
    animationDuration: '450ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,
  },
  '@keyframes openJobCardBefore': {
    from: {
      width: '30%',
    },
    to: { width: width },
  },
  '@keyframes openJobCard': {
    from: {
      width: '0%',
    },
    to: { width: width },
  },
  '@keyframes openTaskCard': {
    from: { width: '0%' },
    to: { width: '69%' },
  },
  '@keyframes miniJobCard': {
    from: { width: width },
    to: { width: '30%' },
  },
};

export default styles;
