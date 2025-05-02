import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function DaltonScreen() {
    return (
        <SafeAreaView>
            <Text style={styles.header}>
                Hello World
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex'
    },
});