import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, Text, View, ImageBackground, Keyboard, Alert, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import Input from "../components/Input";
import {Universalstyles} from "../../const/Universalstyle";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Ggl from "../../../assets/bg/Google-Logo-PNG3.png";
import Fb from "../../../assets/bg/Facebook-Logo-PNG4.png";
import Apl from "../../../assets/bg/Apple-Logo-PNG5.png";


const Loginscreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',

  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email){
      handleError('Please enter your email', 'email');
      valid = false;
    } 

    if (!inputs.password){
      handleError('Please enter your password', 'password');
    valid = false;
}   
    
    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async() => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (inputs.email == userData.email &&
          inputs.password == userData.password
          ){
            AsyncStorage.setItem(
              'user', JSON.stringify({...userData, loggedIn: true}),
            );
            navigation.navigate('Homescreen');
          } 
          else {
              Alert.alert('Error', 'Invalid credentials')
          }
      }
          else {
              Alert.alert('Error','User does not exists')
          }
        }, 3000)
  };

  const handleOnChange = (text, input) => {
    setInputs (prevState => ({...prevState, [input]: text}));
  };
  
  const handleError = (errorMessage, input) =>{
    setErrors((prevState) => ({...prevState, [input]: errorMessage}))
  }
  
  return (
    
    <ImageBackground 
    source={require('../../../assets/bg/bgimage5.jpg')}
    
    style={[Universalstyles.signup, {height: 'auto'}]}>

      <Loader visible={loading}/>
        <ScrollView
        
        contentContainerStyle={{
            paddingTop: 50,
            paddingHorizontal: 20,
            
        }}
        >
          
          <View style={[Universalstyles.signupbg, {height: 'auto'}]}>
      <Text style= {Universalstyles.txt}>
        Login account
        </Text>

        
            <Input 
            placeholder= 'Email' 
            iconName= 'email-outline' 
            
            error={errors.email}
            onFocus={() =>{
              handleError(null, 'email');
            }}
            onChangeText = {text => handleOnChange(text, 'email')}
            />
            

            <Input 
            
            placeholder= 'Password' 
            iconName= 'lock-outline' 
            password
            error={errors.password}
            onFocus={() =>{
              handleError(null, 'password');
            }}
            
            onChangeText = {text => handleOnChange(text, 'password')}
            />
           <Text 
            onPress={() => navigation.navigate('Forgotpassword')}
            style={{color: 'blue', textAlign: "center", marginBottom: 10}}>Forgot Password</Text>
          
          
            <Button title='Login' onPress={validate}/>
            
            <View style={{height: 120}}>
              <Text style={Universalstyles.signwith}>Sign in with</Text>
              <View style={Universalstyles.Signwith}>
                <TouchableOpacity  onPress={''}>
                  <Image source={Ggl} style={Universalstyles.Ggl}/>
                  <Text style={{textAlign: 'center', fontWeight: '500'}}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={''}>
                  <Image source={Fb} style={Universalstyles.Fb}/>
                  <Text style={{textAlign: 'center', fontWeight: '500'}}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={''}>
                  <Image source={Apl} style={Universalstyles.Apl}/>
                  <Text style={{textAlign: 'center', fontWeight: '500'}}>Apple</Text>
                </TouchableOpacity>
              </View>
             
            </View>
            <Text 
           
            style={{textAlign: 'center', fontSize: 16, marginVertical: 20}}> Doesn't have an account? 
              {' '}
            <Text 
            onPress={() => navigation.navigate('Signupscreen')}
            style={{color: 'blue'}}>Register</Text>
            </Text>
            
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Loginscreen