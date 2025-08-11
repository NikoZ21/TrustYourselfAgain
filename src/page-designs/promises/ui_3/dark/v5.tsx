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
  const [activeTab, setActiveTab] = useState<"PROMISES" | "CHECKLIST">(
    "PROMISES"
  );
  const [filter, setFilter] = useState("In Progress");

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
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "#F472B6";
      case "NORMAL":
        return "#EC4899";
      case "LOW":
        return "#F9A8D4";
      default:
        return "#4B5563";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "HIGH":
        return "#FCE7F3";
      case "DESIGN":
        return "#FDF2F8";
      case "NORMAL":
        return "#FFEEF8";
      case "DEVELOPMENT":
        return "#ECFDF5";
      case "DELIVERY":
        return "#FEF3C7";
      default:
        return "#374151";
    }
  };

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
          <Ionicons name="document-outline" size={16} color="#9CA3AF" />
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

  const ChecklistEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <MaterialIcons name="check-box" size={60} color="#F472B6" />
      </View>
      <Text style={styles.emptyTitle}>
        You don't have any checklist yet. Create a new checklist in PROMISES on
        the web.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F1F1F" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#E5E7EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROMISES</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="#E5E7EB" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search-outline" size={24} color="#E5E7EB" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "PROMISES" && styles.activeTab]}
          onPress={() => setActiveTab("PROMISES")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "PROMISES" && styles.activeTabText,
            ]}
          >
            PROMISES
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
        {activeTab === "PROMISES" ? (
          <View style={styles.promisesSection}>
            {/* Filter Dropdown */}
            <TouchableOpacity style={styles.filterContainer}>
              <Text style={styles.filterText}>{filter}</Text>
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Task List */}
            <ScrollView
              style={styles.promiseList}
              showsVerticalScrollIndicator={false}
            >
              {promises.map((promise) => (
                <PromiseCard key={promise.id} promise={promise} />
              ))}
            </ScrollView>
          </View>
        ) : (
          <ChecklistEmptyState />
        )}
      </View>

      {/* Add Button */}
      {activeTab === "PROMISES" && (
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={24} color="#F472B6" />
          <Text style={[styles.navText, { color: "#F472B6" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="assignment" size={24} color="#6B7280" />
          <Text style={styles.navText}>My Promises</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="subscriptions" size={24} color="#6B7280" />
          <Text style={styles.navText}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="calendar-today" size={24} color="#6B7280" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F0A18",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1F1F1F",
    borderBottomWidth: 1,
    borderBottomColor: "#831843",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F472B6",
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
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#F472B6",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  activeTabText: {
    color: "#1F2937",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  promisesSection: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  filterText: {
    fontSize: 16,
    color: "#E5E7EB",
    marginRight: 5,
  },
  promiseList: {
    flex: 1,
  },
  promiseCard: {
    backgroundColor: "#2D2D2D",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#831843",
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
    color: "#FFFFFF",
    flex: 1,
    marginRight: 10,
  },
  dueDate: {
    fontSize: 12,
    color: "#F472B6",
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
    color: "#1F2937",
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
    color: "#9CA3AF",
    marginLeft: 5,
  },
  assigneeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  assigneeName: {
    fontSize: 14,
    color: "#E5E7EB",
    marginRight: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#831843",
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
    color: "#9CA3AF",
    lineHeight: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E11D48",
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
    backgroundColor: "#1F1F1F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#831843",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});

export default PromiseAppUI;
