let width = '70%';

const styles = {
  buttonSend: {
    margin: '15px',
  },
  textField: {
    marginLeft: '15px',
    marginRight: '15px',
    width: 200,
    fontSize: '20px',
  },
  card: {
    color: 'black',
    position: 'absolute',
    border: '2px solid black',
    borderRadius: '15px',
    overflow: 'hidden',
    zIndex: '600',
    backgroundColor: 'white',
    fontSize: '14px',
    padding: '0 0 70px 0',
    margin: '0 0 30px 0',
    top: '20px',
  },
  taskCard: {
    left: '0px',
    width: '69%',
    right: '0px',
    /*animationName: '$openTaskCard',
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,*/
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
  title: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  value: {
    fontSize: '20px',
  },
  bigTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    margin: '20px 15px',
  },
  jobCardLongAfter: {
    right: '0px',
    width: width,
    /*animationName: '$openJobCard',
    animationDuration: '600ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,*/
  },
  jobCardLongBefore: {
    right: '0px',
    width: '30%',
    /*animationName: '$openJobCard',
    animationDuration: '300ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,*/
  },
  jobCardSmall: {
    right: '0px',
    width: '30%',
    /*animationName: '$miniJobCard',
    animationDuration: '450ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 1,*/
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
