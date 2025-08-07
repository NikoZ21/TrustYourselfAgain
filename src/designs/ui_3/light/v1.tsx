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

interface Promise {
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

const PromiseAppUI = () => {
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Completed" | "Pending"
  >("All");

  // Mock user data - in a real app this would come from a state management solution
  const [userLevel] = useState(7);
  const [currentLevelProgress] = useState(65); // percentage to next level
  const [trustPoints] = useState(65);

  const promises: Promise[] = [
    {
      id: "1",
      title: "I will complete the workout routine today",
      description: "",
      dueDate: "6h 45m left",
      priority: "HIGH",
      tags: ["HIGH", "DESIGN"],
      assignee: {
        name: "Niko",
        avatar: "👤",
      },
      completed: false,
    },
    {
      id: "2",
      title: "I will clean the house thoroughly",
      description: "",
      dueDate: "6h 45m left",
      priority: "NORMAL",
      tags: ["NORMAL", "DESIGN", "DEVELOPMENT"],
      assignee: {
        name: "Niko",
        avatar: "👤",
      },
      completed: false,
    },
    {
      id: "3",
      title: "I will call my family this evening",
      description: "",
      dueDate: "6h 45m left",
      priority: "HIGH",
      tags: ["HIGH", "DELIVERY"],
      assignee: {
        name: "Niko",
        avatar: "👤",
      },
      completed: false,
    },
    {
      id: "4",
      title: "I will read for 30 minutes before bed",
      description: "",
      dueDate: "6h 45m left",
      priority: "NORMAL",
      tags: ["NORMAL"],
      assignee: {
        name: "Niko",
        avatar: "👤",
      },
      completed: false,
    },
    {
      id: "5",
      title: "I will meditate for 10 minutes",
      description: "",
      dueDate: "2h 15m left",
      priority: "LOW",
      tags: ["LOW"],
      assignee: {
        name: "Niko",
        avatar: "👤",
      },
      completed: true,
    },
    {
      id: "6",
      title: "I will drink 8 glasses of water",
      description: "",
      dueDate: "12h left",
      priority: "NORMAL",
      tags: ["NORMAL"],
      assignee: {
        name: "Niko",
        avatar: "👤",
      },
      completed: true,
    },
  ];

  // Calculate today's promise statistics
  const todayPromises = promises.length;
  const completedPromises = promises.filter((p) => p.completed).length;
  const remainingPromises = todayPromises - completedPromises;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "#FF6B6B";
      case "NORMAL":
        return "#4ECDC4";
      case "LOW":
        return "#95E1D3";
      default:
        return "#E0E0E0";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "HIGH":
        return "#FFE066";
      case "DESIGN":
        return "#4ECDC4";
      case "NORMAL":
        return "#FF6B6B";
      case "DEVELOPMENT":
        return "#A8E6CF";
      case "DELIVERY":
        return "#DDA0DD";
      default:
        return "#E0E0E0";
    }
  };

  const LevelCard = ({
    level,
    progress,
    trustPoints,
    completed,
    remaining,
    total,
  }: {
    level: number;
    progress: number;
    trustPoints: number;
    completed: number;
    remaining: number;
    total: number;
  }) => (
    <View style={styles.levelCardContent}>
      <View style={styles.levelCardHeader}>
        <Text style={styles.levelTitle}>Level {level}</Text>
        <Text style={styles.trustPoints}>{trustPoints} Trust Points</Text>
      </View>

      <View style={styles.levelProgressContainer}>
        <View style={styles.levelProgressBackground}>
          <View style={[styles.levelProgressFill, { width: `${progress}%` }]}>
            <Text style={styles.progressPercentageText}>{progress}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statColumn}>
          <Text style={styles.completedStatValue}>{completed}</Text>
          <Text style={styles.cardStatLabel}>Completed</Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.statValue}>{remaining}</Text>
          <Text style={styles.cardStatLabel}>Remaining</Text>
        </View>
        <View style={styles.statColumn}>
          <Text style={styles.totalStatValue}>{total}</Text>
          <Text style={styles.cardStatLabel}>Total</Text>
        </View>
      </View>
    </View>
  );

  const PromiseCard = ({ promise }: { promise: Promise }) => (
    <View style={styles.promiseCard}>
      <View style={styles.promiseHeader}>
        <Text style={styles.promiseTitle}>{promise.title}</Text>
        <Text style={styles.dueDate}>{promise.dueDate}</Text>
      </View>

      <View style={styles.tagsContainer}>
        {promise.tags.map((tag, index) => (
          <View
            key={index}
            style={[styles.tag, { backgroundColor: getTagColor(tag) }]}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.promiseFooter}>
        <View style={styles.promiseInfo}>
          <Ionicons name="document-outline" size={16} color="#999" />
          <Text style={styles.promiseCount}>1</Text>
        </View>
        <View style={styles.assigneeContainer}>
          <Text style={styles.assigneeName}>{promise.assignee.name}</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{promise.assignee.avatar}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROMISES</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress and Stats Section */}
      <View style={styles.statsSection}>
        <LevelCard
          level={userLevel}
          progress={currentLevelProgress}
          trustPoints={trustPoints}
          completed={completedPromises}
          remaining={remainingPromises}
          total={todayPromises}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.promisesSection}>
          {/* Filter Tabs */}
          <View style={styles.filterTabsContainer}>
            <TouchableOpacity
              style={[
                styles.filterTab,
                activeFilter === "All" && styles.activeFilterTab,
              ]}
              onPress={() => setActiveFilter("All")}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === "All" && styles.activeFilterTabText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterTab,
                activeFilter === "Completed" && styles.activeFilterTab,
              ]}
              onPress={() => setActiveFilter("Completed")}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === "Completed" && styles.activeFilterTabText,
                ]}
              >
                Completed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterTab,
                activeFilter === "Pending" && styles.activeFilterTab,
              ]}
              onPress={() => setActiveFilter("Pending")}
            >
              <Text
                style={[
                  styles.filterTabText,
                  activeFilter === "Pending" && styles.activeFilterTabText,
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>
          </View>

          {/* Task List */}
          <ScrollView
            style={styles.promiseList}
            showsVerticalScrollIndicator={false}
          >
            {promises
              .filter((promise) => {
                if (activeFilter === "All") return true;
                if (activeFilter === "Completed") return promise.completed;
                if (activeFilter === "Pending") return !promise.completed;
                return true;
              })
              .map((promise) => (
                <PromiseCard key={promise.id} promise={promise} />
              ))}
          </ScrollView>
        </View>
      </View>
      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      {/* Bottom Navigation
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#FF6B6B" />
          <Text style={[styles.navText, { color: "#FF6B6B" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="assignment" size={24} color="#999" />
          <Text style={styles.navText}>My Promises</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="subscriptions" size={24} color="#999" />
          <Text style={styles.navText}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="calendar-today" size={24} color="#999" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // backgroundColor: "red",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF6B6B",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 15,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  promisesSection: {
    flex: 1,
  },
  filterTabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 4,
    marginVertical: 15,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeFilterTab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeFilterTabText: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
  promiseList: {
    flex: 1,
  },
  promiseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promiseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  promiseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  dueDate: {
    fontSize: 12,
    color: "#FF6B6B",
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
    color: "#333",
  },
  promiseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promiseInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  promiseCount: {
    fontSize: 14,
    color: "#999",
    marginLeft: 5,
  },
  assigneeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  assigneeName: {
    fontSize: 14,
    color: "#333",
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
  },

  addButton: {
    position: "absolute",
    bottom: 0,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4ECDC4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  // Stats Section Styles
  statsSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  // Level Card Styles
  levelCardContent: {
    padding: 20,
    marginTop: 15,
  },
  levelCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFE066",
  },
  trustPoints: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  levelProgressContainer: {
    marginBottom: 20,
  },
  levelProgressBackground: {
    height: 16,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    position: "relative",
  },
  levelProgressFill: {
    height: "100%",
    backgroundColor: "#4ECDC4",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    shadowColor: "#4ECDC4",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  progressPercentageText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statColumn: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF6B6B",
    marginBottom: 4,
  },
  completedStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4ECDC4",
    marginBottom: 4,
  },
  totalStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#DDA0DD",
    marginBottom: 4,
  },
  cardStatLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});

export default PromiseAppUI;
