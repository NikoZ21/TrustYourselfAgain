import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "HIGH" | "NORMAL" | "LOW";
  tags: string[];
  assignee: {
    name: string;
    avatar: string;
  };
  completed: boolean;
}

const TodoAppUIDark = () => {
  const [activeTab, setActiveTab] = useState<"TASKS" | "CHECKLIST">("TASKS");
  const [filter, setFilter] = useState("In Progress");

  const tasks: Task[] = [
    {
      id: "1",
      title: "Brando.Co Landing page idea",
      description: "",
      dueDate: "Due Today 16 Oct",
      priority: "HIGH",
      tags: ["HIGH", "DESIGN"],
      assignee: {
        name: "Devon Lane",
        avatar: "👤",
      },
      completed: false,
    },
    {
      id: "2",
      title: "Saoute Website re-design project review",
      description: "",
      dueDate: "Due 18 Oct",
      priority: "NORMAL",
      tags: ["NORMAL", "DESIGN", "DEVELOPMENT"],
      assignee: {
        name: "Floyd Miles",
        avatar: "👤",
      },
      completed: false,
    },
    {
      id: "3",
      title: "Localz App Design Final Feedback",
      description: "",
      dueDate: "Due 17 Oct",
      priority: "HIGH",
      tags: ["HIGH", "DELIVERY"],
      assignee: {
        name: "Eleanor Pena",
        avatar: "👤",
      },
      completed: false,
    },
    {
      id: "4",
      title: "Teacherly Web Design",
      description: "",
      dueDate: "Due 20 Oct",
      priority: "NORMAL",
      tags: ["NORMAL"],
      assignee: {
        name: "Devon Lane",
        avatar: "👤",
      },
      completed: false,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "#FF5757";
      case "NORMAL":
        return "#3DBDB7";
      case "LOW":
        return "#7DD3C0";
      default:
        return "#555555";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "HIGH":
        return "#FFD93D";
      case "DESIGN":
        return "#3DBDB7";
      case "NORMAL":
        return "#FF5757";
      case "DEVELOPMENT":
        return "#90D4C5";
      case "DELIVERY":
        return "#C69AE0";
      default:
        return "#555555";
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.dueDate}>{task.dueDate}</Text>
      </View>

      <View style={styles.tagsContainer}>
        {task.tags.map((tag, index) => (
          <View
            key={index}
            style={[styles.tag, { backgroundColor: getTagColor(tag) }]}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.taskFooter}>
        <View style={styles.taskInfo}>
          <Ionicons name="document-outline" size={16} color="#AAAAAA" />
          <Text style={styles.taskCount}>1</Text>
        </View>
        <View style={styles.assigneeContainer}>
          <Text style={styles.assigneeName}>{task.assignee.name}</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{task.assignee.avatar}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const ChecklistEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <MaterialIcons name="check-box" size={60} color="#FFB84D" />
      </View>
      <Text style={styles.emptyTitle}>
        You don't have any checklist yet. Create a new checklist in TODOS on the
        web.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F1F1F" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TODOS</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "TASKS" && styles.activeTab]}
          onPress={() => setActiveTab("TASKS")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "TASKS" && styles.activeTabText,
            ]}
          >
            TASKS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "CHECKLIST" && styles.activeTab]}
          onPress={() => setActiveTab("CHECKLIST")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "CHECKLIST" && styles.activeTabText,
            ]}
          >
            CHECKLIST
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === "TASKS" ? (
          <View style={styles.tasksSection}>
            {/* Filter Dropdown */}
            <TouchableOpacity style={styles.filterContainer}>
              <Text style={styles.filterText}>{filter}</Text>
              <Ionicons name="chevron-down" size={16} color="#AAAAAA" />
            </TouchableOpacity>

            {/* Task List */}
            <ScrollView
              style={styles.taskList}
              showsVerticalScrollIndicator={false}
            >
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </ScrollView>
          </View>
        ) : (
          <ChecklistEmptyState />
        )}
      </View>

      {/* Add Button */}
      {activeTab === "TASKS" && (
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Bottom Navigation
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#FF5757" />
          <Text style={[styles.navText, { color: "#FF5757" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="assignment" size={24} color="#AAAAAA" />
          <Text style={styles.navText}>My Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="subscriptions" size={24} color="#AAAAAA" />
          <Text style={styles.navText}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="calendar-today" size={24} color="#AAAAAA" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1F1F1F",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF5757",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 15,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15, // Add bottom padding to create space after tabs
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FF5757",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#AAAAAA",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tasksSection: {
    flex: 1,
    marginTop: 10, // Add top margin to create space from tabs
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 20, // Add bottom margin to create space after filter
  },
  filterText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: 5,
  },
  taskList: {
    flex: 1,
    marginTop: 5, // Add small top margin to create space from filter
  },
  taskCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#333333",
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 10,
  },
  dueDate: {
    fontSize: 12,
    color: "#FF5757",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#000000",
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskCount: {
    fontSize: 14,
    color: "#AAAAAA",
    marginLeft: 5,
  },
  assigneeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  assigneeName: {
    fontSize: 14,
    color: "#FFFFFF",
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#444444",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#AAAAAA",
    lineHeight: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3DBDB7",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 12,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#1F1F1F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: "#AAAAAA",
    marginTop: 4,
  },
});

export default TodoAppUIDark;
