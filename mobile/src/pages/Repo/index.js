import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview';
import {} from './styles';

import api from '../../services/api';

export default function Repo ({route, navigation}) {
    const repository = route.params.repo;

    return (
        <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />
    )
}
