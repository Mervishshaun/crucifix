import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

// Define types for the tree nodes
type ResultNode = {
  result: string;
};

type OptionNode = {
  question: string; // <-- fix here
  options: Option[];
};

type Option = {
  label: string;
  node: TreeNode;
};

type TreeNode = ResultNode | OptionNode;

type DecisionTreeProps = {
  node: TreeNode;
};

export default function DecisionTree({ node }: DecisionTreeProps) {
  const [history, setHistory] = useState<TreeNode[]>([]);
  const [currentNode, setCurrentNode] = useState<TreeNode>(node);

  const goForward = (nextNode: TreeNode) => {
    setHistory([...history, currentNode]);
    setCurrentNode(nextNode);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prevHistory = [...history];
    const previousNode = prevHistory.pop()!;
    setHistory(prevHistory);
    setCurrentNode(previousNode);
  };

  const restart = () => {
    setHistory([]);
    setCurrentNode(node);
  };

  // Type guard to check if node is a result node
  const isResultNode = (node: TreeNode): node is ResultNode => {
    return (node as ResultNode).result !== undefined;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerBox}>
        {isResultNode(currentNode) ? (
          <>
            <Text style={styles.result}>{currentNode.result}</Text>
            <View style={styles.buttonRow}>
              <Button title="Back" onPress={goBack} disabled={history.length === 0} />
              <Button title="Restart" onPress={restart} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.question}>{currentNode.question}</Text>
            {currentNode.options.map((option, idx) => (
              <View key={idx} style={styles.buttonWrapper}>
                <Button title={option.label} onPress={() => goForward(option.node)} />
              </View>
            ))}
            <View style={styles.buttonRow}>
              <Button title="Back" onPress={goBack} disabled={history.length === 0} />
              <Button title="Restart" onPress={restart} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // White background for contrast
    padding: 20,
  },
  innerBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#f0f4ff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  question: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#222",
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonWrapper: {
    marginVertical: 8,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
    gap: 8,
  },
});

