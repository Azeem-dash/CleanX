import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import {TextInput, Button} from 'react-native-paper';
import {BLACK} from '../../../constants/color';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function UpdatePassword({navigation}) {
  AntDesign.loadFont();

  const [OldPassword, setOldPassword] = useState(null);
  const [conpassword, setConpassword] = useState(null);
  const [ConpasswordA, setConpasswordA] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const newPassword = conpassword;
  const [PwsdIcon, setPwsdIcon] = useState(false);
  const reauthenticate = () => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      OldPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  const changePassword = () => {
    // console.log(reauthenticate(newPassword));
    setLoading(true);
    if (conpassword === null || ConpasswordA === null) {
      console.log('Please fill all filed');
      setLoading(false);
      alert('Please fill all the field');
    } else if (conpassword != ConpasswordA) {
      console.log('password not macth');
      setLoading(false);
      alert('password is not macth');
    } else {
      reauthenticate()
        .then(async () => {
          var user = firebase.auth().currentUser;
          console.log(user);
          await user
            .updatePassword(newPassword)
            .then(() => {
              console.log('Password updated!');
              alert('password changed!');
              navigation.navigate('Home');
              setLoading(false);
            })
            .catch(error => {
              console.log('Error in updation ', error);
              setLoading(false);
            });
        })
        .catch(error => {
          console.log('Error in auth', error);
          alert('The password is invalid or the user does not have a password');
          setLoading(false);
        });
    }
  };

  // navigation.setOptions({ tabBarVisible: false })
  return (
    <View style={styles.container}>
      <AntDesign
        style={{left: 10}}
        onPress={() => navigation.goBack()}
        name={'arrowleft'}
        size={30}
        color={'green'}
      />
      <View
        style={{padding: 10, justifyContent: 'center', alignContent: 'center'}}>
        <Text style={{color: 'grey', fontSize: 20, padding: 10}}>
          Change Your Password
        </Text>
        <TouchableOpacity
          onPress={() => {
            setPwsdIcon(true);
            if (PwsdIcon == true) {
              setPwsdIcon(false);
            }
          }}>
          <Button
            theme={{
              colors: {
                primary: 'green',
              },
            }}
            //     fontSize={40}
            style={styles.hidebtn}
            icon={{
              uri:
                PwsdIcon === false
                  ? 'https://tutorialscapital.com/wp-content/uploads/2017/10/hide.png'
                  : 'https://tutorialscapital.com/wp-content/uploads/2017/10/view.png',
            }}></Button>
        </TouchableOpacity>
        {/* <Text style={styles.text}>Enter your Old Password</Text> */}
        {/* <TextInput
        style={styles.input}
        placeholder="Old password"
        onChangeText={text => setOldPassword(text)}
         secureTextEntry={PwsdIcon ? false : true}
      /> */}
        <TextInput
          label="Old Password"
          selectionColor={'green'}
          theme={{
            colors: {
              primary: 'green',
              underlineColor: 'grey',
              background: 'transparent',
            },
          }}
          placeholderTextColor={'green'}
          underlineColor="transparent"
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="Enter your Old Password"
          onChangeText={text => setOldPassword(text)}
          inputStyle={{color: 'red'}}
          // onChange={setFName}
          // onFocus={setEmailError('')}
          value={OldPassword}
          selectionColor="green"
          style={{borderBottomWidth: 1}}
          secureTextEntry={PwsdIcon ? false : true}
        />

        {/* <Text style={styles.text}>Enter Your new password</Text> */}

        {/* <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={text => setConpassword(text)}
         secureTextEntry={PwsdIcon ? false : true}
      /> */}
        <TextInput
          label="New Password"
          theme={{
            colors: {
              primary: 'green',
              underlineColor: 'grey',
              background: 'transparent',
            },
          }}
          underlineColor="transparent"
          // style={styles.Input}
          autoCapitalize={'none'}
          placeholder="Enter Your new password"
          onChangeText={text => setConpassword(text)}
          // onChange={setFName}
          // onFocus={setEmailError('')}

          style={{borderBottomWidth: 1, padding: 10}}
          secureTextEntry={PwsdIcon ? false : true}
        />

        {/* <Text style={styles.text}>Enter Your new password Agian</Text> */}
        {/* <TextInput
        style={styles.input}
        placeholder="Re-Enter password"
        onChangeText={text => setConpasswordA(text)}
         secureTextEntry={PwsdIcon ? false : true}
      /> */}

        <TextInput
          label="Re-Enter Password"
          theme={{
            colors: {
              primary: 'green',
              underlineColor: 'grey',
              background: 'transparent',
            },
          }}
          underlineColor="transparent"
          // style={styles.Input}
          autoCapitalize={'none'}
          placeholder="Enter Your new password Agian"
          onChangeText={text => setConpasswordA(text)}
          // onChange={setFName}
          // onFocus={setEmailError('')}

          style={{borderBottomWidth: 1}}
          secureTextEntry={PwsdIcon ? false : true}
        />
        <View style={{padding: 40}}>
          <TouchableOpacity
            onPress={() => changePassword()}
            activeOpacity={1}
            style={styles.saveBtnView}>
            {Loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.btn}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    top: 50,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: 200,
    borderRadius: 5,
    color: 'green',
  },
  btn: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  saveBtnView: {
    width: 300,
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#78ae02',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hidebtn: {
    //     backgroundColor: 'red',

    color: 'green',
    // fontSize: 30,
    //     height: 100,
    width: 1,
    alignItems: 'center',
    // backgroundColor: 'red',
    left: Platform.OS == 'ios' ? 330 : 300,
    justifyContent: 'flex-end',
    // top: 40,
  },
});
