import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionButton from '@/components/ActionButton';
import supabase from '@/api/supabaseClient';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import * as AuthSession from 'expo-auth-session';

// Ensure web browser redirect handling is set up
WebBrowser.maybeCompleteAuthSession();

// Define redirect URI
const redirectUri = AuthSession.makeRedirectUri();
console.log("Redirect URI:", redirectUri); // For debugging

export default function SignupScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSignin = async () => {
        try {
            setLoading(true);
            
            // Initialize the Supabase OAuth sign-in
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'spotify',
                options: {
                    redirectTo: redirectUri,
                }
            });
            
            if (error) {
                console.error('OAUTH ERROR', error);
                return;
            }
            
            // Get auth URL from response
            const authUrl = data?.url;
            if (!authUrl) {
                console.error('No auth URL returned');
                return;
            }
            
            // Use WebBrowser to open the authentication URL
            const result = await WebBrowser.openAuthSessionAsync(
                authUrl,
                redirectUri
            );
            
            console.log('Auth result:', result);
            
            if (result.type === 'success') {
                // After returning from the redirect
                const { user, session, error: sessionError } = await supabase.auth.getSession();
                
                if (sessionError) {
                    console.error('Session error:', sessionError);
                } else if (session) {
                    console.log('Successfully authenticated!');
                    router.push('/(tabs)');
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ActionButton text='Sign Up' onPress={() => {}}>
            <View className='flex-1 justify-center items-center'>
                <TouchableOpacity 
                    className='bg-black py-3 px-6 rounded-full'
                    onPress={handleSignin}
                    disabled={loading}
                >
                    <Text className='text-white font-semibold text-center'>
                        {loading ? 'Connecting...' : 'Connect your Spotify Account'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ActionButton>
    );
}