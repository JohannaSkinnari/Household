import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface ErrorProps {
  error?: string;
  visible?: boolean;
}

const ErrorMessage : React.FC<ErrorProps> = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>⚠️ {error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: '#fdca40',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600'
  }
});

export default ErrorMessage;
