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

export default function UI1() {
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
    if (trustPoints >= 80) return "#4CAF50"; // Green
    if (trustPoints >= 60) return "#FF9800"; // Orange
    if (trustPoints >= 40) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

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
            placeholderTextColor="#888"
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
    backgroundColor: "#1a1a1a",
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
  progressSection: {
    backgroundColor: "#2a2a2a",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#333",
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
    color: "#4CAF50",
  },
  trustText: {
    fontSize: 16,
    color: "#fff",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: "#444",
    borderRadius: 6,
    marginRight: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    color: "#fff",
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
    color: "#4CAF50",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  addTaskSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
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
    color: "#666",
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  checkboxCompleted: {
    backgroundColor: "#4CAF50",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
