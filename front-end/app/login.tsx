import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ActionButton from '@/components/ActionButton';
import supabase from '@/api/supabaseClient';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import * as AuthSession from 'expo-auth-session';

// Ensure web browser redirect handling is set up
WebBrowser.maybeCompleteAuthSession();

// Define redirect URI - removing the unsupported useProxy option
const redirectUri = AuthSession.makeRedirectUri();
console.log("Redirect URI:", redirectUri); // For debugging

export default function SignupScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    /*
    const handleSignin = async () => {
        try {
            setLoading(true);
            
            console.log("Starting Spotify auth flow");
            
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

            console.log("Opening auth URL:", authUrl);
            
            // Use WebBrowser to open the authentication URL
            try {
                const result = await WebBrowser.openAuthSessionAsync(
                    authUrl,
                    redirectUri
                );
                
                console.log('Auth completed with result type:', result.type);
                console.log('Full result:', JSON.stringify(result));
                
                if (result.type === 'success') {
                    console.log('Trying to get session after successful auth');
                    // After returning from the redirect
                    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                    
                    if (sessionError) {
                        console.error('Session error:', sessionError);
                    } else if (sessionData?.session) {
                        console.log('Successfully authenticated!');
                        router.push('/(tabs)');
                    } else {
                        console.log('No session data returned');
                    }
                } else {
                    console.log('Auth was not successful:', result.type);
                }
            } catch (browserError) {
                console.error('Browser session error:', browserError);
            }
        } catch (error) {
            console.error('Authentication error:', error);
        } finally {
            setLoading(false);
        }
    };*/

    const handleSignin = () => {
        router.push('/(tabs)');
    }

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