import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function UI2() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [trustPoints, setTrustPoints] = useState(65); // Example progress
  const [level, setLevel] = useState(3);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          // Increase trust points when completing a task
          if (updatedTask.completed) {
            setTrustPoints((prev) => Math.min(prev + 5, 100));
          } else {
            setTrustPoints((prev) => Math.max(prev - 5, 0));
          }
          return updatedTask;
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getProgressColor = () => {
    if (trustPoints >= 80) return "#00FF7F"; // Bright Spring Green
    if (trustPoints >= 60) return "#FF4500"; // Bright Orange Red
    if (trustPoints >= 40) return "#FFD700"; // Bright Gold
    return "#FF1493"; // Deep Pink
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0B3C" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>TrustMe Again</Text>
        <Text style={styles.subtitle}>Build trust with yourself</Text>
      </View>

      {/* Level and Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level {level}</Text>
          <Text style={styles.trustText}>{trustPoints} Trust Points</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${trustPoints}%`,
                  backgroundColor: getProgressColor(),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{trustPoints}%</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalTasks - completedTasks}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      {/* Add Task Section */}
      <View style={styles.addTaskSection}>
        <Text style={styles.sectionTitle}>Today's Commitments</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What will you absolutely do today?"
            placeholderTextColor="#B39DDB"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tasks List */}
      <ScrollView
        style={styles.tasksContainer}
        showsVerticalScrollIndicator={false}
      >
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No commitments yet</Text>
            <Text style={styles.emptySubtext}>
              Add something you'll absolutely accomplish today
            </Text>
          </View>
        ) : (
          tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  task.completed && styles.checkboxCompleted,
                ]}
                onPress={() => toggleTask(task.id)}
              >
                {task.completed && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>

              <Text
                style={[
                  styles.taskText,
                  task.completed && styles.taskTextCompleted,
                ]}
              >
                {task.text}
              </Text>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}
              >
                <Text style={styles.deleteText}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0B3C", // Deep purple background
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E91E63", // Vibrant pink
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#9C27B0", // Vibrant purple
  },
  progressSection: {
    backgroundColor: "#1A237E", // Deep blue
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#3F51B5", // Vibrant indigo
  },
  levelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00FF7F", // Bright spring green
  },
  trustText: {
    fontSize: 16,
    color: "#FFEB3B", // Bright yellow
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: "#311B92", // Dark purple
    borderRadius: 6,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    color: "#FFEB3B", // Bright yellow
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 35,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00BCD4", // Bright cyan
  },
  statLabel: {
    fontSize: 12,
    color: "#B39DDB", // Light purple
    marginTop: 2,
  },
  addTaskSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF4081", // Bright pink accent
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#1A237E", // Deep blue
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3F51B5", // Vibrant indigo
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#FF5722", // Vibrant deep orange
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF9800", // Bright orange
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#9C27B0", // Vibrant purple
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#B39DDB", // Light purple
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A237E", // Deep blue
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#3F51B5", // Vibrant indigo
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#00FF7F", // Bright spring green
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  checkboxCompleted: {
    backgroundColor: "#00FF7F", // Bright spring green
  },
  checkmark: {
    color: "#0F0B3C", // Dark text on bright background
    fontSize: 14,
    fontWeight: "bold",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#B39DDB", // Light purple
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E91E63", // Vibrant pink
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F50057", // Bright pink accent
  },
  deleteText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
