import { StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 49,
    backgroundColor: '#131313',
    width: '100%',
    borderWidth: 2,
    borderColor: 'black',
  },
   
  progress: {
    height: 4,
    backgroundColor: '#bfd3de',

  },
  row: {
    flexDirection: 'row',

  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: 5,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nameContainer: {
    flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-around'
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
  },
  artist: {
    color: 'lightgray',
    fontSize:10,
  },
  up: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
    
  }
})

export default styles;