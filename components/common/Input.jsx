import { Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import colors from '../../constants/colors';

const Input = ({
  label,
  IconPack,
  icon,
  iconColor,
  iconSize,
  errorText,
  name,
  value,
  onChange,
  secureTextEntry,
  keyboardType,
  numberOfLines,
  height,
  multiline,
}) => {
  return (
    <View style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}>
      <Text
        style={{ color: colors.default, fontFamily: 'bold', lineHeight: 24 }}
      >
        {label}
      </Text>

      <View
        style={{
          paddingHorizontal: 12,
          flexDirection: 'row',
          width: '100%',
          backgroundColor: colors.frame,
          borderRadius: 8,
          paddingVertical: 12,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 36 }}>
          {IconPack && (
            <IconPack name={icon} size={iconSize} color={iconColor} />
          )}
        </View>
        <TextInput
          onChange={({ nativeEvent: { text } }) => onChange(name, text)}
          style={{ flex: 1, fontWeight: 'bold', fontSize: 18, height:height || null }}
          numberOfLines={numberOfLines || 1}
          multiline={multiline || null}
          selectionColor={colors.active}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType || 'default'}
          value={value}
        />
      </View>

      {errorText && (
        <View>
          <Text
            style={{
              marginVertical: 8,
              color: colors.active,
              fontSize: 16,
              letterSpacing: 0.4,
            }}
          >
            {errorText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Input;
