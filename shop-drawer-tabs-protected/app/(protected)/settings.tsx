import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Shimmer } from "react-native-fast-shimmer";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const COLORS = {
  textDark: "#000",
};

export default function SettingsPage() {
  const { width } = useWindowDimensions();
  const [backspacePressed, setBackspacePressed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<{
    theme?: string;
    notificationsEnabled?: boolean;
    admin?: boolean;
    bio?: string;
    age?: number;
    interests?: string[];
    activities?: { name: string; frequency: string }[];
  }>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async (resetted = false) => {
    // Load from local storage sqlite
    setLoading(true);
    setTimeout(() => {
      setSettings(
        resetted
          ? {}
          : {
              theme: "light",
              notificationsEnabled: false,
              admin: false,
              bio: "This is a sample bio.",
              age: 28,
              interests: ["music", "travel", "sports"],
              activities: [
                { name: "running", frequency: "daily" },
                { name: "reading", frequency: "weekly" },
              ],
            }
      );
      setLoading(false);
    }, 2000);
  };

  const clearAllSettings = () => {
    loadSettings(true);
  };

  const addActivity = () => {
    setSettings((prev) => ({
      ...prev,
      activities: [...(prev.activities || []), { name: "", frequency: "" }],
    }));
  };

  const removeActivity = (index: number) => {
    setSettings((prev) => {
      const newActivities = [...(prev.activities || [])];
      newActivities.splice(index, 1);
      return { ...prev, activities: newActivities };
    });
  };

  const updateSettings = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const renderSkeletonContent = () => (
    <View style={styles.skeletonContainer}>
      {/* Form input skeleton */}
      {Array.from({ length: 4 }).map((_, index) => (
        <Shimmer
          key={index}
          style={[
            styles.skeletonItem,
            { width: width - 40 },
            index === 3 ? { height: 80 } : { height: 40 },
          ]}
        />
      ))}
    </View>
  );
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: loading
            ? "Loading..."
            : `Settings ${Object.entries(settings).length}`,
          headerLargeTitle: true,
          headerTitleStyle: { color: COLORS.textDark, fontSize: 16 },
          headerLargeTitleStyle: { color: COLORS.textDark, fontSize: 18 },
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={clearAllSettings}
              >
                <Ionicons name="refresh" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <ScrollView
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        stickyHeaderHiddenOnScroll={true}
      >
        {loading ? (
          renderSkeletonContent()
        ) : (
          <View style={styles.content}>
            {settings ? (
              <>
                <Text style={styles.label}>Theme:</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#f0f0f0" }]}
                  value={settings.theme}
                  editable={false}
                />
                <Text style={styles.label}>Notifications</Text>
                <Switch
                  value={settings.notificationsEnabled}
                  onValueChange={(value) =>
                    updateSettings("notificationsEnabled", value)
                  }
                />
                <Text style={styles.label}>Admin:</Text>
                <Switch
                  value={settings.admin}
                  onValueChange={(value) => updateSettings("admin", value)}
                />
                <Text style={styles.label}>Bio:</Text>
                <TextInput
                  style={[styles.input, { height: 80 }]}
                  value={settings.bio}
                  keyboardType="default"
                  multiline
                  onChangeText={(text) => updateSettings("bio", text)}
                />
                <Text style={styles.label}>Age:</Text>
                <TextInput
                  style={styles.input}
                  value={settings.age?.toString()}
                  keyboardType="number-pad"
                  onChangeText={(text) =>
                    updateSettings("age", parseInt(text) || 0)
                  }
                />
                <Text style={styles.label}>Interests:</Text>
                <TextInput
                  style={styles.input}
                  value={settings.interests?.join(", ")}
                  keyboardType="default"
                  onKeyPress={(e) => {
                    if (e.nativeEvent.key === "Backspace") {
                      const existingInterests = settings.interests || [];
                      if (existingInterests.length === 0) return;
                      const lastIsEmpty = existingInterests.at(-1) === "";

                      if (lastIsEmpty) {
                        setBackspacePressed(true);
                        updateSettings(
                          "interests",
                          existingInterests.filter((v) => v.length > 0)
                        );
                      }
                    }
                  }}
                  onChangeText={(text) => {
                    if (backspacePressed) {
                      setBackspacePressed(false);
                      return;
                    }
                    const interestsArray = text
                      .split(",")
                      .map((item) => item.trim());
                    updateSettings("interests", interestsArray);
                  }}
                />
                <Text style={styles.label}>Activities:</Text>

                {settings.activities?.map((activity, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <TextInput
                      style={[styles.input, { marginBottom: 5 }]}
                      value={activity.name}
                      placeholder="Activity Name"
                      onChangeText={(text) => {
                        const newActivities = [...(settings.activities || [])];
                        newActivities[index].name = text;
                        updateSettings("activities", newActivities);
                      }}
                    />
                    <TextInput
                      style={styles.input}
                      value={activity.frequency}
                      placeholder="Frequency"
                      onChangeText={(text) => {
                        const newActivities = [...(settings.activities || [])];
                        newActivities[index].frequency = text;
                        updateSettings("activities", newActivities);
                      }}
                    />
                    <TouchableOpacity onPress={() => removeActivity(index)}>
                      <Text style={{ color: "red" }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <Link href={`/(modals)/add-activity`} asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Ionicons
                        name="add-circle"
                        size={45}
                        style={{ opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
                <TouchableOpacity
                  onPress={addActivity}
                  style={{
                    marginBottom: 10,
                    backgroundColor: "#007AFF",
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>Add Activity</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>No settings available</Text>
            )}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.textDark,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: COLORS.textDark,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    marginLeft: 15,
  },
  skeletonContainer: {
    padding: 20,
    flex: 1,
  },
  skeletonItem: {
    marginBottom: 12,
    backgroundColor: "#E5E5E5",
  },
});
