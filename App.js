import React from 'react';
import PickerSelect from 'react-native-picker-select';
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
  AsyncStorage,
} from 'react-native';
import {
  StackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { ImagePicker, Permissions, Location, MapView } from 'expo'
import Icon from 'react-native-vector-icons/FontAwesome'
const userIcon = (<Icon name="user" size={20} color="black" />)
const searchIcon = (<Icon name="search" size={20} color="black" />)
const addIcon = (<Icon name="plus-square" size={20} color="black" />)
const settingsIcon = (<Icon name="cog" size={20} color="black" />)
const backIcon =(<Icon name = "chevron-left" size={20} color="black"/>)
/*##########################################################
############################################################
############################################################
                        Share Serve
############################################################
############################################################
###########################################################
############################################################
*/
var url = 'http://a11a123d.ngrok.io';
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
        <TouchableOpacity onPress={() =>this.props.navigation.navigate('OrganizationFeed')}>
          <Text>Feed</Text>
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
        <TouchableOpacity onPress={() =>this.props.navigation.navigate('VolunteerFeed')}>
          <Text>Feed</Text>
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

  }

  submitInfo(){
    Keyboard.dismiss;
    let incomplete = false;
    if(!this.state.name ||
      !this.state.email ||
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
      fetch(url + '/orgRegister', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.mission,
          picture: this.state.showImage,
          email: this.state.email,
          link: this.state.website,
          password: this.state.password,
          upcoming: []
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.success){
          alert("Success");
        } else{
          alert("json FAILURE")
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
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
        <TouchableOpacity
          style={[styles.submitButton, styles.buttonRed]}
          onPress={this._pickImage}>
          <Text style={styles.buttonLabel}>Chose Profile Picture</Text>
        </TouchableOpacity>
        {this.state.showImage && <Image style={{width:300, height:300, borderColor:'black', borderWidth: 1, marginBottom: 30}} source={{uri:this.state.showImage}}/>}

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
      showImage: null,
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
    title: 'Volunteer Register'
  };

  submitInfo(){
    Keyboard.dismiss;
    let incomplete;
    if(!this.state.fname ||
      !this.state.lname ||
      !this.state.email ||
      !this.state.age ||
      !this.state.gender ||
      !this.state.bio ||
      !this.state.password ||
      !this.state.showImage||
      !this.state.confirmpassword
    ){
      incomplete = true;
    }
    if(incomplete){
      alert('All fields must be filled!');
    } else if(this.state.password !== this.state.confirmpassword){
      alert('Passwords must match!');
    } else {
      fetch(url + '/register', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname: this.state.fname,
          lname: this.state.lname,
          gender: this.state.gender,
          picture: this.state.showImage,
          email: this.state.email,
          bio: this.state.bio,
          age: this.state.age,
          password: this.state.password,
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson)
        if (responseJson.success){
          alert("Success");
          this.props.navigation.navigate('VolunteerLogin')
        } else{
          alert("json FAILURE")
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
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
          <TextInput
            style={styles.inputField}
            placeholder="Bio"
            onChangeText={(text) => this.setState({bio: text})}
          />

          <TouchableOpacity
            style={[styles.submitButton, styles.buttonRed]}
            onPress={this._pickImage}>
            <Text style={styles.buttonLabel}>Choose Profile Picture</Text>
          </TouchableOpacity>
          {this.state.showImage && <Image style={{width:300, height:300, borderColor:'black', borderWidth: 1, marginBottom: 30}} source={{uri:this.state.showImage}}/>}

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
  submitInfo(){
    fetch(url + '/orgLogin', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
    .then((response)=> response.json())
    .then((jsonResponse) => {
      if (jsonResponse){
        this.props.navigation.navigate('OrganizationFeed')
        AsyncStorage.setItem('Oemail', this.state.email)
        .then(() => {console.log('Storage set.')})
      } else{
        alert("Bad credentials")
      }
    })
    .catch((error) => {alert("Catch error" + JSON.stringify(error))})
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
          placeholder="E-Mail"
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.submitInfo()}>
          <Text style={styles.buttonLabel}>Submit</Text>
        </TouchableOpacity>
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
    Keyboard.dismiss
    fetch(url + '/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
    .then((response) =>{
      console.log("RESPONSE", response);
      return response.json()
    })
    .then((responseJson) => {
      console.log('Response', responseJson)
      if (responseJson.success){
        this.props.navigation.navigate('VolunteerFeed')
        alert("Successfully logged in");
        AsyncStorage.setItem('email', this.state.email)
        .then(() => {console.log('Storage set.')})
      } else{
        alert("Bad credentials")
      }
    })
    .catch((err) => {
      alert('Catch error', err);
      console.log("ERROR", err);
    })

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
          secureTextEntry = {true}
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
  render(){
    return(
      <View style={{
        flex: 1
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('EventPost')} style={{
            marginTop: 10,
            marginBottom: 10,
            marginRight: 20,
            marginLeft: 20
          }}>
            {addIcon}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('SelfOrganizationProfile')} style={{
            marginTop: 10,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 10
          }}>
            {userIcon}
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 10,
        }}>
        </View>
      </View>
    )
  }
}
class VolunteerFeedScreen extends React.Component{
  constructor(props){
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
    fetch(`${url}/allEvents`)
    .then((response)=>response.json())
    .then((responseJson) => {
      console.log('Supposed events:', responseJson)
      this.setState({
        dataSource: ds.cloneWithRows(responseJson.reverse())
      })
    })
    .catch((err)=> alert(err))
    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
  }
  static navigationOptions = {
    title: 'Feed',
    headerLeft: null,
    gesturesEnabled: false,
  };
  eventClick(eventID){
    AsyncStorage.setItem('eventID', eventID).then(() => {
      console.log('Storage set.');
      this.props.navigation.navigate('EventPage');
    })
  }

  render(){
    return(
      <View style={{
        flex: 1
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')} style={{
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 20
          }}>
            {searchIcon}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SelfVolunteerProfile')} style={{
            marginTop: 10,
            marginRight: 20,
            marginBottom: 10
          }}>
            {userIcon}
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 10,
          backgroundColor: '#F0F8FF'
        }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={()=>this.eventClick(rowData._id)}
                >
                <View style={{
                  flex: 1,
                  marginLeft: 10,
                  marginRight: 10,
                  borderWidth: 1,
                  marginBottom: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                  <View style={{
                    flex: 3,
                  }}>
                    <Text style={{
                      marginTop: 5,
                      marginBottom: 5,
                      marginLeft: 15,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>{rowData.name}</Text>
                    <Text style={{
                      marginBottom: 5,
                      marginLeft: 15
                    }}>Organizer: {rowData.organization}</Text>
                    <Text style={{
                      marginBottom: 5,
                      marginLeft: 15,
                    }}>Time: {rowData.time}</Text>
                    <Text style={{
                      marginBottom: 5,
                      marginLeft: 15,
                    }}>Location: {rowData.location}</Text>
                  </View>
                  <View style ={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginRight: 20
                  }}>
                  {rowData.picture && <Image style={{width:75, height: 75, borderWidth: 1, borderRadius: 10}} source={{uri:rowData.picture}}/>}
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    )
  }
}
class EventPost extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      eventName: null,
      showImage: null,
      time: null,
      location: null,
      description: null,
    }
  }

  submitEvent(){
    Keyboard.dismiss
    AsyncStorage.getItem('Oemail')
    .then((result) => {
      fetch(url + '/organization/' + result)
      .then((response) => (response.json()))
      .then((responseJson) => {
        var orgName = responseJson.name
        fetch(url + '/event', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            organization: orgName,
            name: this.state.eventName,
            picture: this.state.showImage,
            time: this.state.time,
            location: this.state.location,
            description: this.state.description,
          })
        })
        .then((response) =>{
          console.log("RESPONSE", response);
          return response.json()
        })
        .then((responseJson) => {
          console.log('Response', responseJson)
          if (responseJson.success){
            this.props.navigation.navigate('OrganizationFeed')
            alert("Event Successfully posted");
          } else{
            alert("Error posting")
          }
        })
        .catch((err) => {
          alert('Catch error', err);
          console.log("ERROR", err);
        })
      })
    })
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
      <KeyboardAwareScrollView>
        <View style={{
          flex: 1,
          marginTop: 20,
          alignItems: 'center'
        }}>
          <TextInput
            style={styles.inputField}
            placeholder="Event name"
            onChangeText={(text) => this.setState({eventName: text})}
          />
          <TouchableOpacity
            style={[styles.submitButton, styles.buttonRed]}
            onPress={this._pickImage}>
            <Text style={styles.buttonLabel}>Choose Profile Picture</Text>
          </TouchableOpacity>
          {this.state.showImage && <Image style={{width:300, height:300, borderColor:'black', borderWidth: 1, marginBottom: 30}} source={{uri:this.state.showImage}}/>}

          <TextInput
            style={styles.inputField}
            placeholder="Time"
            onChangeText={(text) => this.setState({time: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Location"
            onChangeText={(text) => this.setState({location: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Description"

            onChangeText={(text) => this.setState({description: text})}
          />
          <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.submitEvent()}>
            <Text style={styles.buttonLabel}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
class SearchScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      search: null
    }
  }
  static navigationOptions = {
    title: 'Search'
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          placeholder="Search"
          onChangeText={(text) => this.setState({search: text})}
        />
      </View>
    )
  }
}
class SelfVolunteerProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: null,
      fname: null,
      lname: null,
      bio: null,
      picture: null,
    }
  }
  static navigationOptions = {
    title: 'Your Profile',
    headerLeft: null,
  };

  componentDidMount(){
    AsyncStorage.getItem('email')
    .then((result) => {
      this.setState({
        email: result
      })
      fetch(`${url}/profile/${result}`, {
        method: 'GET',
        credentials: 'same-origin'
      })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((responseJson) => {
        this.setState({
          fname: responseJson.firstName,
          lname: responseJson.lastName,
          bio: responseJson.bio,
          picture: responseJson.picture,
        })
      })
    })
  }
  render(){
    return(
      <View style={{
        flex: 1
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('VolunteerFeed')} style={{
            marginTop: 10,
            marginBottom: 10,
            marginRight: 20,
            marginLeft: 20
          }}>
            {backIcon}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('VolunteerSettings')} style={{
            marginTop: 10,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 10
          }}>
            {settingsIcon}
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 10,
        }}>
          {/* {this.state.picture && <Image style={{width:100, height:100, borderColor:'black', borderWidth: 1, marginBottom: 30}} source={{uri:this.state.picture}}/>}
          <Text>{this.state.fname} {this.state.lname}</Text>
          <Text>Bio: {this.state.bio}</Text>
          <Text>Email: {this.state.email}</Text> */}
          <View style={{
            flex: 2,
            flexDirection: 'row',
            borderBottomWidth: 1,
          }}>
            <View style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {this.state.picture && <Image style={{width:100, height:100, borderColor:'black', borderWidth: 1, borderRadius: 10}} source={{uri:this.state.picture}}/>}
            </View>
            <View style={{
              flex: 3,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 25,
                fontFamily: 'HelveticaNeue-Medium',
                marginBottom: 10
              }}>{this.state.fname} {this.state.lname}</Text>
              <Text style={{
                textDecoration: 'underline',
                fontStyle: 'italic'
              }}>Contact Me:</Text>
              <Text>{this.state.email}</Text>
            </View>
          </View>
          <View style={{
            flex: 4,
            paddingTop: 20,
            paddingLeft: 20,
          }}>
            <Text>Bio: {this.state.bio}</Text>
          </View>
        </View>
      </View>
    // return (
    //   <View style={styles.container}>
    //     <TouchableOpacity style={{
    //       marginTop: 10,
    //       marginRight: 20,
    //       marginBottom: 10
    //     }}>
    //       {settingsIcon}
    //     </TouchableOpacity>
    //   </View>
    // )
    )
  }
}
class SelfOrganizationProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: null,
      email: null,
      link: null,
      description: null,
      picture: null,
    }
  }
  static navigationOptions = {
    title: 'Your Profile',
    headerLeft: null
  };
  componentDidMount(){
    AsyncStorage.getItem('Oemail')
    .then((result) => {
      console.log(result)
      this.setState({
        email: result
      })
      fetch(`${url}/organization/${result}`, {
        method: 'GET',
        credentials: 'same-origin'
      })
      .then((response) => {
        console.log('hi')
        console.log(response)
        return response.json()
      })
      .then((responseJson) => {
        this.setState({
          name: responseJson.name,
          link: responseJson.link,
          description: responseJson.description,
          picture: responseJson.picture
        })
      })
    })
  }
  render(){
    return (
      <View style={{
        flex: 1
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomWidth: 1,
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('OrganizationFeed')} style={{
            marginTop: 10,
            marginBottom: 10,
            marginRight: 20,
            marginLeft: 20
          }}>
            {addIcon}
          </TouchableOpacity>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('OrganizationSettings')} style={{
            marginTop: 10,
            marginRight: 20,
            marginLeft: 20,
            marginBottom: 10
          }}>
            {settingsIcon}
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 10,
        }}>
          {this.state.picture && <Image style={{width:100, height:100, borderColor:'black', borderWidth: 1, marginBottom: 30}} source={{uri:this.state.picture}}/>}
          <Text>{this.state.name}</Text>
          <Text>Website: {this.state.link}</Text>
          <Text>Email: {this.state.email}</Text>
          <Text>Our Mission: {this.state.description}</Text>
        </View>
      </View>
    )
  }
}
class OrganizationProfile extends React.Component{
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Name Of Organization',
    headerLeft: null
  };
}
class VolunteerProfile extends React.Component{
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Name of Volunteer',
    headerLeft: null
  };
}
class Attending extends React.Component{
  static navigationOptions = {
    title: 'Attendees',
  };
  constructor(props){
    super(props);
    this.state = {
      attendees: [],
    }
  }
  render() {
    return (
      <View>
        <View><Text>Array of Attendees</Text></View>
      </View>
    )
  }
}
class VolunteerSettings extends React.Component{
  static navigationOptions = {
    title: 'Settings',
  };
  constructor(props){
    super(props);
    this.state = {
      showImage: null,
      email: null,
      age: null,
      bio: null,
      oldPassword: null,
      password: null,
      confirmpassword: null,
    }
  }

  changeProfile() {
    Keyboard.dismiss;
    let incomplete;
    if(!this.state.showImage ||
      !this.state.email ||
      !this.state.age ||
      !this.state.bio ||
      !this.state.oldPassword ||
      !this.state.password ||
      !this.state.confirmpassword
    ){
      incomplete = true;
    }
    if(incomplete){
      alert('All fields must be filled!');
    } else if(this.state.password !== this.state.confirmpassword){
      alert('Passwords must match!');
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

  render() {
    return (
      <KeyboardAwareScrollView extraScrollHeight={10}>
        <View style={{
          flex: 1,
          marginTop: 20,
          alignItems: 'center'
        }}>
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
          <TextInput
            style={styles.inputField}
            placeholder="Bio"
            onChangeText={(text) => this.setState({bio: text})}
          />

          <TouchableOpacity
            style={[styles.submitButton, styles.buttonRed]}
            onPress={this._pickImage}>
            <Text style={styles.buttonLabel}>Choose Profile Picture</Text>
          </TouchableOpacity>
          {this.state.showImage && <Image style={{width:300, height:300, borderColor:'black', borderWidth: 1, marginBottom: 30}} source={{uri:this.state.showImage}}/>}

          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Old Password"
            onChangeText={(text) => this.setState({oldPassword: text})}
          />

          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="New Password"
            onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Confirm New Password"
            onChangeText={(text) => this.setState({confirmpassword: text})}
          />
          <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.changeProfile()}>
            <Text style={styles.buttonLabel}>Submit Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
class OrganizationSettings extends React.Component{
  static navigationOptions = {
    title: 'Settings',
  };
  constructor(props){
    super(props);
    this.state = {
      showImage: null,
      email: null,
      website: null,
      mission: null,
      oldPassword: null,
      password: null,
      confirmpassword: null,
    }
  }

  changeProfile() {
    Keyboard.dismiss;
    let incomplete;
    if(!this.state.showImage ||
      !this.state.email ||
      !this.state.website ||
      !this.state.mission ||
      !this.state.oldPassword ||
      !this.state.password ||
      !this.state.confirmpassword
    ){
      incomplete = true;
    }
    if(incomplete){
      alert('All fields must be filled!');
    } else if(this.state.password !== this.state.confirmpassword){
      alert('Passwords must match!');
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

  render() {
    return (
      <KeyboardAwareScrollView extraScrollHeight={10}>
        <View style={{
          flex: 1,
          marginTop: 20,
          alignItems: 'center'
        }}>
          <TextInput
            style={styles.inputField}
            placeholder="Email address"
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Website"
            onChangeText={(text) => this.setState({website: text})}
          />
          <TextInput
            style={styles.inputField}
            placeholder="What's your mission"
            onChangeText={(text) => this.setState({mission: text})}
          />

          <TouchableOpacity
            style={[styles.submitButton, styles.buttonRed]}
            onPress={this._pickImage}>
            <Text style={styles.buttonLabel}>Choose Profile Picture</Text>
          </TouchableOpacity>
          {this.state.showImage && <Image style={{width:300, height:300, borderColor:'black', borderWidth: 1, marginBottom: 30}} source={{uri:this.state.showImage}}/>}

          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Old Password"
            onChangeText={(text) => this.setState({oldPassword: text})}
          />

          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="New Password"
            onChangeText={(text) => this.setState({password: text})}
          />
          <TextInput
            style={styles.inputField}
            secureTextEntry = {true}
            placeholder="Confirm New Password"
            onChangeText={(text) => this.setState({confirmpassword: text})}
          />
          <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]} onPress = {() => this.changeProfile()}>
            <Text style={styles.buttonLabel}>Submit Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
class EventPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      organization: null,
      name: null,
      attendees: null,
      location: null,
      time: null,
      picture: null,
      description: null
    }
  }
  componentDidMount(){
    alert("Mounted")
    AsyncStorage.getItem('EventID')
    .then((result)=>{
      fetch(`${url}/event/${result}`, {
        method: 'GET',
        credentials: 'same-origin'
      })
      .then((response)=>response.json())
      .then((responseJson) => {
        alert(responseJson.name)
        this.setState({
          organization: responseJson.organization,
          name: responseJson.name,
          attendees: responseJson.attendees,
          location: responseJson.location,
          time: responseJson.time,
          picture: responseJson.picture,
          description: responseJson.description
        })
      })
      .catch((err)=>alert("Error while getting event details", err))
    })
  }
  render(){
    return (
      <View>
        <Text>this.state,organization</Text>
        <Text>this.state.name</Text>
        <Text>Picture</Text>
        <Text>this.state.time</Text>
        <Text>this.state.location</Text>
        <Text>this.state.des</Text>
        <TouchableOpacity style = {[styles.submitButton, styles.buttonBlue]}>
          <Text style={styles.buttonLabel}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  Search: {
    screen: SearchScreen,
  },
  SelfVolunteerProfile: {
    screen: SelfVolunteerProfile,
  },
  SelfOrganizationProfile: {
    screen: SelfOrganizationProfile,
  },
  OrganizationProfile: {
    screen: OrganizationProfile,
  },
  VolunteerProfile: {
    screen: VolunteerProfile,
  },
  VolunteerSettings: {
    screen: VolunteerSettings,
  },
  OrganizationSettings: {
    screen: OrganizationSettings,
  },
  EventPage: {
    screen: EventPage,
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
