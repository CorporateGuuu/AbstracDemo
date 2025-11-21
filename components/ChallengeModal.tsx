// components/ChallengeModal.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ChallengeModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigateToFrames?: () => void;
}

export default function ChallengeModal({ visible, onClose, onNavigateToFrames }: ChallengeModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  // Load selected frame from AsyncStorage when modal opens
  useEffect(() => {
    if (visible) {
      loadSelectedFrame();
    }
  }, [visible]);

  const loadSelectedFrame = async () => {
    try {
      const frame = await AsyncStorage.getItem('selectedFrame');
      if (frame) {
        setSelectedFrame(frame);
      }
    } catch (error) {
      console.error('Error loading selected frame:', error);
    }
  };

  const handleSubmit = () => {
    const challenge = {
      title,
      description,
      frameId: selectedFrame || null, // Save selected frame
    };
    console.log('Challenge:', challenge);
    Alert.alert('Success!', 'Challenge created successfully!');

    // Reset form and close
    setTitle('');
    setDescription('');
    setSelectedFrame(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.title}>Create New Challenge</Text>

          <TextInput
            style={styles.input}
            placeholder="Challenge Title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Challenge Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          {/* Frame Selector */}
          <View style={styles.frameSelector}>
            <Text style={styles.label}>Select Frame</Text>
            <TouchableOpacity onPress={() => onNavigateToFrames?.()} style={styles.frameButton}>
              <Text style={styles.link}>
                {selectedFrame ? `Frame Selected (ID: ${selectedFrame})` : 'Go to Frames Store'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#6C5CE7" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 15, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1A1A2E',
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#2D2D3D',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    color: '#FFF',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  frameSelector: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  frameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#6C5CE7',
  },
  link: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
