import React from 'react';
import PickerSelect from 'react-native-picker-select'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  ScrollView,
  Keyboard,
  CameraRoll,
  Image,
} from 'react-native';
import {
  StackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { ImagePicker, Permissions, Location, MapView } from 'expo'
/*##########################################################
############################################################
############################################################
                        Share Serve
############################################################
############################################################
############################################################
############################################################
*/
var url = 'http://46604bd5.ngrok.io';
class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
class WelcomeScreen extends React.Component{
  static navigationOptions = {
    title: 'Welcome'
  };

  pressVolunteer() {
    this.props.navigation.navigate('VolunteerWelcome')
  }

  pressOrganization() {
    this.props.navigation.navigate('OrganizationWelcome')
  }


  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>Welcome to Share-Serve!</Text>
        <Text>Please select which one you are</Text>
        <TouchableOpacity onPress={()=>this.pressVolunteer()}style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Volunteer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.pressOrganization()}style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonLabel}>Organization</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
class OrganizationWelcomeScreen extends React.Component{
  static navigationOptions = {
    title: 'OrganizationWelcome'
  };
  pressLogin() {
    this.props.navigation.navigate('OrganizationLogin')
  }

  pressRegister() {
    this.props.navigation.navigate('OrganizationRegister')
  }


  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.pressLogin()}style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Login as Organization</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.pressRegister()}style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonLabel}>Register as Organization</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
class VolunteerWelcomeScreen extends React.Component{
  static navigationOptions = {
    title: 'VolunteerWelcome'
  };
  pressLogin() {
    this.props.navigation.navigate('VolunteerLogin')
  }

  pressRegister() {
    this.props.navigation.navigate('VolunteerRegister')
  }
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.pressLogin()}style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Login as Volunteer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.pressRegister()}style={[styles.button, styles.buttonBlue]}>
          <Text style={styles.buttonLabel}>Register as Volunteer</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
class OrganizationRegisterScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: null,
      email: null,
      phone: null,
      showImage: null,
      mission: null,
      website: null,
      password: null,
      confirmpassword: null
    }
  }
  static navigationOptions = {
    title: 'OrganizationRegister'
  };
  post(){
    fetch('/post')
  }

  submitInfo(){
    Keyboard.dismiss;
    let incomplete = false;
    if(!this.state.name ||
      !this.state.email ||
      !this.state.phone ||
      !this.state.showImage ||
      !this.state.mission ||
      !this.state.website ||
      !this.state.password ||
      !this.state.confirmpassword
    ){
      incomplete = true;
    }
    if(incomplete){
      alert('All fields must be filled!')
    } else if(this.state.password !== this.state.confirmpassword){
      alert('Passwords must match!')
    } else {
      alert('Success', this.state)
    }
  }

  _pickImage = async () => {
    const permissions = await Promise.all(
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    )
    console.log('Permissions:', permissions)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result)
    if(!result.cancelled){
      this.setState({showImage: result.uri})
    }
  };

  render(){
    return(
      <KeyboardAwareScrollView extraScrollHeight={10}>
        <View style={{
          flex: 1,
          marginTop: 20,
          marginBottom: 20,
          alignItems: 'center'
        }}>
        <TextInput
          style={styles.inputField}
          placeholder="Name of Organization"
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Phone"
          onChangeText={(text) => this.setState({phone: text})}
        />
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />
        {this.state.showImage && <Image style={{width:300, height:300, borderColor:'black', borderWidth: 1}} source={{uri:this.state.showImage}}/>}

        <TextInput
          style={styles.inputField}
          placeholder="What's your mission?"
          onChangeText={(text) => this.setState({mission: text})}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Website link"
          onChangeText={(text) => this.setState({website: text})}
        />
        <TextInput
          secureTextEntry = {true}
          style={styles.inputField}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TextInput
          secureTextEntry = {true}
          style={styles.inputField}
          placeholder="Confirm Password"
          onChangeText={(text) => this.setState({confirmpassword: text})}
        />
        <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.submitInfo()}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
    )
  }
}
class VolunteerRegisterScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fname: null,
      lname: null,
      picture: null,
      email: null,
      age: null,
      gender: null,
      bio: null,
      password: null,
      confirmpassword: null,
    }
    this.submitInfo = this.submitInfo.bind(this)
  }
  static navigationOptions = {
    title: 'VolunteerRegister'
  };
  hashPassword(password){
    var hash = crypto.createHash('sha256') //Change this!!!
    hash.update(password);
    return hash.digest('hex');
  }
  submitInfo(){
    Keyboard.dismiss;
    let incomplete = false;
    if(!this.state.fname ||
      !this.state.lname ||
      !this.state.email ||
      !this.state.age ||
      !this.state.gender ||
      !this.state.bio ||
      !this.state.password ||
      !this.state.confirmpassword
    ){
      incomplete = true;
    }
    if(incomplete){
      alert('All fields must be filled!');
    } else if(this.state.password !== this.state.confirmpassword){
      alert('Passwords must match!');
    } else {
      alert('Success' + this.state);
      fetch(url + '/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          gender: this.state.gender,
          picture: this.state.picture,
          email: this.state.email,
          bio: this.state.bio,
          age: this.state.age,
          password: this.hashPassword(this.state.password),
        })
      })
      .then((response) =>(response.json()))
      .then((responseJson) => {
        if (responseJson.success){
          alert("Success");
        } else{
          alert("FAILURE")
        }
      })
      .catch((err) => {
        alert("FAILURE")
      })
    }
  }

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log(cameraRollPerm);
    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  render(){
    return(
      <KeyboardAwareScrollView extraScrollHeight={10}>
        <View style={{
          flex: 1,
          marginTop: 20,
          alignItems: 'center'
        }}>
          <TextInput
            style={styles.inputField}
            placeholder="First name"
            onChangeText={(text) => this.setState({fname: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Last name"
            onChangeText={(text) => this.setState({lname: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Email address"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Age"
            onChangeText={(text) => this.setState({age: text})}
          />

          <PickerSelect
            placeholder = {{
              label: "Select gender..."
            }}
            items = {[
              {
                label: 'Male',
                value: 'Male',
              },
              {
                label: 'Female',
                value: 'Female',
              },
              {
                label: 'Other',
                value: 'Other'
              }
            ]}
            onValueChange={(value) => {
              this.setState({
                gender: value
              })
            }}
            hideIcon={true}
            style={{...pickerSelectStyles}}
          />
          <TouchableOpacity style = {[styles.submitButton, styles.buttonRed]} onPress = {() => this._pickImage()}>
            <Text style={styles.buttonLabel}>Add Photo</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.inputField}
            placeholder="Bio"
            onChangeText={(text) => this.setState({bio: text})}
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Confirm password"
            onChangeText={(text) => this.setState({confirmpassword: text})}
          />
          <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.submitInfo()}>
            <Text style={styles.buttonLabel}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
class OrganizationLoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }
  static navigationOptions = {
    title: 'OrganizationLogin'
  };
  render(){
    return(
      <View style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
      }}>
        <TextInput
          style={styles.inputField}
          placeholder="E-Mail"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
        />
      </View>
    )
  }
}
class VolunteerLoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }
  static navigationOptions = {
    title: 'VolunteerLogin'
  };

  submitLogin(){
    fetch(url + '/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    this.props.navigation.navigate('VolunteerFeed')
  }

  render(){
    return(
      <View style={{
        flex: 1,
        marginTop: 20,
        alignItems: 'center'
      }}>
        <TextInput
          style={styles.inputField}
          name="email"
          placeholder="E-Mail"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.inputField}
          name="password"
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.submitLogin()}>
          <Text style={styles.buttonLabel}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
class OrganizationFeedScreen extends React.Component{
  static navigationOptions = {
    title: 'Feed'
  };
  render(){
    return(
      <View></View>
    )
  }
}
class VolunteerFeedScreen extends React.Component{
  static navigationOptions = {
    title: 'Feed',
    drawerLabel: 'Feed'
  };
  render(){
    return(
      <View>
        <Text>VolunteerFeedScreen</Text>
        {/* <Button onPress = {() => this.props.navigation.navigate('Drawer')}
        title="menu"
        /> */}
      </View>
    )
  }
}
class EventPost extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      eventName: null,
      picture: null,
      time: null,
      location: null,
      description: null,
    }
  }
  render(){
    return(
      <KeyboardAwareScrollView>
        <View style={{
          flex: 1,
          marginTop: 20,
          alignItems: 'center'
        }}>
          <TextInput
            style={styles.inputField}
            placeholder="Event name..."
            onChangeText={(text) => this.setState({eventName: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Last name"
            onChangeText={(text) => this.setState({lname: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Email address"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Age"
            onChangeText={(text) => this.setState({age: text})}
          />
          <TouchableOpacity style = {[styles.submitButton, styles.buttonRed]} onPress = {() => this._pickImage()}>
            <Text style={styles.buttonLabel}>Add Photo</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.inputField}
            placeholder="Bio"
            onChangeText={(text) => this.setState({bio: text})}
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Password"
            onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Confirm password"
            onChangeText={(text) => this.setState({confirmpassword: text})}
          />
          <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.submitInfo()}>
            <Text style={styles.buttonLabel}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
// class VolunteerProfileScreen extends React.Component{
//   static navigationOptions = {
//     title: 'Profile',
//     drawerLabel: 'Profile'
//   };
//   render(){
//     return(
//       <View>
//         <Text>VolunteerProfileScreen</Text>
//         <Button onPress = {() => this.props.navigation.navigate('Drawer')}
//         title="menu"
//         />
//       </View>
//     )
//   }
// }
//
// class VolunteerSearchScreen extends React.Component{
//   static navigationOptions = {
//     title: 'Search',
//     drawerLabel: 'Search'
//   };
//   render(){
//     return(
//       <View>
//         <Text>VolunteerSeacScreen</Text>
//         <Button onPress = {() => this.props.navigation.navigate('Drawer')}
//         title="menu"
//         />
//       </View>
//     )
//   }
// }

// const drawer = DrawerNavigator({
//   VolunteerFeed: {
//     screen: VolunteerFeedScreen
//   },
//   VolunteerProfile: {
//     screen: VolunteerProfileScreen
//   },
//   VolunteerSearch: {
//     screen: VolunteerProfileScreen
//   }
// },
// {
//   drawerPosition: 'right',
//   intialRouteName: 'VolunteerFeed',
//   drawerBackgroundColor: 'Blue',
//   drawerWidth: 150,
// });

export default StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
  },
  OrganizationWelcome: {
    screen: OrganizationWelcomeScreen,
  },
  VolunteerWelcome: {
    screen: VolunteerWelcomeScreen,
  },
  OrganizationRegister: {
    screen: OrganizationRegisterScreen,
  },
  VolunteerRegister: {
    screen: VolunteerRegisterScreen,
  },
  OrganizationLogin: {
    screen: OrganizationLoginScreen,
  },
  VolunteerLogin:{
    screen: VolunteerLoginScreen,
  },
  VolunteerFeed: {
    screen: VolunteerFeedScreen,
  },
  // VolunteerSearch: {
  //   screen: VolunteerSearchScreen,
  // },
  // VolunteerProfile: {
  //   screen: VolunteerProfileScreen,
  // },
  OrganizationFeed: {
    screen: OrganizationFeedScreen,
  },
  EventPost: {
    screen: EventPost,
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  inputField: {
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    alignSelf: 'stretch',
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    marginBottom: 30
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  submitButton: {
    width: 200,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 30,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      alignSelf: 'stretch',
      marginLeft: 10,
      marginRight: 10,
      height: 40,
      paddingLeft: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderRadius: 5,
      color: 'black',
    },
});
