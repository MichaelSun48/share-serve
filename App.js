import React from 'react';
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
} from 'react-native';
import TogglePicker from 'react-native-toggle-picker'
import { StackNavigator } from 'react-navigation';
/*##########################################################
############################################################
############################################################
                        Share Serve
############################################################
############################################################
############################################################
############################################################
*/
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
      name: '',
      picture: '',
      mission: '',
      website: '',
      password: '',
    }
  }
  static navigationOptions = {
    title: 'OrganizationRegister'
  };
  post(){
    fetch('/post')
  }
  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Name of your organization"
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          style={{height: 80}}
          placeholder="What's your organization's mission?"
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Website link"
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Password"
          onChangeText={(text) => this.setState({name: text})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Repeat Password"
          onChangeText={(text) => this.setState({name: text})}
        />
      </View>
    )
  }
}
class VolunteerRegisterScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fname: null,
      lname: null,
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
      alert('All fields must be filled!')
    } else if(this.state.password !== this.state.confirmpassword){
      alert('Passwords must match!')
    } else {
      alert('Success', this.state)
    }
  }
  render(){
    return(
      <ScrollView>
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

          <TogglePicker
            label='Gender'
            onValueChange={(itemValue) => {this.setState({gender:itemValue})}}
            >
              <Picker.Item label='Male' value='Male' />
              <Picker.Item label='Female' value='Female' />
              <Picker.Item label='Other' value='Other' />
            </TogglePicker>
          {/* <TextInput
            style={styles.inputField}
            placeholder="Gender"
            onChangeText={(text) => this.setState({gender: text})}
          /> */}
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
      </ScrollView>
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
    title: 'Feed'
  };
  render(){
    return(
      <View></View>
    )
  }
}

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
  OrganizationFeed: {
    screen: OrganizationFeedScreen,
  },

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
    width: 200,
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
    borderRadius: 5
  },
  submitButton: {
    width: 200,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
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
