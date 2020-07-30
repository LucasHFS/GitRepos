import React, { useState, useEffect } from 'react'
import { ActivityIndicator} from 'react-native'

import api from '../../services/api';
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

 export default function User ({route, navigation}) {
    const user = route.params.user;

    const [stars, setStars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);

    const handleNavigate = ( repo ) => {
        navigation.navigate('Repo', { repo });
    }

    const fetchUserData = async () => {
        setLoading(true);
        const response = await api.get(`users/${user.login}/starred`);
        setStars(response.data)
        setLoading(false)
    }

    const refreshList = async () => {
        if(refreshing)
            return ;

        setRefreshing(true)
        const response = await api.get(`users/${user.login}/starred`);
        setStars(response.data)
        setRefreshing(false)

    }

    const loadMore = async () => {
        if(loading){
            return ;
        }
        console.log('loading')
        setLoading(true);
        const response = await api.get(`users/${user.login}/starred?page=${page+1}`);
        setPage(page+1);
        setStars([...stars, ...response.data]);
        setLoading(false)
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <Container>
            <Header>
                <Avatar source={{ uri: user.avatar }}/>
                <Name>{user.name}</Name>
                <Bio>{user.bio}</Bio>
            </Header>

            <Stars
                onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
                refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
                onEndReachedThreshold={0.2}
                onEndReached={loadMore}
                data={stars}
                keyExtractor={star => String(star.id)}
                renderItem={({ item:repo })=>(

                    <Starred onPress={() => handleNavigate(repo)} >
                        <OwnerAvatar source={{ uri: repo.owner.avatar_url}} />
                        <Info>
                            <Title>{repo.name}</Title>
                            <Author>{repo.owner.login}</Author>
                        </Info>
                    </Starred>

                )}
            />

            {
            loading ?
            <>
                <ActivityIndicator size={40}/>
            </>
            : null}


        </Container>
    )
}

//To do: dynamic title with the user name
User.navigationOptions= ({route}) => ( {
    title: navigation.params('user')
})

