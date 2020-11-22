import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import messaging from '@react-native-firebase/messaging';

const App = () => {
  const [status, setStatus] = useState('feito');
  const statusMessage = {
    feito: '1 - Seu pedido foi realizado',
    aceito: '2 - Seu pedido está sendo preparado',
    enviado: '3 - Seu pedido saiu para entrega',
    entregue: '4 - Pedido entregue com sucesso',
  };

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const authStatus = await messaging().requestPermission();

      console.log(authStatus);
    };
    requestNotificationPermission();

    // Recebendo notificação foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('recebido no foreground ', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Pedido #02</Text>
            <Text style={styles.highlight}>Status:</Text>
            <Text style={styles.description}>{statusMessage[status]}</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontSize: 20,
    color: '#333',
  },
  description: {
    fontSize: 20,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});

export default App;
