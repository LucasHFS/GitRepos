import React, { useState, useEffect } from 'react'
import { Keyboard, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import PropTypes from 'prop-types';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,

} from './styles';

import api from '../../services/api';

 export default function Main (props) {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchUsersFromStorage = async() => {
        const usersStorage = await AsyncStorage.getItem('users');
        if(usersStorage){
            setUsers(JSON.parse(usersStorage));
        }
    }

    useEffect(()=>{
        fetchUsersFromStorage();
    },[])

    useEffect(()=>{
        AsyncStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const handleAddUser = async () => {
        setLoading(true);

        const response = await api.get(`/users/${newUser}`);

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
        };

        setUsers([...users, data]);
        setNewUser('');
        setLoading(false);
        Keyboard.dismiss();

    }

    const handleNavigate = ( user ) => {
        const { navigation } = props;
        navigation.navigate('User', { user });
    }

    return (
        <Container>
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar usuário"
                    value={newUser}
                    onChangeText={text=> setNewUser(text)}
                    returnKeyType="send"
                    onSubmitEditing={handleAddUser}
                />
                <SubmitButton loading={loading} onPress={handleAddUser} >
                    {loading ?
                        <ActivityIndicator color="#fff" />
                        :
                        <Icon name="add" size={20} color="#fff" />
                    }
                </SubmitButton>
            </Form>

            <List
                data={users}
                keyExtractor={user => user.login}
                renderItem={( { item:user } )=>(
                    <User>
                        <Avatar source={{ uri: user.avatar }} />
                        <Name>{user.name}</Name>
                        <Bio>{user.bio}</Bio>

                        <ProfileButton onPress={() => handleNavigate(user)}>
                            <ProfileButtonText>Ver perfil</ProfileButtonText>
                        </ProfileButton>
                    </User>
                )}
            />

        </Container>
    )
}

// Main.prototype = {
//     navigation: PropTypes.shape({
//         navigate: PropTypes.func,
//     }).isRequired,
// }
